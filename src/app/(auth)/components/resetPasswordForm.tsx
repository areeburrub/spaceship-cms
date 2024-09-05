'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { resetPassword } from '@/_actions/auth'; // Import your reset password action
import { PasswordInput } from './password-input'; // Custom PasswordInput component

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Loader2} from "lucide-react";

// Define the schema for form validation using Zod
const resetPasswordFormSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(50, { message: 'Password must not exceed 50 characters' }),
});

export default function ResetPasswordForm({token}:{ token: string }) {

    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false); // Track if password reset was successful
    const [errorMessage, setErrorMessage] = useState(''); // Track errors


    // Form setup using React Hook Form
    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            password: '',
        },
    });

    // Handle form submission
    const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
        const { password } = values;

        if (!token) {
            setErrorMessage('Reset token is missing.');
            return;
        }

        try {
            const [success, error] = await resetPassword({ resetToken: token, newPassword: password });

            if (success) {
                setIsSuccess(true); // If successful, show the success message
                setErrorMessage('');
            } else {
                throw error;
            }
        } catch (error: any) {
            setErrorMessage(error.message || 'An error occurred while resetting the password.');
        }
    };

    return (
        <Card className="mx-auto max-w-md w-full">
            <CardHeader>
                <img className="w-32" src="/logo.png" alt="logo" />
                <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                <CardDescription>
                    {isSuccess ? 'Password reset successful' : 'Enter a new password'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isSuccess ? (
                    <div className="text-center">
                        <p className="text-green-500 text-lg font-semibold">Your password has been reset!</p>
                        <Button className="mt-4 w-full" onClick={() => router.push('/login')}>
                            Go to Login
                        </Button>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="••••••••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> // Spinner next to the button
                                )}
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                )}
            </CardContent>
        </Card>
    );
}
