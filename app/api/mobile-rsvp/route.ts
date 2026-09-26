import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbztNFNB_-PFYIfeqjL0gw-xr8uM1OwIx9IqkcSoLvLKW8M_rzPKRyi3hW1Kl5J68cVWbg/exec";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error(
                "Google RSVP response:",
                response.status,
                responseText.slice(0, 500)
            );

            return NextResponse.json(
                { success: false },
                { status: 502 }
            );
        }

        let result: { success?: boolean };

        try {
            result = JSON.parse(responseText);
        } catch {
            console.error(
                "Google RSVP returned non-JSON:",
                responseText.slice(0, 500)
            );

            return NextResponse.json(
                { success: false },
                { status: 502 }
            );
        }

        if (result.success !== true) {
            console.error("Google RSVP did not confirm success:", result);

            return NextResponse.json(
                { success: false },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Mobile RSVP submission failed:", error);

        return NextResponse.json(
            { success: false },
            { status: 502 }
        );
    }
}