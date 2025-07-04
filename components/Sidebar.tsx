import Link from 'next/link';
import { LayoutDashboard, Users, Flag, Wallet } from 'lucide-react';

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/milestones', label: 'Milestones', icon: Flag },
  { href: '/budget', label: 'Budget', icon: Wallet },
];

export default function Sidebar() {
  return (
    <aside className="w-64 hidden md:flex flex-col bg-black/70 backdrop-blur-lg p-6 min-h-screen border-r border-zinc-800">
      <div className="mb-10 flex items-center gap-2 text-2xl font-bold">
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-8 h-8 flex items-center justify-center">C</span>
        <span>SupplyIT</span>
      </div>
      <nav className="flex flex-col gap-4">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition">
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-10 flex flex-col gap-2">
        {/* Placeholder for user avatar and notifications */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-700" />
          <span className="text-sm">Mariana</span>
        </div>
      </div>
    </aside>
  );
} 