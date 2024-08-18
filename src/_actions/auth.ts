"use server"

import {createServerAction} from "zsa";
import z from "zod";

import prisma from "@/prisma";
import {comparePassword, hashPassword} from "@/utils/auth";
import {encryptAccessToken, encryptRefreshToken} from "@/lib/session";
import {storeTokens} from "@/_actions/token";
import {revokeSession, saveSessionOnRedis} from "@/lib/redis";
import { v4 as uuidv4 } from 'uuid';
import {cookies} from "next/headers"


export const signup = createServerAction()
    .input(
        z.object({
            email: z.string().email(),
            username: z.string().min(3),
            password: z.string().min(6),
        })
    )
    .output(z.object({
        userId: z.string(),
    }))
    .handler(async ({input}) => {
        const {email, username, password} = input;

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{email}, {username}]
            }
        });

        if (existingUser) {
            throw new Error("User already exists.");
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create the user
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });

        return {userId: user.id};
    });



export const login = createServerAction()
    .input(
        z.object({
            identifier: z.string(), // Email or username
            password: z.string().min(6),
        })
    )
    .output(
        z.object({
            status: z.boolean(),
        })
    )
    .handler(async ({input}) => {
        const {identifier, password} = input;

        // Find user by email or username
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {email: identifier},
                    {username: identifier},
                ],
            },
        });

        if (!user || !(await comparePassword(password, user.password))) {
            throw new Error("Invalid credentials.");
        }

        //create a session id
        const sessionId = uuidv4();

        // Generate tokens using jose with different keys
        const accessToken = await encryptAccessToken({userId:user.id});
        const refreshToken = await encryptRefreshToken({sessionId});

        // Create a new session
        const session = await prisma.session.create({
            data: {
                id: sessionId,
                userId: user.id,
                refreshToken,
                accessToken
            },
        });

        await saveSessionOnRedis(session)

        // Store the tokens as cookies
        await storeTokens({token: accessToken, refresh_token: refreshToken});

        return {status:true};
    });


export const logout = createServerAction()
    .handler(async ()=>{
        try{
            // Get cookies
            const refreshToken = cookies().get('spaceship-refresh-token')?.value;

            if (!refreshToken) {
                throw new Error("No refresh token found.");
            }

            // Find the session associated with the refresh token
            const session = await prisma.session.findUnique({
                where: { refreshToken },
            });

            if (session) {
                // Delete the session from the database
                await prisma.session.delete({
                    where: { id: session.id },
                });

                // Delete the session from Redis
                await revokeSession(session.id);
            }

            // Delete the cookies
            cookies().delete('spaceship-access-token');
            cookies().delete('spaceship-refresh-token');

        }catch (e){
            console.error(e)
        }
    })