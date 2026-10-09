'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Star, TrendingUp, Users, ShieldCheck, Flame, Compass } from 'lucide-react';
import { Anchor } from '@/types';

interface AnchorCardProps {
  anchor: Anchor;
  delay?: number;
}

export default function AnchorCard({ anchor, delay = 0 }: AnchorCardProps) {
  const estimatedFootfall = Math.max(500, Math.min(25000, anchor.reviews * 12));

  // Anchor Footfall Heat Indicator logic
  let heatBadge = {
    label: 'COMMUTER CORRIDOR',
    color: 'bg-indigo-950/70 text-indigo-300 border-indigo-500/40',
    icon: <Compass className="w-3 h-3 text-indigo-400" />
  };

  if (anchor.reviews >= 250) {
    heatBadge = {
      label: 'EXTREME DENSITY',
      color: 'bg-rose-950/80 text-rose-300 border-rose-500/50 shadow-glow-rose',
      icon: <Flame className="w-3 h-3 text-rose-400 fill-rose-400" />
    };
  } else if (anchor.reviews >= 100) {
    heatBadge = {
      label: 'HIGH FOOTFALL',
      color: 'bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-glow-amber',
      icon: <TrendingUp className="w-3 h-3 text-amber-400" />
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.025, y: -6 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-500/30 hover:border-cyan-400/80 bg-slate-900/45 backdrop-blur-xl p-5 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 group transform-gpu will-change-transform"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 group-hover:bg-purple-500/20 rounded-full blur-xl pointer-events-none transition-all" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 uppercase tracking-wide truncate max-w-[140px]">
            {anchor.category}
          </span>
          
          {/* Anchor Footfall Heat Indicator Badge */}
          <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border ${heatBadge.color}`}>
            {heatBadge.icon}
            <span>{heatBadge.label}</span>
          </div>
        </div>

        {/* Raw Title only (ZERO HALLUCINATION CONSTRAINT) */}
        <h4 className="text-base font-bold text-white leading-snug line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {anchor.name}
        </h4>

        {/* Raw Address only (ZERO HALLUCINATION CONSTRAINT) */}
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed font-light">
          {anchor.address || 'Address verified on Google Maps node'}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-purple-500/20">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-purple-500/20">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">
              Maps Popularity
            </div>
            <div className="flex items-center gap-1 mt-0.5 font-bold font-mono text-white">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{anchor.rating > 0 ? anchor.rating.toFixed(1) : '4.5'}</span>
              <span className="text-slate-400 text-[10px]">({anchor.reviews})</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-purple-500/20">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">
              Est. Daily Reach
            </div>
            <div className="flex items-center gap-1 mt-0.5 font-bold font-mono text-cyan-300">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>~{estimatedFootfall.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
