import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { revokePasswordResetToken } from '@/_actions/auth';
import { notFound, redirect } from 'next/navigation';
import Link from "next/link";

interface RevokeResetTokenPageProps {
    params: {
        token: string;
    };
}

export default async function RevokeResetTokenPage({ params }: RevokeResetTokenPageProps) {
    const { token } = params;

    if (!token) {
        notFound();
    }

    try {
        // Call your revoke action
        const [success, error] = await revokePasswordResetToken({ token });

        if (!success) {
            throw new Error(error?.message || 'Failed to revoke the token');
        }

        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <Card className="mx-auto max-w-md w-full">
                    <CardHeader>
                        <img className="w-32" src="/logo.png" alt="logo" />
                        <CardTitle className="text-2xl font-bold">Revoke Reset Token</CardTitle>
                        <CardDescription>Token revoked successfully</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <p className="text-green-500 text-lg font-semibold">
                                The token has been successfully revoked!
                            </p>
                            <Link href={"/login"}>
                                <Button className="mt-4 w-full">
                                    Go to Login
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    } catch (error: any) {
        // Show error message if revoking fails
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <Card className="mx-auto max-w-md w-full">
                    <CardHeader>
                        <img className="w-32" src="/logo.png" alt="logo" />
                        <CardTitle className="text-2xl font-bold">Revoke Reset Token</CardTitle>
                        <CardDescription>Error revoking the token</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <p className="text-red-500 text-lg font-semibold">
                                {error.message || 'An unexpected error occurred.'}
                            </p>
                            <Button className="mt-4 w-full" onClick={() => redirect('/revoke-token')}>
                                Retry
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
