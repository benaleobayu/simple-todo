'use client'
import * as React from 'react';

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {CreateUpdateTodo} from "@/app/cms/todos/Modal_Form";
import {Button} from "@/components/ui/button";
import {FaCalendarCheck, FaLock, FaUndo} from "react-icons/fa";
import useUsers from "@/hooks/useUsers";
import {handleStatus} from "@/hooks/useUsers_status";
import {handlePassword} from "@/hooks/useUsers_password";
import {UserModal_Form} from "@/app/cms/a/users/Modal_Form";
import {UserModal_Delete} from "@/app/cms/a/users/Modal_Delete";

export default function Page() {
    const {listData, fetchData, isLoading} = useUsers()

    return (
        <>
            <div className="mx-auto w-[90%]">
                <UserModal_Form
                    isCreate={true}
                    onActionCompleted={fetchData}
                    className="mb-4 bg-blue-600 text-white"
                >
                    Add User
                </UserModal_Form>
                <Table>
                    <TableCaption>A list of users.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-slate-400">
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created_at</TableHead>
                            <TableHead>Updated_at</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">Loading...</TableCell>
                            </TableRow>
                        ) : (
                            listData.length > 0 && listData.map((item) => (
                                <TableRow key={item.id} className={`${item.status === "1" ? "bg-red-400" : ""}`}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.status === "1" ? "Not Active" : "Active"}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.created_at}</TableCell>
                                    <TableCell>{item.updated_at}</TableCell>
                                    <TableCell className="flex gap-2">
                                        {/* Edit Data */}
                                        <UserModal_Form id={item.id} onActionCompleted={fetchData} isEdit>
                                            Edit
                                        </UserModal_Form>

                                        {/* Change Status */}
                                        <Button
                                            onClick={() => handleStatus(item.id, item.status, fetchData)}
                                            className={`${item.status === '1' ? 'bg-green-500' : 'bg-red-500'}`}
                                        >
                                            {item.status === '1' ? <FaUndo/> : <FaCalendarCheck/>}
                                        </Button>

                                        {/* Change Password */}
                                        <UserModal_Form onActionCompleted={fetchData} isPassword>
                                            <FaLock/>
                                        </UserModal_Form>

                                        {/* Delete Data */}
                                        <UserModal_Delete id={item.id} onActionCompleted={fetchData}/>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

            </div>
        </>
    );
};
