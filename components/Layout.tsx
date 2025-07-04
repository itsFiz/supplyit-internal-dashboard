import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative z-10 ml-72">
        <Topbar />
        <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8">
          <div className="glass-effect rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 min-h-[calc(100vh-200px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 