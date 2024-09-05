
const AuthLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) =>{
    return(
        <div className="relative w-full h-screen overflow-hidden bg-slate-950">
            <div className="blur-[250px]">
                <div className="gradient-background-shape gradient-background-shape-1 w-[700px] h-[700px] bg-orange-500"></div>
                <div className="gradient-background-shape gradient-background-shape-2 w-[700px] h-[700px] bg-blue-500"></div>
            </div>

            {/* Noise Overlay */}
            <div className="absolute inset-0 bg-noise bg-noise-size bg-cover pointer-events-none"></div>

            <main className="relative z-10">{children}</main>
        </div>


    )
}

export default AuthLayout