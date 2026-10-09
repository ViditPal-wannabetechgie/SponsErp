'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Music,
  Store,
  Users,
  MapPin,
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Radar,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  LocateFixed,
  Building2,
  CalendarDays,
  Orbit,
  Radio
} from 'lucide-react';
import { EventAnalysisData, AnalysisResponse } from '@/types';
import { USER_ROLES, POPULAR_PRESETS, EVENT_CATEGORIES, LocationPreset } from '@/lib/presets';
import { fetchSponsorshipAnalysis } from '@/lib/api';

interface OnboardingWizardProps {
  initialRole?: string;
  onComplete: (data: EventAnalysisData, results: AnalysisResponse) => void;
  serpApiKey?: string;
  onNeedApiKey?: () => void;
}

const roleIcons: Record<string, React.ReactNode> = {
  'Student / Campus Organizer': <GraduationCap className="w-6 h-6" />,
  'Event Management Professional': <Briefcase className="w-6 h-6" />,
  'Independent Artist / Musician': <Music className="w-6 h-6" />,
  'Small Business Owner': <Store className="w-6 h-6" />,
  'Community Group Leader': <Users className="w-6 h-6" />,
};

export default function OnboardingWizard({
  initialRole = '',
  onComplete,
  serpApiKey,
  onNeedApiKey,
}: OnboardingWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState(initialRole || USER_ROLES[0]);

  // Step 2 fields
  const [locationName, setLocationName] = useState('Knowledge Park 2, Greater Noida');
  const [lat, setLat] = useState(28.4631);
  const [lng, setLng] = useState(77.4944);
  const [attendeeCount, setAttendeeCount] = useState(1500);
  const [eventCategory, setEventCategory] = useState(EVENT_CATEGORIES[0]);

  // Step 3 loading / error states
  const [loadingStatus, setLoadingStatus] = useState<string>('Initializing Cosmic Radar...');
  const [error, setError] = useState<string | null>(null);

  const applyPreset = (preset: LocationPreset) => {
    setLocationName(preset.name);
    setLat(preset.lat);
    setLng(preset.lng);
    setAttendeeCount(preset.defaultAttendees);
    const matchedCategory = EVENT_CATEGORIES.find((c) =>
      preset.category.toLowerCase().includes(c.toLowerCase().split('/')[0].trim())
    );
    if (matchedCategory) setEventCategory(matchedCategory);
  };

  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(Number(pos.coords.latitude.toFixed(4)));
          setLng(Number(pos.coords.longitude.toFixed(4)));
          setLocationName('My Current Event Venue');
        },
        (err) => {
          alert('Could not access current location. Please use a preset or enter manually.');
        }
      );
    }
  };

  const handleStartAnalysis = async () => {
    setStep(3);
    setError(null);

    const payload: EventAnalysisData = {
      location_name: locationName.trim(),
      lat,
      lng,
      attendee_count: attendeeCount,
      user_role: selectedRole,
      event_category: eventCategory,
    };

    try {
      setLoadingStatus('Querying live Google Maps sponsors & anchor hubs...');
      const results = await fetchSponsorshipAnalysis(payload, serpApiKey);
      onComplete(payload, results);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch Google Maps intelligence');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Indicator Progress Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-md mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-purple-950/60 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 -translate-y-1/2 z-0 transition-all duration-500 shadow-glow-cyan"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          />

          {[
            { num: 1, label: 'Role Intake' },
            { num: 2, label: 'Event Details' },
            { num: 3, label: 'Maps Radar' },
          ].map((item) => {
            const isPassed = step > item.num;
            const isCurrent = step === item.num;
            return (
              <div key={item.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                    isPassed
                      ? 'bg-emerald-500 text-white shadow-glow-emerald'
                      : isCurrent
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white ring-4 ring-purple-500/25 shadow-glow-purple'
                      : 'bg-slate-900 border border-purple-500/30 text-slate-400'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-5 h-5" /> : item.num}
                </div>
                <span
                  className={`text-[11px] font-semibold mt-2 ${
                    isCurrent
                      ? 'text-cyan-300 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Multi-Step Box (Cosmic Glassmorphic) */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0B1120]/60 shadow-2xl backdrop-blur-2xl p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {/* STEP 1: USER ROLE INTAKE */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center max-w-xl mx-auto mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2 border border-purple-500/40">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Step 1 of 3</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  What best describes your role?
                </h2>
                <p className="text-sm text-slate-300 mt-2 font-light">
                  We tailor Google Maps commercial scoring algorithms to match your event&apos;s organizer profile and audience archetype.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {USER_ROLES.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <motion.div
                      key={role}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedRole(role)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                        isSelected
                          ? 'border-cyan-400/80 bg-purple-950/40 shadow-glow-cyan'
                          : 'border-purple-500/20 bg-slate-950/50 hover:border-purple-400/50'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-gradient-to-tr from-purple-600 to-cyan-500 text-white shadow-glow-purple'
                            : 'bg-slate-900 text-purple-300 border border-purple-500/30'
                        }`}
                      >
                        {roleIcons[role] || <Sparkles className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white text-base">
                          {role}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 font-light">
                          {role === 'Student / Campus Organizer' && 'Optimized for campus sponsors, tech brands & cafes'}
                          {role === 'Event Management Professional' && 'High-budget commercial partnerships & anchor hubs'}
                          {role === 'Independent Artist / Musician' && 'Independent venues, recording hubs & lifestyle brands'}
                          {role === 'Small Business Owner' && 'Hyper-local B2B co-marketing & foot-traffic synergy'}
                          {role === 'Community Group Leader' && 'Civic landmarks, transit hubs & neighborhood stores'}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                            : 'border-purple-500/40'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 border border-purple-400/40 flex items-center gap-2 transition transform hover:scale-105"
                >
                  <span>Continue to Event Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: EVENT & CAPACITY METADATA */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center max-w-xl mx-auto mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2 border border-purple-500/40">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Step 2 of 3</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Event Details &amp; Capacity
                </h2>
                <p className="text-sm text-slate-300 mt-2 font-light">
                  Define your exact target venue coordinates and projected footfall to scan authentic Google Maps places.
                </p>
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                  Quick Venue Presets (1-Click Fill)
                </label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
                        locationName === preset.name
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-cyan-400 shadow-glow-cyan'
                          : 'bg-slate-950/70 text-slate-300 border-purple-500/30 hover:border-cyan-400/50'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{preset.name.split(',')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Input & Lat/Lng */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-purple-300">
                      Target Location Name
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      className="text-xs text-cyan-400 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <LocateFixed className="w-3.5 h-3.5" />
                      <span>Use My Location</span>
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                    </div>
                    <input
                      type="text"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      placeholder="e.g. Knowledge Park 2, Greater Noida"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-purple-500/30 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5">
                    Latitude Coordinates
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-purple-500/30 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5">
                    Longitude Coordinates
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lng}
                    onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-purple-500/30 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5">
                    Event Category
                  </label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-purple-500/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    {EVENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Attendee Count Slider */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-purple-500/25">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                      Expected Attendee Count
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Determines sponsorship valuation tiers and anchor footfall multipliers
                    </p>
                  </div>
                  <div className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono font-bold text-base shadow-sm border border-purple-400/40">
                    {attendeeCount.toLocaleString()} {attendeeCount >= 5000 ? '+' : ''}
                  </div>
                </div>

                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={attendeeCount}
                  onChange={(e) => setAttendeeCount(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>50 Attendees</span>
                  <span>1,000</span>
                  <span>2,500</span>
                  <span>5,000+ Attendees</span>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-slate-300 hover:text-white font-medium text-sm flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Role</span>
                </button>

                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  className="px-7 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold rounded-xl shadow-lg shadow-purple-600/30 border border-purple-400/40 flex items-center gap-2 transition transform hover:scale-105"
                >
                  <Radio className="w-4 h-4 animate-pulse text-cyan-300" />
                  <span>Launch Google Maps Radar</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DATA FETCHING / RADAR SCANNING */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              {!error ? (
                <div className="space-y-6 max-w-md">
                  {/* Cosmic Radar Pulse Animation */}
                  <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-purple-500/15 animate-ping" />
                    <div className="absolute inset-4 rounded-full bg-cyan-500/20 animate-pulse" />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-cyan-500/40 text-white border border-cyan-400/40">
                      <Orbit className="w-12 h-12 animate-spin text-white" style={{ animationDuration: '6s' }} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Scanning Cosmic Hyper-Local Intelligence
                    </h3>
                    <p className="text-sm text-cyan-300 font-medium mt-1 font-mono">
                      {loadingStatus}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/30 text-xs text-slate-300 text-left space-y-2 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-purple-300">Target Venue:</span>
                      <span className="font-mono text-white">{locationName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-purple-300">Coordinates:</span>
                      <span className="font-mono text-white">
                        @{lat}, {lng}, 15z
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-purple-300">Audience:</span>
                      <span className="font-mono text-white">
                        {attendeeCount.toLocaleString()} attendees
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-w-lg">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-950/60 text-rose-400 flex items-center justify-center border border-rose-500/40 shadow-sm">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Data Query Notice
                  </h3>
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-sm text-rose-300 text-left">
                    <p className="font-semibold mb-1">Backend Feedback:</p>
                    <p className="font-mono text-xs">{error}</p>
                  </div>

                  {error.includes('SERPAPI_KEY') && onNeedApiKey && (
                    <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 text-xs text-amber-300 text-left">
                      <p className="font-bold mb-1">SerpApi Key Configuration:</p>
                      <p>
                        To query live Google Maps via SerpApi, provide your SerpApi API key in{' '}
                        <code className="bg-amber-900/60 px-1 py-0.5 rounded font-mono">backend/.env</code>{' '}
                        as <code className="bg-amber-900/60 px-1 py-0.5 rounded font-mono">SERPAPI_KEY=your_key</code> or click below to enter it directly.
                      </p>
                      <button
                        onClick={onNeedApiKey}
                        className="mt-3 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Enter SerpApi Key Now</span>
                      </button>
                    </div>
                  )}

                  <div className="flex gap-3 justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-700 transition border border-purple-500/30"
                    >
                      Adjust Location Details
                    </button>
                    <button
                      type="button"
                      onClick={handleStartAnalysis}
                      className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl text-sm font-bold hover:from-purple-500 hover:to-cyan-500 transition shadow-glow-cyan"
                    >
                      Retry Query
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
