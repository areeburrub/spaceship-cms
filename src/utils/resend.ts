"use server"

import { createServerAction } from "zsa";
import z from "zod";
import { Resend } from 'resend';

// Initialize the Resend client with the API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the Zod schema for the input
const sendEmailPropsSchema = z.object({
    emails: z.array(z.string().email()),
    content: z.custom<React.ReactNode>(
        e => (e as any)?.$$typeof === Symbol.for("react.element"),
        "value must be a React Element"
    ),
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

            console.log("Email sent successfully", data);
            return data;

        } catch (error) {
            console.error("Sending email failed", error);
            throw error;
        }
    });
