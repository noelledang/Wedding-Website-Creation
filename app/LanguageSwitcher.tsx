"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="fixed bottom-24 right-6 z-[9999] flex items-center gap-2 rounded-full border border-[#d9a6a6] bg-white px-4 py-2 shadow-lg">

            <button
                type="button"
                onClick={() => setLanguage("eng")}
                className={`text-xs tracking-[0.2em] transition ${language === "eng"
                        ? "font-semibold text-[var(--color-gold-accent)]"
                        : "text-[#916A63]/50 hover:text-[#916A63]"
                    }`}
            >
                ENG
            </button>

            <span className="text-[#d9a6a6]">|</span>

            <button
                type="button"
                onClick={() => setLanguage("viet")}
                className={`text-xs tracking-[0.2em] transition ${language === "viet"
                        ? "font-semibold text-[var(--color-gold-accent)]"
                        : "text-[#916A63]/50 hover:text-[#916A63]"
                    }`}
            >
                VIET
            </button>

        </div>
    );
}