"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type LogoItem = {
  name: string;
  logoUrl: string | null;
};

type LogoCycleGridProps = {
  logos: LogoItem[];
  className?: string;
};

export function LogoCycleGrid({ logos, className }: LogoCycleGridProps) {
  const prefersReducedMotion = useReducedMotion();

  const validLogos = useMemo(() => logos.filter((logo) => logo.logoUrl), [logos]);

  // Derive slot count once — server-side default 20, client responsive value.
  // Initialized lazily so SSR and client HTML match (avoids hydration mismatch).
  const [slots] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth < 640
        ? 4
        : window.innerWidth < 1024
          ? 9
          : 20
      : 20
  );

  const baseIndices = useMemo(() => {
    const indices: number[] = [];
    let nextUnused = 0;
    while (indices.length < slots) {
      while (indices.includes(nextUnused) && nextUnused < validLogos.length) {
        nextUnused++;
      }
      if (nextUnused < validLogos.length) {
        indices.push(nextUnused);
      } else {
        // Deterministic fallback index (avoids impure Math.random during render)
        indices.push(nextUnused % validLogos.length);
      }
    }
    return indices;
  }, [slots, validLogos.length]);

  const [visibleIndices, setVisibleIndices] = useState<number[]>(baseIndices);

  useEffect(() => {
    if (prefersReducedMotion || validLogos.length <= slots) {
      return;
    }

    const interval = window.setInterval(() => {
      setVisibleIndices((current) => {
        const next = [...current];

        // Find available logos that are not currently visible
        const availableIndices = validLogos
          .map((_, i) => i)
          .filter((i) => !current.includes(i));

        if (availableIndices.length === 0) return current;

        // Pick 2 random slots to change
        const possibleSlots = Array.from({ length: slots }, (_, i) => i);
        // shuffle slots
        for (let i = possibleSlots.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [possibleSlots[i], possibleSlots[j]] = [possibleSlots[j], possibleSlots[i]];
        }

        const numToChange = Math.min(2, slots, availableIndices.length);
        const slotsToChange = possibleSlots.slice(0, numToChange);

        // Pick random available logos
        for (let i = availableIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
        }

        for (let i = 0; i < numToChange; i++) {
          next[slotsToChange[i]] = availableIndices[i];
        }

        return next;
      });
    }, 5000); // Increased time to 5s

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, slots, validLogos]);

  if (validLogos.length === 0 || visibleIndices.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("grid gap-4 sm:gap-6 lg:gap-8", className)}
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
        gridAutoRows: "110px",
      }}
    >
      {visibleIndices.map((logoIndex, slot) => {
        const logo = validLogos[logoIndex];
        return (
          <div
            key={slot}
            className="relative flex min-h-27.5 items-center justify-center overflow-hidden p-1 sm:p-2"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={`${slot}-${logo?.name}`}
                className="absolute inset-0 flex flex-col items-center justify-center p-2 gap-2"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -20, scale: 0.95 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 20, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  mass: 1,
                  delay: slot * 0.05, // Deterministic stagger by slot position
                }}
              >
                {logo?.logoUrl ? (
                  <>
                    <Image
                      src={logo.logoUrl}
                      alt={`${logo.name} logo`}
                      width={160}
                      height={64}
                      sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 240px"
                      className="w-auto max-h-12 sm:max-h-16 max-w-full object-contain opacity-90 transition-opacity duration-150 hover:opacity-100"
                      style={{ width: "auto", height: "auto" }}
                    />
                    <span className="text-xs sm:text-sm text-black text-center font-bold text-wrap w-full px-1 drop-shadow-sm leading-tight mt-2">
                      {logo.name}
                    </span>
                  </>
                ) : (
                  <span className="text-center text-xs sm:text-sm font-bold text-black drop-shadow-sm">
                    {logo?.name}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
