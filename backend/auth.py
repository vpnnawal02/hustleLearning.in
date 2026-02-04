from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY, JWT_SECRET
from datetime import datetime, timedelta
import random
import jwt

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def generate_otp():
    """Generate 6-digit OTP"""
    return str(random.randint(100000, 999999))


async def send_otp(phone_number: str, name: str):
    """Generate and store OTP for phone number"""
    
    # Generate OTP
    otp_code = generate_otp()
    expires_at = datetime.now() + timedelta(minutes=10)
    
    # Store OTP in database
    try:
        result = supabase.table('otp_codes').insert({
            'phone_number': phone_number,
            'otp_code': otp_code,
            'expires_at': expires_at.isoformat(),
            'is_used': False
        }).execute()
        
        # TODO: Send SMS via Twilio (for now, just return OTP for testing)
        print(f"OTP for {phone_number} ({name}): {otp_code}")  # Remove in production
        
        return {
            "success": True,
            "message": "OTP sent successfully",
            "otp": otp_code  # Remove in production, only for testing
        }
    except Exception as e:
        return {"success": False, "message": str(e)}


async def verify_otp(phone_number: str, otp_code: str, name: str):
    """Verify OTP and create/update user with name"""
    
    try:
        # Check if OTP is valid
        result = supabase.table('otp_codes').select('*').eq('phone_number', phone_number).eq('otp_code', otp_code).eq('is_used', False).execute()
        
        if not result.data:
            return {"success": False, "message": "Invalid OTP"}
        
        otp_record = result.data[0]
        
        # Check if OTP expired
        expires_at = datetime.fromisoformat(otp_record['expires_at'].replace('Z', '+00:00'))
        if datetime.now(expires_at.tzinfo) > expires_at:
            return {"success": False, "message": "OTP expired"}
        
        # Mark OTP as used
        supabase.table('otp_codes').update({'is_used': True}).eq('id', otp_record['id']).execute()
        
        # Create or update user with name
        user_result = supabase.table('users').select('*').eq('phone_number', phone_number).execute()
        
        if user_result.data:
            # Update existing user
            user = supabase.table('users').update({
                'last_login': datetime.now().isoformat(),
                'is_verified': True,
                'name': name  # Update name
            }).eq('phone_number', phone_number).execute()
            user_id = user_result.data[0]['id']
            user_name = name
        else:
            # Create new user
            user = supabase.table('users').insert({
                'phone_number': phone_number,
                'name': name,  # Store name
                'is_verified': True,
                'last_login': datetime.now().isoformat()
            }).execute()
            user_id = user.data[0]['id']
            user_name = name
        
        # Generate JWT token with name
        token = jwt.encode({
            'user_id': str(user_id),
            'phone_number': phone_number,
            'name': user_name,  # Include name in token
            'exp': datetime.utcnow() + timedelta(days=30)
        }, JWT_SECRET, algorithm='HS256')
        
        return {
            "success": True,
            "message": "Login successful",
            "token": token,
            "user": {
                "id": str(user_id),
                "phone_number": phone_number,
                "name": user_name  # Return name
            }
        }
        
    except Exception as e:
        return {"success": False, "message": str(e)}


def verify_token(token: str):
    """Verify JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return {
            "success": True, 
            "user_id": payload['user_id'], 
            "phone_number": payload['phone_number'],
            "name": payload.get('name', 'User')  # Get name from token
        }
    except jwt.ExpiredSignatureError:
        return {"success": False, "message": "Token expired"}
    except jwt.InvalidTokenError:
        return {"success": False, "message": "Invalid token"}
