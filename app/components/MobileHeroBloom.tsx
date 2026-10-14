"use client";

import { useEffect, useRef, useState } from "react";

/** Mobile-only decoration. Never intercepts taps, changes text, or controls audio. */
export default function MobileHeroBloom() {
  const anchor = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    const target = anchor.current;
    if (!target) return () => motion.removeEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(target);
    return () => { observer.disconnect(); motion.removeEventListener("change", sync); };
  }, []);

  return (
    <div ref={anchor} className="pointer-events-none absolute inset-0 z-[5] overflow-hidden md:hidden" aria-hidden="true">
      <img src="/images/slideshow-floral-corner.png" alt="" className={`bloom-corner bloom-left ${visible && !reduced ? "bloom-active" : ""}`} />
      <img src="/images/slideshow-floral-corner.png" alt="" className={`bloom-corner bloom-right ${visible && !reduced ? "bloom-active" : ""}`} />
      <div className={`bloom-light ${visible && !reduced ? "bloom-active" : ""}`} />
      <style jsx>{`
        .bloom-corner { position:absolute; width:clamp(125px,42vw,200px); height:auto; object-fit:contain; opacity:0; }
        .bloom-left { top:3%; left:-7%; transform:translate(-30px,-20px) rotate(-30deg) scale(.5); }
        .bloom-right { bottom:4%; right:-7%; transform:translate(30px,20px) rotate(145deg) scale(.5); }
        .bloom-left.bloom-active { animation: bloom-in-left 3s cubic-bezier(.2,.7,.2,1) forwards; }
        .bloom-right.bloom-active { animation: bloom-in-right 3s cubic-bezier(.2,.7,.2,1) .35s forwards; }
        .bloom-light { position:absolute; inset:20% 0; opacity:0;
          background:radial-gradient(ellipse at center, rgba(255,227,159,.28), transparent 65%); }
        .bloom-light.bloom-active { animation: bloom-glow 3.2s ease-in-out .3s forwards; }
        @keyframes bloom-in-left { to { opacity:.95; transform:translate(0,0) rotate(-5deg) scale(1); } }
        @keyframes bloom-in-right { to { opacity:.95; transform:translate(0,0) rotate(180deg) scale(1); } }
        @keyframes bloom-glow { 0% { opacity:0; } 50% { opacity:1; } 100% { opacity:.4; } }
        @media (prefers-reduced-motion:reduce) { .bloom-corner,.bloom-light { animation:none!important; opacity:0!important; } }
      `}</style>
    </div>
  );
}
