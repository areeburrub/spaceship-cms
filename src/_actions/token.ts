"use server"

import {createServerAction} from "zsa";
import z from "zod";
import {cookies} from "next/headers"
import {decryptAccessToken, decryptRefreshToken, encryptAccessToken} from "@/lib/session";
import prisma from "@/prisma";
import {getSession} from "@/lib/redis";
import {JWTPayload} from "jose";
import {logout} from "@/_actions/auth";


export const storeTokens = createServerAction()
    .input(z.object({
        token: z.string(),
        refresh_token: z.string()
    }))
    .handler(async ({input}) => {
        try {
            cookies().set({
                name: "spaceship-access-token",
                value: input.token,
                httpOnly: true,
                sameSite: "strict",
                expires: new Date(Date.now() + 15 * 60 * 1000), // 15 Minute
                secure: true,

            })

            cookies().set({
                name: "spaceship-refresh-token",
                value: input.refresh_token,
                httpOnly: true,
                sameSite: "strict",
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 Days
                secure: true,
            })
        } catch (error) {
            console.error("Server Error: ", error);
            throw error;
        }
    });

export const refreshAccessToken = createServerAction()
    .input(z.object({
        refreshToken: z.string(),
    }))
    .output(z.object({
        accessToken: z.string().optional()
    }))
    .handler(async ({ input }) => {
        try {
            // Decrypt the refresh token
            const refreshTokenPayload = await decryptRefreshToken(input.refreshToken);

            if (!refreshTokenPayload || !refreshTokenPayload.sessionId) {
                throw new Error("Invalid refresh token");
            }

            // Check if the session with this refresh token exists in the database
            // const session = await prisma.session.findUnique({
            //     where: {
            //         refreshToken: input.refreshToken,
            //     },
            // });

            const session = await getSession(refreshTokenPayload.sessionId)

            if (!session) {
                throw new Error("Invalid session or refresh token");
            }

            // Generate a new access token
            const newAccessToken = await encryptAccessToken({userId:session.userId});

            return {
                accessToken: newAccessToken,
            };
        } catch (error) {
            console.error("Error refreshing access token:", error);
            throw error
        }
    });
