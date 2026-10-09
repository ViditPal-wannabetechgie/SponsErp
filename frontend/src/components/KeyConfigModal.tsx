'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, CheckCircle, Shield, ExternalLink, HelpCircle } from 'lucide-react';

interface KeyConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: string;
  onSaveKey: (key: string) => void;
}

export default function KeyConfigModal({ isOpen, onClose, currentKey, onSaveKey }: KeyConfigModalProps) {
  const [apiKey, setApiKey] = useState(currentKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(apiKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
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
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window (Cosmic Glassmorphic) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0B1120]/95 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 text-cyan-300 flex items-center justify-center border border-purple-500/40 shadow-glow-purple">
              <Key className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                SerpApi Key Configuration
              </h3>
              <p className="text-xs text-slate-400 font-light">
                Official Google Maps Engine API Connector
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed font-light">
            You can either set <code className="bg-purple-950/80 px-1 py-0.5 rounded text-cyan-300 font-mono">SERPAPI_KEY</code> in <code className="bg-purple-950/80 px-1 py-0.5 rounded text-purple-300 font-mono">backend/.env</code> or enter your key here to authenticate queries directly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5">
                SerpApi Secret Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="e.g. 7b28d6fa..."
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-purple-500/30 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Stored in secure session</span>
              </span>

              <a
                href="https://serpapi.com/manage-api-key"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Get SerpApi Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 border border-purple-400/40 flex items-center justify-center gap-2 transition"
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span>Key Saved!</span>
                </>
              ) : (
                <span>Save &amp; Connect API</span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
