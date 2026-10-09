'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Compass, Sparkles, LogOut, UserCircle2, Key, SlidersHorizontal, Radio } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenWizard?: () => void;
  onOpenKeyModal?: () => void;
  hasSerpKey?: boolean;
}

export default function Navbar({ onOpenAuth, onOpenWizard, onOpenKeyModal, hasSerpKey }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-500/20 bg-[#030712]/60 backdrop-blur-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/30 group-hover:scale-105 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center text-white">
                <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-purple-200 via-white to-cyan-300 bg-clip-text text-transparent">
                  SponsErp
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-950/80 text-cyan-300 border border-cyan-500/40 uppercase tracking-widest shadow-sm">
                  COSMIC v3.0
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center / Navigation items */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-sm backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Live Google Maps Feed</span>
          </span>
          {onOpenKeyModal && (
            <button
              onClick={onOpenKeyModal}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-xl border transition-all ${
                hasSerpKey
                  ? 'bg-slate-900/60 text-slate-300 border-purple-500/30 hover:border-cyan-400/60 shadow-sm'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/40 animate-pulse'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-purple-400" />
              <span>{hasSerpKey ? 'SerpApi Connected' : 'Set SerpApi Key'}</span>
            </button>
          )}
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              {onOpenWizard && (
                <button
                  onClick={onOpenWizard}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-200 border border-purple-500/30 hover:border-cyan-400/60 transition shadow-sm"
                  title="Run Event Onboarding Wizard"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Target Zone</span>
                </button>
              )}

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 backdrop-blur-md">
                <UserCircle2 className="w-4 h-4 text-purple-300" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white leading-none">
                    {user.name}
                  </div>
                  {user.role && (
                    <div className="text-[10px] text-cyan-300 font-medium truncate max-w-[120px]">
                      {user.role}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-rose-950/30 transition border border-transparent hover:border-rose-500/30"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-cyan-300 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 border border-purple-400/30 flex items-center gap-1.5 transition-all transform hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Create Account</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
