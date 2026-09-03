import React from 'react';
import { Shield, Monitor, Smartphone, ShieldAlert, Activity, LogOut, LogIn } from 'lucide-react';
import { PageStage, PortalSubTab, UserRole } from '../types/bankshield';

interface HeaderNavProps {
  pageStage: PageStage;
  setPageStage: (stage: PageStage) => void;
  portalSubTab: PortalSubTab;
  setPortalSubTab: (tab: PortalSubTab) => void;
  userRole: UserRole;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  pageStage,
  setPageStage,
  portalSubTab,
  setPortalSubTab,
  userRole,
}) => {
  if (pageStage === 'landing') {
    return (
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                BankShield<span className="text-emerald-600">.AI</span>
              </span>
              <span className="hidden sm:inline-block text-xs text-slate-500 ml-2 font-medium">
                Next-Gen Contextual Banking Security
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
            <a href="#architecture" className="hover:text-slate-900 transition">Security Architecture</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition">How It Works</a>
            <a href="#about" className="hover:text-slate-900 transition">Regulatory Compliance</a>
          </nav>

          <button
            onClick={() => setPageStage('login')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4 text-emerald-400" />
            <span>Log In to NetBanking</span>
          </button>
        </div>
      </header>
    );
  }

  if (pageStage === 'login') return null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
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

        {/* 4 Core Sub-Tabs */}
        <nav className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl">
          <button
            onClick={() => setPortalSubTab('dual')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              portalSubTab === 'dual' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Dual Screen</span>
          </button>

          <button
            onClick={() => setPortalSubTab('pay')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              portalSubTab === 'pay' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Senior /pay</span>
          </button>

          <button
            onClick={() => setPortalSubTab('guardian')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              portalSubTab === 'guardian' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Guardian /deck</span>
          </button>

          <button
            onClick={() => setPortalSubTab('audit')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              portalSubTab === 'audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-600" />
            <span className="hidden sm:inline">Audit History</span>
          </button>
        </nav>

        {/* User Profile Badge & Logout */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 pl-2 text-xs font-semibold text-slate-700">
            <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
              {userRole === 'ramesh' ? 'RK' : 'AK'}
            </div>
            <span className="hidden sm:inline font-bold">
              {userRole === 'ramesh' ? 'Ramesh (Customer)' : 'Ananya (Guardian)'}
            </span>
            <button
              onClick={() => setPageStage('landing')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
