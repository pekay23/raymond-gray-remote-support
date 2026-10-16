"use client";

import { motion, Variants } from "framer-motion";
import { deliveryModel, bestFitClients, assuranceControls } from "@/lib/profile-content";
import { CheckCircle2, ShieldCheck, Target } from "lucide-react";
import Image from "next/image";

export function DeliverySection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white border-t border-rg-line-soft">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-16">
          {/* Delivery Model */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-rg-line-soft">
              <Target className="w-7 h-7 sm:w-8 sm:h-8 text-rg-accent" />
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-rg-navy">Delivery Model</h2>
            </motion.div>
            <div className="space-y-6">
              {deliveryModel.map((item, index) => (
                <motion.div
                  variants={itemVariants}
                  key={index}
                  className="flex flex-col sm:flex-row sm:gap-6 border-b border-rg-line-soft pb-4 sm:pb-6 last:border-0"
                >
                  <div className="text-sm sm:text-base font-semibold text-rg-ink-subtle uppercase tracking-wider mb-2 sm:mb-0 sm:w-1/3">
                    {item.label}
                  </div>
                  <div className="text-rg-ink-soft sm:w-2/3">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-12">
            {/* Human Element Image */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-md border border-rg-line-soft"
            >
              <Image 
                src="/images/remote-command-center.png" 
                alt="Remote IT Command Center" 
                fill 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>

            {/* Assurance & Controls */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="bg-rg-navy p-6 sm:p-8 rounded-xl border border-rg-navy-600 text-white"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-rg-accent-light" size={24} />
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-white">Assurance & Controls</h3>
              </motion.div>
              <ul className="space-y-4">
                {assuranceControls.map((control, index) => (
                  <motion.li variants={itemVariants} key={index} className="flex items-start gap-3 text-rg-navy-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-rg-accent-light mt-2 shrink-0" />
                    <span>{control}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Best Fit Clients - Full Width Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 sm:mt-20 bg-rg-bg-2 p-6 sm:p-8 md:p-10 rounded-xl border border-rg-line-soft"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:gap-4 mb-8 sm:mb-10 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-rg-line-soft">
              <CheckCircle2 className="text-rg-accent-2" size={32} />
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-rg-navy">Best-Fit Clients</h3>
          </motion.div>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-x-12 gap-y-6">
            {bestFitClients.map((client, index) => (
              <motion.li 
                variants={itemVariants} 
                key={index} 
                className="flex items-start gap-4 text-rg-ink-soft bg-white p-6 sm:p-8 rounded-lg border border-rg-line-soft shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="w-2 h-2 rounded-full bg-rg-accent-2 mt-2 shrink-0" />
                <span className="leading-relaxed">{client}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
