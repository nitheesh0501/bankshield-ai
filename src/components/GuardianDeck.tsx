'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Ban,
  CheckCircle2,
  Clock,
  PhoneCall,
  User,
  Activity,
  Trash2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { useBankshieldChannel } from '../lib/useBankshieldChannel';
import { Transaction } from '../lib/types';
import { StatusBadge } from './StatusBadge';

export function GuardianDeck() {
  const { transactions, resolveTransaction, clearAll, isLoaded } = useBankshieldChannel();
  const [timers, setTimers] = useState<{ [key: string]: number }>({});

  // Countdown timer updater for active HELD transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers: { [key: string]: number } = {};
      transactions.forEach(t => {
        if (t.status === 'HELD') {
          const remainingMs = t.escrowExpiresAt - Date.now();
          newTimers[t.id] = Math.max(0, Math.floor(remainingMs / 1000));
        }
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [transactions]);

  const formatTime = (totalSeconds: number | undefined) => {
    if (totalSeconds === undefined) return '15:00';
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const pendingIncidents = transactions.filter(t => t.status === 'HELD');
  const pastIncidents = transactions.filter(t => t.status !== 'HELD');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-6 sm:p-8 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-obsidian-border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30 text-emerald-400">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/60">
                  Family Safety Portal
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Guardian Incident Safety Deck
              </h1>
              <p className="text-sm text-slate-400">
                Real-Time Duress Monitoring & Remote Payment Freeze Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge compact />
            {transactions.length > 0 && (
              <button
                onClick={clearAll}
                className="p-2 rounded-xl bg-obsidian border border-obsidian-border text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition text-xs font-semibold flex items-center gap-1.5"
                title="Clear demo transactions"
              >
                <Trash2 className="w-4 h-4" /> Clear History
              </button>
            )}
          </div>
        </div>

        {/* Monitored Ward Profile Summary */}
        <div className="mt-6 bg-obsidian/70 border border-obsidian-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-lg">
              RK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white">Ramesh Kumar (Father)</span>
                <span className="text-xs text-slate-400 font-mono">A/C *9241</span>
              </div>
              <p className="text-xs text-slate-400">
                Senior Savings Account • Automated 15-Minute Safety Escrow Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-obsidian-card p-3 rounded-lg border border-obsidian-border">
            <div className="text-right">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Active Duress Holds</span>
              <span className={`text-lg font-black ${pendingIncidents.length > 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {pendingIncidents.length} Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Flagged Incident Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Active Flagged Incidents Requiring Review</span>
            {pendingIncidents.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-rose-500/20 text-rose-400 border border-rose-500/40">
                {pendingIncidents.length}
              </span>
            )}
          </h2>
        </div>

        {pendingIncidents.length === 0 ? (
          <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">All Clear — No Active Duress Alerts</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              No high-risk coercive transfers are currently on hold. Use the <strong className="text-cyan-400">Customer View (/pay)</strong> or <strong className="text-cyan-400">Split View (/split)</strong> to simulate a Digital Arrest scam attempt.
            </p>
          </div>
        ) : (
          pendingIncidents.map(tx => (
            <div
              key={tx.id}
              className="bg-obsidian-card border-2 border-rose-500/70 rounded-2xl p-6 sm:p-8 text-white shadow-2xl shadow-rose-500/10 space-y-6 animate-in slide-in-from-top-4 duration-300"
            >
              {/* Card Top Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-obsidian-border">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                    DUCHESS RISK SCORE: {tx.riskScore} / 100
                  </span>
                  <span className="text-xs text-slate-400">
                    Attempted at {tx.timestamp}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-rose-950/50 border border-rose-500/40 px-3.5 py-1.5 rounded-xl text-rose-300">
                  <Clock className="w-4 h-4 animate-spin text-rose-400" />
                  <span className="text-xs font-bold uppercase">Escrow Hold Expires in:</span>
                  <span className="font-mono font-black text-lg text-rose-400">
                    {formatTime(timers[tx.id])}
                  </span>
                </div>
              </div>

              {/* Main Incident Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Account & Transfer Info */}
                <div className="space-y-4">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Account Owner (Ward)
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-cyan-400" />
                      <span className="text-base font-extrabold text-white">{tx.senderName}</span>
                    </div>
                  </div>

                  <div className="bg-obsidian p-4 rounded-xl border border-obsidian-border space-y-2">
                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Flagged Payment Details
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-rose-400">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400">
                        (Baseline avg: ₹{tx.baselineAmount.toLocaleString('en-IN')})
                      </span>
                    </div>
                    <div className="pt-2 border-t border-obsidian-border">
                      <span className="block text-xs text-slate-400 font-medium">Target Recipient (VPA):</span>
                      <span className="text-sm font-bold text-cyan-300 font-mono break-all">{tx.recipientVpa}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Risk Badges */}
                <div className="space-y-3">
                  <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Risk Badges & Telemetry Signals:
                  </span>
                  <div className="space-y-2">
                    {tx.amount > 5000 && (
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm font-semibold">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Amount surge &gt;10x baseline average</span>
                      </div>
                    )}
                    {tx.riskReasons.some(r => r.includes('Authority') || r.includes('coercion')) && (
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm font-semibold">
                        <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Authority coercion keyword detected in recipient VPA</span>
                      </div>
                    )}
                    {tx.isActiveCall && (
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-sm font-semibold">
                        <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                        <span>Active phone call in progress during transaction</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Guardian Action Controls */}
              <div className="pt-4 border-t border-obsidian-border flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => resolveTransaction(tx.id, 'BLOCKED')}
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-black text-base transition shadow-xl shadow-rose-600/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Ban className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Freeze & Abort Transfer (Crimson Action)</span>
                </button>

                <button
                  onClick={() => resolveTransaction(tx.id, 'COMPLETED')}
                  className="py-4 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-base transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Authorize Transfer (Override)</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Incident History & Resolved Logs */}
      {pastIncidents.length > 0 && (
        <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Recent Incident History & Resolutions</span>
          </h3>

          <div className="divide-y divide-obsidian-border">
            {pastIncidents.map(tx => (
              <div key={tx.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-white">₹{tx.amount.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400">to {tx.recipientName}</span>
                    <span className="text-xs text-slate-500 font-mono">({tx.timestamp})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{tx.recipientVpa}</p>
                </div>

                <div className="flex items-center gap-3">
                  {tx.status === 'BLOCKED' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                      <Ban className="w-3.5 h-3.5" /> FROZEN & ABORTED
                    </span>
                  )}
                  {tx.status === 'COMPLETED' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <CheckCircle2 className="w-3.5 h-3.5" /> COMPLETED / AUTHORIZED
                    </span>
                  )}
                  {tx.status === 'WARNING_PASSED' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      <AlertTriangle className="w-3.5 h-3.5" /> ADVISORY ACKNOWLEDGED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
