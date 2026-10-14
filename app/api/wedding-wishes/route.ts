import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Wish = { name: string; message: string; approved?: boolean };

export async function GET() {
  const feedUrl = process.env.WEDDING_WISHES_FEED_URL;
  const feedKey = process.env.WEDDING_WISHES_FEED_KEY;

  if (!feedUrl || !feedKey) {
    return NextResponse.json({ wishes: [], demo: false }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const url = new URL(feedUrl);
    if (url.protocol !== "https:") throw new Error("Invalid feed URL");
    url.searchParams.set("key", feedKey);

    const response = await fetch(url.toString(), {
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Feed unavailable");

    const json: unknown = await response.json();
    const rows: unknown = Array.isArray(json)
      ? json
      : json && typeof json === "object" && "wishes" in json
        ? json.wishes
        : [];

    // Publication requires both editorial approval and guest consent.
    const wishes = Array.isArray(rows)
      ? rows.filter((item): item is Wish =>
          item !== null && typeof item === "object" &&
          item.approved === true &&
          typeof item.name === "string" && typeof item.message === "string" &&
          item.name.trim().length > 0 && item.message.trim().length > 0
        ).slice(0, 100).map(item => ({
          name: item.name.trim().slice(0, 80),
          message: item.message.trim().slice(0, 350),
        }))
      : [];

    return NextResponse.json({ wishes, demo: false }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ wishes: [], demo: false }, { headers: { "Cache-Control": "no-store" } });
  }
}
