"use server"

import {createServerAction} from "zsa";
import z from "zod";

import prisma from "@/prisma";
import {comparePassword, hashPassword} from "@/utils/auth";
import {encryptAccessToken, encryptRefreshToken} from "@/lib/session";
import {storeTokens} from "@/_actions/token";
import {getUserIdByResetToken, revokeResetToken, revokeSession, saveResetToken, saveSessionOnRedis} from "@/lib/redis";
import {v4 as uuidv4} from 'uuid';
import {cookies} from "next/headers"
import {sendEmail} from "@/utils/resend";
import PasswordResetEmailTemplate from "@/emailTemplates/resetPassword";


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
        const accessToken = await encryptAccessToken({userId: user.id});
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

        return {status: true};
    });


export const logout = createServerAction()
    .handler(async () => {
        try {
            // Get cookies
            const refreshToken = cookies().get('spaceship-refresh-token')?.value;

            if (!refreshToken) {
                throw new Error("No refresh token found.");
            }

            // Find the session associated with the refresh token
            const session = await prisma.session.findUnique({
                where: {refreshToken},
            });

            if (session) {
                // Delete the session from the database
                await prisma.session.delete({
                    where: {id: session.id},
                });

                // Delete the session from Redis
                await revokeSession(session.id);
            }

            // Delete the cookies
            cookies().delete('spaceship-access-token');
            cookies().delete('spaceship-refresh-token');

        } catch (e) {
            throw e
        }
    })

export const isUsernameAvailable = createServerAction()
    .input(z.object({
        username: z.string().min(2).max(15)
    }))
    .output(
        z.boolean()
    )
    .handler(async ({input}) => {
        try {
            const data = await prisma.user.findFirst({
                where: {
                    username: input.username
                }
            })

            return data == null
        } catch (e) {
            throw e
        }
    })


export const requestPasswordReset = createServerAction()
    .input(
        z.object({
            email: z.string().email(),
        })
    )
    .output(z.object({success: z.boolean()}))
    .handler(async ({input}) => {
        const {email} = input;

        // Check if user exists
        const user = await prisma.user.findFirst({where: {email}});
        if (!user) {
            throw new Error("User not found.");
        }

        // Generate reset token
        const resetToken = uuidv4();

        // Store reset token in Redis
        await saveResetToken(resetToken, user.id);

        // Generate reset link
        const resetLink = `${process.env.PUBLIC_URL}/password-reset/${resetToken}`;
        const revokeLink = `${process.env.PUBLIC_URL}/password-reset/${resetToken}/revoke`;

        // Send reset email
        await sendEmail({
            emails: [email],
            subject: "Password Reset Request - Spaceship CMS",
            // @ts-ignore
            content: PasswordResetEmailTemplate({resetLink, revokeLink}), // Use the email template
        });

        return {success: true};
    });

export const resetPassword = createServerAction()
    .input(
        z.object({
            resetToken: z.string(),
            newPassword: z.string().min(6),
        })
    )
    .output(z.object({success: z.boolean()}))
    .handler(async ({input}) => {
        const {resetToken, newPassword} = input;

        // Retrieve user ID from Redis using the reset token
        const userId = await getUserIdByResetToken(resetToken);

        if (!userId) {
            throw new Error("Invalid or expired reset token.");
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);

        // Update the user's password in the database
        await prisma.user.update({
            where: {id: userId},
            data: {password: hashedPassword},
        });

        // Remove the reset token from Redis after successful reset
        await revokeResetToken(resetToken);

        return {success: true};
    });

export const revokePasswordResetToken = createServerAction()
    .input(
        z.object({
            token: z.string(), // Token is required as input
        })
    )
    .output(z.object({ success: z.boolean() })) // We only need to return success
    .handler(async ({ input }) => {
        try{
            const { token } = input;
            await revokeResetToken(token);
            return { success: true };
        }catch(e){
            throw new Error("Error Occurred while revoke password reset token.");
        }
    });
