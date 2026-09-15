"use client";

import { useEffect, useRef, useState } from "react";

type MusicPlayerProps = {
  language: "eng" | "viet";
};

export default function MusicPlayer({ language }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.5;

    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const handleVisibilityChange = () => {
      if (isMobile && document.hidden) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      audio.pause();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const wasPlaying = isPlaying;

    audio.src =
      language === "eng"
        ? "/music/wedding-song-eng.mp3"
        : "/music/wedding-song.mp3";

    audio.load();

    if (wasPlaying) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Music could not play:", error);
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(false);
    }
  }, [language]);

  const toggleMusic = async () => {
    const audio = audioRef.current;

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
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={
          language === "eng"
            ? "/music/wedding-song-eng.mp3"
            : "/music/wedding-song.mp3"
        }
      />

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Turn music off" : "Turn music on"}
        className={`fixed bottom-6 right-6 z-[9999] flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d9a6a6] bg-white shadow-lg transition-transform duration-300 hover:scale-105 ${isPlaying ? "music-pulse" : ""
          }`}
      >
        <span className="relative flex items-center justify-center text-2xl leading-none text-[var(--color-gold-accent)]">
          ♪

          {!isPlaying && (
            <span className="absolute h-[2px] w-7 rotate-[-45deg] bg-[#d9a6a6]" />
          )}
        </span>
      </button>
    </>
  );
}