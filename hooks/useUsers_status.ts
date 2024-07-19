import axios from "axios";
import {toast} from "sonner"

const host = process.env.NEXT_PUBLIC_API_HOST

export const handleStatus = async (id: number, currentStatus: string, fetchData: () => void) => {
    const newStatus = currentStatus === "0" ? "1" : "0";
    try {
        const res = await axios.patch(
            `${host}/api/users/${id}/status`,
            {status: newStatus},
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
        if (res.status === 201) {
            if (currentStatus === "1") {
                toast.success("User activated successfully")
            } else {
                toast.success("User deactivated successfully")
            }
            fetchData()
        }
    } catch (error: any) {
        console.error(error)
        toast.error("Error updating user status")
    }
}

