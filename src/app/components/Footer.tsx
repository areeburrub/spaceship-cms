const Footer = () => {

    return(
        <footer className="w-full my-20 px-4">
            <div className={"container p-10 gap-10 md:p-20 flex flex-col md:flex-row justify-between bg-accent rounded-lg border border-accent-foreground"}>
                <div className={"flex flex-col justify-start gap-2"}>
                    <div className={"w-fit"}>
                        <a href={"/"}>
                            <div itemProp={"Spaceship CMS Logo"} title={"Spaceship CMS Logo"}
                                 className={"flex items-center gap-4"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.7 122.7" className={"h-10 w-full"}>
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

                                <span className={"text-lg font-black leading-tight"}>
                                    Spaceship<br/>
                                    CMS
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className={'text-muted-foreground'}>
                        © {new Date().getFullYear()} SPACESHIP CMS by <a className={"underline hover:text-primary"} target={"_blank"} href={"https://areeburrub.dev"}>Areeb ur Rub</a>
                    </div>
                </div>

                <div itemProp={"links"} className={"grid grid-cols-2 md:grid-cols-3 gap-6"}>
                    <div className={"flex flex-col gap-2"}>
                        <span className={"font-bold"}>Quick Links</span>
                        <a className={"hover:text-primary"} href={"#"}>About</a>
                        <a className={"hover:text-primary"} href={"#"}>Features</a>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <span className={"font-bold"}>Resources</span>
                        <a className={"hover:text-primary"} href={"#"}>Documentation</a>
                        <a className={"hover:text-primary"} href={"#"}>Blog</a>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <span className={"font-bold"}>Legal</span>
                        <a className={"hover:text-primary"} href={"#"}>Privacy Policy</a>
                        <a className={"hover:text-primary"} href={"#"}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer