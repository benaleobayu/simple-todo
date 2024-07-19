// @flow
import * as React from 'react';
import axios from "axios";
import {useEffect} from "react";

type Categories = {
    id: number;
    name: string;
    description: string;
    status: string;
    category: {
        name: string
    };
    created_at: string;
    updated_at: string;
};
const useTodos = () => {
    const [listData, setListData] = React.useState<Categories[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const host = process.env.NEXT_PUBLIC_API_HOST

    const fetchData = async () => {
        try {
            const response = await axios.get(`${host}/api/todos?sort=updated_at&order=desc`, {
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

export default useTodos;