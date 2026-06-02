'use client';

import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard-header';
import { useState } from 'react';

export default function CreatePage() {
  const [formData, setFormData] = useState({
    longUrl: '',
    customAlias: '',
    title: '',
    tags: '',
    expiryDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <DashboardHeader
        title="Create New Link"
        description="Shorten a URL and start tracking clicks"
      />

      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Long URL */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                URL to Shorten
              </label>
              <input
                type="url"
                name="longUrl"
                value={formData.longUrl}
                onChange={handleChange}
                placeholder="https://example.com/very/long/url"
                required
                className="w-full rounded-lg border border-foreground/20 bg-card px-4 py-3 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Custom Alias */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Custom Alias (optional)
              </label>
              <div className="flex gap-2">
                <span className="flex items-center px-4 py-3 text-muted-foreground bg-foreground/5 rounded-lg border border-foreground/20">
                  raya.io/
                </span>
                <input
                  type="text"
                  name="customAlias"
                  value={formData.customAlias}
                  onChange={handleChange}
                  placeholder="my-custom-link"
                  className="flex-1 rounded-lg border border-foreground/20 bg-card px-4 py-3 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Give your link a descriptive name"
                className="w-full rounded-lg border border-foreground/20 bg-card px-4 py-3 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="marketing, campaign, social"
                className="w-full rounded-lg border border-foreground/20 bg-card px-4 py-3 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Expiry Date (optional)
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-foreground/20 bg-card px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-shadow hover:shadow-lg"
              >
                Create Shortened Link
              </motion.button>
            </div>
          </form>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6"
          >
            <h3 className="font-semibold text-foreground mb-2">💡 Tips for better links</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use descriptive titles to easily identify your links later</li>
              <li>• Custom aliases make links memorable and brand-consistent</li>
              <li>• Add tags to organize and filter your links</li>
              <li>• Set expiry dates for time-sensitive campaigns</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
