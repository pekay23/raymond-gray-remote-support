"use client";

import React from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { heroCopy } from "@/lib/profile-content";
import Link from "next/link";
import { useSyncExternalStore } from "react";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const { scrollY } = useScroll();
  // Parallax is decorative — disable on mobile (<md) to avoid scroll jank,
  // address-bar interference, and battery drain on phones.
  // Derived via useSyncExternalStore with a server snapshot so SSR and first
  // client paint render identical markup — no hydration mismatch.
  const isDesktop = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("resize", onStoreChange);
      return () => window.removeEventListener("resize", onStoreChange);
    },
    () => window.innerWidth >= 768,
    () => false
  );
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 300]);
  const y = isDesktop ? parallaxY : 0;

  const titleWords = heroCopy.title.split(" ");

  return (
    <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-32 overflow-hidden bg-rg-navy">
      {/* Background Image — responsive: webp on mobile, png on desktop */}
      <div
        className="block sm:hidden absolute inset-0 z-0 opacity-60 sm:opacity-40 mix-blend-luminosity"
        style={{
          backgroundImage: "url('/images/webp/hero-bg-mobile.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="hidden sm:block absolute inset-0 z-0 opacity-60 sm:opacity-40 mix-blend-luminosity"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.h1
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6 sm:mb-8 flex flex-wrap gap-x-4 drop-shadow-lg"
          >
          {titleWords.map((word, i) => (
            <React.Fragment key={i}>
              <motion.span key={`${i}-word`} variants={itemVariants} className="inline-block">
                {word}
              </motion.span>
              {(i === 1 || i === 5) && <br key={`${i}-br`} className="hidden sm:block" />}
            </React.Fragment>
          ))}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/95 font-medium leading-relaxed max-w-full sm:max-w-2xl mb-6 drop-shadow-md"
          >
            {heroCopy.lede}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-white/85 font-medium leading-relaxed max-w-full sm:max-w-2xl mb-8 sm:mb-10 drop-shadow-md"
          >
            {heroCopy.subLede}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-4 w-full sm:w-auto">
            <Link
              href="#services"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-rg-navy text-white rounded-md font-medium hover:bg-rg-accent-deep transition-colors text-center"
            >
              Explore Services
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white border border-rg-line-strong text-rg-navy rounded-md font-medium hover:bg-rg-bg-2 transition-colors text-center"
            >
              Request Support
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative background element */}
      <motion.div
        style={{ y }}
        className="absolute right-0 top-0 w-1/3 h-[120%] bg-linear-to-l from-rg-accent-subtle to-transparent opacity-50 z-0 pointer-events-none"
      />
    </section>
  );
}
