"use client"

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {signup, isUsernameAvailable} from "@/_actions/auth";

import { MoveRight, Loader2 } from "lucide-react"

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const signupFormSchema = z.object({
    email: z.string().email(),
    username: z.string()
            .min(3, { message: "Username must be at least 3 characters long" })
            .max(20, { message: "Username must not exceed 20 characters" })
            .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
            .refine(async (username)=>{
                const [isAvailable, error] = await isUsernameAvailable({username});
                return isAvailable;
            },"Username already taken"),
    password: z.string().min(8).max(50),
})

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {PasswordInput} from "./password-input";
import {NewUsernameInput} from "@/app/(auth)/components/new-user-input";



export function SignupForm() {

    const router = useRouter();

    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {

        const { email, username, password } = values;

        try {
            const [user, error] = await signup({ email, username, password });
            if(!error){
                router.push("/dashboard"); // Redirect to dashboard after signup
            }else{
                throw error
            }
        } catch (error) {
            console.error("Signup Error: ", error);
        }
    };

    return (
        <Card className="mx-auto max-w-md w-full">
            <CardHeader>
                <img className={"w-32"} src={"/logo.png"} alt="logo" />
                <CardTitle className="text-2xl font-bold">Create a Spaceship account</CardTitle>
                <CardDescription>
                    One step away from seamless content management
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="jhon@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <NewUsernameInput placeholder="jhondeo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder={"••••••••••••••"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your password must be at least 8 characters, and can’t begin or end with a space.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> // Spinner next to the button
                            )}
                            Sign Up
                        </Button>
                </form>
                </Form>
                <div className="mt-4 text-sm flex justify-center gap-2 items-center">
                    Already have a Spaceship account?{" "}
                    <Link href="/login" className="text-blue-500">
                        <div className={"flex gap-1 items-center font-bold"}>Log in<MoveRight className={"mt-0.5"} /></div>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
