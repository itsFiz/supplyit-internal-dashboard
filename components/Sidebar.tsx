'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Flag, 
  Wallet, 
  Menu, 
  X, 
  BarChart3, 
  Settings, 
  TrendingUp,
  Target,
  Building2,
  DollarSign,
  Code,
  Wrench,
  Megaphone,
  FolderOpen,
  Calculator,
  TrendingDown,
} from 'lucide-react';
import { useState } from 'react';

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/strategy', label: 'Strategy & Vision', icon: Target },
  { href: '/legal', label: 'Legal & Structure', icon: Building2 },
  { href: '/fundraising', label: 'Fundraising & Finance', icon: DollarSign },
  { href: '/product', label: 'Product & Tech', icon: Code },
  { href: '/operations', label: 'Operations & Pilot', icon: Wrench },
  { href: '/brand', label: 'Brand & Marketing', icon: Megaphone },
  { href: '/documents', label: 'Document Center', icon: FolderOpen },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/milestones', label: 'Milestones', icon: Flag },
  { href: '/financial-metrics', label: 'Financial Metrics', icon: Calculator },
  { href: '/financial-projections', label: 'Financial Projections', icon: TrendingDown },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
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
        fixed inset-y-0 left-0 top-0 z-40
        w-72 h-screen bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-white/10
        transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo - Fixed at top */}
        <div className="flex-shrink-0 p-6 pb-4">
          <div className="flex items-center gap-3">
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
        </div>
        
        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-6 pb-4 min-h-0 sidebar-scroll">
          <div className="flex flex-col gap-2">
            {/* Dashboard */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Dashboard</h3>
              {nav.slice(0, 1).map(({ href, label, icon: Icon }) => (
                <Link 
                  key={href} 
                  href={href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${pathname === href 
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border border-blue-500/30 shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="font-medium">{label}</span>
                  {pathname === href && (
                    <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Strategic Categories */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Strategic Planning</h3>
              {nav.slice(1, 7).map(({ href, label, icon: Icon }) => (
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
            </div>

            {/* Document Center */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Document Management</h3>
              {nav.slice(7, 8).map(({ href, label, icon: Icon }) => (
                <Link 
                  key={href} 
                  href={href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${pathname === href 
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-500/30 shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-green-400' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="font-medium">{label}</span>
                  {pathname === href && (
                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Financial Management */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Financial Management</h3>
              {nav.slice(8, 10).map(({ href, label, icon: Icon }) => (
                <Link 
                  key={href} 
                  href={href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${pathname === href 
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-500/30 shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-green-400' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="font-medium">{label}</span>
                  {pathname === href && (
                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Operations */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Operations</h3>
              {nav.slice(10, 15).map(({ href, label, icon: Icon }) => (
                <Link 
                  key={href} 
                  href={href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${pathname === href 
                      ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white border border-orange-500/30 shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-orange-400' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="font-medium">{label}</span>
                  {pathname === href && (
                    <div className="ml-auto w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">System</h3>
              {nav.slice(15).map(({ href, label, icon: Icon }) => (
                <Link 
                  key={href} 
                  href={href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${pathname === href 
                      ? 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-white border border-slate-500/30 shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-slate-400' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="font-medium">{label}</span>
                  {pathname === href && (
                    <div className="ml-auto w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        
        {/* User section - Fixed at bottom, no dropdown */}
        <div className="flex-shrink-0 p-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                F
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">Fiz</p>
              <p className="text-xs text-slate-400">Founder & CTO</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
} 