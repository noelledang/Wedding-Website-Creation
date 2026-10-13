"use client";
import { useEffect, useState } from "react";

export default function EnvelopeOpening({ onDone }: { onDone: () => void }) {
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onDone, 5000);
    return () => window.clearTimeout(timer);
  }, [opening, onDone]);

  const skip = () => {
    try { sessionStorage.setItem("wedding-envelope-seen", "1"); } catch {}
    onDone();
  };
  const open = () => {
    if (opening) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { skip(); return; }
    try { sessionStorage.setItem("wedding-envelope-seen", "1"); } catch {}
    setOpening(true);
  };

  return (
    <div className={"envelope-overlay " + (opening ? "opening" : "")} role="dialog" aria-modal="true" aria-label="Open your wedding invitation">
      <div className="envelope-paper" aria-hidden="true" />
      <div className="envelope-interior" aria-hidden="true" />
      <div className="envelope-light" aria-hidden="true" />
      <div className="envelope-card" aria-hidden="true">
        <div className="envelope-card-inner">
          <p>Together with our families</p>
          <strong>Noelle <i>&amp;</i> Nathan</strong>
          <p>03 · 13 · 2027</p>
        </div>
      </div>
      <div className="envelope-pocket" aria-hidden="true" />
      <div className="envelope-flap-wrap" aria-hidden="true">
        <div className="envelope-flap">
          <div className="envelope-flap-pattern" />
          <div className="envelope-pearls pearl-left" />
          <div className="envelope-pearls pearl-right" />
        </div>
        <div className="envelope-seal-decoration">N <small>&amp;</small> N</div>
      </div>
      {!opening && (
        <button className="envelope-seal-hit" type="button" onClick={open} aria-label="Press the bronze wax seal to open the invitation">
          <span className="sr-only">Open invitation</span>
        </button>
      )}
      {!opening && <p className="envelope-hint">Press the seal to open</p>}
      <button className="envelope-skip" type="button" onClick={skip}>Skip introduction</button>
      <style jsx>{`
        .envelope-overlay { position:fixed; inset:0; z-index:10001; overflow:hidden; background:#f4dcd7; color:#713b40; perspective:1100px; isolation:isolate; }
        .envelope-paper { position:absolute; inset:0; background:linear-gradient(145deg,#f9e6e0 0%,#f3d9d4 56%,#eecdc8 100%); }
        .envelope-paper::after { content:""; position:absolute; inset:0; background:url("/wedding-intro/floral-welcome.png") center/100% 100% no-repeat; opacity:.38; }
        .envelope-interior { position:absolute; inset:0; z-index:1; background:linear-gradient(180deg,#e8bcb6 0%,#fff0e4 72%); clip-path:polygon(0 0,100% 0,100% 65%,50% 88%,0 65%); }
        .envelope-interior::after { content:""; position:absolute; inset:0; background:url("/wedding-intro/floral-welcome.png") center/cover; opacity:.65; }
        .envelope-light { position:absolute; z-index:2; inset:8% -25% 0; opacity:0; pointer-events:none; background:radial-gradient(ellipse at 50% 44%,rgba(255,255,229,.98) 0%,rgba(255,222,148,.75) 24%,rgba(255,215,146,.25) 48%,transparent 68%); filter:blur(20px); mix-blend-mode:screen; }
        .envelope-card { position:absolute; z-index:3; left:10%; width:80%; height:62%; top:27%; border:1px solid #c8a271; background:#fff9f3 url("/wedding-intro/floral-welcome.png") center/100% 100% no-repeat; box-shadow:0 12px 35px #8a514b30; }
        .envelope-card-inner { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; padding:22px; text-align:center; }
        .envelope-card-inner p { font:11px Georgia,serif; text-transform:uppercase; letter-spacing:.12em; }
        .envelope-card-inner strong { font-family:var(--font-great-vibes),cursive; font-weight:400; font-size:clamp(39px,12vw,70px); line-height:1.25; }
        .envelope-card-inner i { font-size:.6em; font-style:normal; }
        .envelope-pocket { position:absolute; z-index:4; inset:0; background:linear-gradient(160deg,#f8e5df,#edccc7); clip-path:polygon(0 48%,50% 68%,100% 48%,100% 100%,0 100%); box-shadow:inset 0 4px 8px #9e656322; }
        .envelope-pocket::after { content:""; position:absolute; inset:0; background:url("/wedding-intro/floral-welcome.png") center/100% 100% no-repeat; opacity:.38; }
        .envelope-flap-wrap { position:absolute; inset:0; z-index:7; transform-origin:50% 0; transform-style:preserve-3d; pointer-events:none; }
        .envelope-flap { position:absolute; top:0; left:0; width:100%; height:57%; clip-path:polygon(0 0,100% 0,50% 100%); background:linear-gradient(165deg,#fae8e2,#f1d3ce 80%); box-shadow:0 5px 15px #8656522e; backface-visibility:visible; }
        .envelope-flap-pattern { position:absolute; inset:0; background:url("/wedding-intro/floral-welcome.png") center top/100% 180% no-repeat; opacity:.4; }
        .envelope-pearls { position:absolute; top:0; width:13px; height:100%; transform-origin:top center; background:radial-gradient(circle at 35% 35%,#fff 12%,#f4e9d6 48%,#c2ab90 78%,transparent 82%) center top/13px 17px repeat-y; filter:drop-shadow(1px 1px 1px #9e827a77); }
        .pearl-left { left:0; height:112%; transform:rotate(-34deg); transform-origin:top center; }
        .pearl-right { right:0; height:112%; transform:rotate(34deg); transform-origin:top center; }
        .envelope-seal-decoration { position:absolute; z-index:8; top:calc(57% - 36px); left:50%; transform:translateX(-50%); width:76px; height:76px; display:flex; align-items:center; justify-content:center; border-radius:45% 55% 48% 52%; border:5px double #b17a3c; background:radial-gradient(circle at 28% 22%,#d9b077 0%,#9a612f 45%,#593619 100%); color:#f5d69a; text-shadow:0 1px 1px #4d2c19; font:italic 21px Georgia,serif; box-shadow:0 5px 13px #4e2e215c,inset 0 0 0 2px #6d421e; }
        .envelope-seal-decoration small { font-size:12px; margin:0 3px; }
        .envelope-seal-hit { position:absolute; z-index:10; top:calc(57% - 51px); left:50%; transform:translateX(-50%); width:110px; height:110px; border-radius:50%; cursor:pointer; touch-action:manipulation; }
        .envelope-seal-hit:focus-visible { outline:3px solid #82562f; outline-offset:4px; }
        .envelope-hint { position:absolute; z-index:8; bottom:13%; left:0; width:100%; text-align:center; font:italic 14px Georgia,serif; letter-spacing:.06em; }
        .envelope-skip { position:absolute; z-index:11; bottom:max(18px,env(safe-area-inset-bottom)); left:50%; transform:translateX(-50%); padding:12px; white-space:nowrap; font-size:12px; text-decoration:underline; text-underline-offset:4px; }
        .opening .envelope-seal-decoration { animation:seal-press .35s ease-out both; }
        .opening .envelope-flap-wrap { animation:flap-fold 1.65s .38s cubic-bezier(.35,.05,.2,1) both; }
        .opening .envelope-light { animation:light-awaken 2.5s 1.45s ease-out both; }
        .opening .envelope-card { animation:invitation-rise 2.1s 2.05s cubic-bezier(.2,.7,.15,1) both; }
        .opening.envelope-overlay { animation:envelope-dissolve .85s 4.2s ease-in-out both; }
        @keyframes seal-press { 0% { transform:translateX(-50%) scale(1); } 45% { transform:translateX(-50%) scale(.92); } 100% { transform:translateX(-50%) scale(1); } }
        @keyframes flap-fold { 0% { transform:rotateX(0deg); } 100% { transform:rotateX(176deg); } }
        @keyframes light-awaken { 0% { opacity:0; transform:scale(.7); } 60% { opacity:.95; } 100% { opacity:.72; transform:scale(1.2); } }
        @keyframes invitation-rise { 0% { transform:translateY(0) scale(1); } 70% { transform:translateY(-20%) scale(1.05); } 100% { transform:translateY(-30%) scale(1.14); } }
        @keyframes envelope-dissolve { to { opacity:0; transform:scale(1.07); } }
        @media (prefers-reduced-motion:reduce) { .envelope-overlay * { animation:none !important; } }
      `}</style>
    </div>
  );
}