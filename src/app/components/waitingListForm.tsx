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

const waitingListFormSchema = z.object({
    email: z.string().email(),
})

export const WaitingListForm = () => {
    const {isPending, execute, data, error} = useServerAction(addToWaitingList)
    const {toast} = useToast()

    const form = useForm<z.infer<typeof waitingListFormSchema>>({
        resolver: zodResolver(waitingListFormSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof waitingListFormSchema>) {
        // @ts-ignore
        const [data, err] = await execute(values)

        if (err) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with the request.",
            })
        }

        if (data?.exist && data != null) {
            toast({
                title: "You are already on the Waitlist",
                description: `Follow me on 𝕏 (twitter) @areeburub for more updates`,
                action: <Link href={"https://x.com/intent/follow?screen_name=areeburrub"} target={"_blank"}><ToastAction
                    altText="Follow">Follow</ToastAction></Link>
            })
        }

        if (!data?.exist && data != null) {
            toast({
                title: "You are added to the Waitlist",
                description: `Follow me on 𝕏 @areeburub for more updates`,
                action: <Link href={"https://x.com/intent/follow?screen_name=areeburrub"} target={"_blank"}><ToastAction
                    altText="Follow">Follow</ToastAction></Link>
            })
        }
        console.log({values, data, err})
    }


    return (
        <Form {...form}>
            <form
                className="flex gap-2 items-start"
                onSubmit={form.handleSubmit(onSubmit)}
            >
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
            </form>
        </Form>
    )
}