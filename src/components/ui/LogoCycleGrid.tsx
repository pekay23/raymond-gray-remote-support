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

type GridSize = {
  columns: number;
  rows: number;
};

function getGridSize(): GridSize {
  if (typeof window === "undefined") {
    return { columns: 5, rows: 4 };
  }

  if (window.matchMedia("(min-width: 1280px)").matches) {
    return { columns: 5, rows: 4 };
  }

  if (window.matchMedia("(min-width: 768px)").matches) {
    return { columns: 4, rows: 4 };
  }

  return { columns: 2, rows: 3 };
}

export function LogoCycleGrid({ logos, className }: LogoCycleGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const [grid, setGrid] = useState<GridSize>(() => getGridSize());
  
  const validLogos = useMemo(() => logos.filter((logo) => logo.logoUrl), [logos]);
  const slots = grid.columns * grid.rows;

  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

  useEffect(() => {
    const onResize = () => setGrid(getGridSize());

    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setVisibleIndices((current) => {
      if (current.length === slots) return current;
      if (current.length > slots) return current.slice(0, slots);

      const next = [...current];
      let nextUnused = 0;

      while (next.length < slots) {
        while (next.includes(nextUnused) && nextUnused < validLogos.length) {
          nextUnused++;
        }
        if (nextUnused < validLogos.length) {
          next.push(nextUnused);
        } else {
          // Fallback if we somehow run out of unique logos
          next.push(Math.floor(Math.random() * validLogos.length));
        }
      }
      return next;
    });
  }, [slots, validLogos.length]);

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
  }, [prefersReducedMotion, slots, validLogos.length]);

  if (validLogos.length === 0 || visibleIndices.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("grid gap-6 sm:gap-8", className)}
      style={{
        gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${grid.rows}, minmax(140px, 1fr))`,
      }}
    >
      {visibleIndices.map((logoIndex, slot) => {
        const logo = validLogos[logoIndex];
        return (
          <div
            key={slot}
            className="relative flex min-h-[140px] items-center justify-center overflow-hidden p-2"
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
                  delay: Math.random() * 0.2, // Slight random stagger if both animate together
                }}
              >
                {logo?.logoUrl ? (
                  <>
                    <Image
                      src={logo.logoUrl}
                      alt={`${logo.name} logo`}
                      width={240}
                      height={96}
                      sizes="(min-width: 1280px) 240px, (min-width: 768px) 200px, 160px"
                      className={cn(
                        "w-auto max-h-16 sm:max-h-20 max-w-full object-contain opacity-90 transition-opacity duration-150 hover:opacity-100",
                        [
                          "/logos/as-mfg.jpg",
                        ].includes(logo.logoUrl || "") && "scale-150",
                        [
                          "/logos/rs-machining.png",
                          "/logos/donaldson.png",
                          "/logos/ch-machine.png",
                          "/logos/lansair.PNG",
                          "/logos/aero-bending.png",
                          "/logos/meggitt.png",
                          "/logos/thomas-cnc.png",
                        ].includes(logo.logoUrl || "") && "scale-[2]",
                        [
                          "/logos/safran.png",
                          "/logos/absolute-technologies.png",
                          "/logos/kurt.png",
                        ].includes(logo.logoUrl || "") && "scale-[2.5]"
                      )}
                      style={{ width: "auto", height: "auto" }}
                    />
                    <span className="text-sm sm:text-base text-black text-center font-bold text-wrap w-full px-1 drop-shadow-sm leading-tight mt-2 relative z-10">
                      {logo.name}
                    </span>
                  </>
                ) : (
                  <span className="text-center text-lg sm:text-xl font-bold text-black drop-shadow-sm">
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
