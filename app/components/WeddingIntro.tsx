"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageProvider";

type Language = "eng" | "viet";

export default function WeddingIntro() {
    const { language, setLanguage } = useLanguage();

    const [entering, setEntering] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        // Desktop: skip the intro completely
        if (window.innerWidth >= 768) {
            setFinished(true);
        }
    }, []);

    if (finished) {
        return null;
    }

    const handleLanguageSelect = (selectedLanguage: Language) => {
        const musicFile =
            selectedLanguage === "eng"
                ? "/music/wedding-song-eng.mp3"
                : "/music/wedding-song.mp3";

        // Stop existing music
        if (window.__weddingAudio) {
            window.__weddingAudio.pause();
            window.__weddingAudio.currentTime = 0;
        }

        // Create new audio
        const audio = new Audio(musicFile);

        audio.loop = true;
        audio.volume = 0.5;

        window.__weddingAudio = audio;

        audio
            .play()
            .then(() => {
                window.dispatchEvent(new Event("wedding-audio-changed"));
            })
            .catch((error) => {
                console.error("Music could not start:", error);
            });

        setLanguage(selectedLanguage);

        setEntering(true);

        setTimeout(() => {
            setFinished(true);
        }, 1000);
    };

    return (
        <div
            className={`fixed inset-0 z-[10000] overflow-hidden bg-[#FDEFE8] transition-opacity duration-1000 md:hidden ${entering ? "opacity-0" : "opacity-100"
                }`}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/wedding-intro/intro-2.jpg"
                    alt="Welcome to Our Wedding"
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Header */}
            <div className="absolute top-32 left-1/2 z-10 w-full -translate-x-1/2 px-6 text-center">
                <div className="relative inline-flex items-center gap-3 px-6 py-2">
                    <div className="absolute inset-0 rounded-full bg-[#FDEFE8]/75 blur-[1px]" />

                    <span className="relative text-xs text-[#D4AF37]">❦</span>

                    <p className="relative font-body text-sm uppercase tracking-[0.15em] text-[#4A2420]">
                        Welcome to Our Wedding
                    </p>

                    <span className="relative text-xs text-[#D4AF37]">❦</span>
                </div>
            </div>
            {/* Bottom Content */}
            <div className="absolute bottom-16 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col items-center px-6 text-center">
            
                <div className="mb-6 relative inline-flex items-center gap-3 px-7 py-2">
                    <div className="absolute inset-0 rounded-full bg-[#FDEFE8]/75 blur-[1px]" />

                    <span className="relative text-xs text-[#D4AF37]">❦</span>

                    <p className="relative font-body text-sm uppercase tracking-[0.35em] text-[#4A2420]">
                        03.13.2027
                    </p>

                    <span className="relative text-xs text-[#D4AF37]">❦</span>
                </div>
                
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => handleLanguageSelect("eng")}
                        className={`min-w-[110px] rounded-full border px-5 py-2.5 font-[var(--font-body)] text-sm uppercase tracking-[0.18em] transition-all duration-300 ${language === "eng"
                                ? "border-[#D4AF37] bg-[#D4AF37] text-white shadow-lg"
                                : "border-white/80 bg-white/20 text-white backdrop-blur-sm"
                            }`}
                    >
                        English
                    </button>

                    <button
                        type="button"
                        onClick={() => handleLanguageSelect("viet")}
                        className={`min-w-[110px] rounded-full border px-5 py-2.5 font-[var(--font-body)] text-sm uppercase tracking-[0.18em] transition-all duration-300 ${language === "viet"
                                ? "border-[#D4AF37] bg-[#D4AF37] text-white shadow-lg"
                                : "border-white/80 bg-white/20 text-white backdrop-blur-sm"
                            }`}
                    >
                        Tiếng Việt
                    </button>
                </div>
            </div>
        </div>
    );
}