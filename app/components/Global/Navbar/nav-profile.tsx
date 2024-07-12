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

export default function __NavProfile_() {
    const nav = useRouter()
    const host = process.env.NEXT_PUBLIC_HOST
    const handleLogout = () => {
        axios.post(`${host}/api/logout`, {
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
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
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    );
};