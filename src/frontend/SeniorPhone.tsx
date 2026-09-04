import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Send,
  PhoneCall,
  Volume2,
  Lock,
  Delete,
  X,
  AlertCircle,
  ShieldCheck,
  QrCode,
  Mic,
  UserCheck,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowUpRight,
  Zap,
  ShoppingBag,
  HeartPulse,
  Receipt,
  RotateCcw
} from 'lucide-react';
import { PRESET_SCENARIOS, computeDynamicCap } from '../backend/riskEngine';
import { AuditItem, GuardianInfo } from '../types';

interface SeniorPhoneProps {
  recipientName: string;
  setRecipientName: (val: string) => void;
  upiId: string;
  setUpiId: (val: string) => void;
  amount: string;
  setAmount: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  isActiveCall: boolean;
  setIsActiveCall: (val: boolean) => void;
  currentMultiplier: string;
  handleAuthorizeTransfer: (e: React.FormEvent) => void;
  balance?: number;
  activeEscrow?: AuditItem | null;
  guardianInfo?: GuardianInfo;
  lastGuardianTopUp?: { amount: number; time: string } | null;
}

export const SeniorPhone: React.FC<SeniorPhoneProps> = ({
  recipientName,
  setRecipientName,
  upiId,
  setUpiId,
  amount,
  setAmount,
  category,
  setCategory,
  isActiveCall,
  setIsActiveCall,
  currentMultiplier,
  handleAuthorizeTransfer,
  balance = 142800,
  activeEscrow = null,
  guardianInfo = { name: 'Ananya Kumar', relation: 'Daughter', phone: '+91 98765 43210', webhookUrl: '' },
  lastGuardianTopUp = null,
}) => {
  // UI Toggles & States
  const [showFullBalance, setShowFullBalance] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isPhonePayModalOpen, setIsPhonePayModalOpen] = useState(false);
  const [phoneLookup, setPhoneLookup] = useState('');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // UPI PIN Modal & Verification
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const CORRECT_PIN = '924180'; // Ramesh's Senior PIN

  // Local Success Receipt State
  const [lastCompletedTxn, setLastCompletedTxn] = useState<{ payee: string; amount: number; time: string } | null>(null);

  // Dynamic Safe Cap Calculation
  const capInfo = computeDynamicCap(balance, upiId, category, isActiveCall);

  // Watch for real-time status transitions on activeEscrow
  useEffect(() => {
    if (activeEscrow && (activeEscrow.status === 'Guardian Authorized' || activeEscrow.status === 'Guardian Cleared')) {
      setLastCompletedTxn({
        payee: activeEscrow.payee,
        amount: activeEscrow.amount,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      });
    }
  }, [activeEscrow]);

  // Voice Assistant TTS
  const triggerSpeech = (customText?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const text = customText || 'Tap the microphone or select a trusted contact to send money safely.';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.lang = 'en-IN';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis failed', e);
      setIsSpeaking(false);
    }
  };

  const handleMicClick = () => {
    setIsVoiceListening(true);
    triggerSpeech('Listening! Tell me who you want to pay. For example, Apollo Pharmacy or Ananya.');
    setTimeout(() => {
      setIsVoiceListening(false);
    }, 4000);
  };

  const selectPreset = (presetId: string) => {
    const preset = PRESET_SCENARIOS.find(p => p.id === presetId);
    if (!preset) return;
    setRecipientName(preset.payee);
    setUpiId(preset.vpa);
    setAmount(preset.amount.toString());
    setCategory(preset.category);
    setIsActiveCall(preset.isCallActive);
    setLastCompletedTxn(null);
  };

  const handleInitiatePayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid transfer amount.');
      return;
    }
    setEnteredPin('');
    setPinError('');
    setIsPinModalOpen(true);
  };

  const handleKeypadPress = (num: string) => {
    if (enteredPin.length < 6) {
      setEnteredPin(prev => prev + num);
      setPinError('');
    }
  };

  const handleBackspace = () => {
    setEnteredPin(prev => prev.slice(0, -1));
    setPinError('');
  };

  const handleConfirmPin = () => {
    if (enteredPin !== CORRECT_PIN) {
      setPinError('Incorrect 6-digit MPIN. Try again.');
      return;
    }

    setIsPinModalOpen(false);
    setPinError('');

    const numAmount = Number(amount);
    if (numAmount <= capInfo.effectiveCap && !isActiveCall) {
      // Instant execution receipt
      setLastCompletedTxn({
        payee: recipientName,
        amount: numAmount,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      });
      triggerSpeech(`Payment of ${numAmount} rupees to ${recipientName} successful!`);
    }

    handleAuthorizeTransfer({ preventDefault: () => {} } as React.FormEvent);
  };

  const handleSimulateScan = (name: string, vpa: string, amt: number) => {
    setRecipientName(name);
    setUpiId(vpa);
    setAmount(amt.toString());
    setCategory('QR Scanner Payment');
    setIsActiveCall(false);
    setIsQrModalOpen(false);
    setLastCompletedTxn(null);
  };

  return (
    <div className="space-y-4 relative">
      {/* Container Header */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 leading-tight">
          <Smartphone className="w-4 h-4 text-emerald-600" />
          <span>Ramesh's Assisted UPI Wallet</span>
        </h3>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
          PROTECTED BY ANANYA
        </span>
      </div>

      {/* Main Mobile App Frame */}
      <div className="bg-slate-900 text-slate-100 border-4 border-slate-800 rounded-[36px] p-5 sm:p-6 shadow-2xl space-y-5 overflow-hidden">
        
        {/* User Account Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-base border border-emerald-500/40 shadow-inner">
              RK
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white leading-tight">Ramesh Kumar</h4>
              <p className="text-xs text-slate-400 font-medium">Senior Privilege Account</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleMicClick}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              isVoiceListening
                ? 'bg-rose-600 border-rose-400 text-white animate-pulse shadow-lg shadow-rose-600/30'
                : 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30'
            }`}
            title="Tap for Voice Assistant"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* INCOMING GUARDIAN CREDIT TOP-UP BANNER */}
        {lastGuardianTopUp && (
          <div className="p-4 rounded-3xl bg-emerald-950/90 border-2 border-emerald-400 text-center space-y-1.5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-black text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Allowance Top-Up Received</span>
            </div>
            <p className="text-xs font-extrabold text-white leading-relaxed">
              Daughter Ananya added <strong className="text-emerald-400 font-black text-sm">₹{lastGuardianTopUp.amount.toLocaleString('en-IN')}.00</strong> to your safe spending balance!
            </p>
          </div>
        )}

        {/* 1. SAFE POCKET BALANCE CARD */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-emerald-900/60 border border-emerald-500/30 space-y-3 relative shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Safe Pocket Limit</span>
            </span>

            <button
              type="button"
              onClick={() => setShowFullBalance(!showFullBalance)}
              className="text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700 flex items-center gap-1 transition cursor-pointer"
            >
              {showFullBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showFullBalance ? 'Hide Savings' : 'Show Full Balance'}</span>
            </button>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                ₹ {capInfo.effectiveCap.toLocaleString('en-IN')}.00
              </span>
              <span className="text-xs font-bold text-emerald-200/80">/ transfer</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              Instant 1-tap clearance for routine expenses up to ₹{capInfo.effectiveCap.toLocaleString('en-IN')}.
            </p>
          </div>

          {showFullBalance && (
            <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs animate-in fade-in duration-200">
              <span className="text-slate-400 font-medium">Total Linked Savings Balance:</span>
              <strong className="text-white font-extrabold text-sm">₹ {balance.toLocaleString('en-IN')}.00</strong>
            </div>
          )}
        </div>

        {/* 2. CORE ACCESSIBLE UPI NAVIGATION TILES */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex flex-col items-center justify-center text-center space-y-1.5 transition shadow-md cursor-pointer border border-emerald-400/30 min-h-[80px]"
          >
            <QrCode className="w-6 h-6 text-white" />
            <span className="text-xs font-extrabold leading-tight">Scan Any QR</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPhonePayModalOpen(true)}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-100 flex flex-col items-center justify-center text-center space-y-1.5 transition shadow-md cursor-pointer border border-slate-700 min-h-[80px]"
          >
            <Send className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-extrabold leading-tight">Pay Contact</span>
          </button>

          <button
            type="button"
            onClick={handleMicClick}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-100 flex flex-col items-center justify-center text-center space-y-1.5 transition shadow-md cursor-pointer border border-slate-700 min-h-[80px]"
          >
            <Volume2 className="w-6 h-6 text-cyan-400" />
            <span className="text-xs font-extrabold leading-tight">Voice Assist</span>
          </button>
        </div>

        {/* 3. FREQUENT & TRUSTED PAYEES */}
        <div className="space-y-2.5">
          <span className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider">
            Frequent & Trusted Payees:
          </span>
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => {
                setRecipientName('Ananya Kumar (Daughter)');
                setUpiId('ananya.daughter@upi');
                setAmount('1000');
                setCategory('Family Support');
                setIsActiveCall(false);
                setLastCompletedTxn(null);
              }}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center flex flex-col items-center justify-center transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-xs mb-1 border border-emerald-500/40">
                AK
              </div>
              <span className="text-[11px] font-bold text-white leading-tight truncate w-full">Ananya</span>
              <span className="text-[9px] text-emerald-400 font-semibold">Daughter</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRecipientName('Apollo Pharmacy');
                setUpiId('apollo.pharmacy@upi');
                setAmount('1200');
                setCategory('Healthcare & Medicine');
                setIsActiveCall(false);
                setLastCompletedTxn(null);
              }}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center flex flex-col items-center justify-center transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-rose-500/20 text-rose-400 font-extrabold flex items-center justify-center text-xs mb-1 border border-rose-500/40">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-white leading-tight truncate w-full">Pharmacy</span>
              <span className="text-[9px] text-slate-400 font-semibold">Medicine</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRecipientName('Nilgiris Daily Groceries');
                setUpiId('nilgiris.groceries@upi');
                setAmount('450');
                setCategory('Regular Household Expense');
                setIsActiveCall(false);
                setLastCompletedTxn(null);
              }}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center flex flex-col items-center justify-center transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-xs mb-1 border border-amber-500/40">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-white leading-tight truncate w-full">Groceries</span>
              <span className="text-[9px] text-slate-400 font-semibold">Daily</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRecipientName('TNEB Electricity Bill');
                setUpiId('tneb.billing@gov');
                setAmount('1850');
                setCategory('Utility Recurring');
                setIsActiveCall(false);
                setLastCompletedTxn(null);
              }}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center flex flex-col items-center justify-center transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold flex items-center justify-center text-xs mb-1 border border-cyan-500/40">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-white leading-tight truncate w-full">Electricity</span>
              <span className="text-[9px] text-slate-400 font-semibold">Utility</span>
            </button>
          </div>
        </div>

        {/* QUICK TEST SCAM PRESETS SELECTOR */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="block text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center justify-between">
            <span>Test Scam Vectors:</span>
            <span className="text-[9px] text-slate-500 font-normal">Simulate attacks</span>
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {PRESET_SCENARIOS.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => selectPreset(preset.id)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-[11px] font-bold text-white transition cursor-pointer"
              >
                <span className={`block text-[9px] truncate ${preset.expectedScore >= 75 ? 'text-rose-400 font-black' : 'text-emerald-400'}`}>
                  {preset.name}
                </span>
                <span>₹{preset.amount.toLocaleString('en-IN')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. REAL-TIME ASSISTED ESCROW / COMPLETED RECEIPT BANNER */}
        {lastCompletedTxn ? (
          <div className="p-5 rounded-3xl bg-emerald-950/90 border-2 border-emerald-500 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                ✓ Payment Successful
              </span>
              <h4 className="text-2xl font-black text-white">₹{lastCompletedTxn.amount.toLocaleString('en-IN')}.00</h4>
              <p className="text-xs text-slate-300 font-semibold">Sent to {lastCompletedTxn.payee}</p>
            </div>
            <button
              type="button"
              onClick={() => setLastCompletedTxn(null)}
              className="text-xs px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md cursor-pointer"
            >
              Send Another Payment
            </button>
          </div>
        ) : activeEscrow && activeEscrow.status === 'Escrow Hold' ? (
          <div className="p-5 rounded-3xl bg-rose-950/90 border-2 border-rose-500 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40 shrink-0">
                <Clock className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 block">
                  Needs Guardian Approval
                </span>
                <h4 className="text-sm font-extrabold text-white leading-tight">
                  Transfer of ₹{activeEscrow.amount.toLocaleString('en-IN')} to {activeEscrow.payee}
                </h4>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-rose-900/50 text-xs text-slate-200 leading-relaxed font-medium">
              "Amount exceeds your <strong>₹{capInfo.effectiveCap.toLocaleString('en-IN')}</strong> safe limit. We sent a 1-tap confirmation request to Ananya ({guardianInfo.phone})."
            </div>

            <div className="flex items-center justify-center gap-2 py-1 text-xs font-extrabold text-amber-400 bg-amber-500/10 rounded-xl border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Waiting for Ananya to enter her PIN...</span>
            </div>
          </div>
        ) : activeEscrow && activeEscrow.status === 'Aborted & Frozen' ? (
          <div className="p-5 rounded-3xl bg-rose-950/90 border-2 border-rose-500 space-y-3 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
              <X className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 block">
                Payment Stopped & Secured
              </span>
              <h4 className="text-base font-extrabold text-white">Transfer of ₹{activeEscrow.amount.toLocaleString('en-IN')} Cancelled</h4>
              <p className="text-xs text-slate-300">Your guardian Ananya stopped this transaction. Your money is 100% safe in your account.</p>
            </div>
          </div>
        ) : null}

        {/* 5. ACCESSIBLE SEND MONEY FORM */}
        <form onSubmit={handleInitiatePayment} className="space-y-4 pt-1">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">Recipient Name / Contact</label>
            <input
              type="text"
              required
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:border-emerald-500 focus:outline-none transition"
              placeholder="e.g. Apollo Pharmacy"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300">Amount (₹ INR)</label>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Safe Limit: ₹{capInfo.effectiveCap.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="number"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-black text-xl focus:border-emerald-500 focus:outline-none transition"
              placeholder="Enter amount"
            />
          </div>

          {/* Background Phone Call Sensor Toggle */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${isActiveCall ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white leading-tight">Active Call Sensor</span>
                <span className="text-[10px] text-slate-400 leading-normal">
                  {isActiveCall ? 'Phone call in progress (Auto-routes to Ananya)' : 'No active phone call'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsActiveCall(!isActiveCall)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                isActiveCall ? 'bg-rose-600' : 'bg-slate-700'
              }`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${isActiveCall ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Big Oversized Pay Button */}
          <button
            type="submit"
            className="w-full py-4 min-h-[52px] rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-base transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-5 h-5 text-white" />
            <span>Send ₹{amount ? Number(amount).toLocaleString('en-IN') : '0'} Now</span>
          </button>
        </form>

      </div>

      {/* QR SCANNER SIMULATION MODAL */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-white relative">
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <QrCode className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-base font-extrabold">Scan Any Merchant UPI QR</h3>
              <p className="text-xs text-slate-400">Point your phone camera at shop QR code</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border-2 border-dashed border-emerald-500/50 flex items-center justify-center text-center space-y-2 flex-col min-h-[160px]">
              <span className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center animate-pulse">
                <QrCode className="w-8 h-8" />
              </span>
              <span className="text-xs font-bold text-emerald-300">Simulate Quick QR Scans:</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleSimulateScan('Nilgiris Daily Groceries', 'nilgiris.groceries@upi', 450)}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left text-xs font-bold transition cursor-pointer"
              >
                <span className="block text-emerald-400 text-[10px]">Merchant</span>
                <span>Nilgiris ₹450</span>
              </button>
              <button
                type="button"
                onClick={() => handleSimulateScan('Apollo Pharmacy', 'apollo.pharmacy@upi', 1200)}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left text-xs font-bold transition cursor-pointer"
              >
                <span className="block text-rose-400 text-[10px]">Pharmacy</span>
                <span>Apollo ₹1,200</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHONE LOOKUP PAY MODAL */}
      {isPhonePayModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-white relative">
            <button
              type="button"
              onClick={() => setIsPhonePayModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <Send className="w-7 h-7 text-emerald-400 mx-auto" />
              <h3 className="text-base font-extrabold">Pay to Phone / Contact</h3>
              <p className="text-xs text-slate-400">Enter 10-digit mobile number</p>
            </div>

            <div className="space-y-2">
              <input
                type="tel"
                value={phoneLookup}
                onChange={e => setPhoneLookup(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setRecipientName('Ananya Kumar');
                  setUpiId('ananya.daughter@upi');
                  setIsPhonePayModalOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition cursor-pointer"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SENIOR MPIN VERIFICATION MODAL (924180) */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 text-white relative">
            <button
              type="button"
              onClick={() => setIsPinModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-xl shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white tracking-tight mt-2">
                Enter Your 6-Digit MPIN
              </h3>
              <p className="text-xs text-slate-400">
                A/C ...9241 • Ramesh Kumar
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Paying Amount:
              </span>
              <div className="text-xl font-black text-emerald-400">
                ₹ {Number(amount || 0).toLocaleString('en-IN')}.00
              </div>
              <div className="text-xs text-white font-bold truncate">
                {recipientName || 'Beneficiary'}
              </div>
            </div>

            {/* 6-Digit Indicator Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 py-1">
                {[0, 1, 2, 3, 4, 5].map(idx => (
                  <div
                    key={idx}
                    className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
                      enteredPin.length > idx
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-700 bg-slate-950 text-slate-600'
                    }`}
                  >
                    {enteredPin.length > idx ? '•' : ''}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setEnteredPin(CORRECT_PIN);
                    setPinError('');
                  }}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold underline transition cursor-pointer"
                >
                  [Auto-fill Demo PIN: 924180]
                </button>
              </div>
            </div>

            {pinError && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            {/* Keypad */}
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
                onClick={handleConfirmPin}
                disabled={enteredPin.length !== 6}
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
