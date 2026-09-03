import React, { useState } from 'react';
import { Smartphone, Send, PhoneCall, Volume2 } from 'lucide-react';
import { PRESET_SCENARIOS } from '../backend/riskEngine';

interface SeniorPhoneProps {
  recipientName: string;
  setRecipientName: (val: string) => void;
  upiId: string;
  setUpiId: (val: string) => void;
  amount: string;
  setAmount: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  isActiveCall: boolean;
  setIsActiveCall: (val: boolean) => void;
  currentMultiplier: string;
  handleAuthorizeTransfer: (e: React.FormEvent) => void;
}

export const SeniorPhone: React.FC<SeniorPhoneProps> = ({
  recipientName,
  setRecipientName,
  upiId,
  setUpiId,
  amount,
  setAmount,
  category,
  setCategory,
  isActiveCall,
  setIsActiveCall,
  currentMultiplier,
  handleAuthorizeTransfer,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const triggerSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const text =
        'Warning: Official police, court, or utility authorities will never demand money transfers over the phone to avoid arrest or disconnection. Disconnect the call now.';
      const utterance = new SpeechSynthesisUtterance(text);
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

  const selectPreset = (presetId: string) => {
    const preset = PRESET_SCENARIOS.find(p => p.id === presetId);
    if (!preset) return;
    setRecipientName(preset.payee);
    setUpiId(preset.vpa);
    setAmount(preset.amount.toString());
    setCategory(preset.category);
    setIsActiveCall(preset.isCallActive);
  };

  return (
    <div className="space-y-4">
      {/* Container Header */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5 leading-tight">
          <Smartphone className="w-4 h-4 text-emerald-600" />
          <span>[ DEVICE 1 ] Ramesh's Senior UPI Phone Client (/pay)</span>
        </h3>
        <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          LIVE SENSOR
        </span>
      </div>

      {/* Mobile Mockup Container */}
      <div className="bg-zinc-950 text-zinc-100 border-4 border-zinc-800 rounded-[36px] p-6 shadow-2xl space-y-5 overflow-hidden">
        {/* Account Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/30">
              RK
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">Ramesh Kumar (Age: 68)</h4>
              <p className="text-[11px] text-zinc-400 font-mono leading-normal mt-0.5">Savings A/C ...9241 • Bal: ₹1,42,800</p>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        {/* Quick Test Scam Scenarios Selector */}
        <div className="space-y-2">
          <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            Quick Test Scam Scenarios:
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {PRESET_SCENARIOS.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => selectPreset(preset.id)}
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-[11px] font-bold text-white transition cursor-pointer"
              >
                <span className={`block text-[9px] ${preset.expectedScore >= 75 ? 'text-rose-400' : preset.expectedScore >= 45 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {preset.name}
                </span>
                <span>₹{preset.amount.toLocaleString('en-IN')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleAuthorizeTransfer} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-zinc-300">Beneficiary Name / VPA</label>
            <input
              type="text"
              required
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium text-xs focus:border-emerald-500 focus:outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-zinc-300">Transfer Amount (₹ INR)</label>
              <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                {currentMultiplier}x Historical Surge
              </span>
            </div>
            <input
              type="number"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold text-base focus:border-emerald-500 focus:outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-zinc-300">Payment Reason</label>
            <input
              type="text"
              required
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium text-xs focus:border-emerald-500 focus:outline-none transition"
            />
          </div>

          {/* Background Phone Call Duress Sensor Switch */}
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg ${isActiveCall ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'bg-zinc-800 text-zinc-500'}`}>
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white leading-tight">Simulate Background Phone Call (Duress Sensor)</span>
                <span className="text-[10px] text-zinc-400 leading-normal">
                  {isActiveCall ? 'Active caller claiming official authority (+15 pts)' : 'No active phone call detected'}
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

          {/* Contextual Voice Assist Card */}
          <div className="p-3.5 bg-zinc-900/90 border border-rose-900/50 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">Contextual Voice Assist</span>
              <button
                type="button"
                onClick={triggerSpeech}
                className="text-xs px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-medium flex items-center gap-1.5 cursor-pointer transition"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce' : ''}`} />
                <span>Read Warning Aloud</span>
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              "Authority coercion pattern detected. Transfers to official escrow VPAs over phone calls are intercepted."
            </p>
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
