"use client";

import { motion, Variants } from "framer-motion";
import { coreServicesAdmin, coreServicesIT } from "@/lib/profile-content";

export function ServicesSection() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 70, damping: 15, mass: 1 },
    },
  };

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32 bg-white border-t border-rg-line-soft">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-rg-navy mb-4">
            Core Services
          </h2>
          <p className="text-rg-ink-soft text-lg">
            Structured, SOP-driven delivery across administration and IT helpdesk.
          </p>
        </motion.div>

        <div className="flex flex-col mt-8 sm:mt-12">
          {[...coreServicesAdmin, ...coreServicesIT].map((service) => (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              key={service.title}
              className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 sm:gap-8 lg:gap-16 pt-8 sm:pt-12 pb-8 sm:pb-12 border-t border-rg-line-soft last:border-b"
            >
              <div className="flex flex-col gap-4 lg:pr-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rg-bg-2 flex items-center justify-center text-rg-accent shadow-sm shrink-0">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-medium text-xl sm:text-2xl text-rg-navy leading-tight m-0">
                  {service.title}
                </h3>
              </div>
              <div className="flex flex-col justify-center">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-3 list-none p-0 m-0">
                  {service.points.map((point, j) => (
                    <li key={j}
                      className="relative pl-6 py-3 border-b border-rg-line-soft last:border-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-0 before:content-[''] before:absolute before:left-0 before:top-[22px] before:w-3 before:h-px before:bg-rg-accent text-rg-ink-soft text-sm leading-relaxed hover:text-rg-navy hover:pl-7 transition-all duration-300"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
