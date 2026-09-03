import React from 'react';
import { Shield, Monitor, Smartphone, ShieldAlert, Activity, LogOut, LogIn, Radio, ChevronLeft } from 'lucide-react';
import { PageStage, PortalSubTab, UserRole, AuditItem } from '../types';

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
}) => {
  const isSenior = userRole === 'senior' || userRole === 'customer';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  BankShield<span className="text-emerald-600">.AI</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Senior Safety Escrow
                </span>
              </div>
            </div>
          </div>

          {pageStage === 'landing' ? (
            <button
              onClick={() => setPageStage('login')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>NetBanking Login</span>
            </button>
          ) : pageStage === 'login' ? (
            <button
              onClick={() => setPageStage('landing')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
              <span>Back to Home</span>
            </button>
          ) : (
            <>
              {/* Role-Based Dynamic Sub-Tabs */}
              <nav className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl">
                {isSenior ? (
                  <>
                    {/* Senior Role Sub-Tabs */}
                    <button
                      onClick={() => setPortalSubTab('pay')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        portalSubTab === 'pay' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Senior /pay</span>
                    </button>

                    <button
                      onClick={() => setPortalSubTab('audit')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        portalSubTab === 'audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      <span>My Transaction History</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Guardian Role Sub-Tabs */}
                    <button
                      onClick={() => setPortalSubTab('guardian')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        portalSubTab === 'guardian' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Guardian /deck</span>
                    </button>

                    <button
                      onClick={() => setPortalSubTab('dual')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        portalSubTab === 'dual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dual Screen Monitor</span>
                    </button>

                    <button
                      onClick={() => setPortalSubTab('audit')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        portalSubTab === 'audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Duress Audit Ledger</span>
                    </button>
                  </>
                )}
              </nav>

              {/* User Profile Badge & Exit */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 pl-2 text-xs font-semibold text-slate-700">
                  <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-[10px] border shadow-xs ${
                    isSenior
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-rose-100 border-rose-300 text-rose-800'
                  }`}>
                    {isSenior ? 'RK' : 'AK'}
                  </div>

                  <div className="hidden sm:block text-left">
                    <span className="block font-extrabold text-slate-900 leading-tight">
                      {isSenior ? 'RK Ramesh Kumar' : 'AK Ananya Kumar'}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono leading-none">
                      {isSenior ? 'A/C ...9241 • Guardian: Ananya' : 'Protecting: Ramesh (Father)'}
                    </span>
                  </div>

                  <button
                    onClick={() => setPageStage('landing')}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
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

      {/* Real-time incident alert banner (Pulsing Red Bar) */}
      {pageStage === 'portal' && activeEscrow && activeEscrow.status === 'Escrow Hold' && (
        <div className="bg-rose-600 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs sm:text-sm animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 font-bold max-w-4xl truncate">
            <Radio className="w-4 h-4 animate-ping text-white shrink-0" />
            <span className="truncate">
              🚨 REAL-TIME DURESS INCIDENT: Ramesh Kumar transfer of ₹{activeEscrow.amount.toLocaleString('en-IN')} held in Escrow ({formatCountdown(countdown)} remaining).
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isSenior && (
              <button
                onClick={() => setPortalSubTab('guardian')}
                className="px-3 py-1 rounded bg-white text-rose-700 font-extrabold hover:bg-rose-50 transition text-xs shadow-xs cursor-pointer"
              >
                Inspect Deck
              </button>
            )}
            <button
              onClick={handleFreezeAndAbort}
              className="px-3 py-1 rounded bg-rose-950 text-white font-extrabold hover:bg-rose-900 transition text-xs border border-rose-400 cursor-pointer"
            >
              Instant Freeze
            </button>
          </div>
        </div>
      )}
    </>
  );
};
