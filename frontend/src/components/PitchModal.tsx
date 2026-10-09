'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Send, Sparkles, Building, Flame, MapPin, Download, DollarSign } from 'lucide-react';
import { Sponsor, Anchor, EventAnalysisData } from '@/types';

interface PitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsor: Sponsor | null;
  eventData: EventAnalysisData | null;
  anchors: Anchor[];
}

export default function PitchModal({ isOpen, onClose, sponsor, eventData, anchors }: PitchModalProps) {
  const [copied, setCopied] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number>(500);

  if (!isOpen || !sponsor || !eventData) return null;

  const topAnchor = anchors[0]?.name || 'the primary neighborhood transit hub';
  const matchRate = sponsor.match_rate || (sponsor.rating > 0 ? Math.min(Math.round(sponsor.rating * 20), 99) : 85);

  const subject = `Partnership Proposal: Connecting ${sponsor.name} with ${eventData.attendee_count}+ Attendees at ${eventData.location_name}`;

  const pitchBody = `Hi ${sponsor.name} Team,

I hope this email finds you well!

I am reaching out on behalf of our upcoming event, "${eventData.event_category}", taking place at ${eventData.location_name}. We have an expected turnout of ${eventData.attendee_count.toLocaleString()}+ active participants.

Given ${sponsor.name}'s prominent standing as a premier ${sponsor.category} (rated ${sponsor.rating}★ with ${sponsor.reviews.toLocaleString()} reviews on Google Maps) in close proximity to ${topAnchor}, our audience represents your highest-affinity customer demographic.

We would love to welcome ${sponsor.name} as an official Hyper-Local Commercial Partner at our selected $${selectedTier.toLocaleString()} Tier level. 

Partner Tier Package includes:
1. Exclusive On-Site Sampling / Physical Activation Station
2. Direct Vouchers & Promotional Inserts in Attendee Welcome Bags
3. Dedicated Brand Shoutouts across Digital Announcements & Social Media Channels

Would you be open to a quick 5-minute conversation or receiving our 1-page sponsorship brief?

Best regards,
Event Organizer Team
Role: ${eventData.user_role}
Venue: ${eventData.location_name}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${subject}\n\n${pitchBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPitch = () => {
    const textData = `SUBJECT: ${subject}\n\n=========================================\n\n${pitchBody}\n\n=========================================\nGenerated via SponsErp Cosmic Intelligence Engine`;
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sponsorship-Pitch-${sponsor.name.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window (Cosmic Glassmorphic) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-purple-500/30 bg-[#0B1120]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-10 transform-gpu will-change-transform"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-950/70 text-cyan-300 flex items-center justify-center shrink-0 border border-purple-500/40 shadow-glow-purple">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>Fit Score: {sponsor.score}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 font-mono">
                  {matchRate}% Match
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                One-Click Outreach Email &amp; Pitch Generator
              </h3>
              <p className="text-xs text-slate-400 font-light">
                Tailored for <strong className="text-cyan-300 font-semibold">{sponsor.name}</strong> referencing verified footfall near <strong className="text-purple-300 font-semibold">{topAnchor}</strong>.
              </p>
            </div>
          </div>

          {/* Customizable Tier Pricing Chips */}
          <div className="mb-5 p-3.5 rounded-2xl bg-slate-950/70 border border-purple-500/25">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-2">
              Select Sponsorship Tier Package
            </label>
            <div className="flex flex-wrap gap-2.5">
              {[
                { amount: 250, label: 'Starter Community Tier' },
                { amount: 500, label: 'Prime Activation Tier' },
                { amount: 1000, label: 'Headline Partner Tier' },
                { amount: 2500, label: 'Title Sponsor Tier' }
              ].map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => setSelectedTier(tier.amount)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 border ${
                    selectedTier === tier.amount
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-cyan-400 shadow-md shadow-purple-600/30 scale-105'
                      : 'bg-slate-900/80 text-slate-300 border-purple-500/20 hover:border-cyan-400/50'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                  <span>${tier.amount.toLocaleString()}</span>
                  <span className="text-[10px] font-normal text-slate-400 opacity-80">({tier.label})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subject Line Field */}
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
              Recommended Subject Line
            </label>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-purple-500/25 text-xs sm:text-sm font-medium text-white">
              {subject}
            </div>
          </div>

          {/* Body Content */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
              Personalized Email Pitch
            </label>
            <textarea
              readOnly
              rows={9}
              value={pitchBody}
              className="w-full p-4 bg-slate-950/80 rounded-xl border border-purple-500/25 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed resize-none focus:outline-none"
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-purple-500/20">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate max-w-[200px]">{sponsor.address}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleDownloadPitch}
                className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-purple-500/30 flex items-center justify-center gap-1.5 transition"
                title="Download Proposal Deck (.txt)"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Download</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-purple-500/30 flex items-center justify-center gap-2 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{copied ? 'Copied!' : 'Copy Pitch'}</span>
              </button>

              <a
                href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(pitchBody)}`}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 border border-purple-400/40 flex items-center justify-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>Open in Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
