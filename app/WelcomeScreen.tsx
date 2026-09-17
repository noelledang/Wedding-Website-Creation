"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type Language = "eng" | "viet";

export default function WelcomeScreen() {
    const { setLanguage } = useLanguage();

    const [visible, setVisible] = useState(true);
    const [closing, setClosing] = useState(false);
    const [savedLanguage, setSavedLanguage] = useState<Language | null>(null);
    const [storageLoaded, setStorageLoaded] = useState(false);

    useEffect(() => {
        const storedLanguage = localStorage.getItem("wedding-language");

        if (storedLanguage === "eng" || storedLanguage === "viet") {
            setSavedLanguage(storedLanguage);
        }

        setStorageLoaded(true);
    }, []);

    const handleLanguageSelect = (selectedLanguage: Language) => {
        const musicFile =
            selectedLanguage === "eng"
                ? "/music/wedding-song-eng.mp3"
                : "/music/wedding-song.mp3";

        // Stop any existing wedding music
        if (window.__weddingAudio) {
            window.__weddingAudio.pause();
            window.__weddingAudio.currentTime = 0;
        }

        // Create the correct audio for this language
        const audio = new Audio(musicFile);

        audio.loop = true;
        audio.volume = 0.5;

        // Store it globally so MusicPlayer can control it later
        window.__weddingAudio = audio;

        // Start music directly from the user's button click
        audio
            .play()
            .then(() => {
                window.dispatchEvent(new Event("wedding-audio-changed"));
            })
            .catch((error) => {
                console.error("Music could not start:", error);
            });

        // Save language
        localStorage.setItem("wedding-language", selectedLanguage);

        // Update website language
        setLanguage(selectedLanguage);

        // Fade out welcome screen
        setClosing(true);

        setTimeout(() => {
            setVisible(false);
        }, 700);
    };

    if (!storageLoaded || !visible) {
        return null;
    }

    const isVietnamese = savedLanguage === "viet";

    return (
        <div
            className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#fbf7f5] px-6 transition-opacity duration-700 ${closing ? "opacity-0" : "opacity-100"
                }`}
        >
            <div className="relative w-full max-w-xl text-center">

                {/* TOP DECORATION */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <span className="h-px w-16 bg-[#916A63]/30" />

                    <span className="text-xl text-[#D4AF37]">
                        ❦
                    </span>

                    <span className="h-px w-16 bg-[#916A63]/30" />
                </div>

                {/* WELCOME */}
                

                <h1 className="font-heading mt-4 text-5xl text-[#622825] md:text-6xl">
                    {isVietnamese
                        ? "Chào mừng đến với đám cưới của chúng tôi"
                        : "Welcome to Our Wedding"}
                </h1>

                {/* FIRST VISIT */}
                {!savedLanguage && (
                    <>
                        <p className="font-script mt-6 text-3xl text-[#916A63]">
                            Pick a language
                        </p>

                        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
                            <button
                                type="button"
                                onClick={() => handleLanguageSelect("eng")}
                                className="w-56 rounded-full border border-[#d9a6a6] bg-white px-8 py-4 font-body text-sm uppercase tracking-[0.2em] text-[#622825] shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                            >
                                English
                            </button>

                            <button
                                type="button"
                                onClick={() => handleLanguageSelect("viet")}
                                className="w-56 rounded-full border border-[#d9a6a6] bg-white px-8 py-4 font-body text-sm uppercase tracking-[0.2em] text-[#622825] shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                            >
                                Tiếng Việt
                            </button>
                        </div>
                    </>
                )}

                {/* RETURNING VISITOR */}
                {savedLanguage && (
                    <>
                        <p className="font-script mt-6 text-3xl text-[#916A63]">
                            {isVietnamese ? "Chào mừng trở lại" : "Welcome back"}
                        </p>

                        <button
                            type="button"
                            onClick={() => handleLanguageSelect(savedLanguage)}
                            className="mt-12 w-72 rounded-full border border-[#d9a6a6] bg-white px-8 py-4 font-body text-sm uppercase tracking-[0.2em] text-[#622825] shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                        >
                            {isVietnamese
                                ? "Tiếp tục bằng Tiếng Việt"
                                : "Continue in English"}
                        </button>
                    </>
                )}

                {/* BOTTOM DECORATION */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <span className="h-px w-16 bg-[#916A63]/30" />

                    <span className="text-sm text-[#916A63]">
                        ♥
                    </span>

                    <span className="h-px w-16 bg-[#916A63]/30" />
                </div>

            </div>
        </div>
    );
}