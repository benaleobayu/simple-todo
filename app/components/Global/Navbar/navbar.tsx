'use client'
import * as React from 'react';
import {useEffect} from 'react';
import {getUserFromLocalStorage} from "@/utils/jwt";
import __NavProfile_ from "@/app/components/Global/Navbar/nav-profile";
import axios from "axios";
import {useRouter} from "next/navigation";
import {toast} from "sonner"


interface User {
    sub: {
        name: string
    }
}

export default function __Navbar_() {
    const [user, setUser] = React.useState<User | null>(null)

    const router = useRouter()

    useEffect(() => {
        const storedUser = getUserFromLocalStorage()
        setUser(storedUser)
    }, [])

    useEffect(() => {
        const host = process.env.NEXT_PUBLIC_API_HOST
        const refreshToken = async () => {
            try {
                const res = await axios.post(`${host}/auth/refresh`, {}, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
                    }
                });
            } catch (error: any) {
                console.error('Error refreshing access token:', error);
                if (error.response.status === 422) {
                    router.push('/auth/login')
                    toast.error("Session expired!")
                }
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