import type { Invitation } from "./invitation";
export function invitationRSVP(value: unknown, invitation: Invitation) {
  if (!value || typeof value !== "object") throw new Error("Invalid RSVP.");
  const body = value as Record<string, unknown>;
  if (body.attending !== "yes" && body.attending !== "no") throw new Error("Choose whether you are attending.");
  if (body.attending === "yes" && (typeof body.guestCount !== "number" || !Number.isInteger(body.guestCount) || body.guestCount < 1 || body.guestCount > invitation.maxGuests)) throw new Error("Party size exceeds this invitation.");
  const rawGuests = Array.isArray(body.guests) ? body.guests : [];
  const guests = rawGuests.map((guest: unknown) => {
    const name = guest && typeof guest === "object" && "name" in guest && typeof guest.name === "string" ? guest.name.trim() : "";
    if (name.length > 120) throw new Error("Guest names are too long.");
    return { name };
  });
  if (body.attending === "yes" && (guests.length !== body.guestCount || guests.some(guest => !guest.name))) throw new Error("Enter a name for each guest.");
  if (guests.length > invitation.maxGuests) throw new Error("Too many guest names.");
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message.length > 5000) throw new Error("Message is too long.");
  return {
    attending: body.attending, guestCount: body.attending === "yes" ? body.guestCount as number : 0,
    guests, message, invitationToken: invitation.token, invitationGuestName: invitation.guestName,
    eventGroup: invitation.eventGroup, eventTime: invitation.eventGroup === "ceremony" ? "16:00" : "18:00",
  };
}
