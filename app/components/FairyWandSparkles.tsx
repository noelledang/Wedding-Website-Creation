"use client";

import { useLayoutEffect, useRef } from "react";

/** Decorative fairy-wand sparkle trail. Never captures clicks or touches. */
export default function FairyWandSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    type Particle = { x:number; y:number; vx:number; vy:number; life:number; decay:number; r:number; phase:number; kind:number; tone:number };
    let particles: Particle[] = [];
    let last: {x:number;y:number}|null = null;
    let activeTouch: {x:number;y:number}|null = null;
    let lastTouchSparkle = 0;
    let lastTouchActivity = 0;
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
      // Touch is handled separately to support scrolling on mobile Safari.
      if(event.pointerType==="touch") return;
      const x=event.clientX,y=event.clientY;
      if(last){
        const distance=Math.hypot(x-last.x,y-last.y);
        const steps=Math.min(9,Math.max(1,Math.ceil(distance/12)));
        for(let k=1;k<=steps;k++) emit(last.x+(x-last.x)*k/steps,last.y+(y-last.y)*k/steps,5);
      } else emit(x,y,12);
      last={x,y};
      // Paint the newly emitted particles immediately, without waiting for the next animation frame.
      renderParticles(performance.now(), false);
    };
    const onMouseMove = (event:MouseEvent) => {
      // Mousemove fallback for browsers that inconsistently dispatch pointermove.
      if (window.PointerEvent) return;
      onMove(event as unknown as PointerEvent);
    };
    const onFirstPointerOver = (event:PointerEvent) => {
      // The first pointer entering the page must trigger fairy dust, not a click.
      if (last === null && event.pointerType !== "touch") onMove(event);
    };
    const reset = () => { last=null; };
    const onTouchStart = (event:TouchEvent) => {
      const touch=event.touches[0];
      if(!touch) return;
      reset();
      emit(touch.clientX,touch.clientY,36);
      // Keep the first-tap burst visible long enough to see, even after a quick lift.
      for(const particle of particles.slice(-36)) particle.decay *= .38;
      activeTouch={x:touch.clientX,y:touch.clientY};
      lastTouchSparkle=performance.now();
      lastTouchActivity=lastTouchSparkle;
      last={x:touch.clientX,y:touch.clientY};
      renderParticles(performance.now(),false);
    };
    const onTouchMove = (event:TouchEvent) => {
      const touch=event.touches[0];
      if(!touch) return;
      const x=touch.clientX,y=touch.clientY;
      activeTouch={x,y};
      lastTouchActivity=performance.now();
      if(last){
        const distance=Math.hypot(x-last.x,y-last.y);
        const steps=Math.min(12,Math.max(1,Math.ceil(distance/8)));
        for(let k=1;k<=steps;k++)emit(last.x+(x-last.x)*k/steps,last.y+(y-last.y)*k/steps,8);
      }else emit(x,y,24);
      last={x,y};
      renderParticles(performance.now(),false);
    };
    const onTouchEnd = () => { activeTouch=null; reset(); };
    const onDown = (event:PointerEvent) => { if(event.pointerType==="touch") return; reset();onMove(event); };
    const renderParticles = (t:number, advance:boolean) => {
      ctx.clearRect(0,0,width,height);
      for(let i=particles.length-1;i>=0;i--){
        const p=particles[i];
        if(advance){p.x+=p.vx;p.y+=p.vy;p.vx*=.975;p.vy=p.vy*.975-.004;p.life-=p.decay;}
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

    };
    const draw = (t:number) => {
      if(!running) return;
      // Emit while a finger remains down, including stationary holds and page scrolling.
      if(activeTouch && t-lastTouchSparkle>=35){
        emit(activeTouch.x,activeTouch.y,10);
        lastTouchSparkle=t;
      }
      renderParticles(t,true);
      frame=requestAnimationFrame(draw);
    };
    window.addEventListener("resize",resize);
    window.addEventListener("touchstart",onTouchStart,{passive:true,capture:true});
    window.addEventListener("touchmove",onTouchMove,{passive:true,capture:true});
    window.addEventListener("touchend",onTouchEnd,{passive:true});
    window.addEventListener("touchcancel",onTouchEnd,{passive:true});
    window.addEventListener("pointermove",onMove,{passive:true,capture:true});
    window.addEventListener("pointerover",onFirstPointerOver,{passive:true,capture:true});
    window.addEventListener("pointerdown",onDown,{passive:true});
    window.addEventListener("pointerup",reset,{passive:true});
    window.addEventListener("pointercancel",reset,{passive:true});
    // Do not reset on pointerout: it fires when crossing child elements.
    // Listen in capture phase to keep the trail continuous over interactive UI.
    window.addEventListener("mousemove",onMouseMove,{passive:true,capture:true});
    frame=requestAnimationFrame(draw);
    return () => {
      running=false;cancelAnimationFrame(frame);
      window.removeEventListener("resize",resize);
      window.removeEventListener("touchstart",onTouchStart,true);
      window.removeEventListener("touchmove",onTouchMove,true);
      window.removeEventListener("touchend",onTouchEnd);
      window.removeEventListener("touchcancel",onTouchEnd);
      window.removeEventListener("pointermove",onMove,true);
      window.removeEventListener("pointerover",onFirstPointerOver,true);
      window.removeEventListener("pointerdown",onDown);
      window.removeEventListener("pointerup",reset);
      window.removeEventListener("pointercancel",reset);
      window.removeEventListener("mousemove",onMouseMove,true);
    };
  },[]);
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[10001] h-screen w-screen" />;
}
