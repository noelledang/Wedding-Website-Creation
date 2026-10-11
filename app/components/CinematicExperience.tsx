"use client";

import { useEffect, useState } from "react";

/**
 * Decorative, non-interactive cinematic layer.
 * It never intercepts clicks, modifies forms, or controls audio.
 */
export default function CinematicExperience() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches);
    update();
    media.addEventListener("change", update);

    if (media.matches) return () => media.removeEventListener("change", update);

    const sections = Array.from(document.querySelectorAll("main section"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("cinematic-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      sections.forEach((section) => section.classList.remove("cinematic-visible"));
      media.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className="cinematic-ambient" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index} className="cinematic-spark" style={{
            left: `${9 + index * 10}%`,
            top: `${12 + (index * 29) % 72}%`,
            animationDelay: `${index * -0.83}s`,
            animationDuration: `${4 + (index % 4)}s`,
          }} />
        ))}
      </div>
      <style jsx global>{`
        .cinematic-ambient { position: fixed; inset: 0; z-index: 15; pointer-events: none; overflow: hidden; }
        .cinematic-spark { position: absolute; width: 3px; height: 3px; border-radius: 50%;
          background: #f7e6b0; box-shadow: 0 0 9px 3px rgba(212,175,55,.3);
          opacity: 0; animation: cinematic-twinkle 5s ease-in-out infinite; }
        @keyframes cinematic-twinkle { 0%,100% { opacity: 0; transform: scale(.5); }
          45% { opacity: .65; transform: scale(1.25); } }
        main section.cinematic-visible > .relative.z-10,
        main section.cinematic-visible > .relative.z-20 {
          animation: cinematic-enter 1.25s cubic-bezier(.2,.7,.2,1) both;
        }
        @keyframes cinematic-enter {
          from { opacity: .35; transform: translateY(18px); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cinematic-ambient, .cinematic-spark { display: none !important; }
          main section.cinematic-visible > .relative.z-10,
          main section.cinematic-visible > .relative.z-20 { animation: none !important; }
        }
      `}</style>
    </>
  );
}
