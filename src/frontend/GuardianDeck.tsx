import React from 'react';
import { ShieldAlert, BellRing, Zap, Webhook, AlertTriangle, AlertCircle, PhoneCall, Lock, Volume2, CheckCircle2, Ban } from 'lucide-react';
import { AuditItem } from '../types';

interface GuardianDeckProps {
  activeEscrow: AuditItem | null;
  countdown: number;
  formatCountdown: (sec: number) => string;
  currentMultiplier: string;
  triggerSpeech: () => void;
  handleGuardianOverride: () => void;
  handleFreezeAndAbort: () => void;
  handleSimulateIncident: () => void;
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
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
      {/* Header */}
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
            <span>Enable Push Alerts</span>
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

      {/* Webhook Status Banner */}
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

          <div className="space-y-3 pt-2">
            <span className="block font-bold text-rose-900 uppercase tracking-wider text-xs">
              Itemized Risk Factors Telemetry:
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

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-rose-200">
            <button
              onClick={triggerSpeech}
              className="py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Remote Intercom Challenge</span>
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
  );
};
