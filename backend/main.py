from fastapi import FastAPI, Header, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from auth import send_otp, verify_otp, verify_token, verify_admin, supabase
from datetime import datetime, timedelta
from typing import Optional
import uuid

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== PYDANTIC MODELS ===== #

class SendOTPRequest(BaseModel):
    phone_number: str
    name: str
    student_class: int

class VerifyOTPRequest(BaseModel):
    phone_number: str
    otp_code: str
    name: str
    student_class: int

class AdminLoginRequest(BaseModel):
    username: str
    password: str

class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    student_class: Optional[int] = None

# ===== PUBLIC ROUTES ===== #

@app.get("/")
async def root():
    return {"message": "Hustle Learning API", "status": "running", "version": "1.0"}

# ===== AUTHENTICATION ENDPOINTS ===== #

@app.post("/api/auth/send-otp")
async def send_otp_endpoint(request: SendOTPRequest):
    """Send OTP to phone number"""
    result = await send_otp(request.phone_number, request.name, request.student_class)
    if not result.get("success"):
        raise HTTPException(status_code=500, detail=result.get("message", "Failed to send OTP"))
    return result

@app.post("/api/auth/verify-otp")
async def verify_otp_endpoint(request: VerifyOTPRequest):
    """Verify OTP and login user"""
    result = await verify_otp(request.phone_number, request.otp_code, request.name, request.student_class)
    if not result.get("success"):
        raise HTTPException(status_code=400, detail=result.get("message", "Invalid OTP"))
    return result

# ===== USER PROFILE ENDPOINTS ===== #

