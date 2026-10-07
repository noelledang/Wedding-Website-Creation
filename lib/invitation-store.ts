import { get, list, put } from "@vercel/blob";
import { randomBytes } from "node:crypto";
import { isInvitationToken, parseInvitationInput, type Invitation } from "./invitation";
export class InvitationStorageError extends Error {}
function options() {
  const token = process.env.INVITATIONS_READ_WRITE_TOKEN || process.env.Invitations_READ_WRITE_TOKEN;
  if (!token) throw new InvitationStorageError("Connect a private Blob store and set INVITATIONS_READ_WRITE_TOKEN to enable invitations.");
  return { token };
}
async function read<T>(pathname: string): Promise<T | null> {
  const result = await get(pathname, { ...options(), access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  return await new Response(result.stream).json() as T;
}
export async function getInvitation(token: string) {
  if (!isInvitationToken(token)) return null;
  return read<Invitation>(`invitations/${token}.json`);
}
export async function createInvitation(input: unknown) {
  const parsed = parseInvitationInput(input);
  const invitation: Invitation = { ...parsed, token: randomBytes(24).toString("hex"), createdAt: new Date().toISOString() };
  await put(`invitations/${invitation.token}.json`, JSON.stringify(invitation), {
    ...options(), access: "private", addRandomSuffix: false, contentType: "application/json",
  });
  return invitation;
}
export type InvitationResponse = { invitationToken: string; eventGroup: Invitation["eventGroup"]; guestName: string; attending: "yes" | "no"; guestCount: number; guests: { name: string }[]; message: string; submittedAt: string; googleSaved: boolean };
export async function saveInvitationResponse(response: InvitationResponse, id: string) {
  await put(`invitation-responses/${response.invitationToken}/${id}.json`, JSON.stringify(response), {
    ...options(), access: "private", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json",
  });
}
export async function listInvitations() {
  const invitations: Invitation[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ ...options(), prefix: "invitations/", cursor });
    const records = await Promise.all(page.blobs.map(blob => read<Invitation>(blob.pathname)));
    invitations.push(...records.filter((record): record is Invitation => record !== null));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return invitations.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
