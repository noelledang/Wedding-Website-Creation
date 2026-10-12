"use client";
import { useEffect } from "react";

/**
 * Phase 2 mobile-only effects. Progressive enhancement: content is always
 * readable and interactive; no existing petals, lights or form logic changes.
 */
export default function MobileScrollReveals() {
  useEffect(() => {
    const eligible = window.matchMedia("(max-width: 767px) and (prefers-reduced-motion: no-preference)");
    if (!eligible.matches || !("IntersectionObserver" in window)) return;

    // Include all mobile content sections, excluding slideshow and hero.
    const roots = [
      "#mobile-details", "#mobile-family", "#mobile-venue",
      "#mobile-schedule", "#mobile-rsvp", "#mobile-faq",
      "#mobile-thank-you"
    ];
    const targets = new Set<HTMLElement>();
    for (const selector of roots) {
      const root = document.querySelector<HTMLElement>(selector);
      if (!root) continue;
      // Headings, descriptive paragraphs, and section-specific content.
      root.querySelectorAll<HTMLElement>("h1, h2, h3, p").forEach(el => {
        // Never animate interactive RSVP form labels, instructions or FAQ answers.
        if (selector === "#mobile-rsvp" && !el.closest("section:first-child")) return;
        if (selector === "#mobile-faq" && el.closest("button, [role='region']")) return;
        if (selector === "#mobile-schedule" && el.closest(".space-y-10")) return;
        targets.add(el);
      });
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("mobile-cinematic-reveal");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(el => observer.observe(el));

    // Draw a scroll-following gold line along the existing schedule, without
    // changing its text, event alignment or desktop markup.
    const timeline = document.querySelector<HTMLElement>("#mobile-schedule .space-y-10");
    const rows = timeline ? Array.from(timeline.children).filter(
      (node): node is HTMLElement => node instanceof HTMLElement
    ) : [];
    let frame = 0;
    let rail: HTMLDivElement | null = null;
    let fill: HTMLDivElement | null = null;
    if (timeline && rows.length >= 2) {
      timeline.classList.add("mobile-gold-timeline");
      rail = document.createElement("div");
      rail.className = "mobile-gold-rail";
      fill = document.createElement("div");
      fill.className = "mobile-gold-fill";
      rail.appendChild(fill);
      timeline.prepend(rail);

      const update = () => {
        frame = 0;
        if (!eligible.matches || !timeline || !rail || !fill) return;
        const box = timeline.getBoundingClientRect();
        const first = rows[0].getBoundingClientRect();
        const last = rows[rows.length - 1].getBoundingClientRect();
        const start = first.top - box.top + 18;
        const end = last.top - box.top + 18;
        const length = Math.max(1, end - start);
        rail.style.top = start + "px";
        rail.style.height = length + "px";
        // Progress follows the visitor's reading position in the viewport.
        const readingY = window.innerHeight * 0.67;
        const current = Math.max(0, Math.min(length, readingY - (box.top + start)));
        fill.style.height = (current / length * 100) + "%";
        rows.forEach(row => {
          const rect = row.getBoundingClientRect();
          row.classList.toggle("mobile-gold-reached", rect.top + 18 <= readingY);
        });
      };
      const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      const cleanupTimeline = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) cancelAnimationFrame(frame);
        rail?.remove();
        timeline.classList.remove("mobile-gold-timeline");
        rows.forEach(row => row.classList.remove("mobile-gold-reached"));
      };
      // Thank You glow: activated once when its section becomes visible.
      const thankYou = document.querySelector<HTMLElement>("#mobile-thank-you");
      const finaleObserver = thankYou ? new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          thankYou.classList.add("mobile-finale-visible");
          finaleObserver?.disconnect();
        }
      }, { threshold: 0.2 }) : null;
      if (thankYou) finaleObserver?.observe(thankYou);
      return () => {
        observer.disconnect();
        finaleObserver?.disconnect();
        thankYou?.classList.remove("mobile-finale-visible");
        cleanupTimeline();
      };
    }
    const thankYou = document.querySelector<HTMLElement>("#mobile-thank-you");
    const finaleObserver = thankYou ? new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        thankYou.classList.add("mobile-finale-visible");
        finaleObserver?.disconnect();
      }
    }, { threshold: 0.2 }) : null;
    if (thankYou) finaleObserver?.observe(thankYou);
    return () => { observer.disconnect(); finaleObserver?.disconnect(); thankYou?.classList.remove("mobile-finale-visible"); };
  }, []);

  return <style jsx global>{`
    @media (max-width: 767px) and (prefers-reduced-motion: no-preference) {
      .mobile-cinematic-reveal {
        animation: mobile-cinematic-rise 1050ms cubic-bezier(.2,.72,.22,1) both;
      }
      @keyframes mobile-cinematic-rise {
        from { opacity: .18; transform: translateY(18px); filter: blur(1.2px); }
        to { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      #mobile-schedule .mobile-gold-timeline { position: relative; }
      #mobile-schedule .mobile-gold-rail {
        position: absolute; left: 109px; width: 2px; pointer-events: none;
        background: rgba(145,106,99,.23); z-index: 2; border-radius: 8px;
      }
      #mobile-schedule .mobile-gold-fill {
        width: 100%; height: 0; border-radius: 8px;
        background: linear-gradient(to bottom,#d4af37,#ad8031);
        box-shadow: 0 0 8px rgba(212,175,55,.6);
      }
      #mobile-schedule .mobile-gold-timeline > div:not(.mobile-gold-rail) {
        transition: filter 500ms ease;
      }
      #mobile-schedule .mobile-gold-reached > div:nth-child(3) h3 {
        color: #9a6a16;
        text-shadow: 0 0 12px rgba(212,175,55,.28);
        transition: color 500ms ease, text-shadow 500ms ease;
      }
      #mobile-thank-you::after {
        content: ""; position: absolute; z-index: 1; pointer-events: none;
        width: 80vw; height: 55vw; max-height: 350px; left: 10%; top: 32%;
        border-radius: 50%;
        background: radial-gradient(ellipse,rgba(244,208,135,.26),rgba(244,208,135,.09) 45%,transparent 72%);
        opacity: 0; transform: scale(.85);
        transition: opacity 2000ms ease, transform 2300ms ease;
      }
      #mobile-thank-you.mobile-finale-visible::after { opacity: 1; transform: scale(1); }
      #mobile-thank-you .relative.z-10 { position: relative; z-index: 2; }
    }
    @media (prefers-reduced-motion: reduce) {
      #mobile-schedule .mobile-gold-rail { display: none; }
      #mobile-thank-you::after { display: none; }
    }
  `}</style>;
}
