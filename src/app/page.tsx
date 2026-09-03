'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Volume2,
  Lock,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  PhoneCall,
  X,
  Sparkles,
  Send,
  LogOut,
  AlertCircle,
  Activity,
  Building2,
  ChevronRight,
  ChevronDown,
  Layers,
  Webhook,
  UserPlus,
  Download,
  Search,
  Filter,
  Smartphone,
  Monitor,
  Radio,
  Bell,
  Play,
  Ban,
  Check,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Key,
  LogIn,
  CheckSquare,
  BellRing
} from 'lucide-react';

// Type definitions
type PageStage = 'landing' | 'login' | 'portal';
type PortalSubTab = 'dual' | 'pay' | 'guardian' | 'audit';
type UserRole = 'ramesh' | 'ananya';

export interface AuditItem {
  txnId: string;
  timestamp: string;
  payee: string;
  vpa: string;
  amount: number;
  status: 'Escrow Hold' | 'Aborted & Frozen' | 'Advised & Paid' | 'Completed' | 'Guardian Cleared';
  riskScore: number;
  hasActiveCall: boolean;
  notes: string;
}

export default function BankShieldApp() {
  // 3-Stage Navigation State
  const [pageStage, setPageStage] = useState<PageStage>('landing');
  const [portalSubTab, setPortalSubTab] = useState<PortalSubTab>('dual');
  const [userRole, setUserRole] = useState<UserRole>('ramesh');

  // Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);

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
  const [auditLogs, setAuditLogs] = useState<AuditItem[]>([
    {
      txnId: 'TXN-7094',
      timestamp: '10:42 AM',
      payee: 'DCP Cyber Cell Official Escrow',
      vpa: 'dcp.cyber.cell@official-escrow',
      amount: 85000,
      status: 'Escrow Hold',
      riskScore: 100,
      hasActiveCall: true,
      notes: '71x Baseline Surge, Authority Coercion Keyword, Active Call Telemetry',
    },
    {
      txnId: 'TXN-9042',
      timestamp: '09:15 AM',
      payee: 'DCP Cyber Cell Official Escrow',
      vpa: 'dcp.cyber.cell@official-escrow',
      amount: 85000,
      status: 'Aborted & Frozen',
      riskScore: 95,
      hasActiveCall: true,
      notes: 'Guardian Ananya remote freeze triggered via WhatsApp webhook link.',
    },
    {
      txnId: 'TXN-8819',
      timestamp: 'Yesterday',
      payee: 'Unknown Tech Support Pvt Ltd',
      vpa: 'quick.support@upi',
      amount: 9200,
      status: 'Advised & Paid',
      riskScore: 68,
      hasActiveCall: false,
      notes: 'Amber advisory acknowledged by user after voice warning.',
    },
    {
      txnId: 'TXN-8740',
      timestamp: '02 Sep 2026',
      payee: 'Fake Mumbai Police Customs Cell',
      vpa: 'mumbai.customs.pay@upi',
      amount: 120000,
      status: 'Aborted & Frozen',
      riskScore: 98,
      hasActiveCall: true,
      notes: 'Digital arrest pattern intercepted. Money returned to savings account.',
    },
    {
      txnId: 'TXN-8501',
      timestamp: '01 Sep 2026',
      payee: 'Apollo Pharmacy & Clinic',
      vpa: 'apollo.pharmacy@upi',
      amount: 2450,
      status: 'Completed',
      riskScore: 20,
      hasActiveCall: false,
      notes: 'Normal medical transaction verified.',
    },
    {
      txnId: 'TXN-8422',
      timestamp: '30 Aug 2026',
      payee: 'Nilgiris Daily Groceries',
      vpa: 'nilgiris.groceries@upi',
      amount: 350,
      status: 'Completed',
      riskScore: 8,
      hasActiveCall: false,
      notes: 'Routine daily grocery payment.',
    },
    {
      txnId: 'TXN-8290',
      timestamp: '28 Aug 2026',
      payee: 'Landlord Property Maintenance',
      vpa: 'landlord.rent@upi',
      amount: 18000,
      status: 'Guardian Cleared',
      riskScore: 78,
      hasActiveCall: false,
      notes: 'Monthly rent transfer verified and unlocked by Ananya.',
    },
  ]);

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

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis failed', e);
      setIsSpeaking(false);
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
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
    const newTxnId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const isHighRisk = numAmount >= 25000 || isActiveCall || upiId.includes('dcp') || upiId.includes('official') || upiId.includes('rajesh');

    const newAuditItem: AuditItem = {
      txnId: newTxnId,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      payee: recipientName,
      vpa: upiId,
      amount: numAmount,
      status: isHighRisk ? 'Escrow Hold' : 'Completed',
      riskScore: isHighRisk ? (numAmount >= 80000 ? 100 : 82) : 18,
      hasActiveCall: isActiveCall,
      notes: isHighRisk ? `${(numAmount / 1200).toFixed(1)}x Surge, Coercion Keywords, Active Call Telemetry` : 'Low Risk Frictionless Transfer',
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

  // Export CSV Function
  const exportCSV = () => {
    const headers = ['TXN ID', 'Timestamp', 'Payee Name', 'UPI ID', 'Amount (INR)', 'Status', 'Risk Score', 'Active Call', 'Notes'];
    const rows = auditLogs.map(log => [
      log.txnId,
      log.timestamp,
      `"${log.payee}"`,
      log.vpa,
      log.amount,
      log.status,
      log.riskScore,
      log.hasActiveCall ? 'Yes' : 'No',
      `"${log.notes}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bankshield_duress_audit_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      {/* ========================================================================= */}
      {/* STAGE 1: PUBLIC MARKETING LANDING PAGE (`/` or pageStage === 'landing')   */}
      {/* ========================================================================= */}
      {pageStage === 'landing' && (
        <div className="min-h-screen flex flex-col justify-between">
          {/* Public Header */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    BankShield<span className="text-emerald-600">.AI</span>
                  </span>
                  <span className="hidden sm:inline-block text-xs text-slate-500 ml-2 font-medium">
                    Next-Gen Contextual Banking Security
                  </span>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
                <a href="#architecture" className="hover:text-slate-900 transition">Security Architecture</a>
                <a href="#how-it-works" className="hover:text-slate-900 transition">How It Works</a>
                <a href="#about" className="hover:text-slate-900 transition">Regulatory Compliance</a>
              </nav>

              <button
                onClick={() => setPageStage('login')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-emerald-400" />
                <span>Log In to NetBanking</span>
              </button>
            </div>
          </header>

          {/* Hero Section */}
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

            {/* Problem vs. Solution Section */}
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

          {/* Public Footer */}
          <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 space-y-2">
            <p className="font-bold text-slate-700">BankShield AI Enterprise Security System • Regulatory Compliance Standards</p>
            <p>24x7 Senior Emergency Helpline: 1800-BANK-SHIELD | Approved for Next-Gen Financial Institutions</p>
          </footer>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: CUSTOMER AUTHENTICATION PAGE (`/login` or pageStage === 'login') */}
      {/* ========================================================================= */}
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

            {/* Quick Demo Auto-Fill Selector */}
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

      {/* ========================================================================= */}
      {/* STAGE 3: AUTHENTICATED BANKING PORTAL (`/portal` or pageStage === 'portal')*/}
      {/* ========================================================================= */}
      {pageStage === 'portal' && (
        <div>
          {/* Clean Authenticated Header (Strict 4 Core Tabs Only) */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
              {/* Brand Logo & Active Badge */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-xs">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                      BankShield<span className="text-emerald-600">.AI</span>
                    </span>
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Senior Safety Escrow
                    </span>
                  </div>
                </div>
              </div>

              {/* Internal Sub-Navigation Bar (ONLY 4 Core Tabs) */}
              <nav className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl">
                <button
                  onClick={() => setPortalSubTab('dual')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    portalSubTab === 'dual' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Dual Screen</span>
                </button>

                <button
                  onClick={() => setPortalSubTab('pay')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    portalSubTab === 'pay' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Senior /pay</span>
                </button>

                <button
                  onClick={() => setPortalSubTab('guardian')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    portalSubTab === 'guardian' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span className="hidden sm:inline">Guardian /deck</span>
                </button>

                <button
                  onClick={() => setPortalSubTab('audit')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    portalSubTab === 'audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="hidden sm:inline">Audit History</span>
                </button>
              </nav>

              {/* User Profile Badge & Logout Control */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 pl-2 text-xs font-semibold text-slate-700">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                    {userRole === 'ramesh' ? 'RK' : 'AK'}
                  </div>
                  <span className="hidden sm:inline font-bold">
                    {userRole === 'ramesh' ? 'Ramesh (Customer)' : 'Ananya (Guardian)'}
                  </span>
                  <button
                    onClick={() => setPageStage('landing')}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Persistent Coercion Incident Alert Banner */}
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
                  className="px-3 py-1 rounded bg-white text-rose-700 font-extrabold hover:bg-rose-50 transition text-xs shadow-xs"
                >
                  Inspect in Guardian Deck
                </button>
                <button
                  onClick={handleFreezeAndAbort}
                  className="px-3 py-1 rounded bg-rose-950 text-white font-extrabold hover:bg-rose-900 transition text-xs border border-rose-400"
                >
                  Instant Freeze & Abort
                </button>
              </div>
            </div>
          )}

          {/* PORTAL SUB-TAB 1: DUAL SCREEN MODE */}
          {portalSubTab === 'dual' && (
            <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* LEFT COLUMN: DEVICE 1 — RAMESH'S PHONE */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>[ DEVICE 1 ] Ramesh's Senior UPI Phone Client (/pay)</span>
                    </h3>
                    <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      LIVE SENSOR
                    </span>
                  </div>

                  <div className="bg-zinc-950 text-zinc-100 border-4 border-zinc-800 rounded-[36px] p-6 shadow-2xl space-y-5">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
                          RK
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Ramesh Kumar (Age: 68)</h4>
                          <p className="text-[11px] text-zinc-400 font-mono">Savings A/C *9241 • Bal: ₹1,42,800</p>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>

                    <div className="space-y-2">
                      <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        Quick Scam Vector Presets:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        <button
                          onClick={() => applyVectorPreset('utility')}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition"
                        >
                          <span className="block text-[9px] text-amber-400">Utility Fraud</span>
                          <span>₹48,500 Electricals</span>
                        </button>
                        <button
                          onClick={() => applyVectorPreset('arrest')}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition"
                        >
                          <span className="block text-[9px] text-rose-400">Digital Arrest</span>
                          <span>₹85,000 Cyber Cell</span>
                        </button>
                        <button
                          onClick={() => applyVectorPreset('kyc')}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition"
                        >
                          <span className="block text-[9px] text-amber-400">Bank KYC</span>
                          <span>₹35,000 HDFC</span>
                        </button>
                        <button
                          onClick={() => applyVectorPreset('icu')}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition"
                        >
                          <span className="block text-[9px] text-rose-400">Medical ICU</span>
                          <span>₹60,000 Hospital</span>
                        </button>
                        <button
                          onClick={() => applyVectorPreset('remote')}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition"
                        >
                          <span className="block text-[9px] text-amber-400">Remote Scam</span>
                          <span>₹25,000 AnyDesk</span>
                        </button>
                        <button
                          onClick={() => applyVectorPreset('safe')}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition"
                        >
                          <span className="block text-[9px] text-emerald-400">Safe Pay</span>
                          <span>₹350 Groceries</span>
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleAuthorizeTransfer} className="space-y-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-zinc-300">Payee Name / VPA</label>
                        <input
                          type="text"
                          required
                          value={recipientName}
                          onChange={e => setRecipientName(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium text-xs focus:border-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-zinc-300">Amount (₹ INR)</label>
                          <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            {currentMultiplier}x Historical Surge
                          </span>
                        </div>
                        <input
                          type="number"
                          required
                          value={amount}
                          onChange={e => setAmount(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold text-base focus:border-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-lg ${isActiveCall ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'bg-zinc-800 text-zinc-500'}`}>
                            <PhoneCall className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-white">Background Phone Call Sensor</span>
                            <span className="text-[10px] text-zinc-400">
                              {isActiveCall ? 'Active caller claiming official authority (+15 score)' : 'No active phone call detected'}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsActiveCall(!isActiveCall)}
                          className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                            isActiveCall ? 'bg-rose-600' : 'bg-zinc-700'
                          }`}
                        >
                          <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${isActiveCall ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-black text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Authorize Transfer of ₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0'}</span>
                      </button>
                    </form>
                  </div>
                </div>

                {/* RIGHT COLUMN: DEVICE 2 — ANANYA'S GUARDIAN DECK */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Monitor className="w-4 h-4 text-rose-600" />
                      <span>[ DEVICE 2 ] Ananya's Guardian Safety Command Deck (/guardian)</span>
                    </h3>
                    <span className="text-xs font-mono text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                      BROADCAST SYNC
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                          GUARDIAN OVERSIGHT ACTIVE
                        </span>
                        <h4 className="text-lg font-extrabold text-slate-900 mt-1">
                          Senior Safety Escrow Command Deck
                        </h4>
                        <p className="text-xs text-slate-500">Designated Guardian: Ananya Kumar protecting Ramesh Kumar (Father)</p>
                      </div>
                    </div>

                    {activeEscrow && activeEscrow.status === 'Escrow Hold' ? (
                      <div className="bg-rose-50 border-2 border-rose-500 rounded-2xl p-5 space-y-4 shadow-md animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                          <span className="text-xs font-black uppercase text-rose-800 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-rose-600" /> HIGH DURESS SCAM SUSPECTED
                          </span>
                          <div className="bg-rose-600 text-white px-2.5 py-1 rounded-lg text-xs font-mono font-black animate-pulse">
                            AUTO-ABORT IN: {formatCountdown(countdown)}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-xs text-slate-600 font-medium">Attempted Transfer Outflow:</span>
                          <p className="text-2xl font-black text-rose-700">
                            ₹{activeEscrow.amount.toLocaleString('en-IN')}{' '}
                            <span className="text-xs font-bold text-slate-700 font-sans">to {activeEscrow.payee}</span>
                          </p>
                          <p className="text-xs font-mono text-slate-500">VPA: {activeEscrow.vpa}</p>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-rose-200 text-xs">
                          <span className="block font-bold text-rose-900 uppercase tracking-wider text-[10px]">
                            Itemized Risk Factors Detected:
                          </span>
                          <div className="space-y-1 text-rose-950 font-semibold">
                            <p className="flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span>{currentMultiplier}x Baseline Surge: Typical monthly spend is &lt;₹1,200</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                              <PhoneCall className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span>Active Phone Call Sensor: Coercer is actively on the line dictating actions</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                              <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span>Coercion Keywords: 'dcp', 'cyber', 'escrow' pattern detected</span>
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <button
                            onClick={triggerSpeech}
                            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition"
                          >
                            <Volume2 className="w-4 h-4 text-emerald-400" />
                            <span>Remote Voice Intercom Challenge</span>
                          </button>

                          <div className="flex gap-2">
                            <button
                              onClick={handleGuardianOverride}
                              className="flex-1 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
                            >
                              I Verified — Authorize Transfer
                            </button>
                            <button
                              onClick={handleFreezeAndAbort}
                              className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition shadow-md cursor-pointer"
                            >
                              Freeze & Abort Transfer
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                        <h5 className="text-base font-extrabold text-slate-900">All Systems Secure</h5>
                        <p className="text-xs text-slate-600 max-w-sm mx-auto">
                          No active duress incidents requiring intervention. Use the left phone client to trigger real-time escalation.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* PORTAL SUB-TAB 2: SENIOR /pay */}
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

          {/* PORTAL SUB-TAB 3: GUARDIAN /deck */}
          {portalSubTab === 'guardian' && (
            <main className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>GUARDIAN OVERSIGHT ACTIVE</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
                      Senior Safety Escrow Command Deck
                    </h1>
                    <p className="text-sm text-slate-600 mt-1">
                      Designated Guardian: <strong>Ananya Kumar</strong> protecting <strong>Ramesh Kumar (Father)</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition shadow-xs flex items-center gap-2 cursor-pointer"
                    >
                      <BellRing className="w-4 h-4 text-emerald-600" />
                      <span>Enable Browser Push Alerts</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSimulateIncident}
                      className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-white fill-white" />
                      <span>Simulate Incident</span>
                    </button>
                  </div>
                </div>

                {/* Native Browser Push Status Banner */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700">
                      <Webhook className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Native Browser Push & n8n Webhook Active</span>
                      <span className="text-slate-500">Real-time desktop and mobile push alerts synchronized across tabs.</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                    n8n STATUS: 200 OK CONNECTED
                  </span>
                </div>

                {/* Active Interception Card */}
                {activeEscrow && activeEscrow.status === 'Escrow Hold' ? (
                  <div className="bg-rose-50 border-2 border-rose-500 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-200 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-rose-100 border border-rose-300 rounded-2xl text-rose-700 animate-pulse">
                          <ShieldAlert className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300">
                            HIGH DURESS SCAM SUSPECTED
                          </span>
                          <h3 className="text-xl font-black text-slate-900 mt-1">
                            In-Flight Intervention Required
                          </h3>
                        </div>
                      </div>

                      <div className="bg-rose-600 text-white px-4 py-2 rounded-xl font-mono font-black text-sm shadow-md animate-pulse shrink-0">
                        AUTO-ABORT IN: {formatCountdown(countdown)}
                      </div>
                    </div>

                    {/* Outflow Details Box */}
                    <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-2 shadow-xs">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Attempted Outflow Transfer Details:
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-3xl font-black text-rose-600">
                            ₹{activeEscrow.amount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm font-bold text-slate-900 ml-2">to {activeEscrow.payee}</span>
                        </div>
                        <span className="text-xs font-mono bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-slate-700">
                          VPA: {activeEscrow.vpa}
                        </span>
                      </div>
                    </div>

                    {/* Itemized Risk Factors */}
                    <div className="space-y-3 pt-2">
                      <span className="block font-bold text-rose-900 uppercase tracking-wider text-xs">
                        Itemized Risk Factors & Telemetry Signals:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1 font-medium text-rose-950 shadow-xs">
                          <span className="block font-bold text-rose-700">71x Baseline Surge</span>
                          <p className="text-[11px] text-slate-600">Typical monthly spend is &lt;₹1,200.</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1 font-medium text-rose-950 shadow-xs">
                          <span className="block font-bold text-rose-700">Active Phone Call Sensor</span>
                          <p className="text-[11px] text-slate-600">Coercer is actively on the line dictating actions.</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1 font-medium text-rose-950 shadow-xs">
                          <span className="block font-bold text-rose-700">Coercion Keywords</span>
                          <p className="text-[11px] text-slate-600">'dcp', 'cyber', 'escrow' pattern detected.</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-rose-200">
                      <button
                        onClick={triggerSpeech}
                        className="py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4 text-emerald-600" />
                        <span>Remote Voice Intercom Challenge</span>
                      </button>

                      <button
                        onClick={handleGuardianOverride}
                        className="py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>I Verified — Authorize Transfer</span>
                      </button>

                      <button
                        onClick={handleFreezeAndAbort}
                        className="flex-1 py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm transition shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Ban className="w-4 h-4" />
                        <span>Freeze & Abort Transfer</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-1 max-w-md mx-auto">
                      <h4 className="text-xl font-extrabold text-slate-900">All Systems Secure & Protected</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        No active duress incidents requiring intervention. Click below to simulate a digital arrest scam vector.
                      </p>
                    </div>
                    <button
                      onClick={handleSimulateIncident}
                      className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition shadow-md inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-white fill-white" />
                      <span>Simulate High-Risk Incident</span>
                    </button>
                  </div>
                )}
              </div>
            </main>
          )}

          {/* PORTAL SUB-TAB 4: AUDIT HISTORY */}
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
                    onClick={exportCSV}
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
