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
        .catch((error) => {
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
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999999,
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "white",
        border: "3px solid #d9a6a6",
        fontSize: "28px",
        color: "#D4AF37",
        cursor: "pointer",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      }}
    >
      <span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        ♪

        {!isPlaying && (
          <span
            style={{
              position: "absolute",
              width: "28px",
              height: "2px",
              background: "#d9a6a6",
              transform: "rotate(-45deg)",
            }}
          />
        )}
      </span>
    </button>
  );
}