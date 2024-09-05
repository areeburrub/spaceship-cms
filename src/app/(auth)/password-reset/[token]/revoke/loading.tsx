import { Loader2 } from 'lucide-react'; // Import the spinner icon from lucide-react
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Loading() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="mx-auto max-w-md w-full">
                <CardHeader>
                    <img className="w-32" src="/logo.png" alt="logo" />
                    <CardTitle className="text-2xl font-bold">Revoke Reset Token</CardTitle>
                    <CardDescription>Revoking your reset token...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center">
                        <Loader2 className="animate-spin text-primary w-8 h-8" /> {/* Spinner animation */}
                    </div>
                    <p className="text-center mt-4">Please wait while we revoke your reset token.</p>
                </CardContent>
            </Card>
        </div>
    );
}
