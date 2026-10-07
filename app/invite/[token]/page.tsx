import { redirect, notFound } from "next/navigation";
import { isInvitationToken } from "../../../lib/invitation";
export const metadata = { robots: { index: false, follow: false } };
export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isInvitationToken(token)) notFound();
  redirect(`/?invite=${token}`);
}
