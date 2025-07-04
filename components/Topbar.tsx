'use client';
import { Bell, Search, User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Topbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [notifications] = useState([
    { id: 1, message: 'New milestone completed', time: '2 hours ago', read: false },
    { id: 2, message: 'Budget alert: 80% of monthly budget used', time: '4 hours ago', read: false },
    { id: 3, message: 'Team member joined: Sarah Chen', time: '1 day ago', read: true },
  ]);

  const userRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Format today's date
  const formatTodayDate = () => {
    const today = new Date();
    const month = today.toLocaleDateString('en-US', { month: 'short' });
    const year = today.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <motion.header 
      className="bg-slate-900/50 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <motion.div 
          className="flex-1 max-w-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Date Display */}
        <motion.div 
          className="hidden md:flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <span className="text-sm font-medium">{formatTodayDate()}</span>
        </motion.div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.div 
            className="relative" 
            ref={notificationRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              className="relative p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
              onClick={() => setOpenDropdown(openDropdown === 'notifications' ? null : 'notifications')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {openDropdown === 'notifications' && (
                <motion.div 
                  className="absolute right-0 mt-2 w-80 bg-slate-900/95 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors duration-200 ${!notification.read ? 'bg-blue-500/10' : ''}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <p className="text-white text-sm">{notification.message}</p>
                        <p className="text-slate-400 text-xs mt-1">{notification.time}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* User Menu */}
          <motion.div 
            className="relative" 
            ref={userRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-white/10"
              onClick={() => setOpenDropdown(openDropdown === 'user' ? null : 'user')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              F
            </motion.button>
            <motion.div 
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            
            <AnimatePresence>
              {openDropdown === 'user' && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 bg-slate-900/95 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">View Profile</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      href="/help"
                      className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span className="text-sm">Help</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
} 