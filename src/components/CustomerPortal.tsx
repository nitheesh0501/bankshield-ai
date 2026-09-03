'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  PhoneCall,
  Volume2,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  Clock,
  Sparkles,
  Info,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { calculateRiskScore } from '../lib/riskEngine';
import { speakAntiScamWarning, stopSpeech } from '../lib/speech';
import { useBankshieldChannel } from '../lib/useBankshieldChannel';
import { AdvisoryModal } from './AdvisoryModal';
import { RiskAnalysis, Transaction } from '../lib/types';
import { StatusBadge } from './StatusBadge';

export function CustomerPortal() {
  const { transactions, addTransaction, clearAll } = useBankshieldChannel();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [isActiveCall, setIsActiveCall] = useState(false);

  // Flow State
  const [currentTx, setCurrentTx] = useState<Transaction | null>(null);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);
  const [showAdvisory, setShowAdvisory] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [countdown, setCountdown] = useState<number>(900); // 15 mins in seconds

  // Preset Handlers for Judges
  const applyPreset = (preset: 'safe' | 'suspicious' | 'arrest') => {
    stopSpeech();
    setIsSpeaking(false);
    setSuccessBanner(null);
    setShowAdvisory(false);
    setCurrentTx(null);

    if (preset === 'safe') {
      setRecipient('Local Milk & Grocery (grocery@upi)');
      setAmount('350');
      setIsActiveCall(false);
    } else if (preset === 'suspicious') {
      setRecipient('New Vendor Services (new.vendor@upi)');
      setAmount('9200');
      setIsActiveCall(false);
    } else if (preset === 'arrest') {
      setRecipient('DCP Cyber Cell Official Escrow (dcp.cyber.cell@official-escrow)');
      setAmount('85000');
      setIsActiveCall(true);
    }
  };

  // Countdown timer for active HELD transaction
  useEffect(() => {
    if (!currentTx || currentTx.status !== 'HELD') return;

    const interval = setInterval(() => {
      const remainingMs = currentTx.escrowExpiresAt - Date.now();
      const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
      setCountdown(remainingSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTx]);

  // Keep currentTx in sync with store (e.g. when Guardian updates status)
  useEffect(() => {
    if (!currentTx) return;
    const updated = transactions.find(t => t.id === currentTx.id);
    if (updated) {
      setCurrentTx(updated);
    }
  }, [transactions, currentTx]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !amount || parseFloat(amount) <= 0) return;

    setSuccessBanner(null);
    stopSpeech();
    setIsSpeaking(false);

    const numAmount = parseFloat(amount);
    const analysis = calculateRiskScore(numAmount, recipient, isActiveCall);
    setRiskAnalysis(analysis);

    if (analysis.score < 45) {
      // Score < 45: Instant Green Success
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        senderName: 'Ramesh Kumar (Father)',
        senderAccount: 'Savings A/C *9241',
        recipientName: recipient.split('(')[0].trim(),
        recipientVpa: recipient,
        amount: numAmount,
        baselineAmount: 1200,
        isActiveCall,
        riskScore: analysis.score,
        riskLevel: analysis.level,
        riskReasons: analysis.reasons,
        status: 'COMPLETED',
        escrowExpiresAt: Date.now() + 15 * 60 * 1000,
      };

      addTransaction(newTx);
      setCurrentTx(newTx);
      setSuccessBanner(`Transfer of ₹${numAmount.toLocaleString('en-IN')} to ${recipient} verified and completed safely.`);
    } else if (analysis.score < 75) {
      // Score 45-74: Amber Advisory Popup
      setShowAdvisory(true);
    } else {
      // Score >= 75: 15-min Reversible Escrow Hold + Web Speech API + Guardian Alert
      executeHighRiskHold(numAmount, analysis);
    }
  };

  const executeHighRiskHold = (numAmount: number, analysis: RiskAnalysis) => {
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      senderName: 'Ramesh Kumar (Father)',
      senderAccount: 'Savings A/C *9241',
      recipientName: recipient.split('(')[0].trim(),
      recipientVpa: recipient,
      amount: numAmount,
      baselineAmount: 1200,
      isActiveCall,
      riskScore: analysis.score,
      riskLevel: analysis.level,
      riskReasons: analysis.reasons,
      status: 'HELD',
      escrowExpiresAt: Date.now() + 15 * 60 * 1000,
    };

    addTransaction(newTx);
    setCurrentTx(newTx);

    // Trigger Web Speech API
    const spoke = speakAntiScamWarning(() => setIsSpeaking(false));
    setIsSpeaking(spoke);
  };

  const handleAdvisoryConfirm = () => {
    setShowAdvisory(false);
    if (!riskAnalysis || !amount) return;

    const numAmount = parseFloat(amount);
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      senderName: 'Ramesh Kumar (Father)',
      senderAccount: 'Savings A/C *9241',
      recipientName: recipient.split('(')[0].trim(),
      recipientVpa: recipient,
      amount: numAmount,
      baselineAmount: 1200,
      isActiveCall,
      riskScore: riskAnalysis.score,
      riskLevel: riskAnalysis.level,
      riskReasons: riskAnalysis.reasons,
      status: 'WARNING_PASSED',
      escrowExpiresAt: Date.now() + 15 * 60 * 1000,
    };

    addTransaction(newTx);
    setCurrentTx(newTx);
    setSuccessBanner(`Advisory acknowledged. Transfer of ₹${numAmount.toLocaleString('en-IN')} processed successfully.`);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Senior Portal Card Header */}
      <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-6 sm:p-8 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-obsidian-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                Senior Customer Account
              </span>
              <span className="text-xs text-slate-400 font-mono">A/C *9241</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Ramesh Kumar
            </h1>
            <p className="text-sm text-slate-400">
              Protected by BANKSHIELD AI Cognitive Duress Circuit-Breaker
            </p>
          </div>

          <div className="sm:hidden">
            <StatusBadge compact />
          </div>
        </div>

        {/* Demo Preset Buttons (for Hackathon Judges) */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Hackathon Judge Demo Presets:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => applyPreset('safe')}
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition text-left group"
            >
              <div>
                <span className="block text-xs font-bold text-emerald-400 uppercase">
                  1. Safe Preset
                </span>
                <span className="text-sm font-semibold text-white">₹350 Milk & Grocery</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Low Risk
              </span>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('suspicious')}
              className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition text-left group"
            >
              <div>
                <span className="block text-xs font-bold text-amber-400 uppercase">
                  2. Suspicious Preset
                </span>
                <span className="text-sm font-semibold text-white">₹9,200 New Vendor</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Medium
              </span>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('arrest')}
              className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition text-left group"
            >
              <div>
                <span className="block text-xs font-bold text-rose-400 uppercase">
                  3. Digital Arrest Scam
                </span>
                <span className="text-sm font-semibold text-white">₹85,000 DCP Escrow</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 animate-pulse">
                High Duress
              </span>
            </button>
          </div>
        </div>

        {/* Transfer Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipient Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-200">
                Recipient Name / UPI ID (VPA)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. vendor@upi or DCP Cyber Cell"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-obsidian border border-obsidian-border focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white font-medium text-base placeholder-slate-500 transition"
              />
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-200">
                  Amount (₹ INR)
                </label>
                <span className="inline-flex items-center gap-1 text-xs text-cyan-400 font-semibold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                  <Info className="w-3 h-3" /> Normal 30-day average: ₹1,200
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-obsidian border border-obsidian-border focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white font-bold text-xl placeholder-slate-600 transition"
                />
              </div>
            </div>
          </div>

          {/* Telemetry Toggle: Active Phone Call Simulation */}
          <div className="bg-obsidian/80 border border-obsidian-border rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-xl border ${
                isActiveCall
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-base font-bold text-white">
                  Simulate Active Phone Call
                </span>
                <span className="text-xs text-slate-400">
                  Telemetry feature: Detects incoming voice call during transfer (adds +25 duress score)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsActiveCall(!isActiveCall)}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isActiveCall ? 'bg-rose-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isActiveCall ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-slate-950 font-black text-lg transition duration-200 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <ShieldCheck className="w-6 h-6 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>Verify & Execute Payment</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="bg-emerald-950/40 border-2 border-emerald-500/50 rounded-2xl p-5 text-emerald-200 shadow-xl flex items-start gap-4 animate-in fade-in duration-300">
          <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-lg font-bold text-emerald-300">
              Transfer Completed Safely
            </h4>
            <p className="text-sm text-slate-300 mt-1">{successBanner}</p>
          </div>
        </div>
      )}

      {/* Active High-Risk Duress Safety Escrow Card */}
      {currentTx && currentTx.status === 'HELD' && (
        <div className="bg-obsidian-card border-2 border-rose-500/70 rounded-2xl p-6 sm:p-8 text-white shadow-2xl shadow-rose-500/20 space-y-6 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-500/30">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-400 animate-pulse">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 px-2.5 py-0.5 rounded border border-rose-500/40">
                  <ShieldAlert className="w-3.5 h-3.5" /> Cognitive Circuit-Breaker Triggered
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  15-Minute Reversible Safety Escrow Active
                </h3>
              </div>
            </div>

            <div className="bg-rose-950/60 border border-rose-500/40 px-4 py-2 rounded-xl flex items-center gap-2.5 shrink-0">
              <Clock className="w-5 h-5 text-rose-400 animate-spin" />
              <div>
                <span className="block text-[10px] text-rose-300 font-bold uppercase">Time Remaining</span>
                <span className="text-xl font-mono font-black text-rose-400">
                  {formatTime(countdown)}
                </span>
              </div>
            </div>
          </div>

          {/* Web Speech API Audio Feedback Indicator */}
          <div className="bg-gradient-to-r from-rose-950/50 via-obsidian to-obsidian border border-rose-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-500/20 rounded-lg text-rose-400 animate-bounce">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  Web Speech Anti-Scam Audio Broadcast Active
                </h4>
                <p className="text-xs text-slate-300 italic mt-0.5">
                  "Warning: Official police, court, or government authorities will never demand money transfers over the phone..."
                </p>
              </div>
            </div>

            <button
              onClick={() => speakAntiScamWarning()}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 font-bold text-xs shrink-0 flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" /> Re-play Voice
            </button>
          </div>

          {/* Incident Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-obsidian/70 p-4 rounded-xl border border-obsidian-border">
            <div>
              <span className="block text-xs text-slate-400 font-medium">Attempted Amount</span>
              <span className="text-xl font-black text-white">₹{currentTx.amount.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-medium">Recipient VPA</span>
              <span className="text-sm font-bold text-cyan-300 truncate block">{currentTx.recipientVpa}</span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 font-medium">Risk Score</span>
              <span className="text-lg font-black text-rose-400">{currentTx.riskScore} / 100 (HIGH DURESS)</span>
            </div>
          </div>

          {/* Triggered Risk Reasons */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Detected Duress Signals:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {currentTx.riskReasons.map((reason, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-rose-950/30 border border-rose-500/30 p-3 rounded-xl text-rose-200 text-sm font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guardian Alert Status */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <div>
                <p className="text-sm font-bold text-cyan-300">
                  Alert Dispatched to Guardian Deck (/guardian)
                </p>
                <p className="text-xs text-slate-400">
                  Your guardian has been notified to freeze or authorize this payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blocked by Guardian Resolution Notification */}
      {currentTx && currentTx.status === 'BLOCKED' && (
        <div className="bg-rose-950/60 border-2 border-rose-500 rounded-2xl p-6 text-rose-200 shadow-2xl space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-rose-400 shrink-0" />
            <div>
              <h3 className="text-xl font-black text-rose-300">
                Transfer Frozen & Cancelled by Guardian
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Your guardian reviewed the ₹{currentTx.amount.toLocaleString('en-IN')} transfer to {currentTx.recipientName} and determined it was a coercive scam attempt. The funds remain safe in your savings account.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Authorized by Guardian Resolution Notification */}
      {currentTx && currentTx.status === 'COMPLETED' && riskAnalysis?.level === 'HIGH' && (
        <div className="bg-emerald-950/60 border-2 border-emerald-500 rounded-2xl p-6 text-emerald-200 shadow-2xl space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-xl font-black text-emerald-300">
                Transfer Authorized by Guardian
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Your guardian confirmed the ₹{currentTx.amount.toLocaleString('en-IN')} transfer is legitimate. Funds have been released.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Advisory Modal Component */}
      <AdvisoryModal
        isOpen={showAdvisory}
        recipient={recipient}
        amount={parseFloat(amount || '0')}
        riskAnalysis={riskAnalysis}
        onCancel={() => setShowAdvisory(false)}
        onConfirm={handleAdvisoryConfirm}
      />
    </div>
  );
}
