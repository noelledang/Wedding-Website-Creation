"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-[9999] flex items-center gap-2 rounded-full border border-[#916A63]/25 bg-[#FFF9F2]/90 px-3 py-2 shadow-[0_4px_18px_rgba(98,40,37,0.10)] backdrop-blur-md md:bottom-24 md:right-6 md:top-auto md:px-4">

            <button
                type="button"
                onClick={() => setLanguage("eng")}
                className={`text-xs tracking-[0.2em] transition ${language === "eng"
                        ? "font-semibold text-[var(--color-gold-accent)]"
                        : "text-[#916A63]/50 hover:text-[#916A63]"
                    }`}
            >
                US
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
                VN
            </button>

        </div>
    );
}