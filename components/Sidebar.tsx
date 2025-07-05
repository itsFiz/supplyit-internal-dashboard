'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X,
} from 'lucide-react';
import { 
  getNavigationByCategory, 
  CATEGORY_ORDER, 
  getCategoryStyling,
  getRoleDisplayName,
  getRoleDescription,

} from '../lib/navigation';
import { Role } from '../lib/rbac';

interface SidebarProps {
  currentRole?: Role;
}

export default function Sidebar({ currentRole }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Get user role from session or prop, default to TEAM if not available
  const userRole = currentRole || (session?.user?.role as Role) || 'TEAM';

  // Debug logging
  console.log('Sidebar rendered with role:', userRole, 'currentRole prop:', currentRole);

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

  // Get navigation items for current user role
  const navigationByCategory = getNavigationByCategory(userRole);

  // Debug logging for navigation changes
  console.log('Sidebar navigation updated for role:', userRole);
  console.log('Available categories:', Object.keys(navigationByCategory));
  Object.entries(navigationByCategory).forEach(([category, items]) => {
    console.log(`${category}: ${items.length} items`);
  });

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
          key={userRole}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              animate={currentRole ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
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
              {currentRole && (
                <p className="text-xs text-yellow-400 mt-1">
                  Testing: {getRoleDisplayName(userRole)}
                </p>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-6 pb-4 min-h-0 sidebar-scroll">
          <div className="flex flex-col gap-2">
            {/* Render navigation by category */}
            {CATEGORY_ORDER.map((category, categoryIndex) => {
              const items = navigationByCategory[category];
              if (!items || items.length === 0) return null;
              
              const styling = getCategoryStyling(category);
              
              return (
                <motion.div 
                  key={category}
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
                >
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
                    {category} ({items.length})
                  </h3>
                  {items.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <motion.div
                        key={item.href}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link 
                          href={item.href} 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`
                            group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                            ${isActive 
                              ? `bg-gradient-to-r ${styling.gradient} text-white border ${styling.borderColor} shadow-lg` 
                              : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                            }
                          `}
                          title={item.description}
                        >
                          <motion.div
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? styling.iconColor : 'text-slate-400 group-hover:text-white'}`} />
                          </motion.div>
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                          {isActive && (
                            <motion.div 
                              className={`ml-auto w-2 h-2 ${styling.dotColor} rounded-full`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            ></motion.div>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>
        </nav>
        
        {/* User section - Fixed at bottom */}
        <motion.div 
          className="flex-shrink-0 p-6 pt-4 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold cursor-pointer border-2 border-white/10">
                {session?.user?.name?.[0] || 'U'}
              </div>
              <motion.div 
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {getRoleDisplayName(userRole)}
                {currentRole && (
                  <span className="ml-2 px-1 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                    TEST
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {getRoleDescription(userRole)}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
} 