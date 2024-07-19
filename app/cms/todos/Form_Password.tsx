import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

interface FormProps {
    id?: number,
    isPassword?: boolean,
    onActionCompleted: () => void
}


const FormSchema = z.object({
    password: z.string().min(6, {message: "Password must min 6 characters."}),
    confirmPassword: z.string().min(6, {message: "Password must min 6 characters."}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
});

export function TodoForm_Password({id, isPassword=false, onActionCompleted}: FormProps) {
    const [datas, setDatas] = useState({password: ""});
    const [isLoading, setIsLoading] = useState(true);
    const host = process.env.NEXT_PUBLIC_API_HOST;
    const router = useRouter();


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        setIsLoading(false)
    }, []);

    if (isLoading) return <div>Loading...</div>;

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
        if (isPassword) {
            try {
                const res = axios.put(`${host}/api/todos/${id}`, data, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                toast.success("Password updated successfully")
                router.push("/cms/todos");
                onActionCompleted();
            } catch (error: any) {
                console.error(error);
                toast.error(error.response.data.error.message);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mb-16">
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Input Category Name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="absolute bottom-5 left-5">Update</Button>
            </form>
        </Form>
    );
}