'use client';

import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function DashboardHeader({ title, description, action }: DashboardHeaderProps) {
  return (
    <div className="border-b border-foreground/10 px-8 py-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </motion.div>
        {action && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-shadow hover:shadow-lg"
          >
            {action.label}
          </motion.button>
        )}
      </div>
    </div>
  );
}
