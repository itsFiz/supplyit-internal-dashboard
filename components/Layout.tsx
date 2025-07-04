'use client';
import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import RoleSwitcher from './RoleSwitcher';
import { motion } from 'framer-motion';
import { Role } from '../lib/rbac';

export default function Layout({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role>('FOUNDER');

  const handleRoleChange = (newRole: Role) => {
    console.log('=== LAYOUT ROLE CHANGE ===');
    console.log('Previous role:', currentRole);
    console.log('New role:', newRole);
    console.log('Setting new role...');
    setCurrentRole(newRole);
    console.log('Role set successfully');
    console.log('=== LAYOUT ROLE CHANGE COMPLETE ===');
  };

  // Debug logging
  console.log('Layout rendered with role:', currentRole);

  // Monitor role changes
  useEffect(() => {
    console.log('=== ROLE CHANGE DETECTED ===');
    console.log('New role in effect:', currentRole);
    console.log('=== ROLE CHANGE EFFECT COMPLETE ===');
  }, [currentRole]);

  return (
    <motion.div 
      className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-40 left-40 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        ></motion.div>
      </div>
      
      <Sidebar currentRole={currentRole} key={currentRole} />
      <motion.div 
        className="flex-1 flex flex-col min-w-0 relative z-10 ml-72"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Topbar />
        <motion.main 
          className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Role indicator for testing */}
          <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-400">
              <strong>Testing Mode:</strong> Current Role: {currentRole}
            </p>
          </div>
          
          <motion.div 
            className="glass-effect rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 min-h-[calc(100vh-200px)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {children}
          </motion.div>
        </motion.main>
      </motion.div>
      
      {/* Role Switcher for Development - Positioned to avoid sidebar */}
      <div className="fixed top-4 right-4 z-[100] md:right-6">
        <RoleSwitcher currentRole={currentRole} onRoleChange={handleRoleChange} />
      </div>
    </motion.div>
  );
} 