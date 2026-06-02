'use client';

import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard-header';

const performanceData = [
  { day: 'Mon', clicks: 234 },
  { day: 'Tue', clicks: 456 },
  { day: 'Wed', clicks: 289 },
  { day: 'Thu', clicks: 567 },
  { day: 'Fri', clicks: 823 },
  { day: 'Sat', clicks: 456 },
  { day: 'Sun', clicks: 234 },
];

const topLinks = [
  { title: 'Product Launch', clicks: 3421, ctr: '4.2%' },
  { title: 'Blog Post', clicks: 2156, ctr: '2.8%' },
  { title: 'Webinar Recording', clicks: 1234, ctr: '5.1%' },
];

const deviceData = [
  { device: 'Desktop', percentage: 65 },
  { device: 'Mobile', percentage: 30 },
  { device: 'Tablet', percentage: 5 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <DashboardHeader
        title="Analytics"
        description="Detailed insights into your link performance"
      />

      <div className="flex-1 p-8 space-y-8">
        {/* Click Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-foreground/10 bg-card p-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-6">Click Performance (Last 7 Days)</h2>
          <div className="flex items-end justify-center gap-3 h-48">
            {performanceData.map((data, i) => {
              const maxClicks = Math.max(...performanceData.map(d => d.clicks));
              const height = (data.clicks / maxClicks) * 100;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-accent to-accent/50 rounded-t-lg flex flex-col items-center justify-end pb-2 min-h-12"
                >
                  <span className="text-xs font-semibold text-accent-foreground">{data.clicks}</span>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            {performanceData.map((data, i) => (
              <div key={i}>{data.day}</div>
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Top Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-foreground/10 bg-card p-6"
          >
            <h2 className="text-lg font-bold text-foreground mb-4">Top Performing Links</h2>
            <div className="space-y-4">
              {topLinks.map((link, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{link.title}</p>
                    <p className="text-sm text-muted-foreground">{link.clicks.toLocaleString()} clicks</p>
                  </div>
                  <span className="text-accent font-semibold">{link.ctr}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-foreground/10 bg-card p-6"
          >
            <h2 className="text-lg font-bold text-foreground mb-4">Clicks by Device</h2>
            <div className="space-y-4">
              {deviceData.map((data, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{data.device}</span>
                    <span className="text-sm text-accent font-semibold">{data.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.percentage}%` }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-accent to-accent/50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Geo Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border border-foreground/10 bg-card p-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-4">Top Countries</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { country: '🇺🇸 United States', clicks: 5421, percentage: 42 },
              { country: '🇬🇧 United Kingdom', clicks: 2843, percentage: 22 },
              { country: '🇨🇦 Canada', clicks: 1842, percentage: 14 },
              { country: '🇦🇺 Australia', clicks: 1234, percentage: 10 },
              { country: '🇩🇪 Germany', clicks: 892, percentage: 7 },
              { country: '🇮🇳 India', clicks: 668, percentage: 5 },
            ].map((item, i) => (
              <div key={i} className="rounded-lg bg-foreground/5 p-4">
                <p className="font-medium text-foreground">{item.country}</p>
                <p className="text-2xl font-bold text-accent mt-2">{item.clicks}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.percentage}% of traffic</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
