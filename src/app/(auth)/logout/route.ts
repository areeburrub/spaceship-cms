import {logout} from "@/_actions/auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    await logout(); // Call the server action to log out the user

    // Return a response indicating the user has been logged out
    return NextResponse.redirect(new URL('/login', req.nextUrl));
}