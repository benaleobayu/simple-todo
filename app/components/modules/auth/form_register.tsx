"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import axios from "axios";

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {toast} from "@/components/ui/use-toast"
import {useRouter} from "next/navigation";

const FormSchema = z.object({
    name: z.string(),
    username: z.string().min(3, {
        message: "Username must be at least 2 characters.",
    }).max(20, {
        message: "Username must be at most 20 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export default function __FormRegister() {
    const Router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)

        const host = process.env.NEXT_PUBLIC_HOST

        axios.post(`${host}/api/register`, data , {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res.data)
                toast({
                    title: "Success",
                    description: "Register Success",
                })

                Router.push("/auth/login")

            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: "Error",
                    description: "Login Failed",
                })
            })

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="please enter your name" {...field} />
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
                                <Input placeholder="please enter your username" {...field} />
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
                                <Input type="email" placeholder="please enter your email" {...field} />
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
    )
}
