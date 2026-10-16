"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 rounded-full shadow-lg bg-rg-navy text-white h-10 sm:h-12 w-10 sm:w-12 flex items-center justify-center opacity-90 hover:opacity-100 transition-all hover:-translate-y-1 hover:bg-rg-accent cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 sm:h-6 w-5 sm:w-6" />
    </button>
  );
}
