import Image from "next/image";
import {Button} from "@/components/ui/button";
import NavBar from "@/app/components/NavBar";
import {Input} from "@/components/ui/input";

import { Github, FileText, Users, Layout, Rocket } from 'lucide-react';
import Footer from "@/app/components/Footer";
import {WaitingListForm} from "@/app/components/waitingListForm";

export default function Home() {
    return (
        <main className="min-h-screen">
            <NavBar/>
            <section id={"hero"} className={"container flex flex-col justify-center items-center my-16 md:my-24 gap-6"}>
                <div className={"flex items-center justify-center bg-primary/20 rounded-full w-fit py-2 px-4 border-primary border-2"} data-aos="fade-up">
                    Work in Progress
                </div>
                <h1 className={"text-center text-3xl md:text-6xl font-bold leading-tight"} data-aos="fade-up">
                    Effortlessly Manage Your<br/>
                    Astro Content with Spaceship CMS
                </h1>
                <p className={'text-center max-w-screen-lg text-base md:text-xl'} data-aos="fade-up">
                    Spaceship CMS streamlines content management for Astro websites. Connect your GitHub, edit markdown files easily, and publish with a single click. Simplify your workflow today.
                </p>
                <div className={"max-w-xl"}>
                    <WaitingListForm/>
                </div>
                {/*<div className={"max-w-screen-xl w-full flex items-center justify-center"}>*/}
                {/*    <img src={"https://unsplash.it/1920/1080"} className={"rounded-lg border-2 border-secondary h-full"}/>*/}
                {/*</div>*/}
            </section>

            <section id={"about"} className={"container max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                <img src={"/About-img.png"} className={"rounded-lg border-2 border-secondary object-cover h-full"}/>
                <div>
                    <h2 className={"text-3xl md:text-5xl font-bold leading-tight"}>
                        <span className={'text-orange-500'}>About</span> Spaceship CMS
                    </h2>
                    <p className={' text-accent-foreground mt-2 max-w-md'}>
                        <span className={'font-semibold'}>
                            Built to easily connect your Astro.js website and manage contents without opening a code editor.
                        </span>
                    </p>
                    <ul className={'list-disc translate-x-4 text-accent-foreground mt-2 max-w-md'}>
                        <li>Simplifies MDX content management for Astro.</li>
                        <li>Direct GitHub repository integration.</li>
                        <li>Understands your project structure.</li>
                        <li>No Setup Required in the project</li>
                        <li>Facilitates easy editor collaboration.</li>
                        <li>Streamlines markdown file publishing.</li>
                        <li>Enhances workflow efficiency.</li>
                        <li>Supports multiple GitHub accounts.</li>
                    </ul>
                </div>
            </section>

            <section id={"how-it-works"} className={"container flex flex-col items-center justify-center my-20 gap-4"}>
                <h2 className={"text-3xl md:text-5xl font-bold leading-tight"}>
                    How it Works
                </h2>
                <p className={'text-center max-w-screen-lg text-base md:text-xl'}>
                    Easily integrate with GitHub, create and manage MDX content with our editor, collaborate with your team, and publish updates directly to your repository for seamless content management.
                </p>

                <div className={"grid grid-cols-2 lg:grid-cols-4 gap-12 my-8"}>
                    <div className={"flex flex-col gap-4"}>
                        <img src={'/how-it-works-1.png'} alt="How it works" className={"w-full rounded-xl"}/>
                        <div className={"flex flex-row items-center gap-4"}>
                            <span
                                className={"rounded-lg text-center bg-primary h-10 w-10 flex items-center justify-center text-xl font-extrabold text-accent"}>1</span>
                            <h2 className={"text-xl font-bold leading-tight"}>Connect GitHub</h2>
                        </div>
                        <p>
                            Link your GitHub account and select the repository for your Astro website
                        </p>
                    </div>

                    <div className={"flex flex-col gap-4"}>
                        <img src={'/how-it-works-2.png'} alt="How it works" className={"w-full rounded-xl"}/>
                        <div className={"flex flex-row items-center gap-4"}>
                            <span
                                className={"rounded-lg text-center bg-primary h-10 w-10 flex items-center justify-center text-xl font-extrabold text-accent"}>2</span>
                            <h2 className={"text-xl font-bold leading-tight"}>Create and Edit</h2>
                        </div>
                        <p>
                            Use the markdown editor to create and edit MDX files effortlessly.
                        </p>
                    </div>

                    <div className={"flex flex-col gap-4"}>
                        <img src={'/how-it-works-3.png'} alt="How it works" className={"w-full rounded-xl"}/>
                        <div className={"flex flex-row items-center gap-4"}>
                            <span
                                className={"rounded-lg text-center bg-primary h-10 w-10 flex items-center justify-center text-xl font-extrabold text-accent"}>3</span>
                            <h2 className={"text-xl font-bold leading-tight"}>Collaborate</h2>
                        </div>
                        <p>
                            Add editors to your project for seamless collaboration and content management.
                        </p>
                    </div>

                    <div className={"flex flex-col gap-4"}>
                        <img src={'/how-it-works-4.png'} alt="How it works" className={"w-full rounded-xl"}/>
                        <div className={"flex flex-row items-center gap-4"}>
                            <span
                                className={"rounded-lg text-center bg-primary h-10 w-10 flex items-center justify-center text-xl font-extrabold text-accent"}>4</span>
                            <h2 className={"text-xl font-bold leading-tight"}>Publish</h2>
                        </div>
                        <p>
                            Commit and push changes directly from the editor to your GitHub repository for instant updates.
                        </p>
                    </div>
                </div>
            </section>

            <Footer/>

        </main>
    );
}
