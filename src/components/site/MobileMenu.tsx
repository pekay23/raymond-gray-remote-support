"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "IT Tiers", href: "#tiers" },
  { name: "Clients", href: "#clients" },
];

const scrimVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const drawerVariants = {
  closed: { x: "100%", opacity: 0, pointerEvents: "none" },
  open: { x: 0, opacity: 1, pointerEvents: "auto" },
};

const navContainerVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
      duration: 0.2,
    },
  },
};

const navItemVariants = {
  closed: { opacity: 0, y: 12 },
  open: { opacity: 1, y: 0 },
};

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  returnToRef: React.RefObject<HTMLButtonElement>;
}

export function HamburgerToggle({
  isOpen,
  scrolled,
  onClick,
  ref,
}: {
  isOpen: boolean;
  scrolled: boolean;
  onClick: () => void;
  ref: React.Ref<HTMLButtonElement>;
}) {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.18 };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-menu-overlay"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={`md:hidden size-12 p-2 rounded-md transition-colors duration-200 ${
        scrolled ? "text-rg-navy bg-rg-bg-2" : "text-white hover:bg-white/10"
      }`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="size-6">
        <motion.line
          key="top"
          x1={4}
          y1={7}
          x2={20}
          y2={7}
          animate={isOpen ? { x1: 7, y1: 7, x2: 17, y2: 17 } : { x1: 4, y1: 7, x2: 20, y2: 7 }}
          transition={transition}
        />
        <motion.line
          key="mid"
          x1={7}
          y1={12}
          x2={17}
          y2={12}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={transition}
        />
        <motion.line
          key="bot"
          x1={4}
          y1={17}
          x2={20}
          y2={17}
          animate={isOpen ? { x1: 7, y1: 17, x2: 17, y2: 7 } : { x1: 4, y1: 17, x2: 20, y2: 17 }}
          transition={transition}
        />
      </svg>
    </button>
  );
}

export function MobileMenu({ isOpen, onClose, returnToRef }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const drawerTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.28 };
  const scrimTransition = reducedMotion ? { duration: 0 } : { duration: 0.2 };
  const itemTransition = reducedMotion ? { duration: 0 } : { duration: 0.2 };

  // Focus trap + Escape-to-close + focus return to the trigger button.
  // Runs only while the dialog is open; the overlay tree stays mounted
  // (toggled with inert / aria-hidden / opacity) so there is no mount/unmount thrash.
  useEffect(() => {
    if (!isOpen) return;

    const menuEl = menuRef.current;
    const activeBefore = document.activeElement as HTMLElement | null;
    const returnTo = returnToRef.current;
    const focusables = menuEl
      ? Array.from(
          menuEl.querySelectorAll<HTMLElement>(
            'a[href], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        )
      : [];
    const first = focusables[0];

    const rafId = requestAnimationFrame(() => first?.focus());

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      e.preventDefault();
      if (!focusables.length) return;
      const current = document.activeElement as HTMLElement | null;
      let idx = current ? focusables.indexOf(current) : -1;
      if (idx === -1) idx = -1;
      const next = e.shiftKey ? (idx - 1 + focusables.length) % focusables.length : (idx + 1) % focusables.length;
      focusables[next]?.focus();
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleKeydown);
      if (returnTo) {
        returnTo.focus({ preventScroll: true });
      } else {
        activeBefore?.focus({ preventScroll: true });
      }
    };
  }, [isOpen, onClose, returnToRef]);

  return (
    <>
      {/* Backdrop scrim */}
      <motion.div
        animate={isOpen ? "open" : "closed"}
        initial={false}
        transition={scrimTransition}
        variants={scrimVariants}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
        inert={!isOpen}
      />

      {/* Right-anchored drawer panel (brand stays visible; lighter than a full-screen modal) */}
      <motion.div
        ref={menuRef}
        id="mobile-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        animate={isOpen ? "open" : "closed"}
        initial={false}
        transition={drawerTransition}
        variants={drawerVariants}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-xs p-6 bg-rg-invert-bg text-rg-invert-ink"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {/* Drawer header: brand + title + close */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-rg-invert-line">
          <div className="flex items-center gap-2">
            <Image
              src="/logos/RaymondgraylogoNoTextNoBG.png"
              alt="Raymond Gray"
              width={40}
              height={40}
              className="w-8 h-8 object-contain"
              aria-hidden="true"
              decoding="async"
            />
            <h2 id="mobile-menu-title" className="font-display font-semibold text-sm sm:text-base tracking-tight">
              Navigation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="size-12 p-2 rounded-md flex items-center justify-center hover:bg-white/10 text-rg-invert-ink transition-colors"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Nav links — staggered entry that resolves inside the drawer animation */}
        <motion.nav
          variants={navContainerVariants}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          transition={navContainerVariants.open.transition}
          className="flex-1 overflow-y-auto mb-8"
          aria-label="Mobile navigation"
        >
          <ol className="list-none p-0 m-0 space-y-1">
            {navLinks.map((link) => (
              <motion.li
                key={link.href}
                variants={navItemVariants}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                transition={itemTransition}
                className="min-h-12 flex items-center"
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="w-full px-4 py-3 text-xl sm:text-lg font-display font-medium text-rg-invert-ink hover:text-rg-accent-light transition-colors border-b border-rg-invert-line last:border-0"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ol>
        </motion.nav>

        {/* CTA pinned at the bottom */}
        <div className="border-t border-rg-invert-line pt-6">
          <Link
            href="#contact"
            onClick={onClose}
            className="w-full min-h-12 flex items-center justify-center gap-2 px-6 py-4 bg-rg-accent text-rg-accent-ink font-medium text-sm tracking-tight rounded-md hover:bg-rg-accent-deep transition-colors shadow-sm"
          >
            Request Support
          </Link>
        </div>
      </motion.div>
    </>
  );
}
