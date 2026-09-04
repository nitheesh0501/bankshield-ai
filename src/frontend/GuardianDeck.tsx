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
  FileText
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
}) => {
  // Guardian MPIN Modal State (432100)
  const [isGuardianPinModalOpen, setIsGuardianPinModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'override' | 'topup' | 'pocket'>('override');
  const [guardianPin, setGuardianPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  // Top-Up Form State
  const [topUpAmountInput, setTopUpAmountInput] = useState('2000');
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

      <div className="space-y-6">
        {/* 1. Header Layout */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
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

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
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
              onClick={handleSimulateIncident}
              className="px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-black text-white flex items-center gap-1.5 transition shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-white fill-white" />
              <span>Simulate Incident</span>
            </button>
          </div>
        </div>

        {/* 2. MODULAR TELEMETRY & LIVE DEVICE STATUS PANEL */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase">Device Battery</span>
              <Battery className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-lg font-black text-white">84%</span>
            <span className="block text-[10px] text-emerald-400 font-medium">Healthy • Charging</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase">5G Telemetry</span>
              <Wifi className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-lg font-black text-white">Active</span>
            <span className="block text-[10px] text-slate-400 font-mono">12ms Edge Latency</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase">Screen Sharing</span>
              <EyeOff className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-lg font-black text-emerald-400">Clean</span>
            <span className="block text-[10px] text-slate-400 font-medium">No AnyDesk Detected</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase">n8n Sync</span>
              <Webhook className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-lg font-black text-purple-300">200 OK</span>
            <span className="block text-[10px] text-purple-400 font-mono">Push Active</span>
          </div>
        </div>

        {/* 3. POCKET BALANCE MANAGER WIDGET */}
        <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white leading-tight">Pocket Balance Manager (UPI Lite)</h3>
                <p className="text-[11px] text-slate-400 font-medium">Manage Ramesh's Safe Pocket Balance vs Protected Main Savings</p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30">
              DUAL BALANCE CONTROL
            </span>
          </div>

          {/* Live Side-by-Side Balance Indicator */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-1">
              <span className="block text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
                Safe Pocket Balance
              </span>
              <span className="text-xl font-black text-emerald-400">₹{pocketBalance.toLocaleString('en-IN')}.00</span>
              <p className="text-[10px] text-slate-400 font-medium">1-tap instant spend pool</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="block text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider">
                Main Savings Account
              </span>
              <span className="text-xl font-black text-white">₹{balance.toLocaleString('en-IN')}.00</span>
              <p className="text-[10px] text-slate-400 font-medium">Co-signed escrow vault</p>
            </div>
          </div>

          {/* Quick Add Chips & Actions */}
          <div className="space-y-3 pt-1">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Transfer Amount to Safe Pocket:
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

            <div className="flex items-center gap-3 pt-1">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  value={topUpAmountInput}
                  onChange={e => setTopUpAmountInput(e.target.value)}
                  placeholder="Enter custom amount"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-extrabold text-sm focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <button
                type="button"
                onClick={handleOpenPocketTransferModal}
                className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xs transition shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Wallet className="w-4 h-4 text-emerald-200" />
                <span>Transfer to Pocket</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. INCOMING ASSISTED PAY REQUEST (FamPay Parent View) */}
        {activeEscrow && activeEscrow.status === 'Escrow Hold' ? (
          <div className="bg-rose-950/90 border-2 border-rose-500 rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-rose-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/40">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                    ASSISTED-PAY APPROVAL REQUESTED
                  </span>
                  <h3 className="text-base font-black text-white mt-0.5 leading-snug">
                    Ramesh is paying ₹{activeEscrow.amount.toLocaleString('en-IN')} to {activeEscrow.payee}
                  </h3>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-mono text-xs font-black shrink-0 shadow-sm">
                AUTO-ABORT IN: {formatCountdown(countdown)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-rose-900/50 space-y-2 text-xs">
              <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase block">
                Attempted Outflow Transfer Details:
              </span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-rose-400">₹{activeEscrow.amount.toLocaleString('en-IN')}.00</span>
                <span className="font-mono bg-slate-950 px-3 py-1 rounded-xl border border-slate-800 text-slate-300">VPA: {activeEscrow.vpa}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
                <Ban className="w-4 h-4" />
                <span>Decline Payment & Freeze</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-extrabold text-white">All Senior Payments Protected</h4>
            <p className="text-xs text-slate-400 font-medium">No active duress incidents requiring co-signing.</p>
          </div>
        )}

        {/* 5. RECENT 5 INTERCEPTIONS & THREAT AUDIT STREAM */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Recent Threat Interception Stream</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">LIVE TELEMETRY</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <div>
                  <span className="block font-bold text-white leading-tight">Digital Arrest Scam Intercepted</span>
                  <span className="text-[10px] text-slate-500 font-mono">DCP Cyber Cell Official Escrow (₹85,000)</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">SCORE 95</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <div>
                  <span className="block font-bold text-white leading-tight">Utility Cutoff Scam Challenge</span>
                  <span className="text-[10px] text-slate-500 font-mono">Rajesh Electricals Utility Cell (₹48,500)</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">SCORE 82</span>
            </div>
          </div>
        </div>
      </div>

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
