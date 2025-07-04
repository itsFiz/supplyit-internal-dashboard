import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-zinc-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-4 md:p-8 bg-black/80 backdrop-blur rounded-lg shadow-lg m-4">
          {children}
        </main>
      </div>
    </div>
  );
} 