"use client";

import { motion, Variants } from "framer-motion";
import { coreServicesAdmin, coreServicesIT } from "@/lib/profile-content";

export function ServicesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.25, 
        delayChildren: 0.1 
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 70, damping: 15, mass: 1 } 
    },
  };

  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.4 },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -10, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section id="services" className="py-24 bg-white border-t border-rg-line-soft">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-rg-navy mb-4">
            Core Services
          </h2>
          <p className="text-rg-ink-soft text-lg">
            Structured, SOP-driven delivery across administration and IT helpdesk.
          </p>
        </motion.div>

        <div className="flex flex-col mt-8">
          {[...coreServicesAdmin, ...coreServicesIT].map((service, idx) => (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              key={service.title}
              className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-16 pt-12 pb-12 border-t border-rg-line-soft last:border-b"
            >
              <div className="flex flex-col gap-4 lg:pr-8">
                <div className="w-12 h-12 rounded-full bg-rg-bg-2 flex items-center justify-center text-rg-accent shadow-sm shrink-0">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-medium text-2xl text-rg-navy leading-tight m-0">
                  {service.title}
                </h3>
              </div>
              <div className="flex flex-col justify-center">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 list-none p-0 m-0">
                  {service.points.map((point, j) => (
                    <li
                      key={j}
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
