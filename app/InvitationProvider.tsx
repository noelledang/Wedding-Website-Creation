"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { arrivalText, type Invitation } from "../lib/invitation";
import { useLanguage } from "./LanguageProvider";
const InvitationContext = createContext<Invitation | null>(null);
export const useInvitation = () => useContext(InvitationContext);
export function InvitationProvider({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();
  const token = params.get("invite");
  const [loaded, setLoaded] = useState<{ token: string; invitation: Invitation | null; error: string } | null>(null);
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    fetch(`/api/invitations/${encodeURIComponent(token)}`, { cache: "no-store", signal: controller.signal })
      .then(async response => {
        const result = await response.json();
        if (!response.ok) throw new Error(response.status === 404 ? "This invitation link is invalid. / Liên kết thiệp mời không hợp lệ." : "Unable to load your invitation. Please try again. / Vui lòng thử lại.");
        setLoaded({ token, invitation: result.invitation, error: "" });
      }).catch(error => {
        if (!controller.signal.aborted) setLoaded({ token, invitation: null, error: error instanceof Error ? error.message : "Unable to load invitation." });
      });
    return () => controller.abort();
  }, [token]);
  if (token && loaded?.token !== token) return <main className="min-h-screen flex items-center justify-center bg-[#FDEFE8] p-6" role="status">Loading your invitation… / Đang tải thiệp mời…</main>;
  if (token && loaded?.error) return <main className="min-h-screen flex flex-col items-center justify-center bg-[#FDEFE8] p-6 text-center"><p role="alert">{loaded.error}</p><button type="button" className="mt-6 rounded-full bg-[#622825] px-6 py-3 text-white" onClick={() => window.location.reload()}>Try again / Thử lại</button></main>;
  return <InvitationContext.Provider value={token ? loaded?.invitation ?? null : null}>{children}</InvitationContext.Provider>;
}
export function InvitationDetails() {
  const invitation = useInvitation();
  const { language } = useLanguage();
  if (!invitation) return null;
  return <div className="my-5 text-center font-body text-sm leading-7 text-[#622825]"><p className="font-heading text-3xl">{invitation.guestName}</p><p>{arrivalText(invitation.eventGroup, language)}</p></div>;
}
