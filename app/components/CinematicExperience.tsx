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
    const mobile = window.matchMedia("(max-width: 767px)");
    const update = () => setEnabled(!media.matches && mobile.matches);
    update();
    media.addEventListener("change", update);
    mobile.addEventListener("change", update);

    if (media.matches) return () => { media.removeEventListener("change", update); mobile.removeEventListener("change", update); };

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
      mobile.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className="cinematic-ambient" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
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
        .cinematic-spark { position: absolute; width: 5px; height: 5px; border-radius: 50%;
          background: #f7e6b0; box-shadow: 0 0 9px 3px rgba(212,175,55,.3);
          opacity: 0; animation: cinematic-twinkle 5s ease-in-out infinite; }
        @keyframes cinematic-twinkle { 0%,100% { opacity: 0; transform: scale(.5); }
          45% { opacity: .9; transform: scale(1.6); } }
        main section.cinematic-visible > .relative.z-10,
        main section.cinematic-visible > .relative.z-20 {
          animation: cinematic-enter 1.25s cubic-bezier(.2,.7,.2,1) both;
        }
        @keyframes cinematic-enter {
          from { opacity: .35; transform: translateY(18px); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @media (max-width: 767px) {
          /* Reuse the site's existing floral corner artwork. */
          #mobile-home img[src="/images/slideshow-floral-corner.png"] {
            transform-origin: center center;
            animation: cinematic-floral-breathe 5s ease-in-out infinite alternate;
          }
          #mobile-home img[src="/images/slideshow-floral-corner.png"].rotate-180 {
            animation-name: cinematic-floral-breathe-reverse;
          }
          #mobile-home .relative.aspect-\\[2\\/3\\] img {
            animation: cinematic-photo-breathe 7s ease-in-out infinite alternate;
          }
          #mobile-home .relative.z-10 {
            animation: cinematic-gallery-reveal 1.8s ease-out both;
          }
          @keyframes cinematic-floral-breathe {
            from { transform: rotate(-5deg) scale(.94); }
            to { transform: rotate(4deg) scale(1.08); }
          }
          @keyframes cinematic-floral-breathe-reverse {
            from { transform: rotate(175deg) scale(.94); }
            to { transform: rotate(184deg) scale(1.08); }
          }
          @keyframes cinematic-photo-breathe {
            from { transform: scale(1); }
            to { transform: scale(1.045); }
          }
          @keyframes cinematic-gallery-reveal {
            from { opacity: .3; transform: translateY(26px) scale(.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        }

        @media (max-width: 767px) {
          /* Hero follows the slideshow inside main, not inside #mobile-home. */
          main > section.md\\:hidden::before,
          main > section.md\\:hidden::after {
            content: ""; position: absolute; z-index: 5; pointer-events: none;
            width: min(36vw, 160px); height: 175px;
            background: url("/images/slideshow-floral-corner.png") center / contain no-repeat;
            opacity: 0;
          }
          main > section.md\\:hidden::before { top: 1%; left: -2%; }
          main > section.md\\:hidden::after { bottom: 1%; right: -2%; }
          main > section.md\\:hidden.cinematic-visible::before {
            animation: rose-left 2.8s ease-out .1s both;
          }
          main > section.md\\:hidden.cinematic-visible::after {
            animation: rose-right 2.8s ease-out .35s both;
          }
          main > section.md\\:hidden.cinematic-visible h1 {
            animation: name-reveal 3s ease-in-out .3s both;
          }
          @keyframes rose-left {
            from { opacity: 0; transform: translate(-20px,-15px) rotate(-25deg) scale(.5); }
            to { opacity: .9; transform: translate(0,0) rotate(-4deg) scale(1); }
          }
          @keyframes rose-right {
            from { opacity: 0; transform: translate(20px,15px) rotate(150deg) scale(.5); }
            to { opacity: .9; transform: translate(0,0) rotate(180deg) scale(1); }
          }
          @keyframes name-reveal {
            0% { opacity: .4; text-shadow: 0 0 0 transparent; }
            55% { opacity: 1; text-shadow: 0 0 20px rgba(255,225,151,.85); }
            100% { opacity: 1; text-shadow: 0 0 2px rgba(212,175,55,.2); }
          }
        }
        @media (min-width: 768px) {
          .cinematic-ambient, .cinematic-spark { display: none !important; }
          main section.cinematic-visible > .relative.z-10,
          main section.cinematic-visible > .relative.z-20 { animation: none !important; }
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
