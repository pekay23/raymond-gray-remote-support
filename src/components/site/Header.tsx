"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "IT Tiers", href: "#tiers" },
    { name: "Clients", href: "#clients" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 relative z-50">
          <Image
            src="/logos/RaymondgraylogoNoTextNoBG.png"
            alt="Raymond Gray"
            width={48}
            height={48}
            className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all"
          />
          <span className={`font-display font-medium text-lg tracking-tight transition-colors ${isScrolled ? "text-rg-navy" : "text-white drop-shadow-sm"}`}>
            Raymond <span className={`font-normal transition-colors ${isScrolled ? "text-rg-ink-subtle" : "text-white/80"}`}>Gray | Remote Support</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[11px] font-mono tracking-[0.12em] uppercase font-medium transition-colors ${
                isScrolled 
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
          className={`md:hidden relative z-50 p-2 transition-colors ${isScrolled || isMobileMenuOpen ? "text-rg-navy" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-display font-medium text-rg-navy"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 rounded-md bg-rg-accent text-white font-medium"
            >
              Request Support
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}
