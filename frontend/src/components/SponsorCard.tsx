'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Phone, ExternalLink, Zap, Flame, Building2, CheckCircle2 } from 'lucide-react';
import { Sponsor } from '@/types';

interface SponsorCardProps {
  sponsor: Sponsor;
  rank: number;
  delay?: number;
  onPitch: (sponsor: Sponsor) => void;
}

export default function SponsorCard({ sponsor, rank, delay = 0, onPitch }: SponsorCardProps) {
  const isTopFit = sponsor.score >= 100;
  const isHighFit = sponsor.score >= 50;

  // Match rate percentage calculation (fallback to rating * 20 or 85)
  const matchRate = sponsor.match_rate || (sponsor.rating > 0 ? Math.min(Math.round(sponsor.rating * 20), 99) : 82);

  // SVG Circle calculations for Sponsor Match Score gauge
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchRate / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.025, y: -6 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-500/30 hover:border-cyan-400/80 bg-slate-900/45 backdrop-blur-xl p-6 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 group transform-gpu will-change-transform"
    >
      {/* Top ambient glow corner */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/15 group-hover:bg-cyan-500/25 rounded-full blur-2xl transition-all pointer-events-none" />

      <div>
        {/* Top Badges & Interactive Match Gauge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-purple-950/80 border border-purple-500/40 text-xs font-mono font-bold text-cyan-300">
                #{rank}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-purple-500/20 truncate max-w-[140px]">
                {sponsor.category}
              </span>
            </div>

            <div
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono transition-transform group-hover:scale-105 ${
                isTopFit
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-emerald'
                  : isHighFit
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              }`}
            >
              {isTopFit ? <Flame className="w-3 h-3 fill-current" /> : <Zap className="w-3 h-3" />}
              <span>Score: {sponsor.score}</span>
            </div>
          </div>

          {/* Interactive Sponsor Match Score Gauge (Circular Glass Progress) */}
          <div className="flex flex-col items-center bg-slate-950/60 p-2 rounded-xl border border-cyan-500/20 shadow-inner shrink-0">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                {/* Background Ring */}
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  fill="transparent"
                  stroke="rgba(148, 163, 184, 0.15)"
                  strokeWidth="3.5"
                />
                {/* Progress Ring */}
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  fill="transparent"
                  stroke="url(#gradientCyanPurple)"
                  strokeWidth="3.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
                <defs>
                  <linearGradient id="gradientCyanPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] font-black font-mono text-cyan-300">
                  {matchRate}%
                </span>
              </div>
            </div>
            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
              Match Fit
            </span>
          </div>
        </div>

        {/* Raw Title (STRICT ZERO HALLUCINATION CONSTRAINT) */}
        <h4 className="text-lg font-bold text-white leading-snug line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {sponsor.name}
        </h4>

        {/* Raw Address (STRICT ZERO HALLUCINATION CONSTRAINT) */}
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed font-light">
          {sponsor.address || 'Address unlisted in local index'}
        </p>

        {/* Rating and Reviews Counter */}
        <div className="flex items-center gap-4 mt-4 py-2 px-3 rounded-xl bg-slate-950/60 border border-purple-500/20 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold font-mono text-white">
              {sponsor.rating > 0 ? sponsor.rating.toFixed(1) : 'New'}
            </span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="text-xs text-slate-400">
            <span className="font-bold font-mono text-slate-200">
              {sponsor.reviews.toLocaleString()}
            </span>{' '}
            verified Google reviews
          </div>
        </div>
      </div>

      {/* Footer Info & Pitch Button */}
      <div className="mt-5 pt-4 border-t border-purple-500/20 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 truncate max-w-[160px]">
            <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{sponsor.phone !== 'N/A' ? sponsor.phone : 'No phone listed'}</span>
          </div>

          {sponsor.website && sponsor.website !== 'N/A' ? (
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-cyan-400 font-semibold hover:underline"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-slate-500 text-[11px]">No direct site</span>
          )}
        </div>

        <button
          onClick={() => onPitch(sponsor)}
          className="w-full py-2.5 px-3 rounded-xl bg-purple-950/50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 text-slate-200 hover:text-white border border-purple-500/30 hover:border-cyan-400/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md group-hover:shadow-cyan-500/20"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-300" />
          <span>Generate Outreach Pitch</span>
        </button>
      </div>
    </motion.div>
  );
}
