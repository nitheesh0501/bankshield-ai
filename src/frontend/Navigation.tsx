import React from 'react';
import { Shield, Monitor, Smartphone, ShieldAlert, Activity, LogOut, LogIn, ChevronLeft } from 'lucide-react';
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
      {/* Sticky Modern Light Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Dynamic Protection Status */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPageStage('landing')}>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">
                  BankShield<span className="text-emerald-600">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                  DUAL-CUSTODY CO-PILOT
                </span>
              </div>
              {pageStage === 'portal' && (
                <p className="text-[10px] text-slate-500 font-medium hidden md:block">
                  <span className="text-emerald-700 font-bold">{guardianInfo.name}</span> protecting <span className="text-slate-800 font-bold">Ramesh Kumar</span>
                </p>
              )}
            </div>
          </div>

          {pageStage === 'landing' ? (
            <button
              onClick={() => setPageStage('login')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>NetBanking Login</span>
            </button>
          ) : pageStage === 'login' ? (
            <button
              onClick={() => setPageStage('landing')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5 border border-slate-200 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
              <span>Back to Home</span>
            </button>
          ) : (
            <>
              {/* Central Unified Console Tabs */}
              <nav className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-2xl">
                <button
                  onClick={() => setPortalSubTab('dual')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    portalSubTab === 'dual'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Co-Pilot Console</span>
                  <span className="sm:hidden">Console</span>
                </button>

                <button
                  onClick={() => setPortalSubTab('pay')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    portalSubTab === 'pay'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Senior /pay</span>
                </button>

                <button
                  onClick={() => setPortalSubTab('guardian')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    portalSubTab === 'guardian'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Guardian /deck</span>
                </button>

                <button
                  onClick={() => setPortalSubTab('audit')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    portalSubTab === 'audit'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Audit History</span>
                </button>
              </nav>

              {/* Profile & Exit */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 pl-2 text-xs font-semibold text-slate-700">
                  <div className="w-8 h-8 rounded-full font-black flex items-center justify-center text-[10px] bg-slate-900 text-white shadow-xs">
                    AK
                  </div>

                  <div className="hidden lg:block text-left">
                    <span className="block font-black text-slate-900 leading-tight">
                      {guardianInfo.name}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono leading-none">
                      Protecting Ramesh Kumar
                    </span>
                  </div>

                  <button
                    onClick={() => setPageStage('landing')}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
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

      {/* Global Real-Time Incident Alert Banner (Refined Light Rose Banner) */}
      {pageStage === 'portal' && activeEscrow && activeEscrow.status === 'Escrow Hold' && (
        <div className="w-full bg-rose-100 text-rose-950 text-xs py-2.5 px-6 font-semibold shadow-sm border-b border-rose-200 animate-in slide-in-from-top-2 duration-200">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping shrink-0" />
              <span className="truncate font-black text-rose-900">
                🚨 ACTIVE ESCROW HOLD: ₹{activeEscrow.amount.toLocaleString('en-IN')} transfer paused pending Guardian {guardianInfo.name}'s review ({formatCountdown(countdown)} remaining).
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] bg-rose-200 px-2.5 py-0.5 rounded-md text-rose-900 border border-rose-300 shrink-0 hidden md:inline-block font-mono font-bold">
                Sub-50ms Circuit Breaker Armed
              </span>
              {portalSubTab !== 'dual' && portalSubTab !== 'guardian' && (
                <button
                  onClick={() => setPortalSubTab('dual')}
                  className="px-3 py-1 rounded-xl bg-white text-rose-800 font-black hover:bg-rose-50 border border-rose-200 transition text-xs shadow-xs cursor-pointer"
                >
                  Review Incident
                </button>
              )}
              <button
                onClick={handleFreezeAndAbort}
                className="px-3 py-1 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-black transition text-xs border border-rose-800 shadow-xs cursor-pointer"
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
