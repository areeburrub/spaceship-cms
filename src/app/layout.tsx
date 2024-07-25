import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});
import {Toaster} from "@/components/ui/toaster"

export const metadata: Metadata = {
    metadataBase: new URL('https://spaceship-cms.co'),
    title: "Spaceship CMS",
    description: "Spaceship CMS is a content management system for Astro websites with seamless GitHub integration. Users can create accounts, link repositories, and manage content via a markdown editor. Updates are synchronized in real-time using the GitHub API, supporting collaborative projects with multiple editors. Simplify content management with Spaceship CMS.",
    openGraph: {
        images: ['/OG-Image.png']
    },
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/favicon.svg',
                href: '/favicon.svg',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/favicon-white.svg',
                href: '/favicon-white.svg',
            },
        ],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <Analytics/>
            <SpeedInsights/>
            <main>{children}</main>
            <Toaster/>
        </body>
        </html>
    );
}
