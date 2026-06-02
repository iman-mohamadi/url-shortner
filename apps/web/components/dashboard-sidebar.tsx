'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Overview', icon: '📊', href: '/dashboard' },
  { label: 'My Links', icon: '🔗', href: '/dashboard/links' },
  { label: 'Create Link', icon: '➕', href: '/dashboard/create' },
  { label: 'Analytics', icon: '📈', href: '/dashboard/analytics' },
  { label: 'Team', icon: '👥', href: '/dashboard/team' },
  { label: 'Settings', icon: '⚙️', href: '/dashboard/settings' },
  { label: 'Billing', icon: '💳', href: '/dashboard/billing' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="flex flex-col border-r border-foreground/10 bg-card h-screen overflow-hidden"
    >
      {/* Logo/Collapse button */}
      <div className="border-b border-foreground/10 p-4 flex items-center justify-between">
        {!isCollapsed && <span className="text-xl font-bold text-accent">Raya</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive
                  ? 'bg-accent/20 text-accent font-semibold'
                  : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-foreground/10 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold">
            U
          </div>
          {!isCollapsed && (
            <div>
              <div className="text-sm font-semibold text-foreground">User</div>
              <div className="text-xs text-muted-foreground">Premium</div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
