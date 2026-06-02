'use client';

import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard-header';
import Link from 'next/link';

const allLinks = [
  { title: 'Website Homepage', shortUrl: 'raya.io/home', clicks: 5432, conversion: '2.3%', date: 'Dec 15, 2024', active: true },
  { title: 'Product Demo', shortUrl: 'raya.io/demo', clicks: 3421, conversion: '5.1%', date: 'Dec 14, 2024', active: true },
  { title: 'Blog Post Series', shortUrl: 'raya.io/blog-series', clicks: 2156, conversion: '1.8%', date: 'Dec 12, 2024', active: true },
  { title: 'Webinar Recording', shortUrl: 'raya.io/webinar-dec', clicks: 8945, conversion: '3.6%', date: 'Dec 10, 2024', active: true },
  { title: 'Free Trial Offer', shortUrl: 'raya.io/trial-12m', clicks: 1234, conversion: '8.2%', date: 'Dec 8, 2024', active: false },
];

export default function LinksPage() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <DashboardHeader
        title="My Links"
        description="Manage and track all your shortened URLs"
        action={{
          label: '+ New Link',
          onClick: () => console.log('Create new link'),
        }}
      />

      {/* Links Table */}
      <div className="px-8 py-6">
        <div className="rounded-lg border border-foreground/10 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/5">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Short URL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Clicks</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Conversion</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allLinks.map((link, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-foreground/10 hover:bg-foreground/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{link.title}</td>
                    <td className="px-6 py-4 text-sm text-accent font-mono">{link.shortUrl}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{link.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{link.conversion}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        link.active
                          ? 'bg-accent/20 text-accent'
                          : 'bg-foreground/10 text-muted-foreground'
                      }`}>
                        {link.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{link.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-accent hover:text-accent/80 transition-colors">Edit</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
