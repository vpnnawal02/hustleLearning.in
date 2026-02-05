import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [adminToken, setAdminToken] = useState(null);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        // Check localStorage for admin token
        const storedToken = localStorage.getItem('admin_token');
        const storedAdmin = localStorage.getItem('admin_user');

        if (storedToken && storedAdmin) {
            setAdminToken(storedToken);
            setAdmin(JSON.parse(storedAdmin));
            setIsAdminLoggedIn(true);
        }
    }, []);

    const adminLogin = (adminData, token) => {
        setAdmin(adminData);
        setAdminToken(token);
        setIsAdminLoggedIn(true);
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify(adminData));
    };

    const adminLogout = () => {
        setAdmin(null);
        setAdminToken(null);
        setIsAdminLoggedIn(false);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    };

    return (
        <AdminContext.Provider value={{
            admin,
            adminToken,
            isAdminLoggedIn,
            adminLogin,
            adminLogout
        }}>
            {children}
        </AdminContext.Provider>
    );
};
