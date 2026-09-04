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
  ArrowUpRight
} from 'lucide-react';
import { evaluateDuressRisk } from '../backend/riskEngine';
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
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isNewBeneficiary, setIsNewBeneficiary] = useState(true);
  const [emergencyAlertSent, setEmergencyAlertSent] = useState(false);

  // Live evaluated risk score preview
  const numAmount = parseFloat(amount) || 0;
  const evalResult = evaluateDuressRisk({
    amount: numAmount,
    category,
    isCallActive: isActiveCall,
    payeeVpa: upiId,
    historicalAvg: 1200,
  });

  const previewScore = Math.min(100, evalResult.score + (isNewBeneficiary ? 25 : 0));

  const triggerSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const warningText =
        'Police and utility companies never ask for UPI transfers to personal or escrow accounts to avoid arrest. Disconnect the call now.';
      const utterance = new SpeechSynthesisUtterance(warningText);
      utterance.rate = 0.92;
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
      alert(`🚨 Emergency Escalation Triggered! ${guardianInfo.name} has been notified via priority push alert and WhatsApp webhook call link.`);
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
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. HEADER ACCOUNT & SAFETY SUMMARY BANNER */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Side: Account Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Senior Citizen Privilege Savings A/C
              </span>
              <span className="text-xs text-slate-500 font-mono">No: 501009849241</span>
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Account Holder</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Ramesh Kumar (Age: 68)</h1>
            </div>

            <div>
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Available Clear Balance</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
                ₹ 1,42,800.00
              </span>
            </div>
          </div>

          {/* Right Side: Protection Status Badges */}
          <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 lg:max-w-md w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                BankShield Cognitive Safety Active
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-500">v2.4 EDGE</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold pt-1">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Nominated Guardian: <strong>{guardianInfo.name} ({guardianInfo.relation})</strong> • Instant Escalation Ready</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium pt-1 border-t border-slate-200">
              <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>Safety Baseline: <strong>Normal Daily Spend ₹1,200</strong> | Duress Circuit-Breaker Armed</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TWO-COLUMN DASHBOARD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: TRANSFER FORM & COERCION SIMULATOR (60% Width / lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-600" />
              <span>Send Money via Monitored UPI</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Every payment is analyzed sub-50ms against authority coercion vectors before funds move.
            </p>
          </div>

          {/* Pitch Deck Attack Vector Test Presets */}
          <div className="space-y-2.5">
            <span className="block text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>Pitch Deck Attack Vector Test Presets (Slides 02 & 06):</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Preset 1 */}
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
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left text-xs transition cursor-pointer"
              >
                <span className="block font-bold text-slate-900 text-[11px]">Safe Groceries</span>
                <span className="block text-[10px] text-emerald-700 font-bold">₹450 (Normal)</span>
              </button>

              {/* Preset 2 */}
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
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-left text-xs transition cursor-pointer"
              >
                <span className="block font-bold text-slate-900 text-[11px]">Utility Cutoff Scam</span>
                <span className="block text-[10px] text-amber-700 font-bold">₹48,500 (12x surge)</span>
              </button>

              {/* Preset 3 */}
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
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-left text-xs transition cursor-pointer"
              >
                <span className="block font-bold text-slate-900 text-[11px]">Digital Arrest</span>
                <span className="block text-[10px] text-rose-700 font-bold">₹85,000 (Scam)</span>
              </button>

              {/* Preset 4 */}
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
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-left text-xs transition cursor-pointer"
              >
                <span className="block font-bold text-slate-900 text-[11px]">Hospital Emergency</span>
                <span className="block text-[10px] text-cyan-700 font-bold">₹60,000 (Urgent)</span>
              </button>
            </div>
          </div>

          {/* UPI Transfer Form */}
          <form onSubmit={handleAuthorizeTransfer} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Beneficiary Name</label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={e => setRecipientName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Beneficiary UPI VPA</label>
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
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                  Deviation: {currentMultiplier}x above 30-day baseline
                </span>
              </div>
              <input
                type="number"
                required
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-extrabold text-xl focus:border-emerald-600 focus:bg-white focus:outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Payment Reason / Purpose Dropdown</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs focus:border-emerald-600 focus:bg-white focus:outline-none transition"
              >
                <option value="Regular Household Expense">Regular Household Expense</option>
                <option value="Law Enforcement / Police Clearance">Law Enforcement / Police Clearance</option>
                <option value="Utility Disconnection Threat">Utility Disconnection Threat</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Investment / Crypto Deposit">Investment / Crypto Deposit</option>
              </select>
            </div>

            {/* Duress & Threat Simulation Sensors */}
            <div className="space-y-2.5 pt-2">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Telemetry & Threat Simulation Sensors:
              </span>

              {/* Sensor Toggle 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isActiveCall ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Simulate Active Background Call (Duress Sensor)</span>
                    <span className="text-[11px] text-slate-500">Adds authority coercion penalty (+15 Risk Score)</span>
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

              {/* Sensor Toggle 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isNewBeneficiary ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-500'}`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">New Beneficiary Created &lt;10 Mins Ago</span>
                    <span className="text-[11px] text-slate-500">Triggers immediate velocity flag (+25 Risk Score)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewBeneficiary(!isNewBeneficiary)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    isNewBeneficiary ? 'bg-amber-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${isNewBeneficiary ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* Execution Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-200" />
              <span>Verify & Execute Payment (BankShield Monitored)</span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: FRONT-OF-GLASS SAFETY ASSISTANT (40% Width / lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Duress Telemetry Meter */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Live Duress Telemetry Meter</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                12ms Client Edge
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Calculated Risk Score:</span>
                <span className={`text-xl font-black ${
                  previewScore >= 75 ? 'text-rose-600' : previewScore >= 45 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {previewScore} / 100
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div
                  className={`h-full transition-all duration-300 ${
                    previewScore >= 75 ? 'bg-rose-600' : previewScore >= 45 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${previewScore}%` }}
                />
              </div>

              <span className="block text-[11px] text-slate-600 font-semibold pt-1">
                {previewScore >= 75
                  ? '🚨 High Duress Alert: Triggers 15-min Guardian Escrow Hold'
                  : previewScore >= 45
                  ? '⚠️ Amber Caution: Requires voice warning acknowledgement'
                  : '✅ Low Risk: Instant frictionless execution'}
              </span>
            </div>
          </div>

          {/* Vernacular Audio Assistance Card (Web Speech API) */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                <span>Vernacular Voice Guidance Assistant</span>
              </span>
              <span className="text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded">
                Speech API Active
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              "Police and utility companies never ask for UPI transfers to personal or escrow accounts to avoid arrest."
            </p>

            <button
              type="button"
              onClick={triggerSpeech}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
              <span>🔊 Read Aloud in Plain Language</span>
            </button>
          </div>

          {/* Guardian Sync Telemetry */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-3 text-xs">
            <span className="block font-extrabold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-2">
              Guardian Sync Telemetry:
            </span>

            <div className="space-y-2 text-slate-600">
              <div className="flex items-center justify-between">
                <span>Linked Guardian:</span>
                <strong className="text-slate-900">{guardianInfo.name} ({guardianInfo.phone})</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Automated Webhook Channel:</span>
                <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono text-[10px]">n8n active</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Auto-Abort Timeout:</span>
                <strong className="text-slate-900">15 minutes reversible escrow hold</strong>
              </div>
            </div>
          </div>

          {/* Senior Quick Emergency Button */}
          <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Feel pressurized or suspicious?</span>
            </div>

            <button
              type="button"
              onClick={handleEmergencyButton}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-rose-100 border-2 border-rose-600 text-rose-700 font-extrabold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚨 I Feel Pressured / Call My Guardian {guardianInfo.name} Now</span>
            </button>

            {emergencyAlertSent && (
              <span className="block text-[11px] font-bold text-rose-800 text-center">
                ✓ Priority emergency alert dispatched to {guardianInfo.name}!
              </span>
            )}
          </div>

        </div>

      </div>

      {/* 3. RECENT TRUSTED BENEFICIARIES SECTION */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Recent Trusted Beneficiaries</h3>
            <p className="text-xs text-slate-500">1-tap instant payment to pre-verified trusted contacts.</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            3 Contacts Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Apollo Pharmacy & Clinic */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                  Routine Healthcare
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Apollo Pharmacy & Clinic</h4>
                <p className="text-[11px] text-slate-500 font-mono">apollo.pharmacy@upi</p>
                <p className="text-[11px] text-slate-500 mt-1">Last Paid: <strong>Yesterday (₹2,450)</strong></p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => selectScenarioPreset({
                payee: 'Apollo Pharmacy & Clinic',
                vpa: 'apollo.pharmacy@upi',
                amt: 1000,
                cat: 'Medical Emergency',
                call: false,
                newBen: false,
              })}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Quick Pay ₹1,000</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Nilgiris Daily Groceries */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                  Verified Merchant
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Nilgiris Daily Groceries</h4>
                <p className="text-[11px] text-slate-500 font-mono">nilgiris.groceries@upi</p>
                <p className="text-[11px] text-slate-500 mt-1">Last Paid: <strong>30 Aug (₹350)</strong></p>
              </div>
            </div>

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
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Quick Pay ₹450</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: TNEB Electricity Bill */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <ZapOff className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100 border border-cyan-300 px-2 py-0.5 rounded">
                  Utility Recurring
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">TNEB Electricity Bill</h4>
                <p className="text-[11px] text-slate-500 font-mono">tneb.billing@gov</p>
                <p className="text-[11px] text-slate-500 mt-1">Monthly Bill Due: <strong>₹1,850</strong></p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => selectScenarioPreset({
                payee: 'TNEB Electricity Billing',
                vpa: 'tneb.billing@gov',
                amt: 1850,
                cat: 'Regular Household Expense',
                call: false,
                newBen: false,
              })}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Pay Bill ₹1,850</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
