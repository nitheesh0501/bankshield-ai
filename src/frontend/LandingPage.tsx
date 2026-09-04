import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ArrowRight,
  Zap,
  Users,
  AlertTriangle,
  Lock,
  ChevronDown,
  ChevronUp,
  Cpu,
  Building2,
  CheckCircle2,
  Smartphone,
  PhoneCall,
  Activity,
  FileText,
  Clock,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  Layers,
  Sparkles,
  Database,
  Key,
  XCircle,
  Check,
  SmartphoneNfc,
  UserCheck,
  User
} from 'lucide-react';

interface LandingPageProps {
  onAccessPortal: () => void;
  onLaunchSeniorPay?: () => void;
  onLaunchGuardianDeck?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onAccessPortal,
  onLaunchSeniorPay,
  onLaunchGuardianDeck,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSeniorClick = () => {
    if (onLaunchSeniorPay) onLaunchSeniorPay();
    else onAccessPortal();
  };

  const handleGuardianClick = () => {
    if (onLaunchGuardianDeck) onLaunchGuardianDeck();
    else onAccessPortal();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-black shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>ZERO-TRUST DUAL-CUSTODY CO-PILOT FOR SENIORS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Zero-Trust Dual-Custody UPI for <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Seniors & First-Time Digital Bankers
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Empowering elderly users with a clean, clutter-free BHIM-inspired UPI interface, backed by real-time guardian co-signing, dynamic spending caps, and duress circuit breakers.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleSeniorClick}
              className="w-full sm:w-auto px-8 py-4 min-h-[52px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-base transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-5 h-5 text-emerald-200" />
              <span>Launch Senior UPI Portal</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleGuardianClick}
              className="w-full sm:w-auto px-8 py-4 min-h-[52px] rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-black text-base transition shadow-xl shadow-slate-900/30 flex items-center justify-center gap-2 cursor-pointer border border-slate-800"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Open Guardian Co-Pilot Deck</span>
            </button>
          </div>

          {/* Metric Highlights */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">₹1,000+ Cr</span>
              <span className="block text-xs font-bold text-slate-500 mt-1">Senior Scam Loss Annually</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">&lt;50ms</span>
              <span className="block text-xs font-bold text-slate-500 mt-1">Client Edge Sensor Latency</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-cyan-600 tracking-tight">5% Cap</span>
              <span className="block text-xs font-bold text-slate-500 mt-1">Dynamic Pocket Rule</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-purple-600 tracking-tight">432100</span>
              <span className="block text-xs font-bold text-slate-500 mt-1">Independent Guardian MPIN</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CORE CAPABILITY HIGHLIGHTS                                             */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl font-black text-slate-900">Core Capabilities</h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto font-medium">
              Eliminating financial anxiety for elderly & first-time bankers with proactive safeguards before money leaves the account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Capability 1: BHIM-Grade Simplicity */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:border-emerald-400 hover:shadow-lg transition">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold border border-emerald-300">
                  <SmartphoneNfc className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">BHIM-Grade Simplicity</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  High-contrast layout, oversized 48px+ touch targets, visual trusted contact cards, voice assistant guidance, and zero ads or clutter.
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 inline-block w-fit">
                Clean Visual UPI
              </span>
            </div>

            {/* Capability 2: Dynamic Safe Caps */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:border-emerald-400 hover:shadow-lg transition">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-extrabold border border-cyan-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Dynamic Safe Caps</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Daily safe allowances dynamically calculated at 5% of cleared savings (bounded between ₹1,000 and ₹10,000), halving automatically for unverified VPAs.
                </p>
              </div>
              <span className="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-xl border border-cyan-200 inline-block w-fit">
                5% Safe Pocket Rule
              </span>
            </div>

            {/* Capability 3: Real-Time Escrow */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:border-emerald-400 hover:shadow-lg transition">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold border border-purple-300">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Real-Time Escrow</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Coercion threats and high-value transfers route to Supabase escrow, unlocking only when the guardian validates via independent MPIN (<code className="font-mono bg-purple-100 text-purple-900 px-1 py-0.5 rounded">432100</code>).
                </p>
              </div>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-xl border border-purple-200 inline-block w-fit">
                Dual-Custody Co-Sign
              </span>
            </div>

            {/* Capability 4: Active Duress Shield */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between hover:border-emerald-400 hover:shadow-lg transition">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-extrabold border border-rose-300">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Active Duress Shield</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Sub-50ms engine intercepts active phone calls, digital arrest threats, and coercive social engineering before funds leave the bank account.
                </p>
              </div>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200 inline-block w-fit">
                Sub-50ms Circuit Breaker
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PLATFORM COMPARISON SECTION                                            */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 bg-slate-200 px-3.5 py-1 rounded-full border border-slate-300">
              PLATFORM COMPARISON
            </span>
            <h2 className="text-3xl font-black text-slate-900">Platform Comparison</h2>
            <p className="text-sm font-semibold text-slate-600 max-w-2xl mx-auto">
              BankShield AI vs Standard UPI vs Youth Wallets
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase font-black tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5 w-1/4">Feature / Capability</th>
                  <th className="py-4 px-5 w-1/4 text-slate-300">Standard UPI Apps (BHIM, Google Pay)</th>
                  <th className="py-4 px-5 w-1/4 text-amber-300">Youth Wallets (FamPay, Prepaid)</th>
                  <th className="py-4 px-5 w-1/4 text-emerald-400 bg-slate-800/90 font-black">BankShield AI Senior Co-Pilot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-extrabold text-slate-900">Target Demographic</td>
                  <td className="py-4 px-5 text-slate-600">General Population (Tech-savvy)</td>
                  <td className="py-4 px-5 text-slate-600">Teenagers & Kids</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700 bg-emerald-50/60">Senior Citizens (60+), Rural & Vulnerable Bankers</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-extrabold text-slate-900">Authorization Model</td>
                  <td className="py-4 px-5 text-slate-600">1-PIN Single Device (Coerced victim enters PIN)</td>
                  <td className="py-4 px-5 text-slate-600">Parent Balance Top-Up Load</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700 bg-emerald-50/60">Dual-Custody Pre-Settlement Escrow & Co-Sign</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-extrabold text-slate-900">Spending Limit Rule</td>
                  <td className="py-4 px-5 text-slate-600">Static Daily Bank Limit (₹1,00,000)</td>
                  <td className="py-4 px-5 text-slate-600">Fixed Manual Pocket Allowance</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700 bg-emerald-50/60">Dynamic 5% Safe Cap Rule (Bounded ₹1,000–₹10,000)</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-extrabold text-slate-900">Duress & Scam Defense</td>
                  <td className="py-4 px-5 text-rose-700 font-semibold flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>None (Victim enters PIN voluntarily)</span>
                  </td>
                  <td className="py-4 px-5 text-slate-600">Basic Merchant Category Restrictions</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700 bg-emerald-50/60 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sub-50ms Active Call & Coercion Circuit-Breaker</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-extrabold text-slate-900">Guardian Co-Pilot Control</td>
                  <td className="py-4 px-5 text-slate-600">Zero Guardian / Family Oversight</td>
                  <td className="py-4 px-5 text-slate-600">Parent Wallet Load Approval</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700 bg-emerald-50/60">Independent Guardian MPIN (<code className="font-mono">432100</code>) & 1-Click Freeze</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-extrabold text-slate-900">Audit Ledger & Settlement</td>
                  <td className="py-4 px-5 text-slate-600">Instant Non-Reversible Outflow</td>
                  <td className="py-4 px-5 text-slate-600">Prepaid Wallet Settlement</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700 bg-emerald-50/60">Supabase Real-Time Dual Audit Ledger</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. DEMO & EVALUATION PANEL                                                */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-300">
              EVALUATION SANDBOX
            </span>
            <h2 className="text-3xl font-black text-slate-900">Evaluation Sandbox & MPIN Credentials</h2>
            <p className="text-sm font-bold text-slate-700 max-w-2xl mx-auto">
              Senior MPIN: <code className="font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">924180</code> | Guardian MPIN: <code className="font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-300">432100</code>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Column 1: Technical Architecture */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span>Supabase PostgreSQL Architecture</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                    REALTIME SYNC
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  BankShield AI persists all transaction logs, escrow holds, and guardian overrides into an immutable Supabase <code className="font-mono text-emerald-400">audit_ledger</code> table. Real-time webhooks dispatch instant status transitions to both Ramesh's UPI Phone and Ananya's Guardian Deck.
                </p>

                <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Database:</span>
                    <span className="text-emerald-400 font-bold">Supabase PostgreSQL 15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Table:</span>
                    <span className="text-white">public.audit_ledger</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">State Sync:</span>
                    <span className="text-cyan-400">Supabase Realtime Channel</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 font-medium">
                🔒 Every escrow override requires Guardian MPIN verification (<code className="font-mono font-bold text-white">432100</code>) before ledger balance deduction.
              </div>
            </div>

            {/* Column 2: Evaluator Demo Credentials Panel */}
            <div className="p-8 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-300">
                    EVALUATION SANDBOX & MPIN CREDENTIALS
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700">LIVE DEMO READY</span>
                </div>

                <h3 className="text-xl font-black text-slate-900">Pre-Populated Hackathon Personas</h3>

                <div className="space-y-3">
                  {/* Senior Persona */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-emerald-600" />
                        <span>Senior Ramesh Kumar (Age: 68)</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Senior Persona
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 font-medium text-slate-600">
                      <span>Phone: <strong className="text-slate-900 font-mono">+91 98401 92418</strong></span>
                      <span>Senior MPIN: <code className="font-mono font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">924180</code></span>
                    </div>
                  </div>

                  {/* Guardian Persona */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-purple-600" />
                        <span>Guardian Ananya Kumar (Daughter)</span>
                      </span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                        Guardian Co-Pilot
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 font-medium text-slate-600">
                      <span>Phone: <strong className="text-slate-900 font-mono">+91 98765 43210</strong></span>
                      <span>Guardian MPIN: <code className="font-mono font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-300">432100</code></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Quick Launch Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSeniorClick}
                  className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Launch Senior Portal</span>
                </button>

                <button
                  type="button"
                  onClick={handleGuardianClick}
                  className="py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Open Guardian Deck</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. FAQ ACCORDION                                                          */}
        {/* ========================================================================= */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl font-black text-slate-900">Product & Security FAQ</h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFaq(0)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-sm text-slate-900 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>1. How does the 5% Safe Pocket Cap rule work for seniors?</span>
                {openFaqIndex === 0 ? <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaqIndex === 0 && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                  The Safe Cap dynamically calculates 5% of Ramesh's cleared savings balance (₹1,42,800 * 5% = ₹7,140). Any transfer within ₹7,140 to verified recipients executes instantly upon entering Senior MPIN (924180). Transfers exceeding ₹7,140 automatically route to Guardian Ananya for 1-tap authorization using her independent MPIN (432100).
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFaq(1)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-sm text-slate-900 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>2. How does Guardian co-signing protect against Digital Arrest scams?</span>
                {openFaqIndex === 1 ? <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaqIndex === 1 && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                  When a scammer coercively dictates an emergency transfer over an active phone call, BankShield's background call telemetry detects the call and intercepts the payment into escrow—even if Ramesh enters his correct Senior MPIN. The money cannot leave the bank account until Guardian Ananya verifies and co-signs using her MPIN (432100).
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFaq(2)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-sm text-slate-900 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>3. What are the evaluator quick-test MPIN credentials?</span>
                {openFaqIndex === 2 ? <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaqIndex === 2 && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                  Senior Ramesh's MPIN is <code className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">924180</code>. Guardian Ananya's MPIN is <code className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">432100</code>. Demo auto-fill shortcuts are provided on all PIN modals for smooth evaluation.
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 space-y-2">
        <p className="font-bold text-slate-700">BankShield AI Enterprise Security System • Regulatory Compliance Standards</p>
        <p>24x7 Senior Emergency Helpline: 1800-BANK-SHIELD | Approved for Next-Gen Financial Institutions</p>
      </footer>
    </div>
  );
};
