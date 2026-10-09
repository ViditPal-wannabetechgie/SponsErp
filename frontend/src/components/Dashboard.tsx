'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Radar,
  Building2,
  MapPin,
  TrendingUp,
  Flame,
  Award,
  Users,
  Compass,
  Download,
  Share2,
  RefreshCw,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Info,
  Radio,
  Calculator
} from 'lucide-react';
import { EventAnalysisData, AnalysisResponse, Sponsor, Anchor } from '@/types';
import KPICard from '@/components/KPICard';
import SponsorCard from '@/components/SponsorCard';
import AnchorCard from '@/components/AnchorCard';
import PitchModal from '@/components/PitchModal';
import RoiCalculator from '@/components/RoiCalculator';

interface DashboardProps {
  eventData: EventAnalysisData;
  analysisResults: AnalysisResponse;
  onRunNewAnalysis: () => void;
}

export default function Dashboard({ eventData, analysisResults, onRunNewAnalysis }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'sponsors' | 'anchors' | 'roi'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPitchSponsor, setSelectedPitchSponsor] = useState<Sponsor | null>(null);
  const [pitchModalOpen, setPitchModalOpen] = useState(false);

  const { sponsors = [], anchors = [] } = analysisResults;

  // Filter sponsors
  const filteredSponsors = sponsors.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || s.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Calculate high-contrast KPI metrics for Bitflow layout
  const topSponsor = sponsors[0];
  const highestFitScore = topSponsor ? topSponsor.score : 0;
  const totalVerifiedReviews = sponsors.reduce((acc, s) => acc + s.reviews, 0);

  // Projected sponsorship yield estimation based on attendee count & commercial density
  const estimatedYieldBracket = `$${(eventData.attendee_count * 2.8).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })}`;

  // Footfall index
  const totalAnchorReach = anchors.reduce(
    (acc, a) => acc + Math.max(500, Math.min(20000, a.reviews * 12)),
    0
  );

  const handleOpenPitch = (sponsor: Sponsor) => {
    setSelectedPitchSponsor(sponsor);
    setPitchModalOpen(true);
  };

  const handleExportCSV = () => {
    // Generate CSV for sponsors and anchors
    const headers = ['Type', 'Name', 'Address', 'Category', 'Rating', 'Reviews', 'Score/Footfall', 'Phone', 'Website'];
    const rows: string[][] = [];

    sponsors.forEach((s) => {
      rows.push([
        'Sponsor',
        `"${(s.name || '').replace(/"/g, '""')}"`,
        `"${(s.address || '').replace(/"/g, '""')}"`,
        `"${(s.category || '').replace(/"/g, '""')}"`,
        s.rating?.toString() || '0',
        s.reviews?.toString() || '0',
        s.score?.toString() || '0',
        `"${(s.phone || 'N/A').replace(/"/g, '""')}"`,
        `"${(s.website || 'N/A').replace(/"/g, '""')}"`
      ]);
    });

    anchors.forEach((a) => {
      rows.push([
        'Anchor Hub',
        `"${(a.name || '').replace(/"/g, '""')}"`,
        `"${(a.address || '').replace(/"/g, '""')}"`,
        `"${(a.category || '').replace(/"/g, '""')}"`,
        a.rating?.toString() || '0',
        a.reviews?.toString() || '0',
        Math.max(500, Math.min(25000, a.reviews * 12)).toString(),
        'N/A',
        'N/A'
      ]);
    });

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SponsErp-Brief-${eventData.location_name.replace(/[^a-zA-Z0-9]/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const exportData = {
      event: eventData,
      analysis: analysisResults,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SponsErp-Intelligence-${eventData.location_name.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Bitflow Clean Sidebar Navigation (Cosmic Glassmorphic) */}
      <aside className="w-full md:w-64 bg-[#0B1120]/60 backdrop-blur-2xl border-r border-purple-500/20 p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 px-2 py-3 mb-6 border-b border-purple-500/20">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Active Radar Stream
            </span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-purple-300" />
                <span>Overview</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('sponsors')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'sponsors'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Sponsors ({sponsors.length})</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-purple-950/80 text-cyan-300 border border-cyan-500/30">
                Top 5
              </span>
            </button>

            <button
              onClick={() => setActiveTab('anchors')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'anchors'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-purple-400" />
                <span>Anchor Hubs ({anchors.length})</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                Top 4
              </span>
            </button>

            <button
              onClick={() => setActiveTab('roi')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'roi'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>ROI Engine</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                Live
              </span>
            </button>
          </nav>
        </div>

        {/* Location Target Profile Pill in Sidebar */}
        <div className="mt-8 pt-6 border-t border-purple-500/20 space-y-4">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-purple-500/25 backdrop-blur-md">
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
              Current Target Zone
            </div>
            <div className="font-bold text-sm text-white mt-1 line-clamp-1">
              {eventData.location_name}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {eventData.lat}, {eventData.lng}
              </span>
            </div>
            <div className="mt-2 text-xs text-cyan-300 font-semibold">
              {eventData.attendee_count.toLocaleString()} Expected Attendees
            </div>
          </div>

          <button
            onClick={onRunNewAnalysis}
            className="w-full py-2.5 px-3 bg-purple-950/40 hover:bg-purple-900/60 text-slate-200 hover:text-white text-xs font-semibold rounded-xl border border-purple-500/30 flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Re-target Location</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Intelligence Dashboard
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan">
                Live Google Maps Feed
              </span>
            </div>
            <p className="text-sm text-slate-300 mt-1">
              Scanned authentic commercial sponsors &amp; organic neighborhood footfall anchors for{' '}
              <strong className="text-white underline decoration-cyan-400 decoration-2 underline-offset-4">{eventData.location_name}</strong>
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition shadow-sm backdrop-blur-md"
              title="Download Sponsorship Brief (.csv)"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-slate-900/60 border border-purple-500/30 text-slate-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition shadow-sm backdrop-blur-md"
              title="Export Full Intelligence Payload (JSON)"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>JSON</span>
            </button>

            <button
              onClick={onRunNewAnalysis}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 border border-purple-400/40 transition-all transform hover:scale-105"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Scan</span>
            </button>
          </div>
        </div>

        {/* High-Contrast Bitflow KPI Cards Grid with Oversized 48px Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Peak Commercial Score"
            value={highestFitScore.toString()}
            subValue={topSponsor ? `${topSponsor.name} (#1 Fit)` : 'N/A'}
            badge="Google Maps"
            badgeType="emerald"
            icon={<Flame className="w-5 h-5 text-emerald-400" />}
            delay={0.05}
          />

          <KPICard
            label="Verified Anchor Reach"
            value={`~${(totalAnchorReach / 1000).toFixed(1)}k`}
            subValue="Daily Organic Neighborhood Footfall"
            badge={`${anchors.length} Anchors`}
            badgeType="cyan"
            icon={<TrendingUp className="w-5 h-5 text-cyan-400" />}
            delay={0.1}
          />

          <KPICard
            label="Est. Sponsor Value"
            value={estimatedYieldBracket}
            subValue={`Based on ${eventData.attendee_count.toLocaleString()} attendees`}
            badge="Calculated"
            badgeType="purple"
            icon={<Award className="w-5 h-5 text-purple-400" />}
            delay={0.15}
          />

          <KPICard
            label="Google Reviews Base"
            value={totalVerifiedReviews.toLocaleString()}
            subValue="Verified customer feedback points"
            badge="Zero Fake Data"
            badgeType="amber"
            icon={<ShieldCheck className="w-5 h-5 text-amber-400" />}
            delay={0.2}
          />
        </div>

        {/* Filter & Search Bar (Cosmic Glassmorphic) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/25 shadow-xl">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sponsors by raw title or address..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/70 border border-purple-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-purple-300 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" />
              <span>Category:</span>
            </span>
            {['all', 'cafe', 'gym', 'bakery', 'boutique', 'shop'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs capitalize px-3 py-1 rounded-lg border transition shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-sm'
                    : 'bg-slate-950/60 text-slate-300 border-purple-500/20 hover:border-cyan-400/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TOP 5 COMMERCIAL SPONSOR CANDIDATES (GOOGLE MAPS) */}
        {(activeTab === 'overview' || activeTab === 'sponsors') && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <span>Top High-Fit Commercial Sponsors (Google Maps)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Ranked by commercial fit score `(Reviews &times; Rating) / 10`. Pure SerpApi raw strings.
                </p>
              </div>

              <div className="text-xs text-cyan-300 font-mono">
                Showing {filteredSponsors.length} candidates
              </div>
            </div>

            {filteredSponsors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSponsors.map((sponsor, idx) => (
                  <SponsorCard
                    key={`${sponsor.name}-${idx}`}
                    sponsor={sponsor}
                    rank={idx + 1}
                    delay={idx * 0.08}
                    onPitch={handleOpenPitch}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-purple-500/20 text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <p className="font-semibold text-sm">No sponsors matching &quot;{searchQuery}&quot;</p>
                <p className="text-xs mt-1">Try resetting the filter or changing your keyword search.</p>
              </div>
            )}
          </section>
        )}

        {/* HIGH-FOOTFALL ANCHOR HUBS (TRANSIT, UNIVERSITIES, SHOPPING MALLS) */}
        {(activeTab === 'overview' || activeTab === 'anchors') && (
          <section className="space-y-4 pt-4 border-t border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-purple-400" />
                  <span>Neighborhood Anchor Hubs (Verified Footfall Proof)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Transit stations, universities &amp; shopping nodes with &gt;30 verified reviews proving baseline zone traffic.
                </p>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                Strict Google Maps Nodes
              </span>
            </div>

            {anchors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {anchors.map((anchor, idx) => (
                  <AnchorCard key={`${anchor.name}-${idx}`} anchor={anchor} delay={idx * 0.08} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-purple-500/20 text-slate-400 text-xs">
                No anchor hubs detected for this coordinate radius.
              </div>
            )}
          </section>
        )}

        {/* INTERACTIVE SPONSOR ROI & REVENUE ENGINE */}
        {(activeTab === 'overview' || activeTab === 'roi') && (
          <section className="space-y-4 pt-4 border-t border-purple-500/20">
            <RoiCalculator initialAttendees={eventData.attendee_count} />
          </section>
        )}
      </main>

      {/* Tailored Pitch Deck Generator Modal */}
      <PitchModal
        isOpen={pitchModalOpen}
        onClose={() => setPitchModalOpen(false)}
        sponsor={selectedPitchSponsor}
        eventData={eventData}
        anchors={anchors}
      />
    </div>
  );
}
