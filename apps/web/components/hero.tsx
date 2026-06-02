'use client';

import { motion } from 'framer-motion';
import { Particles } from './particles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-32 pb-20">
      {/* Particle background */}
      <div className="absolute inset-0">
        <Particles />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5">
              <span className="text-sm font-medium text-accent">Introducing Raya</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl"
          >
            The future of URL shortening
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-balance text-xl text-muted-foreground md:text-2xl"
          >
            Create, manage, and analyze shortened URLs with enterprise-grade analytics
            and security features. Built for professionals who demand precision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row justify-center">
            <button className="rounded-full bg-accent px-8 py-4 font-semibold text-accent-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
              Get Started
            </button>
            <button className="rounded-full border border-foreground/20 px-8 py-4 font-semibold text-foreground transition-all duration-200 hover:bg-foreground/5">
              Watch Demo
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={itemVariants} className="pt-12">
            <p className="text-sm text-muted-foreground mb-6">Trusted by leading companies</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {['Stripe', 'Vercel', 'Discord', 'Linear'].map((company) => (
                <div key={company} className="text-muted-foreground font-semibold">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
}
