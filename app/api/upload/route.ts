import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as HandleUploadBody;

        const jsonResponse = await handleUpload({
            body,
            request,

            onBeforeGenerateToken: async (pathname) => {
                return {
                    allowedContentTypes: ["image/*"],
                    addRandomSuffix: false,
                    tokenPayload: JSON.stringify({
                        pathname,
                    }),
                };
            },

            onUploadCompleted: async ({ blob }) => {
                console.log("Photo uploaded:", blob.url);
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error("Upload preparation error:", error);

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Could not prepare the photo upload.",
            },
            { status: 400 }
        );
    }
}