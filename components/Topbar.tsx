'use client';
import { Bell, Search, Download, Filter, Calendar, User, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Topbar() {
  const [openDropdown, setOpenDropdown] = useState<'notification' | 'user' | null>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        notifRef.current && !notifRef.current.contains(event.target as Node) &&
        userRef.current && !userRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignOut = () => {
    // Add sign out logic here
    setOpenDropdown(null);
    console.log('Signing out...');
  };

  // Format today's date
  const formatTodayDate = () => {
    const today = new Date();
    const month = today.toLocaleDateString('en-US', { month: 'short' });
    const year = today.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <header className="flex items-center justify-between p-4 mb-6 glass-effect rounded-2xl border border-white/10">
      {/* Left section */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects, reports, or team members..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
          />
        </div>
        <button className="p-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300">
          <Filter className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Date */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/20">
          <Calendar className="w-4 h-4 text-slate-300" />
          <span className="text-sm text-slate-300">{formatTodayDate()}</span>
        </div>

        {/* Export button */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
          <Download className="w-4 h-4 text-purple-300" />
          <span className="text-sm font-medium text-purple-300 hidden sm:inline">Export</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            className="relative p-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
            onClick={() => setOpenDropdown(openDropdown === 'notification' ? null : 'notification')}
          >
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
          </button>
          {openDropdown === 'notification' && (
            <div className="absolute right-0 mt-2 w-72 bg-slate-900/95 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-white/10 font-semibold text-slate-200">Notifications</div>
              <ul className="divide-y divide-white/10">
                <li className="px-4 py-3 hover:bg-white/5 cursor-pointer text-slate-300">New delivery assigned to you</li>
                <li className="px-4 py-3 hover:bg-white/5 cursor-pointer text-slate-300">SME &quot;ABC Retail&quot; joined the platform</li>
                <li className="px-4 py-3 hover:bg-white/5 cursor-pointer text-slate-300">System update: Analytics module improved</li>
              </ul>
              <div className="p-2 text-center text-xs text-purple-400 hover:underline cursor-pointer">View all notifications</div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="relative" ref={userRef}>
          <button
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-white/10"
            onClick={() => setOpenDropdown(openDropdown === 'user' ? null : 'user')}
          >
            F
          </button>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
          {openDropdown === 'user' && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                onClick={() => setOpenDropdown(null)}
              >
                <User className="w-4 h-4" />
                <span className="text-sm">View Profile</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 