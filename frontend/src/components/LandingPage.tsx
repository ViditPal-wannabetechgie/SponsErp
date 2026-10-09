'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  TrendingUp,
  MapPin,
  Flame,
  Zap,
  CheckCircle2,
  Users2,
  Lock,
  Layers,
  Radio,
  Orbit,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export default function LandingPage({ onOpenAuth }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.2]);

  return (
    <div ref={containerRef} className="relative overflow-hidden min-h-screen">
      {/* HERO SECTION */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
      >
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-semibold mb-8 shadow-glow-purple backdrop-blur-xl"
        >
          <Orbit className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Cosmic Hyper-Local B2B Sponsorship Radar</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping ml-1" />
        </motion.div>

        {/* Oversized Cinematic Typography (56px–72px display heading) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.06] max-w-5xl mx-auto"
        >
          Turn Local Footfall into High-Yield{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-cyan-300 drop-shadow-[0_0_35px_rgba(139,92,246,0.35)]">
            Event Sponsorships.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Harness real-time Google Maps coordinates to identify top-converting local sponsors, verify nearby transit and university anchor hubs, and close deals with algorithmic proof.
        </motion.p>

        {/* Prominent CTAs per specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-base shadow-xl shadow-purple-600/30 border border-purple-400/40 flex items-center justify-center gap-2.5 group transition-all transform hover:-translate-y-1 hover:shadow-cyan-500/30"
          >
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => onOpenAuth('signin')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 border border-purple-500/30 hover:border-cyan-400/60 font-bold text-base shadow-lg backdrop-blur-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Sign In to Platform</span>
          </button>
        </motion.div>

        {/* Verified Data Trust Micro-Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/50 border border-purple-500/20 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Strict Zero-Hallucination Raw Data</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/50 border border-purple-500/20 backdrop-blur-md">
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Official SerpApi Google Maps Engine</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/50 border border-purple-500/20 backdrop-blur-md">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Enterprise B2B Auth Only</span>
          </div>
        </motion.div>
      </motion.section>

      {/* INTERACTIVE FEATURE SHOWCASE GRID (SYMPHONY-STYLE CARDS) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered for Event Organizers</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Everything Needed to Pitch &amp; Win Local Sponsors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.025, y: -6 }}
            className="p-8 rounded-3xl border border-purple-500/30 hover:border-cyan-400/80 bg-slate-900/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group transition-all duration-300"
          >
            {/* Top glowing ambient orb */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 group-hover:bg-cyan-500/20 rounded-full blur-2xl transition-all pointer-events-none" />

            <div className="w-14 h-14 rounded-2xl bg-purple-950/70 text-purple-300 flex items-center justify-center mb-6 border border-purple-500/40 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all">
              <Building2 className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Hyper-Local Fit Scoring
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Dynamically scores local cafes, gyms, boutiques, and shops using live Google Maps review counts and star ratings: <code className="text-cyan-300 font-mono">(Reviews &times; Rating) / 10</code>.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.025, y: -6 }}
            className="p-8 rounded-3xl border border-purple-500/30 hover:border-cyan-400/80 bg-slate-900/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 group-hover:bg-purple-500/20 rounded-full blur-2xl transition-all pointer-events-none" />

            <div className="w-14 h-14 rounded-2xl bg-cyan-950/70 text-cyan-300 flex items-center justify-center mb-6 border border-cyan-500/40 group-hover:scale-110 group-hover:border-purple-400/50 transition-all">
              <Compass className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Anchor Hub Proof
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              No broken third-party scrapers. Pulls authentic transit centers, universities, and commercial shopping centers with &gt;30 verified reviews to prove organic neighborhood footfall.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.025, y: -6 }}
            className="p-8 rounded-3xl border border-purple-500/30 hover:border-cyan-400/80 bg-slate-900/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 group-hover:bg-cyan-500/20 rounded-full blur-2xl transition-all pointer-events-none" />

            <div className="w-14 h-14 rounded-2xl bg-indigo-950/70 text-indigo-300 flex items-center justify-center mb-6 border border-indigo-500/40 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all">
              <Zap className="w-7 h-7 text-cyan-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Instant B2B Pitch Writer
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Generates customized email pitches and commercial partnership proposals in seconds, linking your event audience with their exact geographic customer base.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 border-t border-purple-500/20 text-center text-xs text-slate-400 bg-[#030712]/50 backdrop-blur-xl">
        <p className="font-semibold text-slate-300">SponsErp &bull; Cosmic Hyper-Local Micro-Sponsorship Intelligence Platform</p>
        <p className="mt-1.5 text-slate-500">Powered by SerpApi Google Maps Engine &amp; Supabase Database &bull; Next.js 14 &amp; FastAPI</p>
      </footer>
    </div>
  );
}
