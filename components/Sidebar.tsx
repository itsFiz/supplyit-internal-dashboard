'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Flag, Wallet, Menu, X, BarChart3, FileText, Settings, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/milestones', label: 'Milestones', icon: Flag },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/roadmap', label: 'Roadmap', icon: TrendingUp },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-3 glass-effect rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-72 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-white/10
        transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col p-6
      `}>
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              S
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">SupplyIT</h1>
            <p className="text-xs text-slate-400">Internal Dashboard</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link 
              key={href} 
              href={href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${pathname === href 
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30 shadow-lg' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }
              `}
            >
              <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-purple-400' : 'text-slate-400 group-hover:text-white'}`} />
              <span className="font-medium">{label}</span>
              {pathname === href && (
                <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
        </nav>
        
        {/* User section */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                M
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">Mariana Silva</p>
              <p className="text-xs text-slate-400">Founder & CEO</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
} 