"use server"

import { createServerAction } from "zsa";
import z from "zod";
import { Resend } from 'resend';
import React from "react";

// Initialize the Resend client with the API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the Zod schema for the input
const sendEmailPropsSchema = z.object({
    emails: z.array(z.string().email()),
    content: z.custom<React.ReactNode>(),
    subject: z.string(),
});

// Create the server action for sending an email
export const sendEmail = createServerAction()
    .input(sendEmailPropsSchema)
    .handler(async ({ input }) => {
        const { emails, content, subject } = input;

        try {
            const { data, error } = await resend.emails.send({
                from: 'Spaceship CMS <no-reply@spaceship-cms.co>',
                to: emails,
                subject: subject,
                react: content,
            });

            return data;

        } catch (error) {
            throw error;
        }
    });
