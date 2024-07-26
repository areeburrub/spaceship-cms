"use client"

import {z} from "zod"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import {useServerAction} from "zsa-react"
import {addToWaitingList} from "@/_actions/addToWaitingList";
import {LoaderCircle} from "lucide-react";
import {ToastAction} from "@/components/ui/toast";
import {Link} from "@react-email/components";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

const waitingListFormSchema = z.object({
    email: z.string().email(),
    captchaToken : z.string()
})

export const WaitingListForm = () => {


    const {isPending, execute, data, error} = useServerAction(addToWaitingList)

    const {toast} = useToast()

    const form = useForm<z.infer<typeof waitingListFormSchema>>({
        resolver: zodResolver(waitingListFormSchema),
        defaultValues: {
            email: "",
            captchaToken: ""
        },
    })

    const turnstileRef = useRef(null);
    const [captchaToken, setCaptchaToken] = useState("");

    function resetCaptcha() {
        if (turnstileRef.current) {
            // @ts-ignore
            turnstileRef.current?.reset();
        }
    }

    function onExpire() {
        form.setValue('captchaToken','')
        // @ts-ignore
        turnstileRef.current?.reset();
    }

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof waitingListFormSchema>) {



        if (values.captchaToken !== "") {
            // @ts-ignore
            const [data, err] = await execute(values)

            if (err) {
                if(JSON.parse(err?.data).captchaError){
                    toast({
                        variant: "destructive",
                        title: "Failed to verify captcha.",
                        description: "Reload and try again.",
                    })
                    return
                }

                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with the request.",
                })
                return
            }

            if (data?.exist && data != null) {
                toast({
                    title: "You are already on the Waitlist",
                    description: `Follow me on 𝕏 (twitter) @areeburub for more updates`,
                    action: <Link href={"https://x.com/intent/follow?screen_name=areeburrub"}
                                  target={"_blank"}><ToastAction
                        altText="Follow">Follow</ToastAction></Link>
                })
            }

            if (!data?.exist && data != null) {
                toast({
                    title: "You are added to the Waitlist",
                    description: `Follow me on 𝕏 @areeburub for more updates`,
                    action: <Link href={"https://x.com/intent/follow?screen_name=areeburrub"}
                                  target={"_blank"}><ToastAction
                        altText="Follow">Follow</ToastAction></Link>
                })
            }

            // reset state of form
            resetCaptcha()
            form.reset()

        }else{
            toast({
                variant: "destructive",
                title: "Unusual behavior detected ⚠",
                description: "Please verify that you are not a robot",
            })
        }
    }


    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 items-center"
                onSubmit={form.handleSubmit(onSubmit)}
                // @ts-ignore
                onFocus={()=>{turnstileRef.current?.execute()}}
            >
                <div className="flex gap-2 items-start">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder={"Enter your Email"} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={"flex items-center gap-2"}>
                        Join Waitlist
                        <span>
                            {
                                isPending &&
                                <LoaderCircle className={"animate-spin"}/>
                            }
                        </span>
                    </Button>
                </div>
                <FormField
                    control={form.control}
                    name="captchaToken"
                    render={({field}) => (
                        <Turnstile
                            {...field}
                            className={"m-0 w-full"}
                            ref={turnstileRef}
                            siteKey={"0x4AAAAAAAf2YNG77W0hu5xp"}
                            onSuccess={(token: any) => {
                                form.setValue("captchaToken",token)
                            }}
                            // @ts-ignore
                            onError={(error: any) => toast({variant: "destructive", title: "Captcha Error", description: error.message})}
                            onExpire={onExpire}
                            options={{
                                refreshExpired: "auto",
                                appearance: "interaction-only",
                                theme: "light",
                                execution: "execute"
                            }}
                        />
                    )}

                />
            </form>
        </Form>
)
}