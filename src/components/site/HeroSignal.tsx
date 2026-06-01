"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroSignal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let timeline: ReturnType<typeof gsap.to> | undefined;
    const ctx = gsap.context(() => {
      timeline = gsap.to(".signal-node", {
        opacity: 0.35,
        scale: 1.08,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "power1.out",
      });
    }, root);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        timeline?.play();
      } else {
        timeline?.pause();
      }
    });

    observer.observe(root);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="relative aspect-[1.05] w-full max-w-xl overflow-hidden rounded border border-white/15 bg-slate-900 shadow-2xl"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-0 h-full w-px bg-white/20" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/20" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-white/20" />
        <div className="absolute left-0 top-1/4 h-px w-full bg-white/20" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-white/20" />
        <div className="absolute left-0 top-3/4 h-px w-full bg-white/20" />
      </div>
      <div className="absolute left-[12%] top-[14%] h-px w-[76%] bg-cyan-300/40" />
      <div className="absolute left-[18%] top-[35%] h-px w-[60%] bg-emerald-300/30" />
      <div className="absolute bottom-[20%] left-[10%] h-px w-[72%] bg-sky-300/30" />
      <div className="signal-node absolute left-[12%] top-[12%] size-4 rounded-full bg-cyan-300" />
      <div className="signal-node absolute left-[54%] top-[32%] size-5 rounded-full bg-emerald-300" />
      <div className="signal-node absolute right-[14%] top-[14%] size-3 rounded-full bg-sky-300" />
      <div className="signal-node absolute bottom-[18%] left-[28%] size-6 rounded-full bg-white" />
      <div className="signal-node absolute bottom-[28%] right-[18%] size-4 rounded-full bg-cyan-200" />
      <div className="absolute inset-x-6 bottom-6 rounded border border-white/10 bg-slate-950/70 p-4">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase text-cyan-200">
            Live support queue
          </span>
          <span className="rounded bg-emerald-300 px-2 py-1 text-xs font-semibold text-slate-950">
            Stable
          </span>
        </div>
        <div className="space-y-2">
          <span className="block h-2 w-10/12 rounded bg-white/30" />
          <span className="block h-2 w-8/12 rounded bg-white/20" />
          <span className="block h-2 w-6/12 rounded bg-white/15" />
        </div>
      </div>
    </div>
  );
}
