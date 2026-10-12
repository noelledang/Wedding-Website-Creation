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
            width: `${10 + (index % 4) * 2}px`,
            height: `${11 + (index % 4) * 2}px`,
            animationDelay: `${-index * 3.9}s`,
            animationDuration: `${23 + (index % 5) * 3}s`,
            opacity: 0.78 + (index % 3) * 0.07,
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
          border-radius: 65% 45% 58% 42% / 58% 48% 62% 42%;
          background: #f1c0cd;
          animation: cinematic-petal-fall linear infinite;
          will-change: transform;
        }
        .cinematic-petal:nth-child(3n) { background: #f8dce3; }
        .cinematic-petal:nth-child(4n) { background: #e8adb9; }
        .cinematic-petal:nth-child(7n) { background: #fff0ed; }
        .cinematic-petal:nth-child(even) { animation-name: cinematic-petal-fall-alt; }
        @keyframes cinematic-petal-fall {
          0% { transform: translate3d(-8px,-6vh,0) rotate(-16deg) rotateY(0deg); }
          20% { transform: translate3d(10px,20vh,0) rotate(12deg) rotateY(25deg); }
          42% { transform: translate3d(-9px,46vh,0) rotate(-9deg) rotateY(52deg); }
          65% { transform: translate3d(13px,76vh,0) rotate(18deg) rotateY(83deg); }
          82% { transform: translate3d(1px,99vh,0) rotate(-7deg) rotateY(108deg); }
          100% { transform: translate3d(8px,125vh,0) rotate(14deg) rotateY(132deg); }
        }
        @keyframes cinematic-petal-fall-alt {
          0% { transform: translate3d(7px,-6vh,0) rotate(12deg) rotateY(30deg); }
          22% { transform: translate3d(-13px,22vh,0) rotate(-14deg) rotateY(55deg); }
          45% { transform: translate3d(5px,50vh,0) rotate(8deg) rotateY(80deg); }
          67% { transform: translate3d(-11px,78vh,0) rotate(-12deg) rotateY(105deg); }
          85% { transform: translate3d(3px,102vh,0) rotate(9deg) rotateY(127deg); }
          100% { transform: translate3d(-6px,125vh,0) rotate(-10deg) rotateY(145deg); }
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
