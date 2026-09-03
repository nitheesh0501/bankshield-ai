'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, UserCheck, LayoutGrid, Home, Zap } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Landing Page',
      shortLabel: 'Home',
      icon: Home,
    },
    {
      href: '/pay',
      label: 'Senior Banking Client (/pay)',
      shortLabel: 'Customer',
      icon: UserCheck,
    },
    {
      href: '/guardian',
      label: 'Guardian Safety Deck (/guardian)',
      shortLabel: 'Guardian',
      icon: Shield,
    },
    {
      href: '/demo',
      label: 'Split Presentation View (/demo)',
      shortLabel: 'Demo Split',
      icon: LayoutGrid,
    },
  ];

  const isLanding = pathname === '/';

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 ${
      isLanding
        ? 'border-black/[0.08] bg-[#F4F4F0]/90 text-[#141414]'
        : 'border-obsidian-border bg-obsidian/90 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 p-0.5 shadow-md">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                isLanding ? 'bg-[#F4F4F0]' : 'bg-obsidian'
              }`}>
                <Shield className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-lg sm:text-xl tracking-tight ${
                  isLanding ? 'text-[#141414]' : 'text-white'
                }`}>
                  BANKSHIELD<span className="text-emerald-500">.AI</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                  <Zap className="w-2.5 h-2.5 mr-0.5" /> EDGE
                </span>
              </div>
              <p className={`text-[11px] font-medium hidden sm:block ${
                isLanding ? 'text-slate-600' : 'text-slate-400'
              }`}>
                "Stop the Scam Before the Money Moves"
              </p>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className={`flex items-center gap-1 p-1.5 rounded-xl border ${
            isLanding
              ? 'bg-black/[0.04] border-black/[0.08]'
              : 'bg-obsidian-card border-obsidian-border'
          }`}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? isLanding
                        ? 'bg-[#1A1A1A] text-white shadow-sm'
                        : 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : isLanding
                        ? 'text-slate-700 hover:text-black hover:bg-black/[0.05]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-hover'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${
                    isActive
                      ? isLanding ? 'text-emerald-400' : 'text-emerald-400'
                      : isLanding ? 'text-slate-500' : 'text-slate-400'
                  }`} />
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="md:hidden">{item.shortLabel}</span>
                </Link>
              );
            })}
          </nav>

          {/* Status Badge */}
          <div className="hidden lg:block">
            <StatusBadge />
          </div>
        </div>
      </div>
    </header>
  );
}
