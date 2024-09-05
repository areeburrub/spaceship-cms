import * as React from 'react';
import {
    Body,
    Button,
    Head,
    Hr,
    Html,
    Link,
    Preview,
    Tailwind,
} from "@react-email/components";

interface PasswordResetEmailProps {
    resetLink: string;
    revokeLink: string;
}

const PasswordResetEmailTemplate: React.FC<Readonly<PasswordResetEmailProps>> = ({
                                                                                     resetLink ,
                                                                                     revokeLink
                                                                                 }) => {

    return (
        <Html>
            <Head />
            <Preview>
                Reset your password for Spaceship CMS. Follow the link to reset your password securely.
            </Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans leading-normal tracking-normal">
                    <div className="mx-auto mt-10 max-w-lg bg-white p-6 shadow-md border-gray-400 border">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <Link href="https://spaceship-cms.co" className="text-orange-500 underline">
                                <img
                                    alt={"Spaceship CMS Logo"}
                                    src="https://spaceship-cms.co/logo.png"
                                    className="h-14 rounded-lg"
                                    title="Spaceship CMS Logo"
                                />
                            </Link>
                        </div>
                        <Hr />

                        <h1 className="text-2xl font-bold text-gray-900">Password Reset Request</h1>

                        <p className="mt-4 text-gray-700">
                            We received a request to reset your password for your Spaceship CMS account. If you didn&apos;t make this request, you can safely ignore this email.
                        </p>

                        <p className="mt-4 text-gray-700">
                            To reset your password, please click the button below:
                        </p>

                        <div className="mt-6 text-center">
                            <Link href={resetLink}>
                                <Button className="bg-orange-500 text-white py-4 px-4 rounded-lg font-bold">
                                    Reset Your Password
                                </Button>
                            </Link>
                        </div>

                        <p className="mt-4 text-gray-700">
                            If the button above doesn&apos;t work, you can also reset your password by copying and pasting the following link into your browser:
                        </p>

                        <p className="mt-2 text-gray-700 break-words">
                            <Link href={resetLink} className="text-orange-500 underline">
                                {resetLink}
                            </Link>
                        </p>

                        <Hr />

                        <p className="mt-4 text-gray-700">
                            If this wasn&apos;t you, you can revoke the password reset request.
                        </p>

                        <p className="mt-4 text-gray-700">
                            <Link href={revokeLink} className="text-red-500 underline">{revokeLink}</Link>
                        </p>



                        <p className="mt-4 text-gray-700">
                            Thank you for using Spaceship CMS!
                        </p>

                        <p className="mt-4 text-gray-700">
                            From,<br />Areeb ur Rub
                        </p>
                        <Hr />
                        <p className="text-gray-700 pt-2">
                            Follow me on 𝕏: <Link href="https://twitter.com/areeburrub" className="text-orange-500 underline">@areeburrub</Link>
                        </p>
                    </div>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default PasswordResetEmailTemplate