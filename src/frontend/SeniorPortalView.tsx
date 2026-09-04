import React, { useState } from 'react';
import {
  Smartphone,
  Send,
  PhoneCall,
  Volume2,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  Zap,
  Lock,
  Clock,
  CheckCircle2,
  HelpCircle,
  Activity,
  User,
  ShoppingBag,
  HeartPulse,
  ZapOff,
  ArrowUpRight,
  Delete,
  X,
  AlertCircle,
  QrCode,
  Mic,
  Eye,
  EyeOff,
  Wallet
} from 'lucide-react';
import { evaluateDuressRisk, computeDynamicCap } from '../backend/riskEngine';
import { GuardianInfo } from '../types';

interface SeniorPortalViewProps {
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
  guardianInfo?: GuardianInfo;
  balance?: number;
  pocketBalance?: number;
}

export const SeniorPortalView: React.FC<SeniorPortalViewProps> = ({
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
  guardianInfo = { name: 'Ananya Kumar', relation: 'Daughter', phone: '+91 98765 43210', webhookUrl: '' },
  balance = 142800,
  pocketBalance = 3000,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isNewBeneficiary, setIsNewBeneficiary] = useState(true);
  const [emergencyAlertSent, setEmergencyAlertSent] = useState(false);
  const [showFullBalance, setShowFullBalance] = useState(false);
  const [activeSeniorTab, setActiveSeniorTab] = useState<'send' | 'passbook'>('send');

  // UPI PIN Verification State
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const CORRECT_PIN = '924180';

  // Dynamic Safe Cap Calculation
  const capInfo = computeDynamicCap(balance, upiId, category, isActiveCall);

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
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
    handleAuthorizeTransfer({ preventDefault: () => {} } as React.FormEvent);
  };

  const triggerSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const warningText =
        'Police and utility companies never ask for UPI transfers over phone calls. Disconnect the call now.';
      const utterance = new SpeechSynthesisUtterance(warningText);
      utterance.rate = 0.9;
      utterance.lang = 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis failed', e);
      setIsSpeaking(false);
    }
  };

  const handleEmergencyButton = () => {
    setEmergencyAlertSent(true);
    triggerSpeech();
    setTimeout(() => {
      alert(`🚨 Emergency Alert Sent! ${guardianInfo.name} has been notified.`);
    }, 200);
  };

  const selectScenarioPreset = (preset: { payee: string; vpa: string; amt: number; cat: string; call: boolean; newBen: boolean }) => {
    setRecipientName(preset.payee);
    setUpiId(preset.vpa);
    setAmount(preset.amt.toString());
    setCategory(preset.cat);
    setIsActiveCall(preset.call);
    setIsNewBeneficiary(preset.newBen);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. HEADER ACCOUNT & SAFE POCKET BANNER (CLEAN MODERN LIGHT THEME) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Side: Account Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
                Senior Privilege Savings A/C
              </span>
              <span className="text-xs text-slate-500 font-mono">No: 501009849241</span>
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Account Holder</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Ramesh Kumar (Age: 68)</h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
              <div>
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Safe Pocket Balance (UPI Lite Pool)</span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-700 tracking-tight">
                  ₹ {pocketBalance.toLocaleString('en-IN')}.00
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFullBalance(!showFullBalance)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                >
                  {showFullBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-700" />}
                  <span>{showFullBalance ? 'Hide Savings' : `Main Savings: ₹${balance.toLocaleString('en-IN')}`}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Simple Senior Balance & Help Summary */}
          <div className="space-y-3 bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 lg:max-w-md w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Senior Protection Active
              </span>
              <span className="text-[11px] font-bold text-emerald-800">BankShield Monitored</span>
            </div>

            <div className="text-xs text-slate-700 font-semibold space-y-1">
              <p>All daily spending up to <strong className="text-emerald-800">₹{pocketBalance.toLocaleString('en-IN')}</strong> clears instantly without friction.</p>
              <p className="text-[11px] text-slate-500">Larger transfers automatically route to your daughter Ananya for 1-tap safety approval.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TAB CONTROLS & DASHBOARD LAYOUT */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveSeniorTab('send')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
              activeSeniorTab === 'send'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Send Money via UPI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSeniorTab('passbook')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
              activeSeniorTab === 'passbook'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Senior Passbook & History</span>
          </button>
        </div>

        {activeSeniorTab === 'passbook' ? (
          /* PASSBOOK TAB VIEW */
          <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Passbook & Account History</h2>
                <p className="text-xs text-slate-500 mt-1">Simple view of all recent transactions with legible status indicators.</p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">Ramesh Kumar A/C</span>
            </div>

            <div className="space-y-3">
              {[
                { id: 'TXN-7094', name: 'DCP Cyber Cell Official Escrow', amount: 85000, date: 'Today, 10:15 AM', status: 'Paused by Co-Pilot', type: 'blocked' },
                { id: 'TXN-6812', name: 'Apollo Pharmacy Central', amount: 450, date: 'Today, 08:30 AM', status: 'Cleared via Safe Pocket', type: 'cleared' },
                { id: 'TXN-6744', name: 'Nilgiris Daily Groceries', amount: 1200, date: 'Yesterday', status: 'Cleared via Safe Pocket', type: 'cleared' },
                { id: 'TXN-6401', name: 'Rajesh Electricals Utility Cell', amount: 48500, date: '02 Sep 2026', status: 'Paused by Co-Pilot', type: 'blocked' },
                { id: 'TXN-6110', name: 'Daughter Ananya Allowance Top-Up', amount: 2000, date: '01 Sep 2026', status: 'Credit Cleared', type: 'credit' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 hover:bg-slate-100/80 transition">
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{item.date} • <span className="font-mono text-slate-400">{item.id}</span></p>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-lg font-black text-slate-900">
                      {item.type === 'credit' ? '+' : '-'} ₹{item.amount.toLocaleString('en-IN')}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                      item.type === 'cleared' || item.type === 'credit'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* SEND MONEY TAB VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: TRANSFER FORM */}
            <div className="lg:col-span-7 bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Send className="w-5 h-5 text-emerald-600" />
                  <span>Send Money via Assisted UPI</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Transactions within your ₹{pocketBalance.toLocaleString('en-IN')} Safe Pocket clear instantly. Larger transfers route to Ananya for 1-tap co-signing.
                </p>
              </div>

              {/* Quick Attack Vector Test Presets */}
              <div className="space-y-2.5">
                <span className="block text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  <span>Quick Test Scam Presets:</span>
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => selectScenarioPreset({
                      payee: 'Nilgiris Daily Groceries',
                      vpa: 'nilgiris.groceries@upi',
                      amt: 450,
                      cat: 'Regular Household Expense',
                      call: false,
                      newBen: false,
                    })}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs transition cursor-pointer"
                  >
                    <span className="block font-bold text-slate-900 text-[11px]">Safe Groceries</span>
                    <span className="block text-[10px] text-emerald-700 font-bold">₹450 (Pocket)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectScenarioPreset({
                      payee: 'Rajesh Electricals Utility Cell',
                      vpa: 'electricity.cutoff.pay@upi',
                      amt: 48500,
                      cat: 'Utility Disconnection Threat',
                      call: true,
                      newBen: true,
                    })}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs transition cursor-pointer"
                  >
                    <span className="block font-bold text-slate-900 text-[11px]">Utility Cutoff Scam</span>
                    <span className="block text-[10px] text-amber-800 font-bold">₹48,500 (Assisted)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectScenarioPreset({
                      payee: 'DCP Cyber Cell Official Escrow',
                      vpa: 'dcp.cybercell.official@okhdfc',
                      amt: 85000,
                      cat: 'Law Enforcement / Police Clearance',
                      call: true,
                      newBen: true,
                    })}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs transition cursor-pointer"
                  >
                    <span className="block font-bold text-slate-900 text-[11px]">Digital Arrest</span>
                    <span className="block text-[10px] text-rose-800 font-bold">₹85,000 (Blocked)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectScenarioPreset({
                      payee: 'City Hospital ICU Dept',
                      vpa: 'city.hospital.icu@upi',
                      amt: 60000,
                      cat: 'Medical Emergency',
                      call: false,
                      newBen: false,
                    })}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs transition cursor-pointer"
                  >
                    <span className="block font-bold text-slate-900 text-[11px]">Hospital Emergency</span>
                    <span className="block text-[10px] text-cyan-800 font-bold">₹60,000 (Assisted)</span>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleInitiatePayment} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Recipient UPI Address</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-xs focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">Transfer Amount (₹ INR)</label>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Pocket Pool: ₹{pocketBalance.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-black text-xl focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Category / Purpose</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs focus:border-emerald-600 focus:outline-none transition"
                  >
                    <option value="Regular Household Expense">Regular Household Expense</option>
                    <option value="Law Enforcement / Police Clearance">Law Enforcement / Police Clearance</option>
                    <option value="Utility Disconnection Threat">Utility Disconnection Threat</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                  </select>
                </div>

                {/* Sensor Switch */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isActiveCall ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-extrabold text-slate-900">Simulate Background Phone Call</span>
                      <span className="text-[11px] text-slate-500">Auto-routes transaction to Ananya</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsActiveCall(!isActiveCall)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                      isActiveCall ? 'bg-rose-600' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${isActiveCall ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-200" />
                  <span>Verify & Execute Payment (BankShield Monitored)</span>
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: VOICE ASSIST & ACCESSIBLE RED EMERGENCY HELP BUTTON */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4" />
                    <span>Voice Guidance Assistant</span>
                  </span>
                  <span className="text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  "Police and utility companies never ask for money over phone calls. Disconnect the call now."
                </p>

                <button
                  type="button"
                  onClick={triggerSpeech}
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                  <span>🔊 Read Aloud in Plain Language</span>
                </button>
              </div>

              {/* Single Accessible Red Help Button */}
              <div className="p-5 bg-rose-50 border-2 border-rose-300 rounded-3xl space-y-3 shadow-md">
                <span className="block text-xs font-black uppercase tracking-wider text-rose-900 text-center">
                  Need Help or Suspicious Call?
                </span>
                <button
                  type="button"
                  onClick={handleEmergencyButton}
                  className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-black text-sm transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5 text-white animate-bounce" />
                  <span>Call Daughter Ananya (+91 98765 43210)</span>
                </button>

                {emergencyAlertSent && (
                  <span className="block text-xs font-bold text-rose-800 text-center animate-in fade-in">
                    ✓ Priority call connecting to Daughter Ananya...
                  </span>
                )}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* SENIOR MPIN MODAL (924180) */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 text-slate-900 relative">
            <button
              type="button"
              onClick={() => setIsPinModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto text-xl shadow-xs">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight mt-2">
                Enter Your 6-Digit MPIN
              </h3>
              <p className="text-xs text-slate-500">
                A/C ...9241 • Ramesh Kumar
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Paying Amount:
              </span>
              <div className="text-xl font-black text-emerald-700">
                ₹ {Number(amount || 0).toLocaleString('en-IN')}.00
              </div>
              <div className="text-xs text-slate-900 font-extrabold truncate">
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
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-slate-300 bg-slate-50 text-slate-400'
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
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 font-extrabold underline transition cursor-pointer"
                >
                  [Auto-fill Demo PIN: 924180]
                </button>
              </div>
            </div>

            {pinError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
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
                  className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-emerald-600 active:text-white text-slate-900 font-black text-lg transition shadow-xs cursor-pointer border border-slate-200"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={handleBackspace}
                className="py-3 rounded-xl bg-slate-100 hover:bg-rose-100 text-rose-700 font-bold text-sm transition flex items-center justify-center cursor-pointer border border-slate-200"
              >
                <Delete className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-emerald-600 active:text-white text-slate-900 font-black text-lg transition shadow-xs cursor-pointer border border-slate-200"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleConfirmPin}
                disabled={enteredPin.length !== 6}
                className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs transition flex items-center justify-center cursor-pointer"
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
