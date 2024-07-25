"use server"

import {Resend} from 'resend';
import {ReactNode} from "react";

const resend = new Resend(process.env.RESEND_API_KEY);


interface sendEmailProps {
    emails: string[],
    content: ReactNode,
    subject: string,
}


export async function sendEmail({emails, content, subject}: sendEmailProps) {
    try {
        const {data, error} = await resend.emails.send({
            from: 'Spaceship CMS <no-reply@spaceship-cms.co>',
            to: emails,
            subject: subject,
            react: content,
        });

        if (error) {
            console.error("Sending email failed", error);
            return error;
        }

        console.log("Sending email", data);

        return data;

    } catch (error) {
        throw error;
    }
}
