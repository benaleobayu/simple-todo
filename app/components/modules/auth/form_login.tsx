"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import axios from "axios";

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useRouter} from "next/navigation";
import {saveRefreshTokenToLocalStorage, saveTokenToLocalStorage} from "@/utils/jwt";
import {toast} from "sonner";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export default function __FormLogin() {
    const Router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const host = process.env.NEXT_PUBLIC_API_HOST

            const res = await axios.post(`${host}/auth/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const token = res.data

            const userName = localStorage.getItem('user'); // Async retrieval of user.name

            saveTokenToLocalStorage(token.access_token)
            saveRefreshTokenToLocalStorage(token.refresh_token)

            if (userName) {
                toast.success(`Welcome back ${userName['sub']['name']}!`);
            } else {
                toast.success(`Welcome back!`);
            }

            Router.push("/cms/todos")
        } catch (error: any) {
            console.log(error)

            toast.error(error?.response?.data.error.message || "Something wrongs")
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="please enter your username" {...field} />
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
                                    <Input type="password" placeholder="please enter your password" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}
