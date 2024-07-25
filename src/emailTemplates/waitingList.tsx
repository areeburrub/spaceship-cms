import * as React from 'react';

import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";

interface EmailTemplateProps {
    email: string;
}

const WaitingListEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                              email
                                                                          }) => (
        <Html>
            <Head/>
            <Preview>
                Thank you for joining the Spaceship CMS waiting list! Follow me on Twitter @areeburrub for updates on the
                development.

                From,
                Areeb ur Rub
            </Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans leading-normal tracking-normal">
                    <div className="mx-auto mt-10 max-w-lg bg-white p-6 shadow-md border-gray-400 border">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <Link href="https://spaceship-cms.co" className="text-orange-500 underline">
                                <img alt={"Spaceship CMS Logo"} src="https://spaceship-cms.co/logo.png" className="h-14 rounded-lg" itemProp="Spaceship CMS Logo"
                                 title="Spaceship CMS Logo"/>
                            </Link>
                        </div>
                        <Hr/>
                        <h1 className="text-2xl font-bold text-gray-900">You are added to the Waitlist</h1>
                        <p className="mt-4 text-gray-700">
                            I am excited to have you onboard as I continue developing this project. I&apos;m working hard to
                            ensure Spaceship CMS makes managing content for Astro website a lot easier.
                        </p>

                        <p className="mt-4 text-gray-700">In the meantime, you can stay updated with the progress by
                            following
                            me on Twitter. I share updates about Spaceship CMS on 𝕏 (formerly Twitter).</p>


                        <p className="mt-4 text-gray-700">
                            Thank you for your interest and support. I can’t wait to share Spaceship CMS with you!
                        </p>

                        <p className="mt-4 text-gray-700">
                            From,<br/>Areeb ur Rub
                        </p>
                        <Hr/>
                        <p className="text-gray-700 pt-2">
                            Follow me on 𝕏 : <Link href="https://twitter.com/areeburrub"
                                                className="text-orange-500 underline">@areeburrub</Link>
                        </p>

                    </div>
                </Body>
            </Tailwind>
        </Html>
    )
;


export default WaitingListEmailTemplate