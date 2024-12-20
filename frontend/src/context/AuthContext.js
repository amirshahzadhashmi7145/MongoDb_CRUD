import React, { createContext, useState, useEffect } from 'react';
import { checkSession, logout } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await checkSession();
                if (response.loggedIn) {
                    setUser(response.user);
                }
            } catch (err) {
                console.error('Error checking session:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    const logoutUser = async () => {
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
