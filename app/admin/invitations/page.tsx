import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validAdminSession } from "../../../lib/admin-session";
import InvitationManager from "./InvitationManager";
export default async function InvitationsPage() {
  if (!validAdminSession((await cookies()).get("admin_session")?.value)) redirect("/admin/login");
  return <InvitationManager />;
}
