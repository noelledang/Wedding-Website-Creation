import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { validAdminSession } from "../../../../lib/admin-session";
import { createInvitation, listInvitations, InvitationStorageError } from "../../../../lib/invitation-store";
import { parseInvitationInput } from "../../../../lib/invitation";
const headers = { "Cache-Control": "private, no-store" };
async function authorized() { return validAdminSession((await cookies()).get("admin_session")?.value); }
export async function GET() {
  if (!await authorized()) return NextResponse.json({ error: "Please sign in." }, { status: 401, headers });
  try { return NextResponse.json({ invitations: await listInvitations() }, { headers }); }
  catch (error) { return NextResponse.json({ error: error instanceof InvitationStorageError ? error.message : "Could not load invitations." }, { status: 503, headers }); }
}
export async function POST(request: Request) {
  if (!await authorized()) return NextResponse.json({ error: "Please sign in." }, { status: 401, headers });
  const requestUrl = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? requestUrl.host;
  const protocol = request.headers.get("x-forwarded-proto") ?? requestUrl.protocol.replace(":", "");
  if (request.headers.get("origin") !== `${protocol}://${host}`) return NextResponse.json({ error: "Invalid request origin." }, { status: 403, headers });
  let input;
  try { input = parseInvitationInput(await request.json()); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid invitation." }, { status: 400, headers }); }
  try { return NextResponse.json({ invitation: await createInvitation(input) }, { status: 201, headers }); }
  catch (error) { return NextResponse.json({ error: error instanceof InvitationStorageError ? error.message : "Could not save invitation." }, { status: 503, headers }); }
}
