"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experienceProfile, representativeList } from "@/lib/profile-content";
import { LogoCycleGrid } from "@/components/ui/LogoCycleGrid";

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".client-fade",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="clients" ref={sectionRef} className="py-24 bg-rg-bg-2 border-t border-rg-line-soft">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-rg-navy mb-4">
            Experience Profile & Ecosystem
          </h2>
          <p className="text-rg-ink-soft text-lg leading-relaxed">
            Raymond Gray&apos;s services are backed by hands-on delivery experience in high-pressure, high-accountability manufacturing and engineering environments. Our team routinely manages customer communication, order administration, job tracking and reporting, supplier follow-ups, time/attendance coordination, and IT support workflows — using structured SOPs, templates, and escalation rules that hold up under volume.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {experienceProfile.map((profile, i) => (
            <div key={i} className="client-fade bg-white p-8 rounded-xl border border-rg-line-soft shadow-sm hover:border-rg-accent transition-colors">
              <h3 className="font-display font-semibold text-xl text-rg-navy mb-4">
                {profile.client}
              </h3>
              <p className="text-sm text-rg-ink-soft leading-relaxed">
                {profile.scope}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="w-full relative py-16 mt-16 border-y border-rg-line-soft overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/logos/logosBG.png"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
        >
          <source src="/logos/logosBGVideo.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 px-6">
          <div className="client-grid mx-auto w-full max-w-[100vw] sm:max-w-7xl">
            <LogoCycleGrid logos={representativeList} />
          </div>
        </div>
      </div>
    </section>
  );
}
