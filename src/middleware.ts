import {NextRequest, NextResponse} from 'next/server';
import {decryptAccessToken} from '@/lib/session';
import {cookies} from 'next/headers';
import {refreshAccessToken} from "@/_actions/token";

// Specify protected and public routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
    // Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    let session; // null variable to store session if tokens are valid
    const response = NextResponse.next()

    // Attempt to decrypt the access token from the cookie
    const accessToken = cookies().get('spaceship-access-token')?.value;
    session = await decryptAccessToken(accessToken);
    if (!session?.userId) {
        // If access token is invalid, attempt to use the refresh token
        const refreshToken = cookies().get('spaceship-refresh-token')?.value;
        if (refreshToken) {
            const [newAccessToken, error] = await refreshAccessToken({refreshToken});

            if (newAccessToken?.accessToken) {

                // await storeTokens({token:newAccessToken.accessToken, refresh_token:refreshToken})

                response.cookies.set('spaceship-access-token', newAccessToken.accessToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    expires: new Date(Date.now() + 10 * 1000), // 10 Seconds
                    // secure: true,
                });

                response.cookies.set('spaceship-refresh-token', refreshToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 Days
                    // secure: true,
                });

                // Decrypt the new access token
                session = await decryptAccessToken(newAccessToken.accessToken);

            }
        }
    }



    // Redirect to /login if the user is not authenticated and route is protected
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Redirect to /dashboard if the user is authenticated and on a login page
    if (path == "/login" && session?.userId && !req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return response;
}

// Routes Middleware should not run on
export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|.*\\.png$).*)',
            missing: [
                {type: "header", key: "next-router-prefetch"},
                {type: "header", key: "next-action"},
                {type: "header", key: "purpose", value: "prefetch"},
            ],

        }
    ]
};
