import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import {ChevronRight, Plus} from "lucide-react";

export default async function SiteSelectorPage() {
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
                <Card className="mx-auto max-w-md w-full min-h-[70vh]">
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
                            <CardTitle className="text-2xl font-bold">All Websites</CardTitle>
                            <Link href={"/site/new"}>
                                <Button className={"flex flex-row gap-2 items-center justify-center pl-2"}>
                                    <Plus />
                                    New
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={'flex flex-col gap-2'}>
                            {
                                sites.map((site,index)=>{
                                 return(
                                     <Link key={index} href={`/site/${site.id}`}>
                                    <div className={'rounded-lg bg-transparent hover:bg-muted transition-all duration-300 flex flex-row justify-between items-center p-3 group '}>
                                        <div className={'flex flex-row gap-2'}>
                                            <Avatar title={site.sitename}>
                                                <AvatarFallback>{site.sitename?.slice(0,2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className={'flex flex-col max-w-md group-hover:translate-x-1 transition-all duration-300'}>
                                                <span className={'font-bold w-64 truncate'}>{site.sitename}</span>
                                                <span className={'text-sm truncate w-64'}>{site.url}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className={'opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300'} />
                                    </div>
                                </Link>
                                 )
                                })
                            }
                        </div>

                        {/*<div className="w-full h-80 bg-muted border-2 border-dashed border-muted-foreground rounded-lg p-4 flex flex-col gap-4 justify-center items-center text-center">*/}
                        {/*    <h2 className={"text-2xl text-black font-bold"}>*/}
                        {/*        No Website Connected*/}
                        {/*    </h2>*/}
                        {/*    <p className="text-lg text-muted-foreground">*/}
                        {/*        You don&apos;t have a website yet. Ask your admin for access or add your own.*/}
                        {/*    </p>*/}
                        {/*    <Link href={'/site/new'}>*/}
                        {/*        <Button className={"flex flex-row gap-2 items-center justify-center pl-2"}>*/}
                        {/*            <Plus />*/}
                        {/*            Connect Website*/}
                        {/*        </Button>*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </CardContent>
                </Card>
            </div>
        );
}
