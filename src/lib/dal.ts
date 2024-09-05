import 'server-only'

import {cache} from 'react';
import { cookies } from 'next/headers'
import { decryptAccessToken } from '@/lib/session'
import {redirect} from "next/navigation";
import prisma from "@/prisma";
import {refreshAccessToken, storeTokens} from "@/_actions/token";
import {logout} from "@/_actions/auth";

export const verifySession = cache(async () => {
    // const accessToken = cookies().get('spaceship-access-token')?.value
    // let session;
    // if (!!accessToken) {
    //     session = await decryptAccessToken(accessToken)
    // }

    const accessToken = cookies().get('spaceship-access-token')?.value
    const refreshToken = cookies().get('spaceship-refresh-token')?.value;
    let session;
    if (!!accessToken || !!refreshToken) {
        session = await decryptAccessToken(accessToken)
        if (!session?.userId) {
            // If access token is invalid, attempt to use the refresh token
            const refreshToken = cookies().get('spaceship-refresh-token')?.value;
            if (refreshToken) {
                const [newAccessToken, error] = await refreshAccessToken({refreshToken});

                // If any error occur refreshing the access token user will be asked to log in again
                if(error){
                    await logout()
                }

                if (newAccessToken?.accessToken) {
                    // Decrypt the new access token
                    session = await decryptAccessToken(newAccessToken.accessToken);
                }
            }
        }
    }

    return { isAuth: !!session?.userId, userId: session?.userId }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const data = await prisma.user.findMany({
            where: {
                id : session.userId
            }
        })

        const user = data[0]

        return user
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})
