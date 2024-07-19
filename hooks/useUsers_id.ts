// @flow
import {useEffect, useState} from 'react';
import axios from "axios";

type dataProps = {
    id: number;
    name: string;
    username: string;
    email: string;
    status: string;
    created_at: string;
    updated_at: string;
};
const useUsersId = () => {
    const [listData, setListData] = useState<dataProps[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const host = process.env.NEXT_PUBLIC_API_HOST

    const fetchData = async () => {
        try {
            const response = await axios.get(`${host}/api/users/data`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                withCredentials: true,
            });
            setListData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return {listData, fetchData, isLoading}
};

export default useUsersId;