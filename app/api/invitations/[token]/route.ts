import { NextResponse } from "next/server";
import { getInvitation } from "../../../../lib/invitation-store";
const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };
export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  try {
    const invitation = await getInvitation((await context.params).token);
    if (!invitation) return NextResponse.json({ error: "Invitation not found." }, { status: 404, headers });
    return NextResponse.json({ invitation }, { headers });
  } catch { return NextResponse.json({ error: "Invitation temporarily unavailable." }, { status: 503, headers }); }
}
