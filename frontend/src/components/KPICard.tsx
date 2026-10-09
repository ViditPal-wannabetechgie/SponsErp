'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KPICardProps {
  label: string;
  value: string | number;
  subValue?: string;
  badge?: string;
  badgeType?: 'emerald' | 'indigo' | 'cyan' | 'amber' | 'purple';
  icon: React.ReactNode;
  delay?: number;
}

export default function KPICard({
  label,
  value,
  subValue,
  badge,
  badgeType = 'purple',
  icon,
  delay = 0,
}: KPICardProps) {
  const badgeColors = {
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-sm',
    indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30 shadow-sm',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-sm',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-sm',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30 shadow-sm',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.025, y: -6 }}
      className="relative overflow-hidden rounded-2xl border border-purple-500/30 hover:border-cyan-400/80 bg-slate-900/50 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 group"
    >
      {/* Dynamic Cosmic Ambient Orb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 group-hover:bg-cyan-500/20 rounded-full blur-2xl transition-all pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
          {label}
        </span>
        <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 text-cyan-300 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/50 transition-all">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        {/* Oversized metrics: 42px–52px display/monospace numbers */}
        <div className="text-[44px] sm:text-[48px] font-black font-mono tracking-tight text-white leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          {value}
        </div>
        {badge && (
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border backdrop-blur-md transition-transform ${badgeColors[badgeType]}`}
          >
            {badge}
          </motion.span>
        )}
      </div>

      {subValue && (
        <p className="text-xs text-slate-400 mt-3 font-medium">
          {subValue}
        </p>
      )}
    </motion.div>
  );
}
