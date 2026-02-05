from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY, JWT_SECRET, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
from datetime import datetime, timedelta
from twilio.rest import Client as TwilioClient
import random
import jwt


supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize Twilio client
twilio_client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN) if TWILIO_ACCOUNT_SID else None


def generate_otp():
    """Generate 6-digit OTP"""
    return str(random.randint(100000, 999999))


def send_sms(phone_number: str, message: str):
    """Send SMS using Twilio"""
    try:
        if not twilio_client:
            print("⚠️ Twilio not configured. SMS not sent.")
            return False
        
        # Format phone number with country code
        formatted_phone = f"+91{phone_number}" if not phone_number.startswith('+') else phone_number
        
        message = twilio_client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=formatted_phone
        )
        
        print(f"✅ SMS sent successfully! SID: {message.sid}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send SMS: {str(e)}")
        return False


async def send_otp(phone_number: str, name: str, student_class: int):
    """Generate and send OTP via SMS"""
    
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
        
        # Send SMS
        sms_message = f"Your Hustle Learning OTP is: {otp_code}\n\nValid for 10 minutes.\n\n- Team Hustle Learning"
        
        sms_sent = send_sms(phone_number, sms_message)
        
        response = {
            "success": True,
            "message": "OTP sent successfully"
        }
        
        if not sms_sent:
            response["otp"] = otp_code
            response["message"] = "SMS service unavailable. OTP shown for testing."
            print(f"📱 Development OTP for {phone_number} (Class {student_class}): {otp_code}")
        
        return response
        
    except Exception as e:
        print(f"❌ Error in send_otp: {str(e)}")
        return {"success": False, "message": str(e)}


async def verify_otp(phone_number: str, otp_code: str, name: str, student_class: int):
    """Verify OTP and create/update user with name and class"""
    
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
        
        # Create or update user with name and class
        user_result = supabase.table('users').select('*').eq('phone_number', phone_number).execute()
        
        if user_result.data:
            # Update existing user
            user = supabase.table('users').update({
                'last_login': datetime.now().isoformat(),
                'is_verified': True,
                'name': name,
                'student_class': student_class
            }).eq('phone_number', phone_number).execute()
            user_id = user_result.data[0]['id']
        else:
            # Create new user
            user = supabase.table('users').insert({
                'phone_number': phone_number,
                'name': name,
                'student_class': student_class,
                'is_verified': True,
                'last_login': datetime.now().isoformat()
            }).execute()
            user_id = user.data[0]['id']
        
        # Generate JWT token with name and class
        token = jwt.encode({
            'user_id': str(user_id),
            'phone_number': phone_number,
            'name': name,
            'student_class': student_class,
            'exp': datetime.utcnow() + timedelta(days=30)
        }, JWT_SECRET, algorithm='HS256')
        
        return {
            "success": True,
            "message": "Login successful",
            "token": token,
            "user": {
                "id": str(user_id),
                "phone_number": phone_number,
                "name": name,
                "student_class": student_class
            }
        }
        
    except Exception as e:
        print(f"❌ Error in verify_otp: {str(e)}")
        return {"success": False, "message": str(e)}


def verify_token(token: str):
    """Verify JWT token (handles both user and admin tokens)"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        
        # Check if it's an admin token
        if payload.get('is_admin'):
            return {
                "success": True,
                "username": payload.get('username'),
                "is_admin": True
            }
        
        # Regular user token
        return {
            "success": True, 
            "user_id": payload.get('user_id'), 
            "phone_number": payload.get('phone_number'),
            "name": payload.get('name', 'User'),
            "student_class": payload.get('student_class'),
            "is_admin": False
        }
    except jwt.ExpiredSignatureError:
        return {"success": False, "message": "Token expired"}
    except jwt.InvalidTokenError:
        return {"success": False, "message": "Invalid token"}


# Admin credentials (In production, store hashed passwords in database)
ADMIN_CREDENTIALS = {
    "admin": "hustlelearning2026",  # Change this password!
}


def verify_admin(username: str, password: str):
    """Verify admin credentials and return JWT token"""
    
    if username not in ADMIN_CREDENTIALS or ADMIN_CREDENTIALS[username] != password:
        return {"success": False, "message": "Invalid credentials"}
    
    # Generate admin JWT token
    token = jwt.encode({
        'username': username,
        'is_admin': True,
        'exp': datetime.utcnow() + timedelta(days=7)
    }, JWT_SECRET, algorithm='HS256')
    
    return {
        "success": True,
        "message": "Admin login successful",
        "token": token,
        "admin": {
            "username": username,
            "is_admin": True
        }
    }
