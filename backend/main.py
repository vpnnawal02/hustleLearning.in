from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from auth import send_otp, verify_otp, verify_token, supabase
from datetime import datetime

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class SendOTPRequest(BaseModel):
    phone_number: str
    name: str


class VerifyOTPRequest(BaseModel):
    phone_number: str
    otp_code: str
    name: str


# Routes
@app.get("/")
async def root():
    return {"message": "Hustle Learning API", "status": "running"}


@app.post("/api/auth/send-otp")
async def send_otp_endpoint(request: SendOTPRequest):
    """Send OTP to phone number"""
    result = await send_otp(request.phone_number, request.name)
    return result


@app.post("/api/auth/verify-otp")
async def verify_otp_endpoint(request: VerifyOTPRequest):
    """Verify OTP and login user"""
    result = await verify_otp(request.phone_number, request.otp_code, request.name)
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
    
    # TODO: Get note file URL from Supabase Storage
    # For now, return dummy URL
    
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
            "name": user_data['name']
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
