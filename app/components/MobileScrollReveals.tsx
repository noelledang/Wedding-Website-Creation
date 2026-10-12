"use client";
import { useEffect } from "react";

/** Mobile-only, one-time, progressive enhancement of section headings. */
export default function MobileScrollReveals() {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px) and (prefers-reduced-motion: no-preference)").matches) return;
    const selectors = [
      "#mobile-venue h1", "#mobile-venue h1 + p",
      "#mobile-schedule h2", "#mobile-schedule h2 + p",
      "#mobile-rsvp section:first-child h1",
      "#mobile-rsvp section:first-child h1 ~ p",
      "#mobile-faq section h1", "#mobile-faq section h1 + p"
    ];
    const elements = selectors.flatMap(s => Array.from(document.querySelectorAll<HTMLElement>(s)));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("mobile-cinematic-reveal");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.2, rootMargin: "0px 0px -4% 0px" });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <style jsx global>{`
    @media (max-width: 767px) and (prefers-reduced-motion: no-preference) {
      .mobile-cinematic-reveal { animation: mobile-cinematic-rise 900ms cubic-bezier(.22,.72,.28,1) both; }
      #mobile-venue h1 + p.mobile-cinematic-reveal,
      #mobile-schedule h2 + p.mobile-cinematic-reveal,
      #mobile-rsvp section:first-child h1 ~ p.mobile-cinematic-reveal,
      #mobile-faq section h1 + p.mobile-cinematic-reveal { animation-delay: 200ms; }
      @keyframes mobile-cinematic-rise {
        from { opacity: .35; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
    }
  `}</style>;
}
