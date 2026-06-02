'use client';

import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard-header';

const invoices = [
  { date: 'Dec 1, 2024', amount: '$99.00', status: 'Paid', invoice: '#INV-2024-001' },
  { date: 'Nov 1, 2024', amount: '$99.00', status: 'Paid', invoice: '#INV-2024-002' },
  { date: 'Oct 1, 2024', amount: '$99.00', status: 'Paid', invoice: '#INV-2024-003' },
];

export default function BillingPage() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <DashboardHeader
        title="Billing & Plans"
        description="Manage your subscription and payment methods"
      />

      <div className="p-8 space-y-8 max-w-4xl">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-accent/50 bg-accent/5 p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Professional Plan</h2>
              <p className="mt-2 text-muted-foreground">$99/month billed monthly</p>
            </div>
            <button className="px-6 py-3 rounded-lg border border-accent text-accent hover:bg-accent/10 transition-colors font-semibold">
              Change Plan
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Monthly Links', value: '50,000' },
              { label: 'Team Members', value: 'Unlimited' },
              { label: 'API Access', value: 'Yes' },
              { label: 'Support', value: 'Priority' },
            ].map((item, i) => (
              <div key={i} className="rounded-lg bg-foreground/5 p-4">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-lg font-bold text-foreground mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            ✓ Your subscription renews on January 1, 2025
          </p>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-bold text-foreground">Payment Method</h2>
          <div className="rounded-lg border border-foreground/10 bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">💳</div>
                <div>
                  <p className="font-semibold text-foreground">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors">
                Update
              </button>
            </div>
          </div>
        </motion.div>

        {/* Billing History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-bold text-foreground">Billing History</h2>
          <div className="rounded-lg border border-foreground/10 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-foreground/10 bg-foreground/5">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Invoice</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-foreground/10 hover:bg-foreground/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-foreground">{invoice.date}</td>
                      <td className="px-6 py-4 text-sm font-mono text-accent">{invoice.invoice}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{invoice.amount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 rounded bg-accent/20 text-accent font-semibold">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-accent hover:text-accent/80 transition-colors">Download</button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
