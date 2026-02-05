const API_BASE_URL = 'http://localhost:8000/api';

export const authAPI = {
    sendOTP: async (phoneNumber, name, studentClass) => {
        const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone_number: phoneNumber,
                name: name,
                student_class: studentClass
            })
        });
        return response.json();
    },

    verifyOTP: async (phoneNumber, otpCode, name, studentClass) => {
        const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone_number: phoneNumber,
                otp_code: otpCode,
                name: name,
                student_class: studentClass
            })
        });
        return response.json();
    },

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

// Admin API
export const adminAPI = {
    login: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        return response.json();
    },

    getUsers: async (token, filters = {}) => {
        const params = new URLSearchParams();

        if (filters.student_class) params.append('student_class', filters.student_class);
        if (filters.start_date) params.append('start_date', filters.start_date);
        if (filters.end_date) params.append('end_date', filters.end_date);
        if (filters.search) params.append('search', filters.search);

        const url = `${API_BASE_URL}/admin/users${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    },

    getStats: async (token) => {
        const response = await fetch(`${API_BASE_URL}/admin/stats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
};
