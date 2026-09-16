
"use client";

import Link from "next/link";
import { useLanguage } from "../LanguageProvider";

export default function Navbar() {
    const { language } = useLanguage();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDEFE8]/95 backdrop-blur-sm border-b border-[#916A63]/20">
            <nav className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between">

                    {/* COUPLE NAMES */}
                    <Link
                        href="/"
                        className="font-great-vibes text-3xl text-[var(--color-gold-accent)] hover:opacity-70 transition"
                    >
                        {language === "eng"
                            ? "Noelle & Nathan"
                            : "Cường & Nghi"}
                    </Link>

                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden md:flex items-center gap-8">

                        {/* HOME */}
                        <Link
                            href="/"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            {language === "eng" ? "Home" : "Trang Chủ"}
                        </Link>

                        {/* WEDDING SCHEDULE */}
                        <Link
                            href="/wedding-day"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            {language === "eng"
                                ? "Wedding Schedule"
                                : "Lịch Trình Đám Cưới"}
                        </Link>

                        {/* VENUE & TRAVEL */}
                        <Link
                            href="/venue-and-travel"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            {language === "eng"
                                ? "Venue & Travel"
                                : "Địa Điểm & Du Lịch"}
                        </Link>

                        {/* RSVP */}
                        <Link
                            href="/rsvp"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            RSVP
                        </Link>

                        {/* GALLERY */}
                        <Link
                            href="/gallery"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            {language === "eng"
                                ? "Gallery"
                                : "Thư Viện Ảnh"}
                        </Link>

                        {/* FAQ */}
                        <Link
                            href="/faq"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            FAQ
                        </Link>

                    </div>
                </div>
            </nav>
        </header>
    );
}

