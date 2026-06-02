'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    emoji: '📈',
    stat: '300%',
    label: 'Increase in CTR',
    description: 'Average click-through rate improvement for our users',
  },
  {
    emoji: '⚡',
    stat: '< 100ms',
    label: 'Average Redirect Time',
    description: 'Lightning-fast redirects powered by global infrastructure',
  },
  {
    emoji: '👥',
    stat: '50K+',
    label: 'Active Users',
    description: 'Join thousands of professionals and companies worldwide',
  },
  {
    emoji: '✅',
    stat: '99.99%',
    label: 'Uptime SLA',
    description: 'Enterprise-grade reliability you can depend on',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

export function Benefits() {
  return (
    <section className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
            Trusted by industry leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            Real results from real users across the globe
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-xl border border-foreground/10 bg-card p-8 text-center"
              >
                <div className="text-4xl">
                  {benefit.emoji}
                </div>
                <div className="mt-6 text-4xl font-bold text-accent">{benefit.stat}</div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{benefit.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
