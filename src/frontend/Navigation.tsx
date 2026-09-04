import React from 'react';
import { Shield, Monitor, Smartphone, ShieldAlert, Activity, LogOut, LogIn, Radio, ChevronLeft } from 'lucide-react';
import { PageStage, PortalSubTab, UserRole, AuditItem, GuardianInfo } from '../types';

interface NavigationProps {
  pageStage: PageStage;
  setPageStage: (stage: PageStage) => void;
  portalSubTab: PortalSubTab;
  setPortalSubTab: (tab: PortalSubTab) => void;
  userRole: UserRole;
  activeEscrow: AuditItem | null;
  countdown: number;
  formatCountdown: (sec: number) => string;
  handleFreezeAndAbort: () => void;
  guardianInfo?: GuardianInfo;
}

export const Navigation: React.FC<NavigationProps> = ({
  pageStage,
  setPageStage,
  portalSubTab,
  setPortalSubTab,
  userRole,
  activeEscrow,
  countdown,
  formatCountdown,
  handleFreezeAndAbort,
  guardianInfo = { name: 'Ananya Kumar', relation: 'Daughter', phone: '+91 98765 43210', webhookUrl: '' },
}) => {
  const isSenior = userRole === 'senior' || userRole === 'customer';
  const guardianInitials = guardianInfo.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AK';

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPageStage('landing')}>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white">
                  BankShield<span className="text-emerald-400">.AI</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">
                  SENIOR SAFETY ESCROW
                </span>
              </div>
            </div>
          </div>

          {pageStage === 'landing' ? (
            <button
              onClick={() => setPageStage('login')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-emerald-200" />
              <span>NetBanking Login</span>
            </button>
          ) : pageStage === 'login' ? (
            <button
              onClick={() => setPageStage('landing')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400" />
              <span>Back to Home</span>
            </button>
          ) : (
            <>
              {/* Role-Based Dynamic Sub-Tabs */}
              <nav className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-2xl">
                {isSenior ? (
                  <>
                    <button
                      onClick={() => setPortalSubTab('pay')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                        portalSubTab === 'pay' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Senior /pay</span>
                    </button>

                    <button
                      onClick={() => setPortalSubTab('audit')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                        portalSubTab === 'audit' ? 'bg-slate-800 text-white shadow-md border border-slate-700' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Transaction History</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setPortalSubTab('guardian')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                        portalSubTab === 'guardian' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Guardian /deck</span>
                    </button>

                    <button
                      onClick={() => setPortalSubTab('dual')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                        portalSubTab === 'dual' ? 'bg-slate-800 text-white shadow-md border border-slate-700' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Dual View Monitor</span>
                    </button>

                    <button
                      onClick={() => setPortalSubTab('audit')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                        portalSubTab === 'audit' ? 'bg-slate-800 text-white shadow-md border border-slate-700' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Audit Ledger</span>
                    </button>
                  </>
                )}
              </nav>

              {/* User Profile Badge & Exit */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2.5 pl-2 text-xs font-semibold text-slate-300">
                  <div className={`w-8 h-8 rounded-full font-black flex items-center justify-center text-[10px] border shadow-xs ${
                    isSenior
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  }`}>
                    {isSenior ? 'RK' : guardianInitials}
                  </div>

                  <div className="hidden sm:block text-left">
                    <span className="block font-black text-white leading-tight">
                      {isSenior ? 'Ramesh Kumar' : guardianInfo.name}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono leading-none">
                      {isSenior ? `A/C ...9241 • Guardian: ${guardianInfo.name.split(' ')[0]}` : 'Guardian Co-Pilot'}
                    </span>
                  </div>

                  <button
                    onClick={() => setPageStage('landing')}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                    title="Exit Portal"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Real-Time Incident Alert Banner (Pulsing Red Bar) */}
      {pageStage === 'portal' && activeEscrow && activeEscrow.status === 'Escrow Hold' && (
        <div className="w-full bg-rose-600 text-white text-xs py-2.5 px-6 font-semibold shadow-xl border-b border-rose-500">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0" />
              <span className="truncate font-black">
                🚨 ACTIVE ESCROW HOLD: ₹{activeEscrow.amount.toLocaleString('en-IN')} transfer paused pending Guardian {guardianInfo.name}'s review ({formatCountdown(countdown)} remaining).
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] bg-rose-700/90 px-2.5 py-0.5 rounded-md text-rose-100 border border-rose-500 shrink-0 hidden md:inline-block font-mono">
                Sub-50ms Circuit Breaker Armed
              </span>
              {!isSenior && (
                <button
                  onClick={() => setPortalSubTab('guardian')}
                  className="px-3 py-1 rounded-xl bg-white text-rose-700 font-black hover:bg-rose-50 transition text-xs shadow-xs cursor-pointer"
                >
                  Inspect Deck
                </button>
              )}
              <button
                onClick={handleFreezeAndAbort}
                className="px-3 py-1 rounded-xl bg-rose-950 text-white font-black hover:bg-rose-900 transition text-xs border border-rose-400 cursor-pointer"
              >
                Instant Freeze
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
