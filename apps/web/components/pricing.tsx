'use client';

import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    price: '29',
    description: 'Perfect for individuals and small projects',
    features: [
      'Up to 1,000 shortened URLs',
      'Basic analytics dashboard',
      'Standard support',
      'Custom domain support',
      'QR code generation',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '99',
    description: 'Ideal for growing teams',
    features: [
      'Up to 50,000 shortened URLs',
      'Advanced analytics & segmentation',
      'Priority support',
      'Team collaboration',
      'API access',
      'Custom branding',
      'Webhook integrations',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale deployments',
    features: [
      'Unlimited shortened URLs',
      'Custom analytics & reporting',
      'Dedicated support',
      'Advanced security features',
      'White-label solution',
      'On-premise deployment',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export function Pricing() {
  return (
    <section className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your needs. Always scalable as you grow.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'border-accent bg-card shadow-2xl scale-105'
                  : 'border-foreground/10 bg-card hover:border-accent/50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-4 py-1 text-sm font-semibold text-accent-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                  {plan.price !== 'Custom' && <span className="ml-2 text-muted-foreground">/month</span>}
                </div>

                <button
                  className={`w-full rounded-lg py-3 font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-accent text-accent-foreground hover:shadow-lg'
                      : 'border border-accent/50 text-accent hover:bg-accent/5'
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-4 pt-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-accent text-lg">✓</span>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
