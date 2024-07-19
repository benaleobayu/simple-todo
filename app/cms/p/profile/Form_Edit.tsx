import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useEffect, useState} from "react";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "sonner";

interface FormProps {
    id?: number,
    isEdit?: boolean;
}

enum Status {
    Inactive = '0',
    Active = '1',
}

const FormSchema = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters."}),
    username: z.string().min(3, {message: "Username must be at least 3 characters."}),
    email: z.string().email({message: "Please enter a valid email."}),
    status: z.nativeEnum(Status).default(Status.Inactive),
    password: z.string().optional()
});

export function Profile_Edit({id, isEdit = false}: FormProps) {
    const [datas, setDatas] = useState({name: "", username: "", email: "", status: Status.Inactive, password: ""});
    const [isLoading, setIsLoading] = useState(true);
    const host = process.env.NEXT_PUBLIC_API_HOST;

    useEffect(() => {
        if (isEdit) {
            axios.get(`${host}/api/users/data`, {
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
            email: datas.email,
            username: datas.username,
            name: datas.name,
            status: datas.status,
            password: ""
        },
    });

    useEffect(() => {
        if (!isLoading) {
            form.reset({
                email: datas.email,
                username: datas.username,
                name: datas.name,
                status: datas.status,
                password: datas.password
            });
        }
    }, [isLoading, datas, form]);

    if (isLoading) return <div>Loading...</div>;

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)

        const request = axios.put(`${host}/api/users/${id}`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        try {
            await request;
            toast.success(`User updated successfully!`);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data.error.message || "Something wrongs");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mb-16">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Input Category name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Input Category username" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Input the email" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => field.onChange(String(value))}
                                        value={field.value?.toString()}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Please select status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={String(Status.Inactive).toString()}>Inactive</SelectItem>
                                        <SelectItem value={String(Status.Active).toString()}>Active</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Input the password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="absolute bottom-5 left-5">{isEdit ? "Update" : "Create"}</Button>
            </form>
        </Form>
    );
}