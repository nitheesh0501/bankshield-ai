import { CustomerPortal } from '../../components/CustomerPortal';
import { GuardianDeck } from '../../components/GuardianDeck';
import { LayoutGrid, Sparkles } from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="space-y-6">
      {/* Presentation Mode Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-obsidian-card to-cyan-950/60 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/20 rounded-xl text-cyan-400 border border-cyan-500/30">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">Split Presentation Mode (/demo)</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                PITCH DEMO
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Side-by-side view. Trigger presets on the Customer Portal (left) to watch Web Speech audio and Guardian Incident Cards (right) synchronize instantly.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] text-slate-400 font-mono block">Zero-Database Client Sync</span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> BroadcastChannel API
          </span>
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Senior Customer View */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span>[ LEFT SPLIT ] Senior Customer View (/pay)</span>
            </h3>
          </div>
          <CustomerPortal />
        </div>

        {/* Right Side: Guardian View */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <span>[ RIGHT SPLIT ] Guardian Safety Deck (/guardian)</span>
            </h3>
          </div>
          <GuardianDeck />
        </div>
      </div>
    </div>
  );
}
