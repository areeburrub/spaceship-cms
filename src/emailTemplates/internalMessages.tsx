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
    message: string;
}

function calcTime(offset:number) {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000*offset));
    return nd.toLocaleString();
}

const InternalEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                              message
                                                                          }) => (
        <Html>
            <Head/>
            <Preview>
                {message}
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
                        <p className="mt-4 text-gray-700">
                            Time : {calcTime(5.5) } {/*OFFSET TO IST*/}
                            {message}
                        </p>
                    </div>
                </Body>
            </Tailwind>
        </Html>
    )
;


export default InternalEmailTemplate