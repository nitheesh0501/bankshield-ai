'use client';

import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { RiskAnalysis } from '../lib/types';

interface AdvisoryModalProps {
  isOpen: boolean;
  recipient: string;
  amount: number;
  riskAnalysis: RiskAnalysis | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function AdvisoryModal({
  isOpen,
  recipient,
  amount,
  riskAnalysis,
  onCancel,
  onConfirm,
}: AdvisoryModalProps) {
  if (!isOpen || !riskAnalysis) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-obsidian-card border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-white">
        {/* Header Icon */}
        <div className="flex items-center justify-between pb-4 border-b border-obsidian-border mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/40 text-amber-400">
              <AlertTriangle className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-300">
                Cautionary Safety Check
              </h3>
              <p className="text-xs text-slate-400">
                BANKSHIELD AI Risk Score: <span className="font-bold text-amber-400">{riskAnalysis.score} / 100</span> (Medium Risk)
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-obsidian-hover transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 text-amber-200 text-sm leading-relaxed">
            <p className="font-semibold text-base mb-1 text-amber-300">
              ⚠️ Unusual Payment Pattern Detected
            </p>
            <p className="text-slate-300 text-sm">
              You are attempting to transfer <strong className="text-white">₹{amount.toLocaleString('en-IN')}</strong> to <strong className="text-white">{recipient}</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Detected Anomalies:
            </h4>
            <ul className="space-y-2 text-sm">
              {riskAnalysis.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-obsidian/60 p-3 rounded-lg border border-obsidian-border text-slate-300">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-slate-400 bg-obsidian-hover p-3 rounded-lg border border-obsidian-border italic">
            Please ensure you know this vendor personally. Official bank or government authorities will never contact you demanding immediate transfers.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 text-base transition shadow-md"
          >
            Cancel & Recheck
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <span>Proceed Anyway</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
