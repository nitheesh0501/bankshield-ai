'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  Download,
  Search,
  Filter,
  Ban,
  Check,
  Send,
  LogIn,
  FileText,
  Printer
} from 'lucide-react';

import { PageStage, PortalSubTab, UserRole, AuditItem, GuardianInfo } from '../types';
import { evaluateDuressRisk, computeDynamicCap } from '../backend/riskEngine';
import { INITIAL_AUDIT_LOGS, appendAuditRecord, exportAuditCSV, exportAuditODS, downloadAuditPDF } from '../backend/auditService';

import { Navigation } from '../frontend/Navigation';
import { LandingPage } from '../frontend/LandingPage';
import { LoginPage } from '../frontend/LoginPage';
import { SeniorPhone } from '../frontend/SeniorPhone';
import { GuardianDeck } from '../frontend/GuardianDeck';
import { SeniorPortalView } from '../frontend/SeniorPortalView';

export default function BankShieldApp() {
  // Navigation State
  const [pageStage, setPageStage] = useState<PageStage>('landing');
  const [portalSubTab, setPortalSubTab] = useState<PortalSubTab>('pay');
  const [userRole, setUserRole] = useState<UserRole>('senior');

  // Account Balance State
  const [balance, setBalance] = useState<number>(142800);

  // Guardian Info State (Single Source of Truth)
  const [guardianInfo, setGuardianInfo] = useState<GuardianInfo>({
    name: 'Ananya Kumar',
    relation: 'Daughter',
    phone: '+91 98765 43210',
    webhookUrl: 'https://n8n.bankshield.internal/webhook/escrow-alert',
  });

  // Login Form State
  const [loginId, setLoginId] = useState('+91 98401 92418');
  const [loginPin, setLoginPin] = useState('924180');

  // Senior Phone Input State
  const [recipientName, setRecipientName] = useState('DCP Cyber Cell Official Escrow');
  const [upiId, setUpiId] = useState('dcp.cyber.cell@official-escrow');
  const [amount, setAmount] = useState('85000');
  const [category, setCategory] = useState('Law Enforcement / Police Clearance');
  const [isActiveCall, setIsActiveCall] = useState(true);

  // Active Incident & Escrow State
  const [activeEscrow, setActiveEscrow] = useState<AuditItem | null>({
    id: 'TXN-7094',
    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    payee: 'DCP Cyber Cell Official Escrow',
    vpa: 'dcp.cyber.cell@official-escrow',
    amount: 85000,
    riskScore: 100,
    status: 'Escrow Hold',
    notes: '71x Baseline Surge, Authority Coercion Keyword, Active Call Telemetry',
  });

  const [countdown, setCountdown] = useState<number>(847); // 14:07

  // Ledger State
  const [auditLogs, setAuditLogs] = useState<AuditItem[]>(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Dynamic multiplier calculation against ₹1,200 baseline
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

  // Authorize Transfer Handled via backend riskEngine & Dynamic Cap Engine
  const handleAuthorizeTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    const numAmount = parseFloat(amount);
    if (numAmount > balance) {
      alert(`Insufficient account balance (Available: ₹${balance.toLocaleString('en-IN')}).`);
      return;
    }

    const evalResult = evaluateDuressRisk({
      amount: numAmount,
      category,
      isCallActive: isActiveCall,
      payeeVpa: upiId,
      historicalAvg: 1200,
    });

    const capInfo = computeDynamicCap(balance, upiId, category, isActiveCall);
    const requiresAssistedEscrow = numAmount > capInfo.effectiveCap || isActiveCall || evalResult.tier === 'High';

    const newTxnId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAuditItem: AuditItem = {
      id: newTxnId,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      payee: recipientName,
      vpa: upiId,
      amount: numAmount,
      riskScore: evalResult.score,
      status: requiresAssistedEscrow ? 'Escrow Hold' : 'Completed',
      notes: requiresAssistedEscrow
        ? `Exceeded Safe Cap ₹${capInfo.effectiveCap.toLocaleString('en-IN')}, ${evalResult.deviationSurge}, ${capInfo.reason}`
        : 'Safe Transfer Within Dynamic Limit',
    };

    setAuditLogs(prev => appendAuditRecord(prev, newAuditItem));

    if (requiresAssistedEscrow) {
      setActiveEscrow(newAuditItem);
      setCountdown(847);
      triggerSpeech();
    } else {
      // Safe transfer -> deduct balance immediately
      setBalance(prev => Math.max(0, prev - numAmount));
      setActiveEscrow(null);
    }
  };

  // Guardian Freeze & Abort Action
  const handleFreezeAndAbort = () => {
    stopSpeech();
    if (activeEscrow) {
      const updatedId = activeEscrow.id;
      const abortedItem: AuditItem = {
        ...activeEscrow,
        status: 'Aborted & Frozen',
        notes: `Aborted by Guardian ${guardianInfo.name}. Funds secured in savings A/C.`,
      };

      setAuditLogs(prev =>
        prev.map(item => (item.id === updatedId ? abortedItem : item))
      );
      setActiveEscrow(abortedItem);

      // Clear after giving real-time feedback
      setTimeout(() => {
        setActiveEscrow(null);
      }, 5000);
    }
  };

  // Guardian Override Action (Authorized -> Balance deducted upon clearance)
  const handleGuardianOverride = () => {
    stopSpeech();
    if (activeEscrow) {
      const updatedId = activeEscrow.id;
      const escrowAmt = activeEscrow.amount;
      if (balance < escrowAmt) {
        alert(`Insufficient account balance (Available: ₹${balance.toLocaleString('en-IN')}) to settle this escrow transfer.`);
        return;
      }

      const authorizedItem: AuditItem = {
        ...activeEscrow,
        status: 'Guardian Authorized',
        notes: `Manually authorized by Guardian ${guardianInfo.name} via MPIN 432100.`,
      };

      setBalance(prev => Math.max(0, prev - escrowAmt));
      setAuditLogs(prev =>
        prev.map(item => (item.id === updatedId ? authorizedItem : item))
      );
      setActiveEscrow(authorizedItem);

      // Clear after showing real-time feedback
      setTimeout(() => {
        setActiveEscrow(null);
      }, 4000);
    }
  };

  // Simulate Incident Trigger
  const handleSimulateIncident = () => {
    setRecipientName('DCP Cyber Cell Official Escrow');
    setUpiId('dcp.cyber.cell@official-escrow');
    setAmount('85000');
    setCategory('Law Enforcement / Police Clearance');
    setIsActiveCall(true);

    const newAuditItem: AuditItem = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      payee: 'DCP Cyber Cell Official Escrow',
      vpa: 'dcp.cyber.cell@official-escrow',
      amount: 85000,
      riskScore: 100,
      status: 'Escrow Hold',
      notes: '71x Baseline Surge, Authority Coercion Keyword, Active Call Telemetry',
    };

    setAuditLogs(prev => appendAuditRecord(prev, newAuditItem));
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
        log.id.toLowerCase().includes(searchTerm.toLowerCase());
      
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
      {/* Top Navigation Component */}
      <Navigation
        pageStage={pageStage}
        setPageStage={setPageStage}
        portalSubTab={portalSubTab}
        setPortalSubTab={setPortalSubTab}
        userRole={userRole}
        activeEscrow={activeEscrow}
        countdown={countdown}
        formatCountdown={formatCountdown}
        handleFreezeAndAbort={handleFreezeAndAbort}
        guardianInfo={guardianInfo}
      />

      {/* STAGE 1: PUBLIC LANDING PAGE */}
      {pageStage === 'landing' && (
        <LandingPage
          onAccessPortal={() => {
            setPageStage('portal');
            setPortalSubTab('pay');
          }}
          onLaunchSeniorPay={() => {
            setPageStage('portal');
            setPortalSubTab('pay');
            setUserRole('senior');
          }}
          onLaunchGuardianDeck={() => {
            setPageStage('portal');
            setPortalSubTab('guardian');
            setUserRole('guardian');
          }}
        />
      )}

      {/* STAGE 2: ENTERPRISE SPLIT-SCREEN AUTHENTICATION PAGE */}
      {pageStage === 'login' && (
        <LoginPage
          userRole={userRole}
          setUserRole={setUserRole}
          loginId={loginId}
          setLoginId={setLoginId}
          loginPin={loginPin}
          setLoginPin={setLoginPin}
          setPortalSubTab={setPortalSubTab}
          onAuthenticate={() => setPageStage('portal')}
          onReturnHome={() => setPageStage('landing')}
          guardianInfo={guardianInfo}
          setGuardianInfo={setGuardianInfo}
        />
      )}

      {/* STAGE 3: AUTHENTICATED PORTAL */}
      {pageStage === 'portal' && (
        <div>
          {/* SUB-TAB 1: DUAL SCREEN MODE */}
          {portalSubTab === 'dual' && (
            <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <SeniorPhone
                  recipientName={recipientName}
                  setRecipientName={setRecipientName}
                  upiId={upiId}
                  setUpiId={setUpiId}
                  amount={amount}
                  setAmount={setAmount}
                  category={category}
                  setCategory={setCategory}
                  isActiveCall={isActiveCall}
                  setIsActiveCall={setIsActiveCall}
                  currentMultiplier={currentMultiplier}
                  handleAuthorizeTransfer={handleAuthorizeTransfer}
                  balance={balance}
                  activeEscrow={activeEscrow}
                  guardianInfo={guardianInfo}
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
                  guardianInfo={guardianInfo}
                />
              </div>
            </main>
          )}

          {/* SUB-TAB 2: SENIOR /pay PORTAL VIEW */}
          {portalSubTab === 'pay' && (
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
              <SeniorPortalView
                recipientName={recipientName}
                setRecipientName={setRecipientName}
                upiId={upiId}
                setUpiId={setUpiId}
                amount={amount}
                setAmount={setAmount}
                category={category}
                setCategory={setCategory}
                isActiveCall={isActiveCall}
                setIsActiveCall={setIsActiveCall}
                currentMultiplier={currentMultiplier}
                handleAuthorizeTransfer={handleAuthorizeTransfer}
                guardianInfo={guardianInfo}
                balance={balance}
              />
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
                guardianInfo={guardianInfo}
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

                  {/* Multi-Format Export Controls */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button
                      onClick={() => exportAuditCSV(auditLogs)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>CSV</span>
                    </button>

                    <button
                      onClick={() => exportAuditODS(auditLogs)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-200" />
                      <span>ODS</span>
                    </button>

                    <button
                      onClick={() => downloadAuditPDF(auditLogs)}
                      className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <span>📄</span>
                      <span>Download Audit (PDF)</span>
                    </button>
                  </div>
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
                          <td className="py-4 px-4 font-mono font-bold text-slate-900">{log.id}</td>
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
