import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "ink" | "mist";
};

export function SectionShell({
  id,
  eyebrow,
  title,
  text,
  children,
  className,
  tone = "light",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24",
        tone === "ink" && "bg-slate-950 text-white",
        tone === "mist" && "bg-slate-100 text-slate-950",
        tone === "light" && "bg-white text-slate-950",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        {(eyebrow || title || text) && (
          <div className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <div>
              {eyebrow && (
                <p
                  className={cn(
                    "mb-3 text-sm font-semibold uppercase",
                    tone === "ink" ? "text-cyan-200" : "text-cyan-700",
                  )}
                >
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  {title}
                </h2>
              )}
            </div>
            {text && (
              <p
                className={cn(
                  "max-w-2xl text-pretty text-base leading-7 lg:justify-self-end",
                  tone === "ink" ? "text-slate-300" : "text-slate-600",
                )}
              >
                {text}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
