"use client";

import MusicPlayer from "./MusicPlayer";
import { useLanguage } from "./LanguageProvider";

export default function MusicPlayerWrapper() {
    const { language } = useLanguage();

    return <MusicPlayer language={language} />;
}