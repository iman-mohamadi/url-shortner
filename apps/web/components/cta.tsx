'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export function CTA() {
  return (
    <section className="relative z-20 mx-auto max-w-4xl px-6 py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-card to-card/50 p-12 text-center md:p-16"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-foreground md:text-5xl">
          Ready to transform your URL management?
        </motion.h2>
        
        <motion.p variants={itemVariants} className="mt-6 text-lg text-muted-foreground">
          Join thousands of professionals who have already switched to Raya. Start with our free plan today.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
          <button className="rounded-lg bg-accent px-8 py-4 font-semibold text-accent-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
            Start Free Today
          </button>
          <button className="rounded-lg border border-foreground/20 px-8 py-4 font-semibold text-foreground transition-all duration-200 hover:bg-foreground/5">
            Schedule Demo
          </button>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-6 text-sm text-muted-foreground">
          No credit card required. Full access to all features for 14 days.
        </motion.p>
      </motion.div>
    </section>
  );
}
