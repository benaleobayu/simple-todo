import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


interface AuthState{
    accessToken: string | null;
    refreshToken: string | null;
}
const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState<AuthState>({ accessToken: null, refreshToken: null });

    useEffect(() => {
        const host = process.env.NEXT_PUBLIC_API_HOST;
        const refreshToken = async () => {
            try {
                const response = await axios.post(`${host}/auth/refresh`, {}, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
                    }
                });
                setAuth({ accessToken: response.data.access_token, refreshToken: localStorage.getItem('refresh_token') });
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        };

        refreshToken();
    }, []);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);