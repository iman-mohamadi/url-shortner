'use client';

import { motion } from 'framer-motion';

const features = [
  {
    emoji: '⚡',
    title: 'Lightning Fast',
    description: 'Instantly create and manage shortened URLs with our optimized infrastructure.',
  },
  {
    emoji: '📊',
    title: 'Advanced Analytics',
    description: 'Track every click, conversion, and interaction with detailed real-time analytics.',
  },
  {
    emoji: '🔒',
    title: 'Enterprise Security',
    description: 'Bank-level encryption and security standards to protect your data.',
  },
  {
    emoji: '🌍',
    title: 'Global CDN',
    description: 'Lightning-fast redirects from servers across the globe.',
  },
  {
    emoji: '📱',
    title: 'QR Code Generation',
    description: 'Automatically generate QR codes for each shortened URL.',
  },
  {
    emoji: '🔐',
    title: 'Custom Domains',
    description: 'Use your own domain for branded shortened links.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function Features() {
  return (
    <section className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <div className="space-y-16">
        {/* Section header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
            Powerful features for modern teams
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create, manage, and optimize shortened URLs
          </p>
        </div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group rounded-xl border border-foreground/10 bg-card p-8 transition-all duration-300 hover:border-accent/50 hover:bg-card/80"
              >
                <div className="text-4xl">
                  {feature.emoji}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
