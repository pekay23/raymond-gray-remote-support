"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionBlockProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionBlock({ children, className, delay = 0 }: MotionBlockProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.18, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
