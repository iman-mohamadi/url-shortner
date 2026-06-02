'use client';

import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard-header';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    defaultDomain: 'raya.io',
    autoExpiry: 30,
    emailNotifications: true,
    twoFactor: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const settingSections = [
    {
      title: 'Account Settings',
      items: [
        { label: 'Email Address', value: 'user@example.com', editable: true },
        { label: 'Account Created', value: 'December 1, 2024', editable: false },
      ],
    },
    {
      title: 'Link Defaults',
      items: [
        { label: 'Default Domain', value: settings.defaultDomain, editable: true },
        { label: 'Auto-Expiry (days)', value: settings.autoExpiry.toString(), editable: true },
      ],
    },
  ];

  const toggleSettings = [
    { label: 'Email Notifications', value: settings.emailNotifications, key: 'emailNotifications' },
    { label: 'Two-Factor Authentication', value: settings.twoFactor, key: 'twoFactor' },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <DashboardHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="p-8 space-y-8 max-w-2xl">
        {/* Settings Sections */}
        {settingSections.map((section, sIdx) => (
          <motion.div
            key={sIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIdx * 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-foreground/10 bg-card p-4">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <input
                    type="text"
                    value={item.value}
                    disabled={!item.editable}
                    className="text-sm text-muted-foreground bg-transparent text-right disabled:cursor-not-allowed disabled:opacity-75"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Toggle Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-bold text-foreground">Security & Notifications</h2>
          <div className="space-y-3">
            {toggleSettings.map((setting, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-foreground/10 bg-card p-4">
                <span className="text-sm font-medium text-foreground">{setting.label}</span>
                <button
                  onClick={() => handleToggle(setting.key as keyof typeof settings)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    setting.value ? 'bg-accent' : 'bg-foreground/20'
                  }`}
                >
                  <motion.div
                    animate={{ x: setting.value ? 24 : 0 }}
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-6"
        >
          <h2 className="text-lg font-bold text-destructive mb-4">Danger Zone</h2>
          <button className="px-6 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors">
            Delete Account
          </button>
        </motion.div>
      </div>
    </div>
  );
}
