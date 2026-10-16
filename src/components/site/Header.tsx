"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "IT Tiers", href: "#tiers" },
  { name: "Clients", href: "#clients" },
];

const overlayContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const overlayItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock + aria-hidden on main content when menu opens
  useEffect(() => {
    const main = document.querySelector("main");
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      main?.setAttribute("aria-hidden", "true");
    } else {
      document.body.style.overflow = "";
      main?.removeAttribute("aria-hidden");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("aria-hidden");
    };
  }, [isMobileMenuOpen]);

  // Focus trap + Escape-to-close for the mobile overlay
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const menuEl = menuRef.current;
    const firstFocusable = menuEl?.querySelector<HTMLElement>("a, button");
    firstFocusable?.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isMobileMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  const scrolled = isScrolled || isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between relative z-60">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logos/RaymondgraylogoNoTextNoBG.png"
            alt="Raymond Gray"
            width={48}
            height={48}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-all"
            aria-hidden="true"
          />
          <span className={`font-display font-medium text-sm sm:text-base md:text-lg tracking-tight transition-colors ${scrolled ? "text-rg-navy" : "text-white drop-shadow-sm"}`}>
            Raymond <span className={`font-normal transition-colors ${scrolled ? "text-rg-ink-subtle" : "text-white/80"}`}>Gray <span className="hidden sm:inline">| Remote Support</span></span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[11px] font-mono tracking-[0.12em] uppercase font-medium transition-colors ${
                scrolled
                  ? "text-rg-ink-soft hover:text-rg-accent"
                  : "text-white/90 hover:text-white drop-shadow-sm"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-5 py-2.5 rounded-sm bg-rg-accent text-white text-[11px] font-mono tracking-[0.12em] uppercase font-medium hover:bg-rg-accent-deep transition-colors shadow-sm"
          >
            Request Support
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          ref={toggleRef}
          className={`md:hidden p-2.5 size-10 transition-colors rounded-md ${scrolled ? "text-rg-navy bg-rg-bg-2" : "text-white hover:bg-white/10"}`}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-overlay"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay (full-screen dark overlay, matching raymond-gray-platform pattern) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Full-screen overlay panel */}
            <motion.div
              ref={menuRef}
              key="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-rg-invert-bg text-rg-invert-ink"
              aria-label="Mobile navigation"
            >
              {/* Overlay header */}
              <div className="flex items-center justify-between px-6 pt-12 sm:pt-16 pb-6 sm:pb-8 border-b border-rg-invert-line">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logos/RaymondgraylogoNoTextNoBG.png"
                    alt="Raymond Gray"
                    width={40}
                    height={40}
                    className="w-8 h-8 object-contain"
                    aria-hidden="true"
                  />
                  <span className="font-display font-semibold text-sm sm:text-base tracking-tight">
                    Navigation
                  </span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md hover:bg-white/10 text-rg-invert-ink hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav links — staggered slide-up, left-aligned, large text */}
              <motion.nav
                variants={overlayContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto px-6 py-8"
                aria-label="Main"
              >
                <ol className="list-none p-0 m-0 space-y-2 sm:space-y-4">
                  {navLinks.map((link, i) => (
                    <li key={link.href}>
                      <motion.li
                        variants={overlayItemVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ transitionDelay: `${i * 80}ms` }}
                        className="overflow-hidden"
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="block px-4 py-4 text-2xl sm:text-3xl font-display font-medium text-rg-invert-ink hover:text-rg-accent-light transition-colors border-b border-rg-invert-line last:border-0"
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    </li>
                  )                )}
                </ol>
              </motion.nav>

              {/* CTA at bottom */}
              <div className="p-6 border-t border-rg-invert-line">
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center px-6 py-4 bg-rg-accent text-rg-accent-ink rounded-md font-medium text-sm hover:bg-rg-accent-deep transition-colors shadow-sm"
                >
                  Request Support
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
