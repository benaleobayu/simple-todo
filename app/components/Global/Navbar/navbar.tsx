'use client'
import * as React from 'react';
import {getUserFromLocalStorage, saveRefreshTokenToLocalStorage} from "@/utils/jwt";
import __NavProfile_ from "@/app/components/Global/Navbar/nav-profile";
import {useEffect} from "react";
import axios from "axios";
import {useAuth} from "@/utils/auth/AuthProvider";


interface User{
    sub:{
        name: string
    }
}
export default function __Navbar_() {
    const [user, setUser] = React.useState<User | null>(null)
    const host = process.env.NEXT_PUBLIC_HOST

    useEffect(()=> {
        const storedUser = getUserFromLocalStorage()
        setUser(storedUser)
    },[])

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/refresh', {}, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
                    }
                });
                // console.log('New access token:', response.data.access_token);
            } catch (error) {
                console.error('Error refreshing access token:', error);
            }
        };

        refreshToken();
    }, []);


    return (
        <nav>
            <div className="w-full h-12 flex justify-between items-center px-8 shadow">
                <p>Logo</p>
                <div className="flex gap-2 items-center">
                    {user && user ? (
                        <>
                            {user.sub.name}
                        </>
                    ) : 'helo'}
                    <__NavProfile_/>
                </div>
            </div>
        </nav>
    );
};