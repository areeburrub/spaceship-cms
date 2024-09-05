import ResetPasswordForm from "@/app/(auth)/components/resetPasswordForm";

const PasswordResetPage = ({
                               params,
                           }: {
    params: { token: string; };
}) =>{

    console.log(params.token)

    return(
        <div className={"w-full min-h-screen flex justify-center items-center"}>
            <ResetPasswordForm token={params.token}/>
        </div>
    )
}

export default PasswordResetPage;