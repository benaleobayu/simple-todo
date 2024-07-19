import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useEffect, useState} from "react";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
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
    password: z.string().min(6, {message: "password must be at least 6 characters."}),
    passwordConfirm: z.string().min(6, {message: "password must be at least 6 characters."}),

}).refine((data) => data.password === data.passwordConfirm, {
    message: "Password does not match",
    path: ["passwordConfirm"],
});

export function UserForm_UpdatePassword({id, isEdit = false, isCreate = false, onActionCompleted}: FormProps) {
    const [datas, setDatas] = useState({
        password: "",
        passwordConfirm: "",
    });
    const host = process.env.NEXT_PUBLIC_API_HOST;


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: '',
            passwordConfirm: ''
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)



        try {
            const res = await axios.patch(`${host}/api/users/${id}/password`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            toast.success(res.data.message);
            onActionCompleted();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response.data.error.message);
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
                                <Input type="password" placeholder="Input Category Name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password Confirm</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Input the description" {...field} />
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