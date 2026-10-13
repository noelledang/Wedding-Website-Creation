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
        <div className={`fixed inset-0 z-[10000] overflow-hidden bg-[#FFF7F1] transition-opacity duration-1000 md:hidden ${entering ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <div className="absolute inset-0 wedding-intro-backdrop" aria-hidden="true">
                <img src="/wedding-intro/floral-welcome.png" alt="" className="h-full w-full object-fill" />
            </div>
            <div className="absolute inset-0 pointer-events-none wedding-intro-light" aria-hidden="true" />
            <div className="relative z-10 mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center px-12 text-center">
                <div className="w-full wedding-intro-heading">
                    <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#966D45]">Welcome to</p>
                    <h1 className="mt-2 font-heading text-[clamp(24px,7vw,37px)] uppercase tracking-[0.08em] text-[#7C4940]">Our Wedding</h1>
                </div>
                <div className="mt-8 w-full wedding-intro-names">
                    <p className="font-great-vibes text-[clamp(54px,14vw,80px)] leading-[1.1] text-[#702E32]">Noelle</p>
                    <p className="my-1 font-heading text-3xl text-[#AC8554]">&amp;</p>
                    <p className="font-great-vibes text-[clamp(54px,14vw,80px)] leading-[1.1] text-[#702E32]">Nathan</p>
                </div>
                <p className="mt-7 font-body text-xs tracking-[0.35em] text-[#855E48] wedding-intro-date">03.13.2027</p>
                <div className="mt-12 w-full wedding-intro-actions">
                    <p className="mb-5 font-body text-[10px] uppercase tracking-[0.19em] text-[#794C45]">Please select your language</p>
                    <div className="flex items-center justify-center gap-3">
                        <button type="button" disabled={entering} onClick={() => handleLanguageSelect("eng")}
                            className={`min-w-0 flex-1 border border-[#B89560] bg-[#FFF5ED]/90 px-3 py-3 font-body text-[11px] uppercase tracking-[0.1em] text-[#733D3D] shadow-[0_3px_12px_rgba(110,60,50,.08)] transition-colors active:bg-[#F5DED7] ${language === "eng" ? "ring-1 ring-[#B89560]" : ""}`}>
                            English
                        </button>
                        <button type="button" disabled={entering} onClick={() => handleLanguageSelect("viet")}
                            className={`min-w-0 flex-1 border border-[#B89560] bg-[#FFF5ED]/90 px-3 py-3 font-body text-[11px] uppercase tracking-[0.05em] text-[#733D3D] shadow-[0_3px_12px_rgba(110,60,50,.08)] transition-colors active:bg-[#F5DED7] ${language === "viet" ? "ring-1 ring-[#B89560]" : ""}`}>
                            Tiếng Việt
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @media (max-width: 767px) and (prefers-reduced-motion: no-preference) {
                    .wedding-intro-backdrop { animation: intro-bloom 2.6s ease-out both; transform-origin: center; }
                    .wedding-intro-light { background: radial-gradient(ellipse at center, rgba(255,246,222,.26), transparent 70%); animation: intro-light 2.4s ease-out both; }
                    .wedding-intro-heading { animation: intro-rise 1s .4s both; }
                    .wedding-intro-names { animation: intro-rise 1.3s .85s both; }
                    .wedding-intro-date { animation: intro-rise .9s 1.35s both; }
                    .wedding-intro-actions { animation: intro-rise .9s 1.7s both; }
                    @keyframes intro-bloom { from { opacity: .25; transform: scale(1.045); filter: blur(4px); } to { opacity: 1; transform: scale(1); filter: blur(0); } }
                    @keyframes intro-light { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes intro-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                }
            `}</style>
        </div>
    );
}
