'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import LandingPage from '@/components/LandingPage';
import AuthModal from '@/components/AuthModal';
import OnboardingWizard from '@/components/OnboardingWizard';
import Dashboard from '@/components/Dashboard';
import KeyConfigModal from '@/components/KeyConfigModal';
import { EventAnalysisData, AnalysisResponse } from '@/types';
import { checkBackendHealth } from '@/lib/api';

export default function Home() {
  const { isAuthenticated, user, updateUserRole } = useAuth();

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  // SerpApi Key Modal State
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const [serpApiKey, setSerpApiKey] = useState<string>('');
  const [hasBackendKey, setHasBackendKey] = useState<boolean>(false);

  // App Intelligence State
  const [wizardOpen, setWizardOpen] = useState(false);
  const [eventData, setEventData] = useState<EventAnalysisData | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResponse | null>(null);

  // Transition Splash State
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check backend health & local key
  useEffect(() => {
    const savedKey = localStorage.getItem('sponserp-serpapi-key') || '';
    setSerpApiKey(savedKey);

    checkBackendHealth().then((res) => {
      setHasBackendKey(res.has_serpapi_key || !!savedKey);
    });

    // Check if previously saved event data exists in session
    const savedEvent = sessionStorage.getItem('sponserp-last-event');
    const savedResults = sessionStorage.getItem('sponserp-last-results');
    if (savedEvent && savedResults) {
      try {
        setEventData(JSON.parse(savedEvent));
        setAnalysisResults(JSON.parse(savedResults));
      } catch {}
    }
  }, []);

  const handleSaveKey = (key: string) => {
    setSerpApiKey(key);
    localStorage.setItem('sponserp-serpapi-key', key);
    if (key.trim()) {
      setHasBackendKey(true);
    }
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    // If no analysis is active yet, automatically launch wizard
    if (!analysisResults) {
      setWizardOpen(true);
    }
  };

  const handleWizardComplete = (data: EventAnalysisData, results: AnalysisResponse) => {
    if (data.user_role) {
      updateUserRole(data.user_role);
    }

    // Trigger smooth splash transition overlay per requirements
    setIsTransitioning(true);

    setTimeout(() => {
      setEventData(data);
      setAnalysisResults(results);
      sessionStorage.setItem('sponserp-last-event', JSON.stringify(data));
      sessionStorage.setItem('sponserp-last-results', JSON.stringify(results));
      setWizardOpen(false);
      setIsTransitioning(false);
    }, 600);
  };

  const handleRunNewAnalysis = () => {
    setWizardOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenWizard={isAuthenticated ? handleRunNewAnalysis : undefined}
        onOpenKeyModal={() => setKeyModalOpen(true)}
        hasSerpKey={hasBackendKey || !!serpApiKey}
      />

      {/* Main View Router */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            /* PRE-LOGIN: Nexmint Landing Page */
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LandingPage onOpenAuth={handleOpenAuth} />
            </motion.div>
          ) : wizardOpen || !analysisResults || !eventData ? (
            /* POST-LOGIN: Multi-Step Onboarding Wizard */
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-6"
            >
              <OnboardingWizard
                initialRole={user?.role}
                onComplete={handleWizardComplete}
                serpApiKey={serpApiKey}
                onNeedApiKey={() => setKeyModalOpen(true)}
              />
            </motion.div>
          ) : (
            /* POST-WIZARD: Bitflow SaaS Dashboard */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              <Dashboard
                eventData={eventData}
                analysisResults={analysisResults}
                onRunNewAnalysis={handleRunNewAnalysis}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Smooth Cosmic Splash Transition Overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-[#030712]/80 backdrop-blur-2xl flex flex-col items-center justify-center text-white"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 border-t-cyan-400 animate-spin" />
                <div className="absolute inset-3 rounded-full border-2 border-cyan-500/20 border-b-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-glow-cyan animate-pulse" />
              </div>
              <p className="mt-5 text-sm font-bold tracking-widest uppercase text-cyan-300 font-mono">
                Compiling Cosmic Hyper-Local Intelligence...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Strict B2B Auth Modal ("Create Account" and "Sign In" only) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />

      {/* SerpApi Key Configuration Modal */}
      <KeyConfigModal
        isOpen={keyModalOpen}
        onClose={() => setKeyModalOpen(false)}
        currentKey={serpApiKey}
        onSaveKey={handleSaveKey}
      />
    </div>
  );
}
