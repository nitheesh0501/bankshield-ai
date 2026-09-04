import React, { useState } from 'react';
import {
  ShieldCheck,
  Shield,
  Lock,
  User,
  Eye,
  EyeOff,
  Fingerprint,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Webhook,
  Key,
  ChevronLeft,
  X,
  UserPlus
} from 'lucide-react';
import { UserRole, PortalSubTab, GuardianInfo } from '../types';

interface LoginPageProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  loginId: string;
  setLoginId: (id: string) => void;
  loginPin: string;
  setLoginPin: (pin: string) => void;
  setPortalSubTab: (tab: PortalSubTab) => void;
  onAuthenticate: () => void;
  onReturnHome: () => void;
  guardianInfo: GuardianInfo;
  setGuardianInfo: (info: GuardianInfo) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  userRole,
  setUserRole,
  loginId,
  setLoginId,
  loginPin,
  setLoginPin,
  setPortalSubTab,
  onAuthenticate,
  onReturnHome,
  guardianInfo,
  setGuardianInfo,
}) => {
  const [showMpin, setShowMpin] = useState<boolean>(false);
  const [useBiometrics, setUseBiometrics] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Register Guardian Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [guardianForm, setGuardianForm] = useState<GuardianInfo>({
    name: guardianInfo.name,
    relation: guardianInfo.relation,
    phone: guardianInfo.phone,
    webhookUrl: guardianInfo.webhookUrl || 'https://n8n.bankshield.internal/webhook/escrow-alert',
  });
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const selectPersona = (role: UserRole) => {
    setUserRole(role);
    if (role === 'senior' || role === 'customer') {
      setLoginId('+91 98401 92418');
      setLoginPin('924180');
      setPortalSubTab('pay');
    } else {
      setLoginId(guardianInfo.phone || '+91 98765 43210');
      setLoginPin('432100');
      setPortalSubTab('guardian');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticate();
    }, 400);
  };

  const handleSaveGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardianInfo(guardianForm);
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setIsRegisterModalOpen(false);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: BANK SECURITY & LIVE TELEMETRY */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-2xl space-y-8 relative overflow-hidden border border-slate-800">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {/* Branding */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>ShieldBank Enterprise NetBanking</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Zero-Trust Contextual Protection Active.
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Every session is continuously monitored for psychological coercion, digital arrest threats, and unauthorized third-party remote access.
              </p>
            </div>

            {/* Live Security Status Badges */}
            <div className="space-y-3 pt-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Live System Telemetry Badges:
              </span>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <span className="block text-xs font-bold text-white">Edge Duress Circuit-Breaker</span>
                    <span className="text-[11px] text-emerald-400 font-mono">Active (Sub-50ms latency)</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">v2.4 OK</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                  <Webhook className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Guardian Sync Tunnel Status</span>
                  <span className="text-[11px] text-slate-300">Encrypted channel active ({guardianInfo.name} registered)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Regulatory Framework Alignment</span>
                  <span className="text-[11px] text-slate-300">RBI Digital Payment Security Controls compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Helpline Notice */}
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-slate-200 relative z-10 flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="block font-bold text-white">24x7 Senior Emergency Helpline</span>
              <span className="text-slate-300 text-[11px]">Need immediate assistance? Call 1800-BANK-SHIELD (Toll-Free).</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: POLISHED AUTHENTICATION CARD */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Role-Based NetBanking Sign-In</h2>
                <p className="text-xs text-slate-500">Select your persona to route to your protected dashboard.</p>
              </div>
            </div>

            {/* Role-Based Persona Selector */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Select Active Persona & Access Scope:
              </span>

              <div className="grid grid-cols-1 gap-3">
                {/* Option A: Senior Citizen Ramesh Kumar */}
                <button
                  type="button"
                  onClick={() => selectPersona('senior')}
                  className={`p-4 rounded-2xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                    userRole === 'senior' || userRole === 'customer'
                      ? 'bg-emerald-50/70 border-2 border-emerald-500 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">Login as Senior Citizen (Ramesh Kumar, 68)</span>
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded">
                        Protected Ward
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Senior Customer Access • Verified Ward
                    </p>
                    <p className="text-[11px] font-mono text-emerald-700 font-bold pt-0.5">
                      Demo Phone: +91 98401 92418 | Default MPIN: 924180
                    </p>
                  </div>
                  {(userRole === 'senior' || userRole === 'customer') && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                </button>

                {/* Option B: Guardian Dynamic Display */}
                <button
                  type="button"
                  onClick={() => selectPersona('guardian')}
                  className={`p-4 rounded-2xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                    userRole === 'guardian'
                      ? 'bg-rose-50/70 border-2 border-rose-500 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">Login as Guardian ({guardianInfo.name})</span>
                      <span className="text-[9px] font-bold bg-rose-100 text-rose-800 border border-rose-300 px-1.5 py-0.5 rounded">
                        Designated Guardian
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Nominated Guardian Access • Dual Oversight Enabled
                    </p>
                    <p className="text-[11px] font-mono text-rose-700 font-bold pt-0.5">
                      Demo Phone: {guardianInfo.phone || '+91 98765 43210'} | Default MPIN: 432100
                    </p>
                  </div>
                  {userRole === 'guardian' && (
                    <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              </div>
            </div>

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">User ID / Registered Mobile</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={e => setLoginId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                    placeholder="Enter User ID or Mobile"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">Secure 6-Digit MPIN</label>
                  <button type="button" className="text-[11px] font-bold text-slate-500 hover:text-emerald-600 transition">
                    Forgot MPIN?
                  </button>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showMpin ? 'text' : 'password'}
                    maxLength={6}
                    required
                    value={loginPin}
                    onChange={e => setLoginPin(e.target.value)}
                    className="w-full pl-10 pr-28 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold text-sm tracking-widest focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                    placeholder="Enter 6-digit MPIN"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMpin(!showMpin)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 text-[11px] font-bold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition cursor-pointer flex items-center gap-1"
                    title={showMpin ? 'Hide MPIN' : 'Show MPIN'}
                  >
                    {showMpin ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                        <span>Show MPIN</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Biometric Toggle Switch */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Simulate Biometric / WebAuthn MFA</span>
                    <span className="text-[10px] text-slate-500">Fingerprint & FaceID hardware verification</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setUseBiometrics(!useBiometrics)}
                  className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    useBiometrics ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${useBiometrics ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <span>Authenticate & Enter Protected Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Clean Footer Links */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={onReturnHome}
              className="hover:text-slate-900 transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Return to Public Overview</span>
            </button>
            
            {/* Simple Register New Guardian Text Link */}
            <button
              type="button"
              onClick={() => setIsRegisterModalOpen(true)}
              className="text-xs text-slate-600 hover:text-emerald-600 font-bold transition cursor-pointer flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register New Guardian</span>
            </button>
          </div>
        </div>

      </div>

      {/* GUARDIAN REGISTRATION MODAL DIALOG */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                🛡️
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Register Authorized Family Guardian</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Designate a trusted family member with 1-click escrow abort permissions under RBI Senior Protection guidelines.
                </p>
              </div>
            </div>

            {registerSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center space-y-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-extrabold">✅ Guardian Bound to A/C ...9241</p>
                <p className="text-slate-600 text-xs font-normal">
                  Updated guardian <strong>{guardianForm.name} ({guardianForm.relation})</strong> is now linked for real-time duress alerts.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveGuardian} className="space-y-4">
                {/* Input 1: Guardian Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Guardian Full Name</label>
                  <input
                    type="text"
                    required
                    value={guardianForm.name}
                    onChange={e => setGuardianForm({ ...guardianForm, name: e.target.value })}
                    placeholder="e.g. Ananya Kumar"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium text-xs focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                  />
                </div>

                {/* Input 2: Relationship */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Relationship</label>
                  <select
                    value={guardianForm.relation}
                    onChange={e => setGuardianForm({ ...guardianForm, relation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                  >
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Legal Guardian / Caregiver">Legal Guardian / Caregiver</option>
                  </select>
                </div>

                {/* Input 3: Emergency Mobile / WhatsApp Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Guardian Mobile Number (For Instant Alert & Verification)
                  </label>
                  <input
                    type="tel"
                    required
                    value={guardianForm.phone}
                    onChange={e => setGuardianForm({ ...guardianForm, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium text-xs focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                  />
                </div>

                {/* Clean Banking Trust Banner */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-medium">
                  "Once registered, this guardian will receive instant 1-click verification alerts on WhatsApp whenever an unusual or high-value transfer is flagged by BankShield."
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-md cursor-pointer"
                  >
                    Confirm & Link Guardian
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
