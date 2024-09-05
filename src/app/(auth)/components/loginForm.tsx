"use client"

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/_actions/auth";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Loader2, MoveRight} from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {PasswordInput} from "@/app/(auth)/components/password-input";

// Define schema for the login form using zod
const loginFormSchema = z.object({
    identifier: z.string().min(1, { message: "Username or Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            identifier: "",
            password: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        const { identifier, password } = values;

        try {
            const tokens = await login({ identifier, password });
            console.info(tokens);
            router.push("/dashboard"); // Redirect to dashboard after login
        } catch (error) {
            console.error("Login Error: ", error);
        }
    };

    return (
        <Card className="mx-auto max-w-md w-full">
            <CardHeader>
                <img className={"w-32"} src={"/logo.png"} alt="logo" />
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>
                    Log in to continue to Spaceship CMS
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username or Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username or email" {...field} />
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
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                        <Link href="/forgot-password" className="text-sm underline">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="••••••••••••••"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> // Spinner next to the button
                            )}
                            Log in
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-sm flex justify-center gap-2 items-center">
                    New to Spaceship CMS?{" "}
                    <Link href="/signup" className="text-blue-500">
                        <div className={"flex gap-1 items-center font-bold"}>
                            Get Started
                            <MoveRight className={"mt-0.5"} />
                        </div>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
