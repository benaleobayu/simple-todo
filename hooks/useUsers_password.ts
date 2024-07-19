import axios from "axios";
import {toast} from "sonner"

const host = process.env.NEXT_PUBLIC_API_HOST

export const handlePassword = async (id: number, fetchData: () => void) => {
    try {
        const res = await axios.patch(
            `${host}/api/users/${id}/password`,
            {password: 'password' },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
        if (res.status === 201) {
            toast.success("Password updated successfully")
            fetchData()
        }
    } catch (error: any) {
        console.error(error)
        toast.error("Error updating user password")
    }
}

