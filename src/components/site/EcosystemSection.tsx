"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";
import { experienceProfile, representativeList } from "@/lib/profile-content";
import { LogoCycleGrid } from "@/components/ui/LogoCycleGrid";

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isVideoInView = useInView(videoContainerRef, { once: true, margin: "200px" });

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
    <section id="clients" ref={sectionRef} className="py-20 sm:py-28 lg:py-32 bg-rg-bg-2 border-t border-rg-line-soft">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-rg-navy mb-4">
            Experience Profile & Ecosystem
          </h2>
          <p className="text-rg-ink-soft text-lg leading-relaxed">
            Raymond Gray&apos;s services are backed by hands-on delivery experience in high-pressure, high-accountability manufacturing and engineering environments. Our team routinely manages customer communication, order administration, job tracking and reporting, supplier follow-ups, time/attendance coordination, and IT support workflows — using structured SOPs, templates, and escalation rules that hold up under volume.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {experienceProfile.map((profile, i) => (
            <div key={i} className="client-fade bg-white p-6 sm:p-8 rounded-xl border border-rg-line-soft shadow-sm hover:border-rg-accent transition-colors">
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-rg-navy mb-3 sm:mb-4">
                {profile.client}
              </h3>
              <p className="text-sm sm:text-base text-rg-ink-soft leading-relaxed">
                {profile.scope}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div 
        ref={videoContainerRef}
        className="w-full relative py-12 sm:py-16 mt-16 sm:mt-20 border-y border-rg-line-soft overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/logos/logosBG.png')" }}
      >
        {isVideoInView && (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            poster="/logos/logosBG.png"
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
          >
            <source src="/logos/logosBGVideo.mp4" type="video/mp4" />
          </video>
        )}
        <div className="client-grid mx-auto w-full max-w-full sm:max-w-7xl">
          <LogoCycleGrid logos={representativeList} />
        </div>
      </div>
    </section>
  );
}
