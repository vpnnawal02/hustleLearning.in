const API_BASE_URL = 'http://localhost:8000/api';

export const authAPI = {
    // Send OTP to phone number
    sendOTP: async (phoneNumber, name) => {
        const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone_number: phoneNumber,
                name: name
            })
        });
        return response.json();
    },

    // Verify OTP and login
    verifyOTP: async (phoneNumber, otpCode, name) => {
        const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone_number: phoneNumber,
                otp_code: otpCode,
                name: name
            })
        });
        return response.json();
    },

    // Download note (requires authentication)
    downloadNote: async (noteId, token) => {
        const response = await fetch(`${API_BASE_URL}/notes/download/${noteId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    },

    // Get user profile
    getUserProfile: async (token) => {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
};
