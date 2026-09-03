'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Volume2,
  Lock,
  Users,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCircle2,
  Cpu,
  Activity,
  PlayCircle,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { CustomerPortal } from './CustomerPortal';

export function LandingPage() {
  return (
    <div className="w-full space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 text-center max-w-5xl mx-auto space-y-6">
        {/* Top Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-emerald-500/10 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>EDGE-BASED COGNITIVE CIRCUIT-BREAKER</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
          Stop the Scam Before <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            the Money Moves
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Traditional 2FA verifies identity, not intent under psychological coercion. BANKSHIELD AI computes duress risk in <strong className="text-emerald-400 font-semibold">&lt;50ms</strong>, speaks an anti-scam reality check, holds funds in a 15-minute reversible escrow, and alerts trusted family guardians.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/split"
            className="w-full sm:w-auto py-4 px-8 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-black text-base transition duration-200 shadow-xl shadow-white/10 flex items-center justify-center gap-2 group"
          >
            <PlayCircle className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>Launch Live Hackathon Pitch Demo</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/pay"
            className="w-full sm:w-auto py-4 px-8 rounded-full bg-obsidian-card hover:bg-obsidian-hover border border-obsidian-border text-slate-200 font-bold text-base transition duration-200 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Senior Customer Portal (/pay)</span>
          </Link>
        </div>

        {/* Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
          <div className="bg-obsidian-card border border-obsidian-border p-4 rounded-2xl text-center">
            <span className="block text-2xl font-black text-emerald-400 font-mono">&lt;50ms</span>
            <span className="text-xs text-slate-400 font-medium">Edge Risk Latency</span>
          </div>
          <div className="bg-obsidian-card border border-obsidian-border p-4 rounded-2xl text-center">
            <span className="block text-2xl font-black text-cyan-400 font-mono">15 Mins</span>
            <span className="text-xs text-slate-400 font-medium">Reversible Escrow Hold</span>
          </div>
          <div className="bg-obsidian-card border border-obsidian-border p-4 rounded-2xl text-center">
            <span className="block text-2xl font-black text-amber-400 font-mono">Web Speech</span>
            <span className="text-xs text-slate-400 font-medium">Anti-Scam Voice Alert</span>
          </div>
          <div className="bg-obsidian-card border border-obsidian-border p-4 rounded-2xl text-center">
            <span className="block text-2xl font-black text-blue-400 font-mono">Zero DB</span>
            <span className="text-xs text-slate-400 font-medium">BroadcastChannel Sync</span>
          </div>
        </div>
      </section>

      {/* Featured Interactive Hero Dashboard Frame */}
      <section className="relative max-w-6xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-100 transition duration-1000"></div>

        <div className="relative bg-obsidian-card border-2 border-obsidian-border rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-obsidian-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-mono text-slate-400 ml-2">
                bankshield.ai/interactive-demo-preview
              </span>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge compact />
              <Link
                href="/split"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/50 px-3 py-1.5 rounded-lg border border-cyan-800/40"
              >
                <span>Full Split View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Embedded Customer Portal Demo */}
          <div className="pt-2">
            <CustomerPortal />
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-6xl mx-auto space-y-8 pt-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Engineered for High-Duress Scam Interception
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Traditional banking apps allow coercive digital arrest transfers because PINs verify identity, not intent under psychological pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-obsidian-card border border-obsidian-border p-6 rounded-2xl space-y-3 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Edge Risk Engine (&lt;50ms)</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Computes deterministic duress score analyzing 30-day baseline surges, active phone call telemetry (+25), and authority coercion keywords (`police`, `cbi`, `court`, `escrow`).
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-obsidian-card border border-obsidian-border p-6 rounded-2xl space-y-3 hover:border-rose-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Anti-Scam Voice Reality Check</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Browser-native Web Speech API audibly warns victims: <em>"Official authorities will never demand money transfers over the phone to avoid arrest."</em>
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-obsidian-card border border-obsidian-border p-6 rounded-2xl space-y-3 hover:border-cyan-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">15-Minute Reversible Escrow</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Pauses high-risk transfers ($\ge 75$ duress score) in a reversible escrow safety hold before money leaves the victim's account.
            </p>
          </div>
        </div>
      </section>

      {/* Hackathon Judge Quick Test Scenarios */}
      <section className="bg-gradient-to-r from-obsidian-card via-obsidian to-obsidian-card border border-obsidian-border rounded-3xl p-8 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-border pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-800/60">
              Interactive Hackathon Demo Scenarios
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">
              Test Real-Time Interventions Live
            </h2>
          </div>
          <Link
            href="/split"
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm transition flex items-center gap-2"
          >
            <span>Open Side-by-Side Pitch Split View</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Scenario 1</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Score &lt; 45</span>
            </div>
            <h4 className="text-base font-bold text-white">Safe Grocery Transfer (₹350)</h4>
            <p className="text-xs text-slate-400">Normal daily average transaction. Clears instantly with green success banner.</p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">Scenario 2</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Score 45–74</span>
            </div>
            <h4 className="text-base font-bold text-white">Suspicious New Vendor (₹9,200)</h4>
            <p className="text-xs text-slate-400">Unusual surge above baseline. Displays plain-language Amber advisory modal.</p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase">Scenario 3</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 animate-pulse">Score ≥ 75</span>
            </div>
            <h4 className="text-base font-bold text-white">Digital Arrest Scam (₹85,000)</h4>
            <p className="text-xs text-slate-400">Authority coercion keyword + Active Call. Web Speech API speaks anti-scam audio & alerts Guardian.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
