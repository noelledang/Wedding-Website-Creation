"use client";

import { useEffect, useState } from "react";

type MusicPlayerProps = {
  language: "eng" | "viet";
};

export default function MusicPlayer({
  language,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Keep the player synced with the actual audio
  useEffect(() => {
    const checkAudioState = () => {
      const audio = window.__weddingAudio;

      if (audio) {
        setIsPlaying(!audio.paused);
      }
    };

    checkAudioState();

    const interval = setInterval(checkAudioState, 200);

    return () => clearInterval(interval);
  }, [language]);

  // Switch music when the language changes
  useEffect(() => {
    const audio = window.__weddingAudio;

    if (!audio) return;

    const newSource =
      language === "eng"
        ? "/music/wedding-song-eng.mp3"
        : "/music/wedding-song.mp3";

    const currentSource = audio.src;

    if (currentSource.endsWith(newSource)) {
      return;
    }

    const wasPlaying = !audio.paused;

    audio.pause();

    audio.src = newSource;
    audio.load();

    if (wasPlaying) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error: unknown) => {
          console.error("Music could not switch:", error);
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(false);
    }
  }, [language]);

  const toggleMusic = async () => {
    const audio = window.__weddingAudio;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Music could not play:", error);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={isPlaying ? "Turn music off" : "Turn music on"}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 z-[999999] flex h-12 w-12 items-center justify-center rounded-full border border-[#916A63]/35 bg-[#FFF9F2]/90 text-[22px] text-[#B89435] shadow-[0_5px_18px_rgba(98,40,37,0.14)] backdrop-blur-md md:bottom-6 md:left-auto md:right-6 md:h-[60px] md:w-[60px] md:border-[3px] md:border-[#d9a6a6] md:bg-white md:text-[28px]"
    >
      <span className="relative flex items-center justify-center leading-none">
        ♪
        {!isPlaying && (
          <span className="absolute h-[2px] w-6 -rotate-45 bg-[#B66F72] md:w-7" />
        )}
      </span>
    </button>
  );
}