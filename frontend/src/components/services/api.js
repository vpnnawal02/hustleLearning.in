import axios from 'axios';

// Single API URL constant
const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ===== AUTH API ===== //
export const authAPI = {
    sendOTP: async (phoneNumber, name, studentClass) => {
        try {
            const response = await api.post('/auth/send-otp', {
                phone_number: phoneNumber,
                name: name,
                student_class: studentClass
            });
            return response.data;
        } catch (error) {
            console.error('Send OTP Error:', error.response?.data || error.message);
            throw error;
        }
    },

    verifyOTP: async (phoneNumber, otpCode, name, studentClass) => {
        try {
            const response = await api.post('/auth/verify-otp', {
                phone_number: phoneNumber,
                otp_code: otpCode,
                name: name,
                student_class: studentClass
            });
            return response.data;
        } catch (error) {
            console.error('Verify OTP Error:', error.response?.data || error.message);
            throw error;
        }
    }
};

// ===== USER API ===== //
export const userAPI = {
    getProfile: async (token) => {
        try {
            console.log('📡 Fetching user profile...');
            const response = await api.get('/user/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response;
        } catch (error) {
            console.error('Get Profile Error:', error.response?.data || error.message);
            throw error;
        }
    },

    updateProfile: async (token, data) => {
        try {
            const response = await api.put('/user/profile', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response;
        } catch (error) {
            console.error('Update Profile Error:', error.response?.data || error.message);
            throw error;
        }
    },

    uploadProfilePicture: async (token, file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/user/profile/picture', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            console.error('Upload Picture Error:', error.response?.data || error.message);
            throw error;
        }
    },

    getActivity: async (token) => {
        try {
            const response = await api.get('/user/activity', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response;
        } catch (error) {
            console.error('Get Activity Error:', error.response?.data || error.message);
            throw error;
        }
    }
};

// ===== NOTES API ===== //
export const notesAPI = {
    download: async (noteId, token) => {
        try {
            const response = await api.get(`/notes/download/${noteId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success && response.data.download_url) {
                // Open PDF in new tab
                window.open(response.data.download_url, '_blank');
                return response.data;
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Download Error:', error.response?.data || error.message);
            alert(`Download failed: ${error.response?.data?.detail || error.message}`);
            throw error;
        }
    }
};

// ===== ADMIN API ===== //
export const adminAPI = {
    login: async (username, password) => {
        try {
            const response = await api.post('/admin/login', {
                username,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Admin Login Error:', error.response?.data || error.message);
            throw error;
        }
    },

    getUsers: async (token, filters = {}) => {
        try {
            console.log('📡 adminAPI.getUsers called with filters:', filters);

            // Remove empty filter values to avoid 422 error
            const cleanFilters = {};
            Object.keys(filters).forEach(key => {
                if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
                    cleanFilters[key] = filters[key];
                }
            });

            console.log('🧹 Cleaned filters:', cleanFilters);

            const response = await api.get('/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
                params: cleanFilters // Only send non-empty params
            });

            console.log('✅ adminAPI.getUsers response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Get Users Error:', error.response?.data || error.message);
            throw error;
        }
    },

    getStats: async (token) => {
        try {
            const response = await api.get('/admin/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Get Stats Error:', error.response?.data || error.message);
            throw error;
        }
    }
};

// Export axios instance for custom requests
export default api;
