import React, { useState } from 'react';
import { Smartphone, Send, PhoneCall, Volume2, Lock, Delete, X, AlertCircle, ShieldCheck } from 'lucide-react';
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
  balance?: number;
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
  balance = 142800,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // UPI PIN Verification State
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const CORRECT_PIN = '924180'; // Matches Ramesh's NetBanking credential

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

  // Payment Execution & PIN Flow Handlers
  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid transfer amount.');
      return;
    }
    setEnteredPin('');
    setPinError('');
    setIsPinModalOpen(true);
  };

  const handleKeypadPress = (num: string) => {
    if (enteredPin.length < 6) {
      setEnteredPin(prev => prev + num);
      setPinError('');
    }
  };

  const handleBackspace = () => {
    setEnteredPin(prev => prev.slice(0, -1));
    setPinError('');
  };

  const handleAutofillPin = () => {
    setEnteredPin(CORRECT_PIN);
    setPinError('');
  };

  const handleConfirmPin = () => {
    if (enteredPin !== CORRECT_PIN) {
      setPinError('Incorrect 6-digit UPI PIN. Please try again.');
      return;
    }

    setIsPinModalOpen(false);
    setPinError('');
    handleAuthorizeTransfer({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="space-y-4 relative">
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
              <p className="text-[11px] text-zinc-400 font-mono leading-normal mt-0.5">Savings A/C ...9241 • Bal: ₹{balance.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        {/* Dynamic Available Clear Balance Display */}
        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            Available Clear Balance
          </span>
          <p className="text-2xl font-black text-emerald-400 tracking-tight mt-0.5">
            ₹ {balance.toLocaleString('en-IN')}.00
          </p>
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
        <form onSubmit={handleInitiatePayment} className="space-y-4">
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

      {/* SENIOR-FRIENDLY UPI SECURITY PIN MODAL */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 text-white animate-in zoom-in-95 duration-200 relative">
            
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsPinModalOpen(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-xl shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white tracking-tight mt-2">
                BankShield Secure UPI PIN Verification
              </h3>
              <p className="text-xs text-zinc-400">
                Enter your 6-digit UPI MPIN for A/C ...9241
              </p>
            </div>

            {/* Payee Summary Box */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                Transferring Funds To:
              </span>
              <div className="text-base font-black text-white">
                ₹ {Number(amount || 0).toLocaleString('en-IN')}.00
              </div>
              <div className="text-xs text-emerald-400 font-bold truncate">
                {recipientName || 'Beneficiary'}
              </div>
            </div>

            {/* 6-Digit PIN Indicator Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 py-2">
                {[0, 1, 2, 3, 4, 5].map(idx => (
                  <div
                    key={idx}
                    className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
                      enteredPin.length > idx
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-zinc-700 bg-zinc-950 text-zinc-600'
                    }`}
                  >
                    {enteredPin.length > idx ? '•' : ''}
                  </div>
                ))}
              </div>

              {/* Demo Auto-fill shortcut */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleAutofillPin}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold underline transition cursor-pointer"
                >
                  [Auto-fill Demo PIN: 924180]
                </button>
              </div>
            </div>

            {/* Error Feedback */}
            {pinError && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in zoom-in-95">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            {/* Senior-Friendly Touch Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeypadPress(num)}
                  className="py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 text-white font-black text-lg transition shadow-md cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={handleBackspace}
                className="py-3 rounded-xl bg-zinc-800 hover:bg-rose-900 text-rose-300 font-bold text-sm transition flex items-center justify-center cursor-pointer"
                title="Backspace"
              >
                <Delete className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 text-white font-black text-lg transition shadow-md cursor-pointer"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleConfirmPin}
                disabled={enteredPin.length !== 6}
                className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-zinc-800 text-white font-bold text-xs transition flex items-center justify-center cursor-pointer"
              >
                OK
              </button>
            </div>

            {/* Pitch Deck Alignment Note */}
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[10px] text-zinc-400 text-center leading-relaxed">
              🔒 <strong className="text-zinc-300">2FA PIN Validated.</strong> BankShield Cognitive Engine running in-flight duress evaluation (&lt;50ms)...
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition cursor-pointer"
              >
                Cancel Transfer
              </button>
              <button
                type="button"
                onClick={handleConfirmPin}
                className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                Authorize Payment
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

