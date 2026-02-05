from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from auth import send_otp, verify_otp, verify_token, verify_admin, supabase
from datetime import datetime, timedelta
from typing import Optional


app = FastAPI()


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
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


# Routes
@app.get("/")
async def root():
    return {"message": "Hustle Learning API", "status": "running"}


@app.post("/api/auth/send-otp")
async def send_otp_endpoint(request: SendOTPRequest):
    """Send OTP to phone number"""
    result = await send_otp(request.phone_number, request.name, request.student_class)
    return result


@app.post("/api/auth/verify-otp")
async def verify_otp_endpoint(request: VerifyOTPRequest):
    """Verify OTP and login user"""
    result = await verify_otp(request.phone_number, request.otp_code, request.name, request.student_class)
    return result


@app.get("/api/notes/download/{note_id}")
async def download_note(note_id: str, authorization: str = Header(None)):
    """Get download URL for a note (requires authentication)"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.split(' ')[1]
    
    # Verify token
    user_data = verify_token(token)
    if not user_data['success']:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Log download activity
    try:
        supabase.table('download_logs').insert({
            'user_id': user_data['user_id'],
            'note_id': note_id,
            'downloaded_at': datetime.now().isoformat()
        }).execute()
    except Exception as e:
        print(f"Failed to log download: {e}")
    
    return {
        "success": True,
        "download_url": f"https://storage.example.com/notes/{note_id}.pdf",
        "note_id": note_id,
        "user": user_data['name'],
        "message": "Download ready"
    }


@app.get("/api/user/profile")
async def get_user_profile(authorization: str = Header(None)):
    """Get user profile from token"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.split(' ')[1]
    user_data = verify_token(token)
    
    if not user_data['success']:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return {
        "success": True,
        "user": {
            "user_id": user_data['user_id'],
            "phone_number": user_data['phone_number'],
            "name": user_data['name'],
            "student_class": user_data.get('student_class')
        }
    }


# ===== ADMIN ENDPOINTS ===== #

@app.post("/api/admin/login")
async def admin_login(request: AdminLoginRequest):
    """Admin login with username and password"""
    result = verify_admin(request.username, request.password)
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
    
    token = authorization.split(' ')[1]
    admin_data = verify_token(token)
    
    if not admin_data['success'] or not admin_data.get('is_admin'):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        # Start query
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
        
        # Order by most recent
        query = query.order('created_at', desc=True)
        
        result = query.execute()
        
        return {
            "success": True,
            "users": result.data,
            "total": len(result.data)
        }
        
    except Exception as e:
        print(f"❌ Error fetching users: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/admin/stats")
async def get_admin_stats(authorization: str = Header(None)):
    """Get dashboard statistics (Admin only)"""
    
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.split(' ')[1]
    admin_data = verify_token(token)
    
    if not admin_data['success'] or not admin_data.get('is_admin'):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        # Total users
        total_users = supabase.table('users').select('*', count='exact').execute()
        
        # Users by class
        users_by_class = {}
        for cls in range(6, 13):
            count = supabase.table('users').select('*', count='exact').eq('student_class', cls).execute()
            users_by_class[cls] = count.count or 0  # FIX: Handle None
        
        # Recent signups (last 7 days)
        seven_days_ago = (datetime.now() - timedelta(days=7)).isoformat()
        recent_signups = supabase.table('users').select('*', count='exact').gte('created_at', seven_days_ago).execute()
        
        # Total downloads
        total_downloads = supabase.table('download_logs').select('*', count='exact').execute()
        
        return {
            "success": True,
            "stats": {
                "total_users": total_users.count or 0,  # FIX: Handle None
                "users_by_class": users_by_class,
                "recent_signups": recent_signups.count or 0,  # FIX: Handle None
                "total_downloads": total_downloads.count or 0  # FIX: Handle None
            }
        }
        
    except Exception as e:
        print(f"❌ Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
