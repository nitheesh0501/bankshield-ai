import React from 'react';
import { Smartphone, Send, PhoneCall } from 'lucide-react';

interface SeniorPayPhoneProps {
  recipientName: string;
  setRecipientName: (val: string) => void;
  upiId: string;
  setUpiId: (val: string) => void;
  amount: string;
  setAmount: (val: string) => void;
  isActiveCall: boolean;
  setIsActiveCall: (val: boolean) => void;
  currentMultiplier: string;
  applyVectorPreset: (vector: 'arrest' | 'utility' | 'kyc' | 'icu' | 'remote' | 'safe') => void;
  handleAuthorizeTransfer: (e: React.FormEvent) => void;
}

export const SeniorPayPhone: React.FC<SeniorPayPhoneProps> = ({
  recipientName,
  setRecipientName,
  upiId,
  setUpiId,
  amount,
  setAmount,
  isActiveCall,
  setIsActiveCall,
  currentMultiplier,
  applyVectorPreset,
  handleAuthorizeTransfer,
}) => {
  return (
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

        {/* Presets */}
        <div className="space-y-2">
          <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            Quick Scam Vector Presets:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            <button
              onClick={() => applyVectorPreset('utility')}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition cursor-pointer"
            >
              <span className="block text-[9px] text-amber-400">Utility Fraud</span>
              <span>₹48,500 Electricals</span>
            </button>
            <button
              onClick={() => applyVectorPreset('arrest')}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition cursor-pointer"
            >
              <span className="block text-[9px] text-rose-400">Digital Arrest</span>
              <span>₹85,000 Cyber Cell</span>
            </button>
            <button
              onClick={() => applyVectorPreset('kyc')}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition cursor-pointer"
            >
              <span className="block text-[9px] text-amber-400">Bank KYC</span>
              <span>₹35,000 HDFC</span>
            </button>
            <button
              onClick={() => applyVectorPreset('icu')}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition cursor-pointer"
            >
              <span className="block text-[9px] text-rose-400">Medical ICU</span>
              <span>₹60,000 Hospital</span>
            </button>
            <button
              onClick={() => applyVectorPreset('remote')}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition cursor-pointer"
            >
              <span className="block text-[9px] text-amber-400">Remote Scam</span>
              <span>₹25,000 AnyDesk</span>
            </button>
            <button
              onClick={() => applyVectorPreset('safe')}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition cursor-pointer"
            >
              <span className="block text-[9px] text-emerald-400">Safe Pay</span>
              <span>₹350 Groceries</span>
            </button>
          </div>
        </div>

        {/* Transfer Form */}
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
  );
};
