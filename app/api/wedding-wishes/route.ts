import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Wish = { name: string; message: string; approved?: boolean; consent?: boolean };
const demo: Wish[] = [
  { name: "Linh & Chris", message: "Wishing you both a lifetime of happiness!" },
  { name: "Mai & Huy", message: "Chúc hai bạn trăm năm hạnh phúc!" },
  { name: "Anna", message: "May your love grow stronger every day!" },
];

export async function GET() {
  const url = process.env.WEDDING_WISHES_FEED_URL;
  if (!url) {
    return NextResponse.json({ wishes: process.env.VERCEL_ENV === "preview" ? demo : [], demo: true }, { headers: { "Cache-Control": "no-store" } });
  }
  try {
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("Feed unavailable");
    const json: unknown = await response.json();
    const rows: unknown = Array.isArray(json) ? json : (json && typeof json === "object" && "wishes" in json ? json.wishes : []);
    const wishes = Array.isArray(rows) ? rows.filter((item): item is Wish =>
      item && typeof item === "object" && item.approved === true && item.consent === true &&
      typeof item.name === "string" && typeof item.message === "string" &&
      item.name.trim().length > 0 && item.message.trim().length > 0
    ).slice(0, 100).map(item => ({ name: item.name.trim().slice(0, 80), message: item.message.trim().slice(0, 350) })) : [];
    return NextResponse.json({ wishes, demo: false }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ wishes: [], demo: false }, { headers: { "Cache-Control": "no-store" } });
  }
}
