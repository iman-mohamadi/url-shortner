'use client';

import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard-header';

const teamMembers = [
  { name: 'You', email: 'user@example.com', role: 'Owner', joinedDate: 'Dec 1, 2024', status: 'Active' },
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joinedDate: 'Dec 5, 2024', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Member', joinedDate: 'Dec 10, 2024', status: 'Active' },
  { name: 'Carol Davis', email: 'carol@example.com', role: 'Member', joinedDate: 'Dec 15, 2024', status: 'Pending' },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <DashboardHeader
        title="Team Management"
        description="Manage team members and permissions"
        action={{
          label: '+ Invite Member',
          onClick: () => console.log('Invite member'),
        }}
      />

      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-foreground/10 bg-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/5">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-foreground/10 hover:bg-foreground/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{member.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 rounded bg-foreground/10 text-foreground font-medium">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{member.joinedDate}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        member.status === 'Active'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-foreground/10 text-muted-foreground'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-muted-foreground hover:text-foreground transition-colors">More</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
