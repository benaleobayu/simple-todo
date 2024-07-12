'use client'
import * as React from 'react';
import {useEffect} from 'react';
import axios from "axios";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {Edit_TodoCategory} from "@/app/cms/ms/todo-categories/Edit-Category";

type Categories = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};
export default function Page() {
    const [listData, setListData] = React.useState<Categories[]>([])
    const host = process.env.NEXT_PUBLIC_HOST

    useEffect(() => {

        axios.get(`${host}/api/todos/categories`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        })
            .then((res) => {
                setListData(res.data.data)
                // console.log(res.data.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    console.log(host)

    return (
        <>
            <div className="mx-auto w-[90%]">
                <Table>
                    <TableCaption>A list of your todo categories.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-slate-400">
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Created_at</TableHead>
                            <TableHead>Updated_at</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {listData && listData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.created_at}</TableCell>
                                <TableCell>{item.updated_at}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Edit_TodoCategory id={item.id}>Edit</Edit_TodoCategory>
                                    <Button variant="destructive">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </>
    );
};
