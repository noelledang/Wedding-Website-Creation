"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../LanguageProvider";

export default function Navbar() {
    const { language } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#916A63]/20 bg-[#FDEFE8]/95 backdrop-blur-sm">
            <nav className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between">
                    {/* COUPLE NAMES */}
                    {/* COUPLE NAMES */}
                    <Link
                        href="/"
                        className={`text-[var(--color-gold-accent)] transition hover:opacity-70 ${language === "eng"
                                ? "font-heading text-2xl tracking-[0.08em]"
                                : "font-great-vibes text-3xl"
                            }`}
                    >
                        {language === "eng"
                            ? "Noelle & Nathan"
                            : "Tấn Cường & Lãm Nghi"}
                    </Link>

                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                        >
                            {language === "eng" ? "Home" : "Trang Chủ"}
                        </Link>

                        <Link
                            href="/wedding-day"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                        >
                            {language === "eng" ? "Wedding Schedule" : "Lịch Trình"}
                        </Link>

                        <Link
                            href="/venue-and-travel"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                        >
                            {language === "eng" ? "Venue & Travel" : "Địa Điểm"}
                        </Link>

                        <Link
                            href="/rsvp"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                        >
                            RSVP
                        </Link>

                        <Link
                            href="/gallery"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                        >
                            {language === "eng" ? "Gallery" : "Thư Viện Ảnh"}
                        </Link>

                        <Link
                            href="/faq"
                            className="font-body text-xs uppercase tracking-[0.18em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                        >
                            FAQ
                        </Link>
                    </div>

                    {/* MOBILE HAMBURGER */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((current) => !current)}
                        className="md:hidden text-3xl text-[#622825]"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-label={
                            language === "eng"
                                ? menuOpen
                                    ? "Close menu"
                                    : "Open menu"
                                : menuOpen
                                    ? "Đóng danh mục"
                                    : "Mở danh mục"
                        }
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* MOBILE MENU */}
                {menuOpen && (
                    <div
                        id="mobile-menu"
                        className="md:hidden mt-8 max-h-[calc(100vh-120px)] overflow-y-auto pb-5"
                    >
                        <div className="flex flex-col items-center gap-5 text-center">
                            <Link
                                href="/#mobile-home"
                                onClick={closeMenu}
                                className="font-body uppercase tracking-[0.15em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                            >
                                {language === "eng" ? "Home" : "Trang Chủ"}
                            </Link>

                            <Link
                                href="/#mobile-details"
                                onClick={closeMenu}
                                className="font-body uppercase tracking-[0.15em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                            >
                                {language === "eng" ? "The Details" : "Chi Tiết"}
                            </Link>

                            {language === "viet" && (
                                <Link
                                    href="/#mobile-family"
                                    onClick={closeMenu}
                                    className="font-body uppercase tracking-[0.15em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                                >
                                    Gia Đình Hai Bên
                                </Link>
                            )}

                            <Link
                                href="/#mobile-venue"
                                onClick={closeMenu}
                                className="font-body uppercase tracking-[0.15em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                            >
                                {language === "eng"
                                    ? "Venue"
                                    : "Địa Điểm"}
                            </Link>

                            <Link
                                href="/#mobile-schedule"
                                onClick={closeMenu}
                                className="font-body uppercase tracking-[0.15em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                            >
                                {language === "eng" ? "Wedding Schedule" : "Lịch Trình"}
                            </Link>

                            <Link
                                href="/#mobile-rsvp"
                                onClick={closeMenu}
                                className="font-body uppercase tracking-[0.15em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                            >
                                RSVP
                            </Link>

                            <Link
                                href="/#mobile-faq"
                                onClick={closeMenu}
                                className="font-body uppercase tracking-[0.15em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                            >
                                FAQ
                            </Link>

                            <Link
                                href="/#mobile-thank-you"
                                onClick={closeMenu}
                                className="font-body uppercase tracking-[0.15em] text-[#622825] transition hover:text-[var(--color-gold-accent)]"
                            >
                                {language === "eng" ? "Thank You" : "Lời Cảm Ơn"}
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}