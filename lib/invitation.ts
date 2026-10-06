export type EventGroup = "ceremony" | "reception";
export type Invitation = {
  token: string;
  guestName: string;
  eventGroup: EventGroup;
  maxGuests: number;
  createdAt: string;
};
export const isInvitationToken = (value: string) => /^[a-f0-9]{48}$/.test(value);
export function parseInvitationInput(value: unknown): Pick<Invitation, "guestName" | "eventGroup" | "maxGuests"> {
  if (!value || typeof value !== "object") throw new Error("Enter a guest name and event group.");
  const input = value as Record<string, unknown>;
  const guestName = typeof input.guestName === "string" ? input.guestName.trim() : "";
  if (!guestName || guestName.length > 120) throw new Error("Guest name must contain 1 to 120 characters.");
  if (input.eventGroup !== "ceremony" && input.eventGroup !== "reception") throw new Error("Choose the 4 PM or 6 PM group.");
  const maxGuests = input.maxGuests ?? 6;
  if (typeof maxGuests !== "number" || !Number.isInteger(maxGuests) || maxGuests < 1 || maxGuests > 6) throw new Error("Party size must be between 1 and 6.");
  return { guestName, eventGroup: input.eventGroup, maxGuests };
}
export function eventTime(group: EventGroup) { return group === "ceremony" ? "4:00 PM" : "6:00 PM"; }
export function eventDate(group: EventGroup) { return `2027-03-13T${group === "ceremony" ? "16" : "18"}:00:00+07:00`; }
export function arrivalText(group: EventGroup, language: "eng" | "viet") {
  if (group === "reception") return language === "eng"
    ? "Please arrive at 5:00 PM for the reception at 6:00 PM."
    : "Kính mời quý khách đến lúc 17:00 để tham dự tiệc mừng lúc 18:00.";
  return language === "eng"
    ? "Please arrive at 3:30 PM for the vows ceremony at 4:00 PM, followed by the reception at 6:00 PM."
    : "Kính mời quý khách đến lúc 15:30 để tham dự lễ Vows lúc 16:00 và tiệc mừng lúc 18:00.";
}
export function invitationHref(href: string, token?: string) {
  if (!token || !href.startsWith("/") || href.startsWith("//") || href.startsWith("/admin") || href.startsWith("/api")) return href;
  const [path, hash] = href.split("#");
  return `${path}${path.includes("?") ? "&" : "?"}invite=${encodeURIComponent(token)}${hash ? `#${hash}` : ""}`;
}
