"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios";
import {useState} from "react";
import {toast} from "sonner"


type Props = {
    id?: number
    onActionCompleted?: () => void
};

export function UserModal_Delete({id, onActionCompleted}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const host = process.env.NEXT_PUBLIC_API_HOST

    const handleDelete = async () => {
        try {
            await axios.delete(`${host}/api/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (onActionCompleted) {
                await onActionCompleted()
                toast.success("Deleted successfully!")
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data.error.message || "Something wrongs")
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="bg-red-600 text-white px-4 py-1 rounded-md">Delete</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure want to delete this data?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsModalOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
