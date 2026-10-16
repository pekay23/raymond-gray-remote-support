"use client";

import { motion, Variants } from "framer-motion";
import { itTiers } from "@/lib/profile-content";
import { ShieldCheck, MonitorDot, ServerCog } from "lucide-react";

export function TiersSection() {
  const icons = [MonitorDot, ShieldCheck, ServerCog];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="tiers" className="py-20 sm:py-28 lg:py-32 relative bg-rg-navy overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-50 mix-blend-overlay"
        style={{ backgroundImage: "url('/images/tech-abstract-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-6 sm:mb-8 drop-shadow-md">
            IT Helpdesk Service Tiers
          </h2>
          <p className="text-white/90 text-lg leading-relaxed drop-shadow-md">
            Remote IT support is delivered by dedicated technicians matched to the skill tier your environment requires. We operate against structured SOPs with clear escalation paths, weekly reporting, and seamless handover to your in-house team or MSP where needed.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {itTiers.map((tier, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                variants={cardVariants}
                key={tier.tier}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-6 sm:p-8 border border-rg-line-soft shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-rg-accent-subtle rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

                <div className="relative z-10">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-rg-bg-2 rounded-lg flex items-center justify-center mb-6 border border-rg-line-soft transition-transform group-hover:scale-110 ${tier.tier === "L2 — Advanced" ? "text-rg-accent-2" : "text-rg-accent"}`}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  <h3 className={`font-display font-bold text-xl sm:text-2xl mb-4 ${tier.tier === "L2 — Advanced" ? "text-rg-accent-2" : "text-rg-navy"}`}>
                    {tier.tier}
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-rg-ink-subtle uppercase tracking-wider mb-2">
                      Scope Covered
                    </h4>
                    <p className="text-rg-ink-soft text-sm sm:text-base leading-relaxed">
                      {tier.scope}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-rg-line-soft">
                    <h4 className="text-xs font-semibold text-rg-ink-subtle uppercase tracking-wider mb-2">
                      Typical Platforms & Tools
                    </h4>
                    <p className="text-rg-ink text-sm sm:text-base font-medium">
                      {tier.tools}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
