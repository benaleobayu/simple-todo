import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
    name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
    description: z.string().optional(),
});

interface FormProps {
    id?: number,
    isEdit?: boolean,
    isCreate?: boolean,
    onActionCompleted: () => void
}

export function TodoCategoryForm({ id, isEdit = false, isCreate = false, onActionCompleted }: FormProps) {
    const [datas, setDatas] = useState({ name: "", description: "" });
    const [isLoading, setIsLoading] = useState(true);
    const host = process.env.NEXT_PUBLIC_API_HOST;
    const router = useRouter();

    useEffect(() => {
        if (isEdit) {
            axios.get(`${host}/api/todos/categories/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => setDatas(response.data.data))
                .catch(console.error)
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [id, isEdit, host]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: datas.name,
            description: datas.description
        },
    });

    useEffect(() => {
        if (!isLoading) {
            form.reset({
                name: datas.name,
                description: datas.description
            });
        }
    }, [isLoading, datas, form]);

    if (isLoading) return <div>Loading...</div>;

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const request = isCreate
            ? axios.post(`${host}/api/todos/categories`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            : axios.put(`${host}/api/todos/categories/${id}`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

        try {
            await request;
            router.push("/cms/ms/todo-categories");
            onActionCompleted();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mb-16">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Input Category Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Input the description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="absolute bottom-5 left-5">{isEdit ? "Update" : "Create"}</Button>
            </form>
        </Form>
    );
}