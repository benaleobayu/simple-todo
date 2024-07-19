'use client'

import * as React from 'react';
import axios from "axios";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function __NavProfile_() {
    const nav = useRouter()
    const host = process.env.NEXT_PUBLIC_API_HOST
    const handleLogout = () => {
        axios.post(`${host}/auth/logout`, {
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('refresh_token')
            })
            .catch((err) => {
                console.log(err)
            })
        nav.push('/auth/login')

    }


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="avatar bg-red-600 w-8 aspect-square rounded-full flex justify-center items-center">
                        B
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <Link href={'/cms/p/profile'}>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    );
};