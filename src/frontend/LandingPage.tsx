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
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onAccessPortal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onAccessPortal }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO & IMPACT METRICS BAR                                      */}
        {/* ========================================================================= */}
        <section className="text-center space-y-10 max-w-4xl mx-auto">
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

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            BankShield AI introduces real-time cognitive circuit-breakers into digital payments, shielding seniors and vulnerable users from digital arrest, fake police threats, and coerced transfers.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onAccessPortal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Access Protected Banking Portal</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* 4-Column Live Statistics Grid */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition">
              <span className="block text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">₹1,000+ Cr</span>
              <span className="block text-xs font-bold text-slate-500 mt-1">Lost Annually in Coerced Transfers</span>
              <p className="text-[11px] text-slate-400 mt-1">Coercive social engineering scams targeting seniors.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">&lt;50ms</span>
              <span className="block text-xs font-bold text-slate-500 mt-1">Sub-Frame Latency</span>
              <p className="text-[11px] text-slate-400 mt-1">Client-edge heuristic risk score calculation.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition">
              <span className="block text-2xl sm:text-3xl font-black text-cyan-600 tracking-tight">15-Minute</span>
              <span className="block text-xs font-bold text-slate-500 mt-1">Reversible Escrow Window</span>
              <p className="text-[11px] text-slate-400 mt-1">Cognitive cooldown period before ledger finality.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition">
              <span className="block text-2xl sm:text-3xl font-black text-purple-600 tracking-tight">3-Tier</span>
              <span className="block text-xs font-bold text-slate-500 mt-1">Progressive Friction</span>
              <p className="text-[11px] text-slate-400 mt-1">Low (0-44), Medium (45-74), High (75-100).</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: TARGET DEMOGRAPHICS & VULNERABILITY VECTORS (SLIDE 01 & 02)     */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-md border border-rose-200">
              SLIDE 01 & 02 • THREAT MATRIX
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Target Demographics & Coercion Vectors</h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              How malicious actors exploit psychological fear, urgency, and technical isolation to override traditional 2FA safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Demographic Targets (4 Cards) */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Vulnerable Demographic Cohorts (4 Cards)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Senior Citizens</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Digitally isolated elders who panic under threat of legal summons or digital arrest warrants.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">First-Time Digital Users</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    New Smartphone payment adopters unfamiliar with instant payment finality and non-reversibility.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Digitally Inexperienced</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Users prone to remote screen-sharing manipulation via AnyDesk/TeamViewer apps under duress.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Rural Banking Cohorts</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Underserved account holders lacking localized vernacular audio guidance during checkout.
                  </p>
                </div>
              </div>
            </div>

            {/* Targeted Coercion Vectors (4 Cards) */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Targeted Social Engineering Vectors (4 Cards)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs">
                    V1
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Digital Arrest Scams</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Scammers impersonate Police/CBI/ED over video calls, demanding transfer to "official escrow VPAs".
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs">
                    V2
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Utility Disconnection Fraud</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fake electricity/gas cut-off warnings demanding immediate bill settlement within 30 minutes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs">
                    V3
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Bank KYC Re-verification</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fake SMS links threatening account suspension unless immediate verification payment is executed.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs">
                    V4
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Remote Screen Exploits</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tech support scams tricking victims into granting remote desktop access to drain savings balances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: THE FUNDAMENTAL SECURITY GAP COMPARISON MATRIX (SLIDE 02 & 03) */}
        {/* ========================================================================= */}
        <section id="architecture" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              SLIDE 02 & 03 • COMPARISON MATRIX
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">The Fundamental Security Gap</h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Why legacy authentication fails under duress, and how BankShield provides contextual protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Legacy System Verification */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                  LEGACY SYSTEM VERIFICATION
                </span>
                <span className="text-xs font-mono font-bold text-rose-600">INSUFFICIENT</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Core Focus: "Who is transacting?"</h3>
                <p className="text-xs text-slate-500 mt-1">Verifies identity credentials but ignores psychological intent.</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Authentication Checks:</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>2FA SMS / Email One-Time Passwords (OTP)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>6-Digit Secret UPI MPIN Credentials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Hardware Device Binding & SIM Card Tokenization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Biometric FaceID / Fingerprint Scans</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="text-xs font-bold text-rose-900">The Fatal Blindspot:</span>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Passes authentic credentials cleanly because the victim willingly enters their correct PIN while operating under intense coercion and panic.
                </p>
              </div>
            </div>

            {/* Right Column: BankShield Contextual Safety Layer */}
            <div className="p-8 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                  BANKSHIELD CONTEXTUAL SAFETY LAYER
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600">ACTIVE PROTECTION</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Core Focus: "Why are they paying?"</h3>
                <p className="text-xs text-slate-500 mt-1">Evaluates psychological coercion and real-time behavioral telemetry.</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contextual Heuristic Checks:</h4>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Surge Multiplier vs. 30-Day Baseline Spend</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Active In-Call Background Telemetry Sensors (+15 pts)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Beneficiary VPA Registration Age (&lt;10 mins ago)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Authority Coercion Pattern Match ('dcp', 'cyber', 'escrow')</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-900">The BankShield Result:</span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Triggers 15-minute reversible escrow holds before final ledger settlement, providing time for family guardian review.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: OPERATIONAL 3-TIER WORKFLOW (SLIDE 04 & 05)                    */}
        {/* ========================================================================= */}
        <section id="how-it-works" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-md border border-cyan-200">
              SLIDE 04 & 05 • PROGRESSIVE PIPELINE
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Operational 3-Tier Response Workflow</h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              How BankShield dynamically scales friction based on real-time calculated threat levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500">STAGE 01</span>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">SCORE 0–44</span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Stage 01: Detect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sub-50ms edge scoring evaluates transaction amount surges, beneficiary creation age, and midnight velocity.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-mono">
                Low Risk: Frictionless instant execution.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-600">STAGE 02</span>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">SCORE 45–74</span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Stage 02: Challenge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Triggers plain-language warning modals and Web Speech API vernacular voice assist in English, Hindi, or Tamil.
              </p>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-mono">
                Medium Risk: Vernacular voice advisory challenge.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-rose-500 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-600">STAGE 03</span>
                <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">SCORE 75–100</span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Stage 03: Escalate</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Initiates 15-minute reversible escrow cooldown, dispatches n8n webhook alerts to registered guardians, and offers 1-click remote freeze.
              </p>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-900 font-mono">
                High Risk: Reversible Senior Safety Escrow hold.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: TECHNICAL SYSTEM ARCHITECTURE (SLIDE 06 & 07)                  */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-md border border-purple-200">
              SLIDE 06 & 07 • TECHNICAL ARCHITECTURE
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Technical System Architecture</h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Client-edge heuristic evaluation with zero backend database schema mutations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Column 1: Dual Signals Capture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Captures transaction payload parameters (amount, beneficiary VPA) combined with real-time mobile sensor telemetry (background phone call sensor).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Column 2: Edge Risk Aggregator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sub-50ms client-side heuristic engine computes aggregate risk score (0–100) based on historical surge multipliers and coercion keyword pattern matching.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Column 3: Action Dispatcher</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Synthesizes browser-native Web Speech API warnings and fires asynchronous n8n webhooks to family guardian devices.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: BUSINESS ALIGNMENT & INSTITUTIONAL DEPLOYMENT (SLIDE 08 & 09)  */}
        {/* ========================================================================= */}
        <section id="about" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
              SLIDE 08 & 09 • ENTERPRISE DEPLOYMENT
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Institutional Deployment & Compliance</h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Designed for seamless integration into existing mobile banking apps without infrastructure overhauls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <Building2 className="w-8 h-8 text-emerald-600" />
              <h3 className="text-base font-extrabold text-slate-900">Target Deployments</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Commercial Retail Banks, Small Finance Banks (SFBs), and Payment Service Providers (PSPs) seeking senior safety compliance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <Layers className="w-8 h-8 text-cyan-600" />
              <h3 className="text-base font-extrabold text-slate-900">Integration Model</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lightweight client-side mobile SDK drop-in requiring zero backend database schema modifications or complex server migration.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-purple-600" />
              <h3 className="text-base font-extrabold text-slate-900">Regulatory Compliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Directly aligns with central banking consumer protection mandates for coercive fraud mitigation and vulnerable customer safeguarding.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: FAQ ACCORDION                                                  */}
        {/* ========================================================================= */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Product & Security FAQ</h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
              <button
                onClick={() => toggleFaq(0)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>1. Does BankShield introduce friction for regular daily payments?</span>
                {openFaqIndex === 0 ? <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaqIndex === 0 && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  No. Transactions scoring below 45 (e.g. routine groceries under ₹1,200) execute instantly with zero friction. Friction is dynamically introduced only when abnormal surge multipliers or duress sensors are triggered.
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
              <button
                onClick={() => toggleFaq(1)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>2. How does the guardian override work if the payment is legitimate?</span>
                {openFaqIndex === 1 ? <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaqIndex === 1 && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  Designated guardians receive real-time push alerts with transaction context. A single tap on "I Verified — Authorize Transfer" releases the escrow hold instantly before the 15-minute countdown expires.
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
              <button
                onClick={() => toggleFaq(2)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>3. Can BankShield run entirely offline or on-device?</span>
                {openFaqIndex === 2 ? <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaqIndex === 2 && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  Yes. The heuristic risk calculation operates on the client device at sub-50ms speeds with zero external backend roundtrips required for the risk score evaluation.
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
              <button
                onClick={() => toggleFaq(3)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>4. Is sensitive transaction data shared externally?</span>
                {openFaqIndex === 3 ? <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
              </button>
              {openFaqIndex === 3 && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  No. Only encrypted and masked transaction telemetry (amount, VPA domain, calculated risk score) is dispatched to pre-registered family guardians via secure webhooks.
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
