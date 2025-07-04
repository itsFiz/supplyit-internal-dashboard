import { Bell, Search, Download, Filter, Calendar } from 'lucide-react';

export default function Topbar() {
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
          <span className="text-sm text-slate-300">Dec 2025</span>
        </div>

        {/* Export button */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
          <Download className="w-4 h-4 text-purple-300" />
          <span className="text-sm font-medium text-purple-300 hidden sm:inline">Export</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300">
          <Bell className="w-5 h-5 text-slate-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
        </button>

        {/* User avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform duration-300">
            M
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
        </div>
      </div>
    </header>
  );
} 