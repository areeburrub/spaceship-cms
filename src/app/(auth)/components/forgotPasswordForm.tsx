"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requestPasswordReset } from "@/_actions/auth"; // Import the action for password reset
import {MoveRight, CheckCircle, Loader2} from "lucide-react"; // Import the green tick icon
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const forgotPasswordFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export function ForgotPasswordForm() {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false); // Success state
    const [submittedEmail, setSubmittedEmail] = useState(""); // Store email for display

    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
        const { email } = values;

        try {
            const [success, error ] = await requestPasswordReset({ email });

            if (success) {
                setSubmittedEmail(email); // Store email
                setIsSubmitted(true); // Show success message
            } else {
                throw error;
            }
        } catch (error: any) {
            form.setError("email", { message: error.message });
        }
    };

    return (
        <Card className="mx-auto max-w-md w-full">
            <CardHeader>
                <img className={"w-32"} src={"/logo.png"} alt="logo" />
                <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
                <CardDescription>
                    {!isSubmitted ? "Enter your email to reset your password" : "Password Reset Sent"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!isSubmitted ? (
                    // Show the form if the email hasn't been submitted yet
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

                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> // Spinner next to the button
                                )}
                                Send Reset Link
                            </Button>
                        </form>
                    </Form>
                ) : (
                    // Show success message if email was submitted
                    <div className="text-center">
                        <CheckCircle className="text-green-500 mx-auto" size={48} />
                        <p className="mt-4 text-lg font-semibold">Check your email for the password reset link.</p>
                        <p className="mt-2 text-md font-bold">{submittedEmail}</p>
                        <Button className="mt-6 w-full" onClick={() => setIsSubmitted(false)}>
                            Reset another email
                        </Button>
                    </div>
                )}
                {!isSubmitted && (
                    <div className="mt-4 text-sm flex justify-center gap-2 items-center">
                        Remembered your password?{" "}
                        <Link href="/login" className="text-blue-500">
                            <div className={"flex gap-1 items-center font-bold"}>
                                Log in
                                <MoveRight className={"mt-0.5"} />
                            </div>
                        </Link>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
