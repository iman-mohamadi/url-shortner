'use client';

import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard-header';

const stats = [
  { label: 'Total Links', value: '2,543', change: '+12%' },
  { label: 'Total Clicks', value: '89,421', change: '+8%' },
  { label: 'Avg CTR', value: '14.2%', change: '+2%' },
  { label: 'Active Users', value: '342', change: '+24%' },
];

const recentLinks = [
  { title: 'New Product Launch', shortUrl: 'raya.io/launch', clicks: 1234, date: '2 days ago' },
  { title: 'Blog Post Announcement', shortUrl: 'raya.io/blog-01', clicks: 856, date: '5 days ago' },
  { title: 'Email Campaign', shortUrl: 'raya.io/email-mar', clicks: 2145, date: '1 week ago' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <DashboardHeader
        title="Dashboard"
        description="Welcome back! Here's your URL shortening analytics."
      />

      {/* Stats Grid */}
      <div className="px-8 py-6">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg border border-foreground/10 bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-accent">{stat.change}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Links */}
      <div className="px-8 pb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Links</h2>
        <div className="rounded-lg border border-foreground/10 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-foreground/10">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Short URL</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Clicks</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLinks.map((link, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-foreground/10 hover:bg-foreground/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{link.title}</td>
                    <td className="px-6 py-4 text-sm text-accent font-mono">{link.shortUrl}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{link.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{link.date}</td>
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
