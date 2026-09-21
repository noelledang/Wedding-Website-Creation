
import WelcomeScreen from "./WelcomeScreen";
import RoseOverlay from "./components/RoseOverlay";
import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  Cormorant_Garamond,
  Allura,
  Great_Vibes,
  Montserrat,
} from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import MusicPlayerWrapper from "./MusicPlayerWrapper";

import { LanguageProvider } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  const isVietnameseSite = host.includes("tancuong-lamnghi");

  return {
    title: isVietnameseSite
      ? "Tấn Cường & Lam Nghi | Save the Date"
      : "Noelle & Nathan | Save the Date",
    description: "Join us as we celebrate our wedding.",
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ cormorant.variable } ${ allura.variable } ${ greatVibes.variable } ${ montserrat.variable } h - full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <WelcomeScreen />
          <Navbar />
          <LanguageSwitcher />
          <MusicPlayerWrapper />
          {children}
        </LanguageProvider>
        <RoseOverlay />
      </body>
    </html>
  );
}

