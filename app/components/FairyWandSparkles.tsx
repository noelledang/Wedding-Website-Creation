"use client";

import { useEffect, useRef } from "react";

/** Decorative fairy-wand sparkle trail. Never captures clicks or touches. */
export default function FairyWandSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    type Particle = { x:number; y:number; vx:number; vy:number; life:number; decay:number; r:number; phase:number; kind:number; tone:number };
    let particles: Particle[] = [];
    let last: {x:number;y:number}|null = null;
    let width = 0, height = 0, frame = 0, running = true;
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const emit = (x:number,y:number,count=10) => {
      for(let i=0;i<count;i++){
        const a=Math.random()*Math.PI*2, sp=.3+Math.random()*1.55;
        particles.push({x:x+(Math.random()-.5)*13,y:y+(Math.random()-.5)*13,
          vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-.3,life:1,decay:.04+Math.random()*.025,
          r:(.5+Math.random()*1.7)*.7,phase:Math.random()*7,kind:Math.random(),tone:Math.random()});
      }
      if(particles.length>180)particles.splice(0,particles.length-180);
    };
    const onMove = (event:PointerEvent) => {
      if(event.pointerType==="touch" && event.buttons===0) return;
      const x=event.clientX,y=event.clientY;
      if(last){
        const distance=Math.hypot(x-last.x,y-last.y);
        const steps=Math.min(9,Math.max(1,Math.ceil(distance/12)));
        for(let k=1;k<=steps;k++) emit(last.x+(x-last.x)*k/steps,last.y+(y-last.y)*k/steps,5);
      } else emit(x,y,12);
      last={x,y};
    };
    const reset = () => { last=null; };
    const onDown = (event:PointerEvent) => {reset();onMove(event);};
    const draw = (t:number) => {
      if(!running) return;
      ctx.clearRect(0,0,width,height);
      for(let i=particles.length-1;i>=0;i--){
        const p=particles[i];
        p.x+=p.vx;p.y+=p.vy;p.vx*=.975;p.vy=p.vy*.975-.004;p.life-=p.decay;
        if(p.life<=0){particles.splice(i,1);continue;}
        const twinkle=.55+.45*Math.sin(t*.019+p.phase);
        const r=p.r*(.75+twinkle*.7);
        ctx.save();ctx.translate(p.x,p.y);
        ctx.globalAlpha=Math.min(1,p.life*(.6+twinkle*.8));
        ctx.shadowColor="#e7b75d";ctx.shadowBlur=p.kind>.65?10:6;
        ctx.fillStyle=p.tone<.33?"#fffefa":p.tone<.67?"#ffe5a1":"#e9b962";
        if(p.kind>.38){
          ctx.beginPath();ctx.moveTo(0,-r*3.3);
          ctx.quadraticCurveTo(r*.2,-r*.2,r*3.3,0);
          ctx.quadraticCurveTo(r*.2,r*.2,0,r*3.3);
          ctx.quadraticCurveTo(-r*.2,r*.2,-r*3.3,0);
          ctx.quadraticCurveTo(-r*.2,-r*.2,0,-r*3.3);ctx.fill();
        }else{ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();}
        ctx.restore();
      }
      frame=requestAnimationFrame(draw);
    };
    window.addEventListener("resize",resize);
    window.addEventListener("pointermove",onMove,{passive:true});
    window.addEventListener("pointerdown",onDown,{passive:true});
    window.addEventListener("pointerup",reset,{passive:true});
    window.addEventListener("pointercancel",reset,{passive:true});
    document.addEventListener("pointerout",reset,{passive:true});
    frame=requestAnimationFrame(draw);
    return () => {
      running=false;cancelAnimationFrame(frame);
      window.removeEventListener("resize",resize);
      window.removeEventListener("pointermove",onMove);
      window.removeEventListener("pointerdown",onDown);
      window.removeEventListener("pointerup",reset);
      window.removeEventListener("pointercancel",reset);
      document.removeEventListener("pointerout",reset);
    };
  },[]);
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45] h-screen w-screen" />;
}
