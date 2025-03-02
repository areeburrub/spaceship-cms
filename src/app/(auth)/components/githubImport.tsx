"use client"
import {useState} from "react"
import Link from "next/link"
import {Plus, Search, Github, Check, ChevronRight, ChevronsUpDown} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {cn} from "@/lib/utils"


export default function GithubImportComponent() {

    // Mock data for GitHub accounts and repositories
    const githubAccounts = [
        {username: "areeburrub", avatar: "AR"},
        {username: "imprakharshukla", avatar: "PR"},
        {username: "hardikprakash", avatar: "HD"},
    ]
    const repositories = [
        {name: "repo1fwaeff34ff4f43regregregergreg", technology: "React", url: "https://github.com/user/repo1"},
        {name: "repo2", technology: "Vue", url: "https://github.com/user/repo2"},
        {name: "repo3", technology: "Angular", url: "https://github.com/user/repo3"},
        {name: "repo4", technology: "Svelte", url: "https://github.com/user/repo4"},
        {name: "repo5", technology: "Next.js", url: "https://github.com/user/repo5"},
    ]

    const [selectedAccount, setSelectedAccount] = useState(githubAccounts[0]?.username??"")
    const [searchQuery, setSearchQuery] = useState("")

    const [open, setOpen] = useState(false)

    const filteredRepos = repositories.filter(repo =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getTechnologyIcon = (technology: string) => {
        // This is a placeholder. In a real application, you'd import and use actual icons.
        return technology.charAt(0).toUpperCase()
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={"h-5 w-5"}>
                                <path
                                    d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                            </svg>
                            <div className={"w-full text-left"}>
                            {selectedAccount
                                ? githubAccounts.find((account) => account.username === selectedAccount)?.username
                                : "Select GitHub Account"}
                            </div>
                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[250px] p-0">
                        <Command>
                            <CommandInput placeholder="Search GitHub account..."/>
                            <CommandList>
                                <CommandEmpty>No account found.</CommandEmpty>
                                <CommandGroup>
                                    {githubAccounts.map((account) => (
                                        <CommandItem
                                            key={account.username}
                                            value={account.username}
                                            onSelect={(currentValue) => {
                                                setSelectedAccount(currentValue);
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedAccount === account.username ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     fill="currentColor" className={"h-5 w-5"}>
                                                    <path
                                                        d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                                                </svg>
                                                <span>{account.username}</span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                <Link href={"https://github.com/login/oauth/authorize?client_id=Iv23liUalxSdcSeDPTEY"}>
                                    <CommandItem>
                                            <div className="flex items-center gap-2">
                                                <Plus className="w-4 h-4"/>
                                                <span>Add New Account</span>
                                            </div>
                                    </CommandItem>
                                </Link>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                    <Input
                        type="text"
                        placeholder="Search repositories"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            {selectedAccount ? (
                <div className="border rounded-lg">
                    {filteredRepos.length > 0 ? (
                        <ul className="space-y-2">
                            {filteredRepos.map(repo => (
                                <li key={repo.name}>
                                    <div
                                        className="rounded-lg bg-transparent hover:bg-muted transition-all duration-300 flex flex-row justify-between items-center p-3">
                                        <div className="flex flex-row gap-2 items-center">
                                            <Avatar>
                                                <AvatarFallback>{getTechnologyIcon(repo.technology)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col max-w-md">
                                                <span className="font-bold w-24 sm:w-64 truncate">{repo.name}</span>
                                                <span className="text-sm truncate w-24 sm:w-64">{repo.technology}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="default" size="sm">Import</Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No repositories found.</p>
                    )}
                </div>
            ) : (
                <div
                    className="w-full h-80 bg-muted border rounded-lg p-4 flex flex-col gap-4 justify-center items-center text-center">
                    <h2 className="text-2xl text-black font-bold">
                        No GitHub Account Connected
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        You don&apos;t have a GitHub account connected yet. Select an account or add a new one.
                    </p>
                    <Link href="/github/add">
                        <Button className="flex flex-row gap-2 items-center justify-center pl-2">
                            <Plus className="w-4 h-4"/>
                            Connect GitHub Account
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}