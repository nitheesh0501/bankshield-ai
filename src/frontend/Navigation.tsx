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
  return (
    <>
      {/* Sticky Dark Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-slate-100 shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Dynamic Protection Status */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPageStage('landing')}>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white">
                  BankShield<span className="text-emerald-400">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">
                  DUAL-CUSTODY CO-PILOT
                </span>
              </div>
              {pageStage === 'portal' && (
                <p className="text-[10px] text-slate-400 font-medium hidden md:block">
                  <span className="text-emerald-400 font-bold">{guardianInfo.name}</span> protecting <span className="text-white font-bold">Ramesh Kumar</span>
                </p>
              )}
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
              {/* Central Unified Console Tabs */}
              <nav className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
                <button
                  onClick={() => setPortalSubTab('dual')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    portalSubTab === 'dual'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Co-Pilot Console</span>
                  <span className="sm:hidden">Console</span>
                </button>

                <button
                  onClick={() => setPortalSubTab('pay')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    portalSubTab === 'pay'
                      ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Senior /pay</span>
                </button>

                <button
                  onClick={() => setPortalSubTab('guardian')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    portalSubTab === 'guardian'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Guardian /deck</span>
                </button>

                <button
                  onClick={() => setPortalSubTab('audit')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    portalSubTab === 'audit'
                      ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Audit History</span>
                </button>
              </nav>

              {/* Profile & Exit */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 pl-2 text-xs font-semibold text-slate-300">
                  <div className="w-8 h-8 rounded-full font-black flex items-center justify-center text-[10px] bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-xs">
                    AK
                  </div>

                  <div className="hidden lg:block text-left">
                    <span className="block font-black text-white leading-tight">
                      {guardianInfo.name}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono leading-none">
                      Protecting Ramesh Kumar
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

      {/* Global Real-Time Incident Alert Banner (Pulsing Red Emergency Bar) */}
      {pageStage === 'portal' && activeEscrow && activeEscrow.status === 'Escrow Hold' && (
        <div className="w-full bg-rose-600 text-white text-xs py-2.5 px-6 font-semibold shadow-xl border-b border-rose-500 animate-in slide-in-from-top-2 duration-200">
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
              {portalSubTab !== 'dual' && portalSubTab !== 'guardian' && (
                <button
                  onClick={() => setPortalSubTab('dual')}
                  className="px-3 py-1 rounded-xl bg-white text-rose-700 font-black hover:bg-rose-50 transition text-xs shadow-xs cursor-pointer"
                >
                  Review Incident
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
