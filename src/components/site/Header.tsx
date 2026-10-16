"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "IT Tiers", href: "#tiers" },
  { name: "Clients", href: "#clients" },
];

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

  // Focus trap + Escape-to-close for the mobile drawer
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
          aria-controls="mobile-menu-drawer"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer (right slide-over) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              ref={menuRef}
              key="mobile-menu-drawer"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
              className="fixed inset-y-0 right-0 z-60 bg-white w-[min(85vw,320px)] shadow-2xl flex flex-col opacity-100"
              id="mobile-menu-drawer"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-6 pt-8 pb-4 border-b border-rg-line-soft">
                <span className="font-display font-semibold text-rg-navy text-lg tracking-tight">
                  Navigation
                </span>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md text-rg-ink-soft hover:bg-rg-line-soft hover:text-rg-navy transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 pb-8 space-y-1" aria-label="Main">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="block w-full px-4 py-3.5 text-lg font-display font-medium text-rg-navy hover:text-rg-accent hover:bg-rg-accent-subtle rounded-md transition-colors border-b border-rg-line-soft last:border-0"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="p-6 border-t border-rg-line-soft">
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center px-6 py-3.5 bg-rg-accent text-white rounded-md font-medium text-sm hover:bg-rg-accent-deep transition-colors shadow-sm"
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
