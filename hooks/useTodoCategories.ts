// @flow
import * as React from 'react';
import axios from "axios";
import {useEffect} from "react";

type Categories = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};
const UseTodoCategories = () => {
    const [listData, setListData] = React.useState<Categories[]>([])
    const host = process.env.NEXT_PUBLIC_API_HOST

    const fetchData = async () => {
        try {
            const response = await axios.get(`${host}/api/todos/categories?sort=updated_at&order=desc`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                withCredentials: true,
            });
            setListData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return {listData, fetchData}
};

export default UseTodoCategories;