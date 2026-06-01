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
    <section className="py-24 bg-rg-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-rg-accent-deep/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
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
          className="grid md:grid-cols-3 gap-8"
        >
          {feedback.map((item, i) => (
            <motion.div 
              variants={cardVariants}
              key={i} 
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="bg-rg-navy-800 p-8 rounded-xl border border-rg-navy-600 relative hover:shadow-2xl hover:shadow-rg-accent/10 transition-shadow"
            >
              <Quote className="text-rg-accent/30 absolute top-6 right-6" size={48} />
              
              <div className="relative z-10">
                <p className="text-rg-navy-50 italic leading-relaxed mb-8">
                  {item.quote}
                </p>
                
                <div className="mt-auto border-t border-rg-navy-600 pt-6">
                  <h4 className="font-display font-semibold text-white">
                    {item.client}
                  </h4>
                  <span className="text-sm text-rg-navy-300">
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
