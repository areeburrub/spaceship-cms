import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {getUser_Email, getUser_Username} from "@/_data/user";
import {ChevronRight, MoveRight, Plus} from "lucide-react";
import GithubImportComponent from "@/app/(auth)/components/githubImport";

export default async function SiteNewPage() {
    const username = await getUser_Username();
    const useremail = await getUser_Email();

    const sites = [
        {
            id:"3k3oif30",
            sitename: 'areeb-portfolio',
            url: `https://areeburrub.dev`,
        },
        {
            id:"239j39fr",
            sitename: 'spaceship-blogs',
            url: `https://blogs.spaceship-cms.co`,
        },
    ]

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="mx-auto max-w-lg w-full min-h-[70vh]">
                <CardHeader>
                    <div className={"w-full flex justify-between items-center"}>
                        <img className="w-32" src="/logo.png" alt="logo" />
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar title={username}>
                                    <AvatarFallback>{username?.slice(0,2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{username}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {useremail}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={"/dashboard"}>
                                    <DropdownMenuItem>
                                        Manage Account
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={"/logout"}>
                                    <DropdownMenuItem>
                                        Logout
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                    <div className={"w-full flex justify-between items-center"}>
                        <div>
                            <CardTitle className={"text-2xl font-bold"}>
                                Connect an Astro Website
                            </CardTitle>
                            <CardDescription>
                                Import GitHub Repository
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        <GithubImportComponent/>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="mt-4 text-sm flex justify-center gap-2 items-center">
                        Already have a Connected Site?{" "}
                        <Link href="/site/selector" className="text-blue-500">
                            <div className={"flex gap-1 items-center font-bold"}>
                                View All Sites
                                <MoveRight className={"mt-0.5"}/>
                            </div>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
