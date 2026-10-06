"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { eventTime, type EventGroup, type Invitation } from "../../../lib/invitation";
export default function InvitationManager() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [guestName, setGuestName] = useState("");
  const [eventGroup, setEventGroup] = useState<EventGroup>("ceremony");
  const [maxGuests, setMaxGuests] = useState(6);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [created, setCreated] = useState<Invitation | null>(null);
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/invitations", { cache: "no-store", signal: controller.signal }).then(async response => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setOrigin(window.location.origin);
      setInvitations(result.invitations);
    }).catch(error => { if (!controller.signal.aborted) setError(error.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice(""); setSaving(true);
    try {
      const response = await fetch("/api/admin/invitations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ guestName, eventGroup, maxGuests }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setInvitations(current => [result.invitation, ...current]); setCreated(result.invitation); setGuestName(""); setNotice("Invitation saved. Preview it before copying the link.");
    } catch (error) { setError(error instanceof Error ? error.message : "Could not create invitation."); }
    finally { setSaving(false); }
  }
  async function copy(invitation: Invitation) {
    try { await navigator.clipboard.writeText(`${origin}/invite/${invitation.token}`); setNotice(`Link copied for ${invitation.guestName}.`); }
    catch { setNotice("Copy the link from the invitation link field below."); setCreated(invitation); }
  }
  return <main className="min-h-screen bg-[#FDEFE8] px-6 pb-16 pt-32 text-[#622825]"><div className="mx-auto max-w-5xl">
    <Link href="/admin" className="underline">Back to Admin</Link><h1 className="mt-6 font-heading text-5xl">Guest Invitations</h1>
    <p className="mt-3 font-body text-sm leading-7">Enter the names exactly as you want them to appear. Every invitation supports ENG and VIET.</p>
    <form onSubmit={submit} className="my-8 grid gap-5 rounded-2xl border border-[#916A63]/20 bg-white/70 p-6">
      <label className="grid gap-2">Guest name<input required maxLength={120} value={guestName} onChange={event => setGuestName(event.target.value)} placeholder="Linh & Chris" className="rounded-lg border p-3" /></label>
      <label className="grid gap-2">Event group<select value={eventGroup} onChange={event => setEventGroup(event.target.value as EventGroup)} className="rounded-lg border bg-white p-3"><option value="ceremony">4 PM ceremony + reception (arrive 3:30 PM)</option><option value="reception">6 PM reception (arrive 5 PM)</option></select></label>
      <label className="grid gap-2">Maximum party size<select value={maxGuests} onChange={event => setMaxGuests(Number(event.target.value))} className="rounded-lg border bg-white p-3">{[1,2,3,4,5,6].map(number => <option key={number}>{number}</option>)}</select></label>
      <div className="rounded-xl bg-[#FDEFE8] p-5 text-center"><p className="font-heading text-3xl">{guestName.trim() || "Guest name"},</p><p>We invite you to celebrate the wedding of Noelle & Nathan.</p><p className="mt-4">Trân trọng kính mời {guestName.trim() || "quý khách"} đến chung vui trong lễ cưới của Tấn Cường & Lãm Nghi.</p><p className="mt-4">March 13, 2027 · {eventTime(eventGroup)}</p></div>
      <button disabled={saving || loading || !guestName.trim()} className="rounded-full bg-[#622825] px-6 py-3 text-white disabled:opacity-50">{saving ? "Saving…" : "Create Invitation"}</button>
    </form>
    {error && <p role="alert" className="mb-5 text-red-700">{error}</p>}{notice && <p role="status" className="mb-5">{notice}</p>}
    {created && <label className="mb-6 grid gap-2">Invitation link<input readOnly onFocus={event => event.target.select()} value={`${origin}/invite/${created.token}`} className="w-full rounded-lg border bg-white p-3" /></label>}
    {loading ? <p role="status">Loading invitations…</p> : <div className="overflow-x-auto"><table className="w-full text-left"><caption className="mb-4 text-left font-heading text-3xl">Saved Invitations</caption><thead><tr><th className="p-3" scope="col">Guest</th><th className="p-3" scope="col">Group</th><th className="p-3" scope="col">Party limit</th><th className="p-3" scope="col">Link</th></tr></thead><tbody>{invitations.map(invitation => <tr key={invitation.token} className="border-t border-[#916A63]/20"><td className="p-3">{invitation.guestName}</td><td className="p-3">{eventTime(invitation.eventGroup)}</td><td className="p-3">{invitation.maxGuests}</td><td className="flex gap-4 p-3"><a className="underline" href={`/invite/${invitation.token}`} target="_blank" rel="noopener noreferrer">Preview</a><button className="underline" onClick={() => copy(invitation)}>Copy Link</button></td></tr>)}</tbody></table>{invitations.length === 0 && !error && <p className="mt-4">No invitations yet.</p>}</div>}
  </div></main>;
}
