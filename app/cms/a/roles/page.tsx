'use client'
import * as React from 'react';

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import useTodos from "@/hooks/useTodos";
import {CreateUpdateTodo} from "@/app/cms/todos/Modal_Form";
import {DeleteTodo} from "@/app/cms/todos/Modal_Delete";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {toast} from "sonner";
import { FaCalendarCheck, FaUndo } from "react-icons/fa";

export default function Page() {
    const {listData, fetchData} = useTodos()
    const host = process.env.NEXT_PUBLIC_API_HOST;

    const handleStatus = async (id: number, currentStatus: string) => {
        const newStatus = currentStatus === "0" ? "1" : "0";
        try {
            const res = await axios.patch(
                `${host}/api/todos/${id}/status`,
                {status: newStatus},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })
            if (res.status === 201) {
                toast.success("Status updated successfully")
                fetchData()
            }
            console.log(res)
        } catch (error: any) {
            console.error(error)
            toast.error(error.response.data.error.message)
        }
    }

    return (
        <>
            <div className="mx-auto w-[90%]">
                <CreateUpdateTodo
                    isCreate={true}
                    onActionCompleted={fetchData}
                    className="mb-4 bg-blue-600 text-white"
                >
                    Add Todos
                </CreateUpdateTodo>
                <Table>
                    <TableCaption>A list of your todo categories.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-slate-400">
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Created_at</TableHead>
                            <TableHead>Updated_at</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {listData.length > 0 && listData.map((item) => (
                            <TableRow key={item.id} className={`${item.status === "1" ? "bg-green-200" : ""}`}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.status === "1" ? "Completed" : "Progress"}</TableCell>
                                <TableCell>{item.category.name}</TableCell>
                                <TableCell>{item.created_at}</TableCell>
                                <TableCell>{item.updated_at}</TableCell>
                                <TableCell className="flex gap-2">
                                    <CreateUpdateTodo id={item.id} onActionCompleted={fetchData} isEdit={true}>
                                        Edit
                                    </CreateUpdateTodo>
                                    <Button
                                        onClick={() => handleStatus(item.id, item.status)}
                                        className={`${item.status === '1' ? 'bg-red-500' : 'bg-green-500'}`}
                                    >
                                        {item.status === '1' ? <FaUndo/> : <FaCalendarCheck />}
                                    </Button>
                                    <DeleteTodo id={item.id} onActionCompleted={fetchData}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </>
    );
};
