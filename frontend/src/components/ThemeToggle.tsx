'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, Laptop } from 'lucide-react';
import { ThemeMode } from '@/types';

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();

  const options: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'dark', label: 'Cosmic Void', icon: <Moon className="w-3.5 h-3.5" /> },
    { value: 'light', label: 'Celestial', icon: <Sun className="w-3.5 h-3.5" /> },
    { value: 'system', label: 'System', icon: <Laptop className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex items-center bg-slate-900/70 p-1 rounded-xl border border-purple-500/25 backdrop-blur-xl transition-all shadow-sm">
      {options.map((opt) => {
        const isActive = mode === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setMode(opt.value)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md border border-purple-400/40'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
            title={`Switch to ${opt.label} mode`}
          >
            {opt.icon}
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
