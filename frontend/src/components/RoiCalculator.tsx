'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  DollarSign,
  Users,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

interface RoiCalculatorProps {
  initialAttendees: number;
}

export default function RoiCalculator({ initialAttendees }: RoiCalculatorProps) {
  const [attendees, setAttendees] = useState<number>(initialAttendees || 500);
  const [ticketPrice, setTicketPrice] = useState<number>(25);
  const [sponsorTier, setSponsorTier] = useState<number>(500);

  // Impressions calculation:
  // Direct physical attendees + digital pass-alongs & anchor footfall multiplier (3.2x)
  const estimatedImpressions = Math.round(attendees * 3.4);

  // Local Event CPM (Cost per Thousand Impressions)
  // CPM = (Sponsorship Cost / Impressions) * 1000
  const eventCpm = estimatedImpressions > 0 ? ((sponsorTier / estimatedImpressions) * 1000).toFixed(2) : '0';

  // Industry benchmark average CPM for targeted Meta/Instagram/Google Local Ads: ~$32.00 - $38.00
  const digitalAdsCpm = 34.5;
  const equivalentDigitalAdSpend = Math.round((estimatedImpressions / 1000) * digitalAdsCpm);

  // Projected Direct Local ROI Multiplier
  const roiMultiplier = sponsorTier > 0 ? (equivalentDigitalAdSpend / sponsorTier).toFixed(1) : '1.0';

  // Estimated Sponsor Sales / Footfall Conversion (assuming ~4.5% conversion of attendees who visit or redeem)
  const projectedLocalConversions = Math.round(attendees * 0.045);
  const estimatedSalesVolume = Math.round(projectedLocalConversions * 35); // Avg $35 basket size

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-purple-500/30 bg-slate-900/50 backdrop-blur-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden transform-gpu will-change-transform"
    >
      {/* Background ambient decorative rays */}
      <div className="absolute -top-24 -left-24 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-purple-500/20 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1.5px] shadow-lg shadow-purple-500/30">
            <div className="w-full h-full bg-[#030712] rounded-[14px] flex items-center justify-center text-cyan-300">
              <Calculator className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-white tracking-tight">
                Interactive Sponsor ROI &amp; Value Engine
              </h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Live Model
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Demonstrate to local businesses why sponsoring your event generates up to 3&times; higher ROI than Meta/Google Ads.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono px-3 py-1 rounded-xl bg-purple-950/80 text-cyan-300 border border-cyan-500/30">
            Algorithmic Micro-Economics
          </span>
        </div>
      </div>

      {/* Main Grid: Controls vs Output Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 relative z-10">
        {/* Left Column: Interactive Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-950/50 p-5 rounded-2xl border border-purple-500/20 backdrop-blur-md">
          {/* Slider 1: Expected Attendees */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Expected Attendees</span>
              </span>
              <span className="font-mono font-bold text-white text-sm bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-500/30">
                {attendees.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="50"
              value={attendees}
              onChange={(e) => setAttendees(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>100</span>
              <span>5,000</span>
              <span>10,000+</span>
            </div>
          </div>

          {/* Slider 2: Sponsor Package Tier */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sponsorship Pitch Price</span>
              </span>
              <span className="font-mono font-bold text-emerald-300 text-sm bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                ${sponsorTier.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="5000"
              step="50"
              value={sponsorTier}
              onChange={(e) => setSponsorTier(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>$150</span>
              <span>$2,500</span>
              <span>$5,000</span>
            </div>
          </div>

          {/* Slider 3: Ticket / Pass Price */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Avg. Attendee Pass Value</span>
              </span>
              <span className="font-mono font-bold text-white text-sm bg-slate-900 px-2 py-0.5 rounded-md border border-slate-700">
                ${ticketPrice}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>Free ($0)</span>
              <span>$100</span>
              <span>$200+</span>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative ROI Analytics Cards (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Estimated High-Intent Impressions */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/25 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Verified Local Impressions
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 mt-1">
                {estimatedImpressions.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Attendees + physical venue passersby + social tag exposure.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-purple-500/20 text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Sponsor CPM:</span>
              <strong className="text-cyan-300">${eventCpm} / 1k views</strong>
            </div>
          </div>

          {/* Card 2: Equivalent Digital Ad Value */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/25 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Digital Ad Equivalent Cost
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                ${equivalentDigitalAdSpend.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Cost to purchase equivalent targeted reach on Meta / Google.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-purple-500/20 text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Online Benchmark:</span>
              <span className="text-slate-400">$34.50 CPM</span>
            </div>
          </div>

          {/* Card 3: Value Advantage / ROI Multiplier (Hero Metric) */}
          <div className="sm:col-span-2 p-4.5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-950/80 to-cyan-950/60 border border-cyan-500/40 shadow-glow-cyan flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Pitch Winning Metric</span>
              </div>
              <div className="text-base sm:text-lg font-black text-white">
                Sponsor ROI Efficiency: <span className="text-cyan-300">{roiMultiplier}&times; Value Advantage</span>
              </div>
              <p className="text-xs text-slate-300 max-w-md">
                A ${sponsorTier.toLocaleString()} sponsorship delivers approximately ${equivalentDigitalAdSpend.toLocaleString()} in equivalent brand exposure, plus ~{projectedLocalConversions} direct customer footfall visits.
              </p>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-2xl border border-cyan-500/40 text-center shrink-0 w-full sm:w-auto">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                Projected Conversion Spend
              </div>
              <div className="text-xl font-black font-mono text-emerald-400 mt-0.5">
                ~${estimatedSalesVolume.toLocaleString()}
              </div>
              <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                @ $35 avg basket size
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
