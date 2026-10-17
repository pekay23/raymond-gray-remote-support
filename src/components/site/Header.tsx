"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HamburgerToggle, MobileMenu } from "./MobileMenu";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "IT Tiers", href: "#tiers" },
  { name: "Clients", href: "#clients" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Scroll state updated via rAF so the header never styles on every scroll tick.
  // Only composite-friendly properties (bg/text color) transition; backdrop-blur and
  // box-shadow are intentionally excluded from scroll-linked transitions.
  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setIsScrolled(window.scrollY > 50));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Body scroll lock + aria-hidden on main while the menu is open: a single DOM
  // mutation per open/close, restored in the cleanup.
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-white/90 py-4" : "bg-transparent py-6"}`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-rg-accent focus:text-rg-accent-ink focus:rounded-md focus:text-sm focus:font-medium focus:shadow-sm"
      >
        Skip to content
      </a>

      <div className="container mx-auto px-6 flex items-center justify-between relative z-60">
        <Link href="/" className={`flex items-center gap-2 sm:gap-3 ${isMobileMenuOpen ? "hidden" : ""}`}>
          <Image
            src="/logos/RaymondgraylogoNoTextNoBG.png"
            alt="Raymond Gray"
            width={48}
            height={48}
            priority
            sizes="48px"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-all"
            aria-hidden="true"
          />
          <span className={`font-display font-medium text-sm sm:text-base md:text-lg tracking-tight transition-colors duration-300 ${isScrolled ? "text-rg-navy" : "text-white drop-shadow-sm"}`}>
            Raymond <span className={`font-normal transition-colors duration-300 ${isScrolled ? "text-rg-ink-subtle" : "text-white/80"}`}>Gray <span className="hidden sm:inline">| Remote Support</span></span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[11px] font-mono tracking-[0.12em] uppercase font-medium transition-colors duration-200 ${
                isScrolled ? "text-rg-ink-soft hover:text-rg-accent" : "text-white/90 hover:text-white drop-shadow-sm"
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
        <HamburgerToggle
          isOpen={isMobileMenuOpen}
          scrolled={isScrolled}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          ref={toggleRef as React.RefObject<HTMLButtonElement>}
        />
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMenu}
        returnToRef={toggleRef as React.RefObject<HTMLButtonElement>}
      />
    </header>
  );
}
