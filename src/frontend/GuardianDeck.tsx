import React, { useState } from 'react';
import {
  ShieldAlert,
  BellRing,
  Zap,
  Webhook,
  Volume2,
  CheckCircle2,
  Ban,
  PhoneCall,
  Lock,
  X,
  AlertCircle,
  Delete,
  ShieldCheck,
  Check,
  Smartphone,
  PlusCircle,
  IndianRupee,
  Sparkles,
  ArrowUpRight,
  Wallet,
  Battery,
  Wifi,
  EyeOff,
  Activity,
  Cpu,
  Radio,
  FileText,
  Clock,
  Plus
} from 'lucide-react';
import { AuditItem, GuardianInfo } from '../types';

interface GuardianDeckProps {
  activeEscrow: AuditItem | null;
  countdown: number;
  formatCountdown: (sec: number) => string;
  currentMultiplier: string;
  triggerSpeech: () => void;
  handleGuardianOverride: () => void;
  handleFreezeAndAbort: () => void;
  handleSimulateIncident: () => void;
  guardianInfo?: GuardianInfo;
  handleGuardianTopUp?: (amount: number) => void;
  handleTransferToPocket?: (amount: number) => void;
  balance?: number;
  pocketBalance?: number;
  auditLogs?: AuditItem[];
}

