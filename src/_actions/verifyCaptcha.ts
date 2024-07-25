"use server"

import { createServerAction } from "zsa";
import z from "zod";

// Define the Zod schema for the input
const verifyCaptchaInputSchema = z.object({
    token: z.string(),  // CAPTCHA token from the client
});

// Define the CAPTCHA verification endpoint and secret
const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.CF_CAPTCHA_SECRET_KEY || "";

// Create the server action for CAPTCHA verification
export const verifyCaptchaAction = createServerAction()
    .input(verifyCaptchaInputSchema)
    .handler(async ({ input }) => {
        const { token } = input;

        try {
            // Make a POST request to verify the CAPTCHA token
            const res = await fetch(verifyEndpoint, {
                method: 'POST',
                body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
            });

            // Parse the response from Cloudflare
            const data = await res.json();
            console.log(data);

            if (!data.success) {
                throw "Failed to verify captcha.";
            }

            return data.success

        } catch (error) {
            console.error("CAPTCHA Error", error);

            throw error;
        }
    });
