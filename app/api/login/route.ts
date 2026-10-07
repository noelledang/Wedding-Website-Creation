import { createAdminSession, SESSION_SECONDS } from "../../../lib/admin-session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { password } = await request.json();

    if (!process.env.ADMIN_PASSWORD || typeof password !== "string" || password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json(
            { error: "Incorrect password" },
            { status: 401 }
        );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", createAdminSession(), {
        httpOnly: true,
        maxAge: SESSION_SECONDS,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return response;
}