@app.get("/api/user/profile")
async def get_user_profile(authorization: str = Header(None)):
    """Get user profile with statistics"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized - Missing or invalid authorization header")
    
    token = authorization.replace("Bearer ", "")
    user_data = verify_token(token)
    
    if not user_data.get('success'):
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user_id = user_data['user_id']
    
    try:
        # Get user details
        user_response = supabase.table('users').select('*').eq('id', user_id).single().execute()
        
        if not user_response.data:
            raise HTTPException(status_code=404, detail="User not found")
        
        user = user_response.data
        
        # Get download count
        downloads = supabase.table('download_logs').select('id', count='exact').eq('user_id', user_id).execute()
        
        # Get bookmarks count
        bookmarks = supabase.table('bookmarks').select('id', count='exact').eq('user_id', user_id).execute()
        
        # Calculate study streak (last 7 days activity)
        streak_data = supabase.table('user_activity')\
            .select('activity_date')\
            .eq('user_id', user_id)\
            .order('activity_date', desc=True)\
            .limit(7)\
            .execute()
        
        return {
            "success": True,
            "user": user,
            "stats": {
                "downloads": downloads.count or 0,
                "bookmarks": bookmarks.count or 0,
                "streak": len(streak_data.data) if streak_data.data else 0,
                "member_since": user.get('created_at')
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error fetching profile: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch profile: {str(e)}")

@app.put("/api/user/profile")
async def update_user_profile(
    request: UpdateProfileRequest,
    authorization: str = Header(None)
):
    """Update user profile information"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.replace("Bearer ", "")
    user_data = verify_token(token)
    
    if not user_data.get('success'):
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = user_data['user_id']
    
    try:
        update_data = {}
        
        if request.name:
            update_data['name'] = request.name
        
        if request.student_class:
            if request.student_class < 6 or request.student_class > 12:
                raise HTTPException(status_code=400, detail="Class must be between 6 and 12")
            update_data['student_class'] = request.student_class
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No data provided to update")
        
        # Update user record
        result = supabase.table('users').update(update_data).eq('id', user_id).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {
            "success": True,
            "message": "Profile updated successfully",
            "user": result.data[0]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error updating profile: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {str(e)}")

@app.post("/api/user/profile/picture")
async def upload_profile_picture(
    file: UploadFile = File(...),
    authorization: str = Header(None)
):
    """Upload or update user profile picture"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.replace("Bearer ", "")
    user_data = verify_token(token)
    
    if not user_data.get('success'):
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = user_data['user_id']
    
    # Validate file type
    allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types: {', '.join(allowed_types)}"
        )
    
    # Read and validate file size (max 2MB)
    contents = await file.read()
    file_size_mb = len(contents) / (1024 * 1024)
    
    if file_size_mb > 2:
        raise HTTPException(
            status_code=400,
            detail=f"File size ({file_size_mb:.2f}MB) exceeds 2MB limit"
        )
    
    try:
        # Generate unique filename
        file_ext = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
        filename = f"{user_id}_{uuid.uuid4()}.{file_ext}"
        
        # Upload to Supabase Storage
        upload_result = supabase.storage.from_('profile-pictures').upload(
            filename,
            contents,
            file_options={"content-type": file.content_type}
        )
        
        # Get public URL
        public_url = supabase.storage.from_('profile-pictures').get_public_url(filename)
        
        # Update user record with new profile picture URL
        update_result = supabase.table('users').update({
            'profile_picture': public_url
        }).eq('id', user_id).execute()
        
        if not update_result.data:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {
            "success": True,
            "message": "Profile picture uploaded successfully",
            "profile_picture_url": public_url
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error uploading profile picture: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {str(e)}")

@app.get("/api/user/activity")
async def get_user_activity(authorization: str = Header(None)):
    """Get user's recent activity (downloads, bookmarks)"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.replace("Bearer ", "")
    user_data = verify_token(token)
    
    if not user_data.get('success'):
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = user_data['user_id']
    
    try:
        # Recent downloads with note details
        downloads = supabase.table('download_logs')\
            .select('*, notes(title, subject, class)')\
            .eq('user_id', user_id)\
            .order('downloaded_at', desc=True)\
            .limit(10)\
            .execute()
        
        # Recent bookmarks with note details
        bookmarks = supabase.table('bookmarks')\
            .select('*, notes(title, subject, class)')\
            .eq('user_id', user_id)\
            .order('created_at', desc=True)\
            .limit(10)\
            .execute()
        
        return {
            "success": True,
            "downloads": downloads.data or [],
            "bookmarks": bookmarks.data or []
        }
        
    except Exception as e:
        print(f"❌ Error fetching activity: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch activity: {str(e)}")

# ===== NOTES ENDPOINTS ===== #

@app.get("/api/notes/download/{note_id}")
async def download_note(note_id: str, authorization: str = Header(None)):
    """Get download URL for a note (requires authentication)"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.replace("Bearer ", "")
    user_data = verify_token(token)
    
    if not user_data.get('success'):
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = user_data['user_id']
    
    try:
        # Get note details
        note = supabase.table('notes').select('*').eq('id', note_id).single().execute()
        
        if not note.data:
            raise HTTPException(status_code=404, detail="Note not found")
        
        # Log download activity
        supabase.table('download_logs').insert({
            'user_id': user_id,
            'note_id': note_id,
            'downloaded_at': datetime.utcnow().isoformat()
        }).execute()
        
        # Log user activity for streak tracking
        supabase.table('user_activity').insert({
            'user_id': user_id,
            'activity_date': datetime.utcnow().date().isoformat()
        }).execute()
        
        return {
            "success": True,
            "download_url": note.data.get('pdf_url'),
            "note": note.data,
            "message": "Download ready"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error processing download: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Download failed: {str(e)}")

# ===== ADMIN ENDPOINTS ===== #

@app.post("/api/admin/login")
async def admin_login(request: AdminLoginRequest):
    """Admin login with username and password"""
    result = verify_admin(request.username, request.password)
    
    if not result.get("success"):
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    
    return result

@app.get("/api/admin/users")
async def get_all_users(
    authorization: str = Header(None),
    student_class: Optional[int] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    search: Optional[str] = None
):
    """Get all users with optional filters (Admin only)"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.replace("Bearer ", "")
    admin_data = verify_token(token)
    
    if not admin_data.get('success') or not admin_data.get('is_admin'):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        # Build query
        query = supabase.table('users').select('*')
        
        # Apply filters
        if student_class:
            query = query.eq('student_class', student_class)
        
        if start_date:
            query = query.gte('created_at', start_date)
        
        if end_date:
            query = query.lte('created_at', end_date)
        
        if search:
            query = query.or_(f'name.ilike.%{search}%,phone_number.ilike.%{search}%')
        
        # Execute query
        query = query.order('created_at', desc=True)
        result = query.execute()
        
        return {
            "success": True,
            "users": result.data or [],
            "total": len(result.data) if result.data else 0
        }
        
    except Exception as e:
        print(f"❌ Error fetching users: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/admin/stats")
async def get_admin_stats(authorization: str = Header(None)):
    """Get dashboard statistics (Admin only)"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.replace("Bearer ", "")
    admin_data = verify_token(token)
    
    if not admin_data.get('success') or not admin_data.get('is_admin'):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        # Total users
        total_users = supabase.table('users').select('*', count='exact').execute()
        
        # Users by class
        users_by_class = {}
        for cls in range(6, 13):
            count = supabase.table('users').select('*', count='exact').eq('student_class', cls).execute()
            users_by_class[str(cls)] = count.count or 0
        
        # Recent signups (last 7 days)
        seven_days_ago = (datetime.utcnow() - timedelta(days=7)).isoformat()
        recent_signups = supabase.table('users').select('*', count='exact').gte('created_at', seven_days_ago).execute()
        
        # Total downloads
        total_downloads = supabase.table('download_logs').select('*', count='exact').execute()
        
        return {
            "success": True,
            "stats": {
                "total_users": total_users.count or 0,
                "users_by_class": users_by_class,
                "recent_signups": recent_signups.count or 0,
                "total_downloads": total_downloads.count or 0
            }
        }
        
    except Exception as e:
        print(f"❌ Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ===== HEALTH CHECK ===== #

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Hustle Learning API"
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Hustle Learning API...")
    print("📍 Server running at: http://localhost:8000")
    print("📚 API Docs available at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
