import Link from "next/link"
import {CircleUser, Menu, Package2, Search} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Checkbox} from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {getProfile} from "@/_data/user";

export default async function Dashboard() {

    const user = await getProfile()

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav
                    className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <div itemProp={"Spaceship CMS Logo"} title={"Spaceship CMS Logo"}
                             className={"flex items-center gap-4"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.7 122.7" className={"h-8 w-8"}>
                                <g id="Layer_2" data-name="Layer 2">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <path className="fill-primary"
                                              d="M15.51,83.93C3.88,93.7,0,122.7,0,122.7s29-3.88,38.78-15.51c5.5-6.51,5.42-16.52-.7-22.57A16.91,16.91,0,0,0,15.51,83.93Z"/>
                                        <path
                                            className="fill-none stroke-accent-foreground stroke-[11.42] stroke-linecap-round stroke-linejoin-round"
                                            d="M59.89,80,42.76,62.82A125.4,125.4,0,0,1,54.18,40.26,73.55,73.55,0,0,1,117,5.71c0,15.53-4.45,42.83-34.26,62.82A127.89,127.89,0,0,1,59.89,80Z"/>
                                        <path
                                            className="fill-none stroke-accent-foreground stroke-[11.42] stroke-linecap-round stroke-linejoin-round"
                                            d="M42.76,62.82H14.21S17.35,45.51,25.63,40c9.25-6.16,28.55,0,28.55,0"/>
                                        <path
                                            className="fill-none stroke-accent-foreground stroke-[11.42] stroke-linecap-round stroke-linejoin-round"
                                            d="M59.89,80V108.5s17.3-3.14,22.84-11.42c6.17-9.25,0-28.55,0-28.55"/>
                                    </g>
                                </g>
                            </svg>

                            <span className={"text-md font-black leading-tight"}>
                            Spaceship<br/>
                            CMS
                        </span>
                        </div>
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Orders
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Products
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Customers
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Settings
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <div itemProp={"Spaceship CMS Logo"} title={"Spaceship CMS Logo"}
                                     className={"flex items-center gap-4"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.7 122.7"
                                         className={"h-8 w-8"}>
                                        <g id="Layer_2" data-name="Layer 2">
                                            <g id="Layer_1-2" data-name="Layer 1">
                                                <path className="fill-primary"
                                                      d="M15.51,83.93C3.88,93.7,0,122.7,0,122.7s29-3.88,38.78-15.51c5.5-6.51,5.42-16.52-.7-22.57A16.91,16.91,0,0,0,15.51,83.93Z"/>
                                                <path
                                                    className="fill-none stroke-accent-foreground stroke-[11.42] stroke-linecap-round stroke-linejoin-round"
                                                    d="M59.89,80,42.76,62.82A125.4,125.4,0,0,1,54.18,40.26,73.55,73.55,0,0,1,117,5.71c0,15.53-4.45,42.83-34.26,62.82A127.89,127.89,0,0,1,59.89,80Z"/>
                                                <path
                                                    className="fill-none stroke-accent-foreground stroke-[11.42] stroke-linecap-round stroke-linejoin-round"
                                                    d="M42.76,62.82H14.21S17.35,45.51,25.63,40c9.25-6.16,28.55,0,28.55,0"/>
                                                <path
                                                    className="fill-none stroke-accent-foreground stroke-[11.42] stroke-linecap-round stroke-linejoin-round"
                                                    d="M59.89,80V108.5s17.3-3.14,22.84-11.42c6.17-9.25,0-28.55,0-28.55"/>
                                            </g>
                                        </g>
                                    </svg>

                                    <span className={"text-md font-black leading-tight"}>
                            Spaceship<br/>
                            CMS
                        </span>
                                </div>
                            </Link>
                            <Link
                                href="#"
                                className="hover:text-foreground"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex-1 sm:flex-initial">
                        <div className={"w-fit"}>
                            {user?.username}
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">

                                <CircleUser className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                <Link href={"/logout"}>
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Dashboard</h1>
                </div>

            </main>
        </div>
    )
}
