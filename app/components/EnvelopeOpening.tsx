"use client";
import { useEffect, useState } from "react";

export default function EnvelopeOpening({ onDone }: { onDone: () => void }) {
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onDone, 3200);
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
    <div className={`envelope-overlay ${opening ? "opening" : ""}`} role="dialog" aria-modal="true" aria-label="Open the wedding invitation">
      <div className="envelope-scene" aria-hidden="true">
        <div className="envelope-card">
          <div className="envelope-card-inner">
            <p>Together with our families</p>
            <strong>Noelle <i>&amp;</i> Nathan</strong>
            <p>03 · 13 · 2027</p>
          </div>
        </div>
        <div className="envelope-back" />
        <div className="envelope-front" />
        <div className="envelope-flap" />
        <div className="envelope-seal">N <small>&amp;</small> N</div>
      </div>
      {!opening && <button className="envelope-open-button" type="button" onClick={open}>Tap to Open ✧</button>}
      <button className="envelope-skip" type="button" onClick={skip}>Skip introduction</button>
      <style jsx>{`
        .envelope-overlay { position:fixed; inset:0; z-index:10001; display:flex; align-items:center; justify-content:center; overflow:hidden; background:radial-gradient(ellipse,#fff9f2,#f1d9d1); color:#743e42; }
        .envelope-scene { position:relative; width:min(86vw,380px); height:390px; transform:translateY(-24px); filter:drop-shadow(0 20px 20px #693f4038); perspective:900px; }
        .envelope-back { position:absolute; bottom:0; width:100%; height:245px; background:linear-gradient(145deg,#f3cfc9,#fff8ee); border:1px solid #d7b98b; }
        .envelope-front { position:absolute; bottom:0; width:100%; height:245px; z-index:4; background:linear-gradient(135deg,#fffaf3,#efd8d0); clip-path:polygon(0 0,50% 55%,100% 0,100% 100%,0 100%); border-bottom:2px solid #d1a66f; }
        .envelope-front::after,.envelope-flap::after { content:""; position:absolute; inset:0; background:url("/wedding-intro/floral-welcome.png") center/cover; opacity:.25; }
        .envelope-flap { position:absolute; bottom:88px; width:100%; height:158px; z-index:6; transform-origin:top; clip-path:polygon(0 0,100% 0,50% 100%); background:linear-gradient(#fff9f0,#eacbc4); border-top:2px solid #cfa879; }
        .envelope-seal { position:absolute; bottom:95px; left:50%; z-index:7; transform:translateX(-50%); width:67px; height:67px; display:flex; align-items:center; justify-content:center; border-radius:49%; background:radial-gradient(circle at 30% 20%,#ad5360,#6e2035 75%); border:4px double #cda365; color:#f1ce85; font:italic 18px Georgia,serif; box-shadow:0 4px 10px #6d273c77; }
        .envelope-seal small { font-size:11px; margin:0 3px; }
        .envelope-card { position:absolute; z-index:2; bottom:25px; left:8%; width:84%; height:340px; background:#fffaf5 url("/wedding-intro/floral-welcome.png") center/100% 100%; border:1px solid #cda879; }
        .envelope-card-inner { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:35px; gap:20px; }
        .envelope-card-inner p { font:10px Georgia,serif; letter-spacing:.12em; text-transform:uppercase; }
        .envelope-card-inner strong { font-family:var(--font-great-vibes),cursive; font-weight:400; font-size:42px; line-height:1.15; }
        .envelope-card-inner i { font-size:25px; font-style:normal; }
        .envelope-open-button { position:absolute; top:calc(50% + 215px); padding:12px 25px; border:1px solid #b89466; background:#fff8f0e8; font:14px Georgia,serif; letter-spacing:.13em; }
        .envelope-skip { position:absolute; bottom:max(20px,env(safe-area-inset-bottom)); padding:12px; font-size:12px; text-decoration:underline; text-underline-offset:4px; }
        .opening .envelope-seal { animation:seal-disappear .45s ease forwards; }
        .opening .envelope-flap { animation:flap-lift 1s .3s ease-in-out forwards; }
        .opening .envelope-card { animation:card-emerge 1.55s 1.1s ease-in-out forwards; }
        .opening.envelope-overlay { animation:envelope-fade .85s 2.4s ease forwards; }
        @keyframes seal-disappear { to { opacity:0; transform:translateX(-50%) scale(.5); } }
        @keyframes flap-lift { 0% { transform:rotateX(0deg); z-index:6; } 55% { transform:rotateX(100deg); z-index:1; } 100% { transform:rotateX(180deg); z-index:1; } }
        @keyframes card-emerge { 0% { transform:translateY(0); } 70% { transform:translateY(-145px); } 100% { transform:translateY(-170px) scale(1.1); } }
        @keyframes envelope-fade { to { opacity:0; transform:scale(1.08); } }
        @media(max-height:700px) { .envelope-scene { transform:translateY(-35px) scale(.76); } .envelope-open-button { top:calc(50% + 160px); } }
      `}</style>
    </div>
  );
}