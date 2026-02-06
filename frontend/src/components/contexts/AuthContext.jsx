import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {

        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user_data');
        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(parsedUser);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('❌ Failed to parse user data:', error);
                // Clear corrupted data
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
            }
        } else {
            console.log('⚠️ No stored credentials found');
        }

        setLoading(false);
    }, []);

    const login = (userData, authToken) => {

        setUser(userData);
        setToken(authToken);
        setIsLoggedIn(true);

        // Store in localStorage
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('user_data', JSON.stringify(userData));
    };

    const logout = () => {

        setUser(null);
        setToken(null);
        setIsLoggedIn(false);

        // Clear localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
    };

    const value = {
        isLoggedIn,
        user,
        token,
        login,
        logout,
        loading
    };

    // Don't render children until loading is complete
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mx-auto"></div>
                    <p className="text-gray-400 mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
