"use server"

import z from "zod"
import {createServerAction, ZSAError} from "zsa"
import { sendEmail } from "@/utils/resend";
import prisma from "@/prisma"
import WaitingListEmailTemplate from "@/emailTemplates/waitingList";
import InternalEmailTemplate from "@/emailTemplates/internalMessages";
import {verifyCaptchaAction} from "@/_actions/verifyCaptcha";

export const addToWaitingList = createServerAction()
    .input(
        z.object({
            email: z.string().email(),
            captchaToken : z.string()
        })
    )
    .handler(async ({ input }) => {

        const [isCaptchaValid, captchaError] = await verifyCaptchaAction({token:input.captchaToken})

        if (!isCaptchaValid || captchaError) {
            throw new ZSAError(
                "FORBIDDEN",
                {message: "Invalid captcha", captchaError: true},
            )
        }

        try{
            const doesExist = await prisma.waitingList.findUnique({
                where:{
                    email: input.email
                }
            })

            if (doesExist) return {exist: true, email: input.email}

            const waitingListEntry = await prisma.waitingList.create({
                data:{
                    email : input.email
                }
            })

            const emailToVisitor = await sendEmail({
                emails : [input.email],
                subject : "Added to the Waitlist - Spaceship CMS",
                content : WaitingListEmailTemplate({email:input.email})
            })

            return {exist:false, email: input.email}
        }
        catch (err:any){
            const internalMessage = sendEmail({
                emails : ["areeburrub@gmail.com"],
                subject : "Internal Message - Spaceship CMS",
                content : InternalEmailTemplate(
                    {message: `There was an error while adding ${input.email} to waiting list. The error was : ${err?.message}`}
                )
            })
            throw new ZSAError(
                "INTERNAL_SERVER_ERROR",
                {...err, captchaError:false},
            )
        }
    })