'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/_actions/auth'; // Import your server action for logout
import { Loader2 } from 'lucide-react'; // Spinner icon
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            await logout(); // Call the logout server action

            // Redirect to the login page after successful logout
            router.push('/login');
        };

        handleLogout(); // Trigger logout on component mount
    }, [router]);

    // Render loading UI while the logout is happening
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="mx-auto max-w-md w-full">
                <CardHeader>
                    <img className="w-32" src="/logo.png" alt="logo" />
                    <CardTitle className="text-2xl font-bold">Logging Out</CardTitle>
                    <CardDescription>logging you out...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center">
                        <Loader2 className="animate-spin text-primary w-8 h-8" /> {/* Spinner animation */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
