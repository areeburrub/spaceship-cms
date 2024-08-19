import {getUser, verifySession} from "@/lib/dal";

export const isUserLoggedIn = async () => {
    const { isAuth }  = await verifySession();
    return isAuth
}

export const getProfile = async () =>{
    const user = await getUser();
    return user;
}