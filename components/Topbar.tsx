import { Bell } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur rounded-lg shadow mb-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Type to search"
          className="w-full max-w-xs px-4 py-2 rounded bg-zinc-900 text-zinc-100 placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell className="w-6 h-6 text-zinc-400" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full bg-zinc-700" />
      </div>
    </header>
  );
} 