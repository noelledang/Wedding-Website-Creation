import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Allura,
  Great_Vibes,
  Montserrat,
} from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "./LanguageProvider";
import LanguageSelector from "./LanguageSelector";
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

export const metadata: Metadata = {
  title: "Noelle & Nathan | Our Wedding",
  description: "Join us as we celebrate our wedding.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${allura.variable} ${greatVibes.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <LanguageSelector />
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}