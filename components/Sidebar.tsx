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
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
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
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };



  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        className="md:hidden fixed top-4 left-4 z-50 p-3 glass-effect rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isMobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`
          fixed inset-y-0 left-0 top-0 z-40
          w-72 h-screen bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-white/10
          flex flex-col
          md:translate-x-0
        `}
        variants={sidebarVariants}
        initial={isDesktop ? "open" : "closed"}
        animate={isDesktop || isMobileMenuOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          // Debug: Force visibility for testing
          transform: isDesktop ? 'translateX(0)' : undefined
        }}
      >
        {/* Logo - Fixed at top */}
        <motion.div 
          className="flex-shrink-0 p-6 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                S
              </div>
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold gradient-text">SupplyIT</h1>
              <p className="text-xs text-slate-400">Internal Dashboard</p>
            </div>
          </div>
        </motion.div>
        
        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-6 pb-4 min-h-0 sidebar-scroll">
          <div className="flex flex-col gap-2">
            {/* Dashboard */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Dashboard</h3>
              {nav.slice(0, 1).map(({ href, label, icon: Icon }) => (
                <motion.div
                  key={href}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <Link 
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
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                    </motion.div>
                    <span className="font-medium">{label}</span>
                    {pathname === href && (
                      <motion.div 
                        className="ml-auto w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Strategic Categories */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Strategic Planning</h3>
              {nav.slice(1, 7).map(({ href, label, icon: Icon }, index) => (
                <motion.div
                  key={href}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link 
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
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-purple-400' : 'text-slate-400 group-hover:text-white'}`} />
                    </motion.div>
                    <span className="font-medium">{label}</span>
                    {pathname === href && (
                      <motion.div 
                        className="ml-auto w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Document Center */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Document Management</h3>
              {nav.slice(7, 8).map(({ href, label, icon: Icon }) => (
                <motion.div
                  key={href}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <Link 
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
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-green-400' : 'text-slate-400 group-hover:text-white'}`} />
                    </motion.div>
                    <span className="font-medium">{label}</span>
                    {pathname === href && (
                      <motion.div 
                        className="ml-auto w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Financial Management */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Financial Management</h3>
              {nav.slice(8, 10).map(({ href, label, icon: Icon }, index) => (
                <motion.div
                  key={href}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link 
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
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-green-400' : 'text-slate-400 group-hover:text-white'}`} />
                    </motion.div>
                    <span className="font-medium">{label}</span>
                    {pathname === href && (
                      <motion.div 
                        className="ml-auto w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Operations */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Operations</h3>
              {nav.slice(10, 15).map(({ href, label, icon: Icon }, index) => (
                <motion.div
                  key={href}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link 
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
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-orange-400' : 'text-slate-400 group-hover:text-white'}`} />
                    </motion.div>
                    <span className="font-medium">{label}</span>
                    {pathname === href && (
                      <motion.div 
                        className="ml-auto w-2 h-2 bg-orange-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">System</h3>
              {nav.slice(15).map(({ href, label, icon: Icon }) => (
                <motion.div
                  key={href}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <Link 
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
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className={`w-5 h-5 transition-all duration-300 ${pathname === href ? 'text-slate-400' : 'text-slate-400 group-hover:text-white'}`} />
                    </motion.div>
                    <span className="font-medium">{label}</span>
                    {pathname === href && (
                      <motion.div 
                        className="ml-auto w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </nav>
        
        {/* User section - Fixed at bottom, no dropdown */}
        <motion.div 
          className="flex-shrink-0 p-6 pt-4 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold cursor-pointer border-2 border-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              F
            </motion.div>
            <motion.div 
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <div>
              <p className="text-sm font-medium text-white">Fiz</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
} 