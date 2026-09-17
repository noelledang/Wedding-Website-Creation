import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  const isVietnameseSite = host.includes("tancuong-lamnghi");

  return {
    title: isVietnameseSite
      ? "Tấn Cường & Lãm Nghi | Save the Date"
      : "Noelle & Nathan | Save the Date",
    description: "Join us as we celebrate our wedding.",
  };
}