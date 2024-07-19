import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useTodoCategories from "@/hooks/useTodoCategories";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "sonner";

interface FormProps {
    id?: number,
    isEdit?: boolean,
    isCreate?: boolean,
    onActionCompleted: () => void
}

enum Status {
    Progress = '0',
    Completed = '1',
}

const FormSchema = z.object({
    name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
    description: z.string().optional(),
    category_id: z
        .number(),
    status: z.nativeEnum(Status).default(Status.Progress),
});

export function TodoForm({ id, isEdit = false, isCreate = false, onActionCompleted }: FormProps) {
    const [datas, setDatas] = useState({ name: "", description: "", category_id: null as number | null, status: Status.Progress });
    const [isLoading, setIsLoading] = useState(true);
    const host = process.env.NEXT_PUBLIC_API_HOST;
    const router = useRouter();

    const { listData, fetchData } = useTodoCategories();

    useEffect(() => {
        if (isEdit) {
            axios.get(`${host}/api/todos/${id}`, {
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
            category_id: datas.category_id ?? undefined,
            description: datas.description,
            name: datas.name,
            status: datas.status
        },
    });

    useEffect(() => {
        if (!isLoading) {
            form.reset({
                category_id: datas.category_id ?? undefined,
                description: datas.description,
                name: datas.name,
                status: datas.status
            });
        }
    }, [isLoading, datas, form]);

    if (isLoading) return <div>Loading...</div>;

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)

        const request = isCreate
            ? axios.post(`${host}/api/todos`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            : axios.put(`${host}/api/todos/${id}`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

        try {
            await request;
            toast.success(`${isCreate ? "Created" : "Updated"} successfully!`);
            router.push("/cms/todos");
            onActionCompleted();
        } catch (error : any) {
            console.error(error);
            toast.error(error.response.data.error.message);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mb-16">
                <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Please select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {listData && listData.map(item => (
                                            <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => field.onChange(String(value))} value={field.value?.toString()}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Please select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={String(Status.Progress).toString()}>Progress</SelectItem>
                                        <SelectItem value={String(Status.Completed).toString()}>Completed</SelectItem>
                                    </SelectContent>
                                </Select>
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