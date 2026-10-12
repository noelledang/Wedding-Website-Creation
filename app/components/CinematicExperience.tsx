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
      <div className="cinematic-petals" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className="cinematic-petal" style={{
            left: `${5 + index * 9.5}%`,
            width: `${13 + (index % 4) * 4}px`,
            height: `${19 + (index % 4) * 5}px`,
            animationDelay: `${-index * 2.7}s`,
            animationDuration: `${13 + (index % 5) * 3}s`,
            opacity: 0.62 + (index % 3) * 0.1,
          }} />
        ))}
      </div>
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
        .cinematic-petals { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 16; }
        .cinematic-petal {
          position: absolute; top: -45px; display: block;
          border-radius: 8% 75% 12% 75%;
          background: radial-gradient(ellipse at 28% 24%, #fff0e9 0%, #e9a9b1 42%, #ad5268 82%, #8c354d 100%);
          box-shadow: inset -2px -2px 3px rgba(103,37,57,.18), 0 2px 4px rgba(90,35,55,.12);
          animation: cinematic-petal-fall linear infinite;
          will-change: transform;
        }
        .cinematic-petal:nth-child(3n) { background: radial-gradient(ellipse at 25% 20%, #fff7ed, #f3c5c6 48%, #c7778c 100%); }
        .cinematic-petal:nth-child(4n) { background: radial-gradient(ellipse at 25% 20%, #e9a0ae, #a34762 65%, #742a46 100%); }
        @keyframes cinematic-petal-fall {
          0% { transform: translate3d(-12px,-8vh,0) rotate(0deg) rotateY(0deg); }
          25% { transform: translate3d(28px,28vh,0) rotate(95deg) rotateY(65deg); }
          50% { transform: translate3d(-22px,58vh,0) rotate(185deg) rotateY(150deg); }
          75% { transform: translate3d(24px,87vh,0) rotate(270deg) rotateY(240deg); }
          100% { transform: translate3d(-10px,120vh,0) rotate(370deg) rotateY(360deg); }
        }
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

        @media (min-width: 768px) {
          .cinematic-ambient, .cinematic-spark, .cinematic-petals { display: none !important; }
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
