"use client";

import { useEffect, useState } from "react";

const ENVELOPE_ART = "/wedding-intro/wedding-envelope-approved.webp";
const INVITATION_ART = "/wedding-intro/floral-welcome.png";

export default function EnvelopeOpening({ onDone }: { onDone: () => void }) {
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onDone, 5100);
    return () => window.clearTimeout(timer);
  }, [opening, onDone]);

  const skip = () => {
    try { sessionStorage.setItem("wedding-envelope-seen", "1"); } catch {}
    onDone();
  };

  const open = () => {
    if (opening) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      skip();
      return;
    }
    try { sessionStorage.setItem("wedding-envelope-seen", "1"); } catch {}
    setOpening(true);
  };

  return (
    <div className={`wedding-envelope ${opening ? "is-opening" : ""}`} role="dialog" aria-modal="true" aria-label="Wedding invitation">
      <div className="art-stage">
        {/* The lower paper and florals stay fixed; the entire closed flap is a matching artwork layer. */}
        <div className="paper-back" aria-hidden="true" />
        <div className="floral-lining" aria-hidden="true" />
        <div className="warm-glow" aria-hidden="true" />
        <div className="invitation" aria-hidden="true">
          <div className="invitation-words">
            <span>WELCOME TO OUR WEDDING</span>
            <strong>Noelle <em>&amp;</em> Nathan</strong>
            <span>03 · 13 · 2027</span>
          </div>
        </div>
        <div className="front-pocket" aria-hidden="true" />
        <div className="flap-perspective" aria-hidden="true">
          <div className="flap-art" />
        </div>
        {!opening && (
          <button className="seal-button" type="button" onClick={open} aria-label="Press the N and N wax seal to open the invitation" />
        )}
      </div>
      {!opening && <p className="seal-instruction">Touch the seal to open</p>}
      <button className="skip-intro" type="button" onClick={skip}>Skip introduction</button>
      <style jsx>{`
        .wedding-envelope { position:fixed; inset:0; z-index:10001; overflow:hidden; background:#f2d3ce; color:#703a3b; isolation:isolate; }
        .art-stage { position:absolute; inset:0; overflow:hidden; perspective:1100px; }
        .paper-back,.floral-lining,.front-pocket,.flap-art { position:absolute; inset:0; background-image:url("${ENVELOPE_ART}"); background-position:center center; background-size:100% 100%; background-repeat:no-repeat; }
        .paper-back { z-index:0; }
        .floral-lining { z-index:1; background-image:linear-gradient(160deg,#fbe7df8c,#f8d4ce8c),url("${INVITATION_ART}"); background-size:cover,100% 100%; clip-path:polygon(0 0,100% 0,100% 58%,50% 75%,0 58%); }
        .warm-glow { position:absolute; z-index:2; left:-22%; top:12%; width:144%; height:85%; opacity:0; pointer-events:none; background:radial-gradient(ellipse at 50% 48%,#fff9d9 0%,#ffecb8d9 21%,#f9d59d9e 39%,transparent 70%); filter:blur(16px); }
        .invitation { position:absolute; z-index:3; left:10%; top:29%; width:80%; height:57%; background:#fffaf2 url("${INVITATION_ART}") center/100% 100% no-repeat; border:1px solid #d5b581; box-shadow:0 12px 40px #8e55594d,0 0 32px #ffe6a6a8; display:flex; align-items:center; justify-content:center; transform:translateY(9%); }
        .invitation-words { display:flex; flex-direction:column; align-items:center; gap:24px; text-align:center; padding:20px; }
        .invitation-words span { font:11px Georgia,serif; letter-spacing:.16em; color:#925d3d; }
        .invitation-words strong { font-family:var(--font-great-vibes),cursive; font-size:clamp(38px,11vw,65px); font-weight:400; line-height:1.1; color:#733d42; }
        .invitation-words em { font-style:normal; font-size:.55em; }
        .front-pocket { z-index:4; clip-path:polygon(0 58%,50% 75%,100% 58%,100% 100%,0 100%); }
        .flap-perspective { position:absolute; inset:0; z-index:6; transform-style:preserve-3d; transform-origin:50% 0; pointer-events:none; }
        .flap-art { clip-path:polygon(0 0,100% 0,50% 63%); backface-visibility:hidden; }
        .seal-button { position:absolute; z-index:8; left:50%; top:60%; width:clamp(88px,27vw,125px); height:clamp(88px,27vw,125px); transform:translate(-50%,-50%); border-radius:50%; background:transparent; cursor:pointer; touch-action:manipulation; }
        .seal-button:focus-visible { outline:3px solid #885a32; outline-offset:4px; }
        .seal-instruction { position:absolute; z-index:9; bottom:calc(max(45px,env(safe-area-inset-bottom) + 35px)); left:0; right:0; text-align:center; font:italic 13px Georgia,serif; letter-spacing:.08em; text-shadow:0 1px 4px #fff7f0; pointer-events:none; }
        .skip-intro { position:absolute; z-index:10; bottom:max(8px,env(safe-area-inset-bottom)); left:50%; transform:translateX(-50%); padding:12px 16px; font:12px Georgia,serif; text-decoration:underline; text-underline-offset:4px; white-space:nowrap; }
        .is-opening .flap-perspective { animation:fold-flap 1.6s .28s cubic-bezier(.35,.05,.2,1) both; }
        .is-opening .warm-glow { animation:light-inside 2.4s 1.2s ease-out both; }
        .is-opening .invitation { animation:rise-card 2.3s 1.72s cubic-bezier(.2,.65,.16,1) both; }
        .is-opening.wedding-envelope { animation:fade-to-greeting .9s 4.18s ease-in-out both; }
        @keyframes fold-flap { 0% { transform:rotateX(0deg); } 100% { transform:rotateX(-178deg); } }
        @keyframes light-inside { 0% { opacity:0; transform:scale(.65); } 55% { opacity:.95; } 100% { opacity:.8; transform:scale(1.18); } }
        @keyframes rise-card { 0% { transform:translateY(9%) scale(1); } 65% { transform:translateY(-28%) scale(1.04); } 100% { transform:translateY(-37%) scale(1.11); } }
        @keyframes fade-to-greeting { to { opacity:0; transform:scale(1.035); } }
        @media(min-width:768px) { .wedding-envelope { display:none; } }
        @media(prefers-reduced-motion:reduce) { .wedding-envelope * { animation:none !important; } }
      `}</style>
    </div>
  );
}
