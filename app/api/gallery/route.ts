import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { blobs } = await list();

        return NextResponse.json({
            success: true,
            photos: blobs.map((blob) => ({
                url: blob.url,
                pathname: blob.pathname,
            })),
        });
    } catch (error) {
        console.error("Gallery error:", error);

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Could not load gallery photos.",
            },
            { status: 500 }
        );
    }
}