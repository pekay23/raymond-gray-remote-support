"use client";

import { motion, Variants } from "framer-motion";
import { feedback } from "@/lib/profile-content";
import { Quote } from "lucide-react";

export function FeedbackSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-rg-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-rg-accent-deep/50 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Client Feedback
          </h2>
          <p className="text-rg-navy-200 text-lg">
            Hear directly from the businesses we support worldwide.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {feedback.map((item, i) => (
            <motion.div
              variants={cardVariants}
              key={i}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="bg-rg-navy-800 p-6 sm:p-8 rounded-xl border border-rg-navy-600 relative hover:shadow-2xl hover:shadow-rg-accent/10 transition-shadow"
            >
              <Quote className="text-rg-accent/30 absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-12 sm:h-12" size={32} />

              <div className="relative z-10">
                <p className="text-rg-navy-50 italic leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                  {item.quote}
                </p>

                <div className="mt-auto border-t border-rg-navy-600 pt-4 sm:pt-6">
                  <h4 className="font-display font-semibold text-white text-base sm:text-xl">
                    {item.client}
                  </h4>
                  <span className="text-sm text-white/70">
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
