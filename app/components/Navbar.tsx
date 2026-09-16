"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../LanguageProvider";

export default function Navbar() {
    const { language } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);

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
                            : "Tấn Cường & Lãm Nghi"}
                    </Link>

                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden md:flex items-center gap-8">

                        <Link
                            href="/"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            {language === "eng" ? "Home" : "Trang Chủ"}
                        </Link>

                        <Link
                            href="/wedding-day"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            {language === "eng"
                                ? "Wedding Schedule"
                                : "Lịch Trình"}
                        </Link>

                        <Link
                            href="/venue-and-travel"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            {language === "eng"
                                ? "Venue & Travel"
                                : "Địa Điểm"}
                        </Link>

                        <Link
                            href="/rsvp"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            RSVP
                        </Link>

                        <Link
                            href="/gallery"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            {language === "eng"
                                ? "Gallery"
                                : "Thư Viện Ảnh"}
                        </Link>

                        <Link
                            href="/faq"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] hover:text-[var(--color-gold-accent)] transition"
                        >
                            FAQ
                        </Link>

                    </div>

                    {/* MOBILE HAMBURGER */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-3xl text-[#622825]"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>

                </div>

                {/* MOBILE MENU */}
                {menuOpen && (
                    <div className="md:hidden mt-8 flex flex-col gap-6 pb-4 text-center">

                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className="font-body uppercase tracking-[0.15em] text-[#622825]"
                        >
                            {language === "eng" ? "Home" : "Trang Chủ"}
                        </Link>

                        <Link
                            href="/wedding-day"
                            onClick={() => setMenuOpen(false)}
                            className="font-body uppercase tracking-[0.15em] text-[#622825]"
                        >
                            {language === "eng"
                                ? "Wedding Schedule"
                                : "Lịch Trình"}
                        </Link>

                        <Link
                            href="/venue-and-travel"
                            onClick={() => setMenuOpen(false)}
                            className="font-body uppercase tracking-[0.15em] text-[#622825]"
                        >
                            {language === "eng"
                                ? "Venue & Travel"
                                : "Địa Điểm & Du Lịch"}
                        </Link>

                        <Link
                            href="/rsvp"
                            onClick={() => setMenuOpen(false)}
                            className="font-body uppercase tracking-[0.15em] text-[#622825]"
                        >
                            RSVP
                        </Link>

                        <Link
                            href="/gallery"
                            onClick={() => setMenuOpen(false)}
                            className="font-body uppercase tracking-[0.15em] text-[#622825]"
                        >
                            {language === "eng"
                                ? "Gallery"
                                : "Thư Viện Ảnh"}
                        </Link>

                        <Link
                            href="/faq"
                            onClick={() => setMenuOpen(false)}
                            className="font-body uppercase tracking-[0.15em] text-[#622825]"
                        >
                            FAQ
                        </Link>

                    </div>
                )}

            </nav>
        </header>
    );
}