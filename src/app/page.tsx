'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Radio,
  LogIn,
  Send,
  Download,
  Search,
  Filter,
  Ban,
  Check,
  AlertCircle,
  PhoneCall,
  Lock
} from 'lucide-react';

import { PageStage, PortalSubTab, UserRole, AuditItem } from '../types/bankshield';
import { evaluateDuressRisk } from '../lib/riskEngine';
import { INITIAL_AUDIT_LOGS, exportAuditLogsCSV } from '../lib/auditLedger';

import { HeaderNav } from '../components/HeaderNav';
import { SeniorPayPhone } from '../components/SeniorPayPhone';
import { GuardianDeck } from '../components/GuardianDeck';

export default function BankShieldApp() {
  // 3-Stage Navigation State
  const [pageStage, setPageStage] = useState<PageStage>('landing');
  const [portalSubTab, setPortalSubTab] = useState<PortalSubTab>('dual');
  const [userRole, setUserRole] = useState<UserRole>('ramesh');

  // Authentication Form State
  const [loginId, setLoginId] = useState('ACC-9241805');
  const [loginPin, setLoginPin] = useState('••••••');

  // Transfer Form & Telemetry State
  const [recipientName, setRecipientName] = useState('DCP Cyber Cell Official Escrow');
  const [upiId, setUpiId] = useState('dcp.cyber.cell@official-escrow');
  const [amount, setAmount] = useState('85000');
  const [reason, setReason] = useState('Urgent Utility Disconnection');
  const [isActiveCall, setIsActiveCall] = useState(true);
  const [isNewBeneficiary, setIsNewBeneficiary] = useState(true);

  // Active Incident & Escrow State
  const [activeEscrow, setActiveEscrow] = useState<AuditItem | null>({
    txnId: 'TXN-7094',
    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    payee: 'DCP Cyber Cell Official Escrow',
    vpa: 'dcp.cyber.cell@official-escrow',
    amount: 85000,
    status: 'Escrow Hold',
    riskScore: 100,
    hasActiveCall: true,
    notes: '71x Baseline Surge, Authority Coercion Keyword, Active Call Telemetry',
  });

  const [countdown, setCountdown] = useState<number>(847); // 14:07

  // Audit Logs Ledger
  const [auditLogs, setAuditLogs] = useState<AuditItem[]>(INITIAL_AUDIT_LOGS);

  // Search & Filter State for Audit Log
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Dynamic multiplier calculation
  const currentMultiplier = amount && parseFloat(amount) > 0 ? (parseFloat(amount) / 1200).toFixed(1) : '70.8';

  // Live Countdown Effect
  useEffect(() => {
    if (!activeEscrow || activeEscrow.status !== 'Escrow Hold') return;
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeEscrow]);

  // Web Speech API Voice Warning
  const triggerSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const warningText =
        'Warning: Official police, court, or utility authorities will never demand money transfers over the phone to avoid arrest or disconnection. Disconnect the call now.';
      const utterance = new SpeechSynthesisUtterance(warningText);
      utterance.rate = 0.92;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis failed', e);
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Quick Vector Presets
  const applyVectorPreset = (vector: 'arrest' | 'utility' | 'kyc' | 'icu' | 'remote' | 'safe') => {
    stopSpeech();
    if (vector === 'arrest') {
      setRecipientName('DCP Cyber Cell Official Escrow');
      setUpiId('dcp.cyber.cell@official-escrow');
      setAmount('85000');
      setReason('Digital Arrest Warrant');
      setIsActiveCall(true);
      setIsNewBeneficiary(true);
    } else if (vector === 'utility') {
      setRecipientName('Rajesh Electricals');
      setUpiId('pay-rajesh@upi');
      setAmount('48500');
      setReason('Urgent Utility Disconnection');
      setIsActiveCall(true);
      setIsNewBeneficiary(true);
    } else if (vector === 'kyc') {
      setRecipientName('HDFC Re-verification Cell');
      setUpiId('hdfc.kyc.update@upi');
      setAmount('35000');
      setReason('Bank Account Suspension Threat');
      setIsActiveCall(true);
      setIsNewBeneficiary(true);
    } else if (vector === 'icu') {
      setRecipientName('City Hospital Emergency ICU');
      setUpiId('icu.emergency.deposit@upi');
      setAmount('60000');
      setReason('Urgent Medical Deposit');
      setIsActiveCall(true);
      setIsNewBeneficiary(true);
    } else if (vector === 'remote') {
      setRecipientName('AnyDesk QuickSupport Tech');
      setUpiId('quicksupport.tech@upi');
      setAmount('25000');
      setReason('Remote Device Support');
      setIsActiveCall(true);
      setIsNewBeneficiary(true);
    } else if (vector === 'safe') {
      setRecipientName('Nilgiris Groceries');
      setUpiId('nilgiris.groceries@upi');
      setAmount('350');
      setReason('Essentials');
      setIsActiveCall(false);
      setIsNewBeneficiary(false);
    }
  };

  // Trigger Transfer & Escrow Escalation
  const handleAuthorizeTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    const numAmount = parseFloat(amount);
    const riskEval = evaluateDuressRisk(numAmount, recipientName, upiId, reason, isActiveCall, isNewBeneficiary);

    const newTxnId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const isHighRisk = riskEval.tier === 'critical';

    const newAuditItem: AuditItem = {
      txnId: newTxnId,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      payee: recipientName,
      vpa: upiId,
      amount: numAmount,
      status: isHighRisk ? 'Escrow Hold' : 'Completed',
      riskScore: riskEval.riskScore,
      hasActiveCall: isActiveCall,
      notes: isHighRisk ? `${riskEval.multiplier}x Surge, Coercion Keywords, Active Call Telemetry` : 'Low Risk Frictionless Transfer',
    };

    setAuditLogs(prev => [newAuditItem, ...prev]);

    if (isHighRisk) {
      setActiveEscrow(newAuditItem);
      setCountdown(847); // 14:07
      triggerSpeech();
    } else {
      setActiveEscrow(null);
    }
  };

  // Guardian Freeze & Abort Action
  const handleFreezeAndAbort = () => {
    stopSpeech();
    if (activeEscrow) {
      const updatedTxnId = activeEscrow.txnId;
      setAuditLogs(prev =>
        prev.map(item =>
          item.txnId === updatedTxnId
            ? { ...item, status: 'Aborted & Frozen', notes: 'Aborted by Guardian Ananya. Funds secured in savings A/C.' }
            : item
        )
      );
      setActiveEscrow(null);
    }
  };

  // Guardian Override Action
  const handleGuardianOverride = () => {
    stopSpeech();
    if (activeEscrow) {
      const updatedTxnId = activeEscrow.txnId;
      setAuditLogs(prev =>
        prev.map(item =>
          item.txnId === updatedTxnId
            ? { ...item, status: 'Guardian Cleared', notes: 'Manually authorized by Guardian Ananya.' }
            : item
        )
      );
      setActiveEscrow(null);
    }
  };

  // Simulate Incident Trigger
  const handleSimulateIncident = () => {
    applyVectorPreset('arrest');
    const newAuditItem: AuditItem = {
      txnId: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      payee: 'DCP Cyber Cell Official Escrow',
      vpa: 'dcp.cyber.cell@official-escrow',
      amount: 85000,
      status: 'Escrow Hold',
      riskScore: 100,
      hasActiveCall: true,
      notes: '71x Baseline Surge, Authority Coercion Keyword, Active Call Telemetry',
    };

    setAuditLogs(prev => [newAuditItem, ...prev]);
    setActiveEscrow(newAuditItem);
    setCountdown(847);
    triggerSpeech();
  };

  // Filtered Audit Logs
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesSearch =
        log.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.vpa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.txnId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [auditLogs, searchTerm, statusFilter]);

  const formatCountdown = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Global Header Navigation Component */}
      <HeaderNav
        pageStage={pageStage}
        setPageStage={setPageStage}
        portalSubTab={portalSubTab}
        setPortalSubTab={setPortalSubTab}
        userRole={userRole}
      />

      {/* STAGE 1: PUBLIC LANDING PAGE */}
      {pageStage === 'landing' && (
        <div className="min-h-screen flex flex-col justify-between">
          <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-16">
            <section className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>COGNITIVE CIRCUIT-BREAKER FOR DIGITAL PAYMENTS</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Stop the Scam Before <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  the Money Moves.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                BankShield AI introduces real-time cognitive circuit-breakers into digital payments, shielding seniors and vulnerable users from digital arrest, fake police threats, and coerced transfers.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setPageStage('login')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Access Protected Banking Portal</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </section>

            <section id="architecture" className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-md border border-rose-200">
                  THE SYSTEM GAP
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Legacy Authentication (OTP / PIN)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Traditional 2FA verifies <strong>Who is paying?</strong> but completely ignores psychological coercion. Under digital arrest or fake electricity threats, victims willingly enter their correct PIN.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
                  Result: ₹1,000+ Cr lost annually to coercive financial scams.
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-emerald-300 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                  THE BANKSHIELD INNOVATION
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Contextual Duress Intelligence</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Evaluates <strong>Why are they paying?</strong> in &lt;50ms. Detects active phone calls, baseline surges (&gt;5x), and authority coercion keywords before triggering 15-minute reversible escrow holds.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-900">
                  Result: 100% loss prevention with zero database complexity.
                </div>
              </div>
            </section>
          </main>

          <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 space-y-2">
            <p className="font-bold text-slate-700">BankShield AI Enterprise Security System • Regulatory Compliance Standards</p>
            <p>24x7 Senior Emergency Helpline: 1800-BANK-SHIELD | Approved for Next-Gen Financial Institutions</p>
          </footer>
        </div>
      )}

      {/* STAGE 2: LOGIN PAGE */}
      {pageStage === 'login' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-md w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">BankShield NetBanking Portal</h2>
              <p className="text-xs text-slate-500">Secure Customer & Guardian Authentication</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Hackathon Presentation Quick Login:
              </span>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setUserRole('ramesh');
                    setLoginId('ACC-9241805');
                  }}
                  className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                    userRole === 'ramesh'
                      ? 'bg-white border-emerald-500 text-slate-900 font-bold shadow-xs'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <div>
                    <span className="block font-extrabold">Option A: Ramesh Kumar (Senior Citizen)</span>
                    <span className="text-[11px] text-slate-500">Age: 68 • A/C *9241 • Customer</span>
                  </div>
                  {userRole === 'ramesh' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserRole('ananya');
                    setLoginId('GUARDIAN-ANANYA');
                  }}
                  className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                    userRole === 'ananya'
                      ? 'bg-white border-rose-500 text-slate-900 font-bold shadow-xs'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <div>
                    <span className="block font-extrabold">Option B: Ananya Kumar (Guardian)</span>
                    <span className="text-[11px] text-slate-500">Designated Guardian • Command Deck</span>
                  </div>
                  {userRole === 'ananya' && <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />}
                </button>
              </div>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                setPageStage('portal');
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Customer ID / Phone Number</label>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={e => setLoginId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">6-Digit MPIN / Password</label>
                <input
                  type="password"
                  required
                  value={loginPin}
                  onChange={e => setLoginPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Authenticate & Enter Protected Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <button
              onClick={() => setPageStage('landing')}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              ← Return to Public Landing Page
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: AUTHENTICATED PORTAL */}
      {pageStage === 'portal' && (
        <div>
          {/* Incident Alert Banner */}
          {activeEscrow && activeEscrow.status === 'Escrow Hold' && (
            <div className="bg-rose-600 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs sm:text-sm animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-2 font-bold max-w-4xl truncate">
                <Radio className="w-4 h-4 animate-ping text-white shrink-0" />
                <span className="truncate">
                  🚨 REAL-TIME DURESS INCIDENT BROADCAST: Ramesh Kumar (Father) transfer of ₹{activeEscrow.amount.toLocaleString('en-IN')} to {activeEscrow.payee} held in escrow ({formatCountdown(countdown)} remaining).
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPortalSubTab('guardian')}
                  className="px-3 py-1 rounded bg-white text-rose-700 font-extrabold hover:bg-rose-50 transition text-xs shadow-xs cursor-pointer"
                >
                  Inspect in Guardian Deck
                </button>
                <button
                  onClick={handleFreezeAndAbort}
                  className="px-3 py-1 rounded bg-rose-950 text-white font-extrabold hover:bg-rose-900 transition text-xs border border-rose-400 cursor-pointer"
                >
                  Instant Freeze & Abort
                </button>
              </div>
            </div>
          )}

          {/* SUB-TAB 1: DUAL SCREEN MODE */}
          {portalSubTab === 'dual' && (
            <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <SeniorPayPhone
                  recipientName={recipientName}
                  setRecipientName={setRecipientName}
                  upiId={upiId}
                  setUpiId={setUpiId}
                  amount={amount}
                  setAmount={setAmount}
                  isActiveCall={isActiveCall}
                  setIsActiveCall={setIsActiveCall}
                  currentMultiplier={currentMultiplier}
                  applyVectorPreset={applyVectorPreset}
                  handleAuthorizeTransfer={handleAuthorizeTransfer}
                />

                <GuardianDeck
                  activeEscrow={activeEscrow}
                  countdown={countdown}
                  formatCountdown={formatCountdown}
                  currentMultiplier={currentMultiplier}
                  triggerSpeech={triggerSpeech}
                  handleGuardianOverride={handleGuardianOverride}
                  handleFreezeAndAbort={handleFreezeAndAbort}
                  handleSimulateIncident={handleSimulateIncident}
                />
              </div>
            </main>
          )}

          {/* SUB-TAB 2: SENIOR /pay */}
          {portalSubTab === 'pay' && (
            <main className="max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Senior Customer Portal
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Ramesh Kumar (Father)</h2>
                    <p className="text-xs text-slate-500 font-mono">Savings Account *9241 • Bal: ₹1,42,800</p>
                  </div>
                </div>

                <form onSubmit={handleAuthorizeTransfer} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">Recipient Name / VPA</label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={e => setRecipientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">Amount (₹ INR)</label>
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-lg focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>Verify & Execute Payment</span>
                  </button>
                </form>
              </div>
            </main>
          )}

          {/* SUB-TAB 3: GUARDIAN /deck */}
          {portalSubTab === 'guardian' && (
            <main className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
              <GuardianDeck
                activeEscrow={activeEscrow}
                countdown={countdown}
                formatCountdown={formatCountdown}
                currentMultiplier={currentMultiplier}
                triggerSpeech={triggerSpeech}
                handleGuardianOverride={handleGuardianOverride}
                handleFreezeAndAbort={handleFreezeAndAbort}
                handleSimulateIncident={handleSimulateIncident}
              />
            </main>
          )}

          {/* SUB-TAB 4: AUDIT HISTORY */}
          {portalSubTab === 'audit' && (
            <main className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-md border border-cyan-200">
                      DUAL-PERSPECTIVE AUDIT LEDGER
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
                      Transaction & Duress Audit History
                    </h1>
                    <p className="text-sm text-slate-600 mt-1">
                      Complete immutable log of in-flight interventions, escrow holds, and guardian overrides.
                    </p>
                  </div>

                  <button
                    onClick={() => exportAuditLogsCSV(auditLogs)}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Export Audit Log (CSV)</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by Payee, VPA, or TXN ID..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-700">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Escrow Hold">Escrow Hold</option>
                      <option value="Aborted & Frozen">Aborted & Frozen</option>
                      <option value="Advised & Paid">Advised & Paid</option>
                      <option value="Completed">Completed</option>
                      <option value="Guardian Cleared">Guardian Cleared</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-bold tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">TXN ID</th>
                        <th className="py-3.5 px-4">Timestamp</th>
                        <th className="py-3.5 px-4">Payee / VPA</th>
                        <th className="py-3.5 px-4">Amount</th>
                        <th className="py-3.5 px-4">Duress Risk</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Audit Telemetry Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white font-medium">
                      {filteredAuditLogs.map((log, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="py-4 px-4 font-mono font-bold text-slate-900">{log.txnId}</td>
                          <td className="py-4 px-4 text-slate-500">{log.timestamp}</td>
                          <td className="py-4 px-4">
                            <span className="block font-bold text-slate-900">{log.payee}</span>
                            <span className="block text-[10px] text-slate-400 font-mono">{log.vpa}</span>
                          </td>
                          <td className="py-4 px-4 font-extrabold text-slate-900">
                            ₹{log.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                              log.riskScore >= 75
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : log.riskScore >= 45
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}>
                              {log.riskScore} / 100
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
                              log.status === 'Escrow Hold'
                                ? 'bg-rose-600 text-white animate-pulse'
                                : log.status === 'Aborted & Frozen'
                                ? 'bg-rose-100 text-rose-700 border border-rose-300'
                                : log.status === 'Guardian Cleared' || log.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}>
                              {log.status === 'Escrow Hold' && <Clock className="w-3 h-3 animate-spin" />}
                              {log.status === 'Aborted & Frozen' && <Ban className="w-3 h-3 text-rose-600" />}
                              {(log.status === 'Completed' || log.status === 'Guardian Cleared') && <Check className="w-3 h-3 text-emerald-600" />}
                              {log.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-600 text-[11px] max-w-xs truncate">{log.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          )}
        </div>
      )}
    </div>
  );
}
