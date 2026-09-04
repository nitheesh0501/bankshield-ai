import React from 'react';
import { ShieldAlert, BellRing, Zap, Webhook, Volume2, CheckCircle2, Ban } from 'lucide-react';
import { AuditItem, GuardianInfo } from '../types';

interface GuardianDeckProps {
  activeEscrow: AuditItem | null;
  countdown: number;
  formatCountdown: (sec: number) => string;
  currentMultiplier: string;
  triggerSpeech: () => void;
  handleGuardianOverride: () => void;
  handleFreezeAndAbort: () => void;
  handleSimulateIncident: () => void;
  guardianInfo?: GuardianInfo;
}

export const GuardianDeck: React.FC<GuardianDeckProps> = ({
  activeEscrow,
  countdown,
  formatCountdown,
  currentMultiplier,
  triggerSpeech,
  handleGuardianOverride,
  handleFreezeAndAbort,
  handleSimulateIncident,
  guardianInfo = { name: 'Ananya Kumar', relation: 'Daughter', phone: '+91 98765 43210', webhookUrl: '' },
}) => {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl overflow-hidden">
      {/* 1. Header Layout Refactoring */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-zinc-100">
        <div className="space-y-2 max-w-md">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            GUARDIAN OVERSIGHT ACTIVE
          </span>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight leading-snug">
            Senior Safety Escrow Command Deck
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Designated Guardian: <strong className="text-zinc-700">{guardianInfo.name} ({guardianInfo.relation})</strong> protecting <strong className="text-zinc-700">Ramesh Kumar (Father)</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="px-3 py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-medium text-zinc-700 flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <BellRing className="w-3.5 h-3.5 text-emerald-600" />
            <span>Enable Push Alerts</span>
          </button>
          <button
            type="button"
            onClick={handleSimulateIncident}
            className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
            <span>Simulate Incident</span>
          </button>
        </div>
      </div>

      {/* Webhook Status Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 shrink-0">
            <Webhook className="w-4 h-4" />
          </div>
          <div>
            <span className="block font-bold text-zinc-900 leading-tight">Native Browser Push & n8n Webhook Active</span>
            <span className="text-zinc-500 leading-normal">Real-time desktop and mobile push alerts synchronized to {guardianInfo.name} ({guardianInfo.phone}).</span>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
          n8n STATUS: 200 OK CONNECTED
        </span>
      </div>

      {/* 2. Active Interception Header Row Alignment */}
      {activeEscrow && activeEscrow.status === 'Escrow Hold' ? (
        <div className="bg-rose-50/70 border-2 border-rose-500 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                    HIGH DURESS SCAM SUSPECTED
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 mt-1 leading-snug">
                  In-Flight Intervention Required
                </h3>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-mono text-xs font-bold shrink-0 self-start sm:self-auto shadow-sm">
              AUTO-ABORT IN: {formatCountdown(countdown)}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-2 shadow-xs">
            <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase block">
              Attempted Outflow Transfer Details:
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-3xl font-black text-rose-600 tracking-tight">
                  ₹{activeEscrow.amount.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-bold text-zinc-900 ml-2">to {activeEscrow.payee}</span>
              </div>
              <span className="text-xs font-mono bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 text-zinc-700">
                VPA: {activeEscrow.vpa}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <span className="block font-bold text-rose-900 uppercase tracking-wider text-[11px]">
              Itemized Risk Factors Telemetry:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1 font-medium text-rose-950 shadow-xs">
                <span className="block font-bold text-rose-700 leading-tight">{currentMultiplier}x Baseline Surge</span>
                <p className="text-[11px] text-zinc-600 leading-normal">Typical monthly spend is &lt;₹1,200.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1 font-medium text-rose-950 shadow-xs">
                <span className="block font-bold text-rose-700 leading-tight">Active Phone Call Sensor</span>
                <p className="text-[11px] text-zinc-600 leading-normal">Coercer is actively on the line dictating actions.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1 font-medium text-rose-950 shadow-xs">
                <span className="block font-bold text-rose-700 leading-tight">Coercion Keywords</span>
                <p className="text-[11px] text-zinc-600 leading-normal">'dcp', 'cyber', 'escrow' pattern detected.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-rose-200/80">
            <button
              type="button"
              onClick={triggerSpeech}
              className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Remote Intercom Challenge</span>
            </button>

            <button
              type="button"
              onClick={handleGuardianOverride}
              className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>I Verified — Authorize Transfer</span>
            </button>

            <button
              type="button"
              onClick={handleFreezeAndAbort}
              className="flex-1 py-3 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ban className="w-4 h-4" />
              <span>Freeze & Abort Transfer</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-emerald-50/60 border border-emerald-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="text-xl font-bold text-zinc-900 tracking-tight leading-tight">All Systems Secure & Protected</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              No active duress incidents requiring intervention. Click below to simulate a digital arrest scam vector.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSimulateIncident}
            className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-white fill-white" />
            <span>Simulate High-Risk Incident</span>
          </button>
        </div>
      )}
    </div>
  );
};
