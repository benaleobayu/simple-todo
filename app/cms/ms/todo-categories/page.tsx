'use client'
import * as React from 'react';
import {useEffect} from 'react';
import axios from "axios";

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {CreateUpdateTodoCategory} from "@/app/cms/ms/todo-categories/Modal_Form";
import {TodoCategoryDelete} from "@/app/cms/ms/todo-categories/Modal_Delete";
import useTodoCategories from "@/hooks/useTodoCategories";

type Categories = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};
export default function Page() {
    const {listData, fetchData} = useTodoCategories()

    return (
        <>
            <div className="mx-auto w-[90%]">
                <CreateUpdateTodoCategory
                    isCreate={true}
                    onActionCompleted={fetchData}
                    className="mb-4 bg-blue-600 text-white"
                >
                    Add Category
                </CreateUpdateTodoCategory>
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
                                    <CreateUpdateTodoCategory id={item.id} onActionCompleted={fetchData} isEdit={true}>Edit
                                    </CreateUpdateTodoCategory>
                                    <TodoCategoryDelete id={item.id} onActionCompleted={fetchData}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </>
    );
};