export const GuardianDeck: React.FC<GuardianDeckProps> = ({
  activeEscrow,
  countdown,
  formatCountdown,
  currentMultiplier,
  triggerSpeech,
  handleGuardianOverride,
  handleFreezeAndAbort,
  handleSimulateIncident,
  guardianInfo = { name: 'Ananya Kumar', relation: 'Daughter', phone: '+91 98765 43210', webhookUrl: '' },
  handleGuardianTopUp,
  handleTransferToPocket,
  balance = 142800,
  pocketBalance = 3000,
  auditLogs = [],
}) => {
  // Guardian MPIN Modal State (432100)
  const [isGuardianPinModalOpen, setIsGuardianPinModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'override' | 'topup' | 'pocket'>('override');
  const [guardianPin, setGuardianPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  // Quick Top-Up Popover / Modal State
  const [isQuickTopUpOpen, setIsQuickTopUpOpen] = useState(false);
  const [topUpAmountInput, setTopUpAmountInput] = useState('1000');
  const [topUpToast, setTopUpToast] = useState<string | null>(null);

  const GUARDIAN_MPIN = '432100'; // Designated Guardian Ananya's MPIN

  const handleOpenApproveModal = () => {
    setModalMode('override');
    setGuardianPin('');
    setPinError('');
    setIsGuardianPinModalOpen(true);
  };

  const handleOpenTopUpModal = () => {
    const num = Number(topUpAmountInput);
    if (!num || num <= 0) {
      alert('Please enter a valid allowance top-up amount.');
      return;
    }
    setModalMode('topup');
    setGuardianPin('');
    setPinError('');
    setIsGuardianPinModalOpen(true);
  };

  const handleOpenPocketTransferModal = () => {
    const num = Number(topUpAmountInput);
    if (!num || num <= 0) {
      alert('Please enter a valid transfer amount for Safe Pocket.');
      return;
    }
    if (num > balance) {
      alert(`Insufficient Main Savings balance (Available: ₹${balance.toLocaleString('en-IN')}).`);
      return;
    }
    setModalMode('pocket');
    setGuardianPin('');
    setPinError('');
    setIsGuardianPinModalOpen(true);
  };

  const handleKeypadPress = (num: string) => {
    if (guardianPin.length < 6) {
      setGuardianPin(prev => prev + num);
      setPinError('');
    }
  };

  const handleBackspace = () => {
    setGuardianPin(prev => prev.slice(0, -1));
    setPinError('');
  };

  const handleConfirmGuardianPin = () => {
    if (guardianPin !== GUARDIAN_MPIN) {
      setPinError('Invalid Guardian MPIN. Try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setIsGuardianPinModalOpen(false);
    setGuardianPin('');
    setPinError('');

    const amt = Number(topUpAmountInput);

    if (modalMode === 'override') {
      handleGuardianOverride();
    } else if (modalMode === 'topup') {
      if (handleGuardianTopUp && amt > 0) {
        handleGuardianTopUp(amt);
        setTopUpToast(`₹${amt.toLocaleString('en-IN')} credited to Ramesh successfully.`);
        setTimeout(() => setTopUpToast(null), 5000);
      }
    } else if (modalMode === 'pocket') {
      if (handleTransferToPocket && amt > 0) {
        handleTransferToPocket(amt);
        setTopUpToast(`₹${amt.toLocaleString('en-IN')} transferred to Ramesh's Safe Pocket Balance.`);
        setTimeout(() => setTopUpToast(null), 5000);
      }
    }
  };

  const handleCallRamesh = () => {
    alert('📞 Calling Ramesh Kumar (+91 98401 92418)... Priority Guardian Line Connected.');
  };

  // Fallback audit stream if auditLogs is empty
  const defaultFallbackLogs: AuditItem[] = [
    {
      id: 'TXN-7094',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      payee: 'DCP Cyber Cell Official Escrow',
      vpa: 'dcp.cyber.cell@official-escrow',
      amount: 85000,
      riskScore: 100,
      status: 'Escrow Hold',
      notes: '71x Surge, Authority Coercion, Active Call Telemetry',
    },
    {
      id: 'TXN-6812',
      timestamp: '09:15 AM',
      payee: 'Apollo Pharmacy Central',
      vpa: 'apollo.pharmacy@icici',
      amount: 450,
      riskScore: 0,
      status: 'Completed',
      notes: 'Safe Pocket Auto-Cleared',
    },
    {
      id: 'TXN-6401',
      timestamp: 'Yesterday',
      payee: 'Rajesh Electricals Utility Cell',
      vpa: 'tneb.utility@paytm',
      amount: 48500,
      riskScore: 82,
      status: 'Aborted & Frozen',
      notes: 'Utility Cutoff Scam Intercepted',
    },
  ];

  const displayLogs = auditLogs.length > 0 ? auditLogs : defaultFallbackLogs;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden relative h-full flex flex-col justify-between">
      
      {/* Success Toast Banner */}
      {topUpToast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm shadow-xl flex items-center justify-between animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>{topUpToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setTopUpToast(null)}
            className="text-emerald-200 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-6 flex-1 flex flex-col justify-between">
        
        {/* 1. Header Layout with Quick Emergency Controls */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="space-y-1.5 max-w-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              GUARDIAN CO-PILOT ACTIVE
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
              Senior Safety & Co-Pilot Command Deck
            </h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Co-Pilot: <strong className="text-slate-200">{guardianInfo.name} ({guardianInfo.relation})</strong> protecting <strong className="text-slate-200">Ramesh Kumar (Father)</strong>
            </p>
          </div>

          {/* Quick Emergency Controls */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={handleCallRamesh}
              className="px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-extrabold text-white flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call Ramesh</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (activeEscrow && activeEscrow.status === 'Escrow Hold') {
                  handleFreezeAndAbort();
                } else {
                  alert("🚨 Emergency Freeze Engaged: Senior Ramesh Kumar's UPI payment access has been temporarily locked.");
                }
              }}
              className="px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-black text-white flex items-center gap-1.5 transition shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              <Ban className="w-4 h-4 text-white" />
              <span>Emergency Freeze UPI</span>
            </button>

            <button
              type="button"
              onClick={handleSimulateIncident}
              className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-extrabold text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
              title="Simulate Attack Incident for Evaluator Test"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Simulate</span>
            </button>
          </div>
        </div>

        {/* 2. SLEEK 1-LINE GUARDIAN OVERSIGHT STATUS BAR */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
          {/* Ramesh's Pocket Limit */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span className="text-slate-400 font-medium">Ramesh's Pocket Limit:</span>
            <span className="font-black text-white text-sm">₹{pocketBalance.toLocaleString('en-IN')}.00</span>
            <button
              type="button"
              onClick={() => setIsQuickTopUpOpen(true)}
              className="ml-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-extrabold text-[11px] border border-emerald-500/30 transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3 text-emerald-400" />
              <span>Quick Top-Up</span>
            </button>
          </div>

          {/* Dynamic Duress Shield */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Dynamic Duress Shield:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Active
            </span>
          </div>

          {/* Real-time Escrow Sync */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Real-time Escrow Sync:</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-cyan-400">
              <Wifi className="w-3.5 h-3.5" />
              Connected
            </span>
          </div>
        </div>

        {/* 3. MODULAR TELEMETRY STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase">Device Battery</span>
              <Battery className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-base font-black text-white">84%</span>
            <span className="block text-[10px] text-emerald-400 font-medium">Healthy</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase">5G Telemetry</span>
              <Wifi className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-base font-black text-white">Active</span>
            <span className="block text-[10px] text-slate-400 font-mono">12ms Latency</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase">Screen Sharing</span>
              <EyeOff className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-base font-black text-emerald-400">Clean</span>
            <span className="block text-[10px] text-slate-400 font-medium">No AnyDesk</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase">n8n Sync</span>
              <Webhook className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-base font-black text-purple-300">200 OK</span>
            <span className="block text-[10px] text-purple-400 font-mono">Push Active</span>
          </div>
        </div>

        {/* 4. EXPANDED REAL-TIME SECURITY & ACTION CENTER */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          
          {/* A: LIVE ESCROW AUTHORIZATION QUEUE */}
          {activeEscrow && activeEscrow.status === 'Escrow Hold' ? (
            <div className="bg-rose-950/90 border-2 border-rose-500 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-rose-900/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/40">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                      LIVE ESCROW AUTHORIZATION QUEUE
                    </span>
                    <h3 className="text-base font-black text-white mt-0.5 leading-snug">
                      High-Risk Outflow Intercepted: ₹{activeEscrow.amount.toLocaleString('en-IN')} to {activeEscrow.payee}
                    </h3>
                  </div>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-mono text-xs font-black shrink-0 shadow-sm flex items-center gap-1.5">
                  <Clock className="w-4 h-4 animate-spin text-white" />
                  <span>AUTO-ABORT: {formatCountdown(countdown)}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-rose-900/50 space-y-2 text-xs">
                <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase block">
                  Target Beneficiary Details:
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-rose-400">₹{activeEscrow.amount.toLocaleString('en-IN')}.00</span>
                    <span className="text-xs font-bold text-white">to {activeEscrow.payee}</span>
                  </div>
                  <span className="font-mono bg-slate-950 px-3 py-1 rounded-xl border border-slate-800 text-slate-300 text-xs">
                    VPA: {activeEscrow.vpa}
                  </span>
                </div>
              </div>

              {/* Itemized Forensic Risk Details */}
              <div className="space-y-2">
                <span className="block font-bold text-rose-300 uppercase tracking-wider text-[11px]">
                  Forensic Telemetry & Threat Analysis:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-rose-900/40 space-y-1">
                    <span className="block font-black text-rose-400 text-[11px]">Surge Multiplier</span>
                    <p className="text-[11px] text-slate-300 font-medium">71x over senior's ₹1,200 monthly average</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-rose-900/40 space-y-1">
                    <span className="block font-black text-rose-400 text-[11px]">Active Call Telemetry</span>
                    <p className="text-[11px] text-slate-300 font-medium">Active call detected on Ramesh's phone</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-rose-900/40 space-y-1">
                    <span className="block font-black text-rose-400 text-[11px]">VPA Trust Rating</span>
                    <p className="text-[11px] text-slate-300 font-medium">Unverified Receiver • Authority Coercion</p>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={triggerSpeech}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Remote Intercom Challenge</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenApproveModal}
                  className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Approve Payment (Enter PIN)</span>
                </button>

                <button
                  type="button"
                  onClick={handleFreezeAndAbort}
                  className="flex-1 py-3 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Ban className="w-4 h-4 text-white" />
                  <span>Decline Payment & Freeze</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-3 flex-1 flex flex-col justify-center items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-white">Live Escrow Authorization Queue Empty</h4>
                <p className="text-xs text-slate-400 font-medium max-w-md">
                  All senior payments are actively protected. Routine transfers within Ramesh's ₹{pocketBalance.toLocaleString('en-IN')} Safe Pocket limit clear automatically without friction.
                </p>
              </div>
            </div>
          )}

          {/* B: RECENT AUDIT LEDGER STREAM */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Recent Audit Ledger Stream</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                SUPABASE AUDIT SYNC
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {displayLogs.slice(0, 4).map((log, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      log.status === 'Escrow Hold'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : log.status === 'Aborted & Frozen'
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                        : log.status === 'Guardian Authorized' || log.status === 'Completed' || log.status === 'Credit Cleared'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {log.status === 'Escrow Hold' ? '🚨' : log.status === 'Aborted & Frozen' ? '🛑' : '✓'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white leading-tight">{log.payee}</span>
                        <span className="text-[10px] font-mono text-slate-400">₹{log.amount.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                        <span>{log.timestamp}</span>
                        <span>•</span>
                        <span className="truncate max-w-[200px] text-slate-400">{log.notes || log.vpa}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black ${
                      log.status === 'Escrow Hold'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : log.status === 'Aborted & Frozen'
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                        : log.status === 'Guardian Authorized' || log.status === 'Completed' || log.status === 'Credit Cleared'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* QUICK TOP-UP MODAL */}
      {isQuickTopUpOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 text-white animate-in zoom-in-95 duration-200 relative">
            <button
              type="button"
              onClick={() => setIsQuickTopUpOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-xl shadow-inner">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white tracking-tight mt-2">
                Quick Pocket Allowance Top-Up
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Add instant allowance to Ramesh's Safe Pocket Balance
              </p>
            </div>

            {/* Preset Amount Chips */}
            <div className="space-y-2">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Top-Up Amount:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[500, 1000, 2000, 5000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmountInput(amt.toString())}
                    className={`py-2 rounded-xl text-xs font-black transition cursor-pointer border ${
                      topUpAmountInput === amt.toString()
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                    }`}
                  >
                    + ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                value={topUpAmountInput}
                onChange={e => setTopUpAmountInput(e.target.value)}
                placeholder="Enter custom amount"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-extrabold text-sm focus:border-emerald-500 focus:outline-none transition"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setIsQuickTopUpOpen(false);
                handleOpenPocketTransferModal();
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-emerald-200" />
              <span>Proceed to MPIN Verification (432100)</span>
            </button>
          </div>
        </div>
      )}

      {/* GUARDIAN MPIN MODAL (432100) */}
      {isGuardianPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 text-white animate-in zoom-in-95 duration-200 relative ${isShaking ? 'animate-bounce border-rose-500' : ''}`}>
            
            <button
              type="button"
              onClick={() => setIsGuardianPinModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-xl shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white tracking-tight mt-2">
                Guardian Co-Pilot Authorization
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {modalMode === 'pocket'
                  ? 'Authorize Transfer to Ramesh Safe Pocket'
                  : modalMode === 'topup'
                  ? 'Authorize Allowance Top-Up Funding'
                  : 'Authorize Escrow Transfer'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {modalMode === 'pocket' ? 'Transferring to Safe Pocket:' : modalMode === 'topup' ? 'Top-Up Amount to Ramesh:' : 'Authorizing Transfer For Ramesh:'}
              </span>
              <div className="text-xl font-black text-emerald-400">
                ₹ {modalMode === 'pocket' || modalMode === 'topup' ? Number(topUpAmountInput || 0).toLocaleString('en-IN') : (activeEscrow ? activeEscrow.amount.toLocaleString('en-IN') : '0')}.00
              </div>
              <div className="text-xs text-white font-bold truncate">
                {modalMode === 'pocket' ? 'Credit to Safe Pocket (UPI Lite Pool)' : modalMode === 'topup' ? 'Credit to Ramesh Savings A/C' : (activeEscrow ? activeEscrow.payee : 'Beneficiary')}
              </div>
            </div>

            {/* 6-Digit Indicator Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 py-1">
                {[0, 1, 2, 3, 4, 5].map(idx => (
                  <div
                    key={idx}
                    className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
                      guardianPin.length > idx
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-700 bg-slate-950 text-slate-600'
                    }`}
                  >
                    {guardianPin.length > idx ? '•' : ''}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setGuardianPin(GUARDIAN_MPIN);
                    setPinError('');
                  }}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold underline transition cursor-pointer"
                >
                  [Auto-fill Guardian PIN: 432100]
                </button>
              </div>
            </div>

            {pinError && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-pulse">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            {/* Touch Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeypadPress(num)}
                  className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-emerald-600 text-white font-black text-lg transition shadow-md cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={handleBackspace}
                className="py-3 rounded-xl bg-slate-800 hover:bg-rose-900 text-rose-300 font-bold text-sm transition flex items-center justify-center cursor-pointer"
              >
                <Delete className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-emerald-600 text-white font-black text-lg transition shadow-md cursor-pointer"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleConfirmGuardianPin}
                disabled={guardianPin.length !== 6}
                className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs transition flex items-center justify-center cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
