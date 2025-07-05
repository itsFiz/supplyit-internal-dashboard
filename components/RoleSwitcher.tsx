'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Shield, Eye } from 'lucide-react';
import { Role } from '../lib/rbac';
import { getRoleDisplayName, getRoleDescription } from '../lib/navigation';

interface RoleSwitcherProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

const ROLES: Role[] = [
  'FOUNDER',
  'SUPER_ADMIN',
  'FINANCE_CONTROLLER',
  'PRODUCT_OWNER',
  'OPS_MANAGER',
  'TECH_LEAD',
  'STRATEGY_LEAD',
  'SALES_LEAD',
  'INVESTOR',
  'PILOT_CLIENT',
  'ADVISOR',
  'FOUNDING_TEAM',
  'TEAM',
];

const roleIcons = {
  FOUNDER: Shield,
  SUPER_ADMIN: Shield,
  FINANCE_CONTROLLER: User,
  PRODUCT_OWNER: User,
  OPS_MANAGER: User,
  TECH_LEAD: User,
  STRATEGY_LEAD: User,
  SALES_LEAD: User,
  INVESTOR: Eye,
  PILOT_CLIENT: Eye,
  ADVISOR: Eye,
  FOUNDING_TEAM: User,
  TEAM: User,
};

export default function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const CurrentIcon = roleIcons[currentRole];

  // Debug logging
  console.log('RoleSwitcher rendered with role:', currentRole);

  const handleRoleChange = (role: Role) => {
    console.log('=== ROLE SWITCH ===');
    console.log('Current role:', currentRole);
    console.log('New role:', role);
    console.log('onRoleChange function:', typeof onRoleChange);
    
    // Call the parent's onRoleChange function
    onRoleChange(role);
    
    // Close the dropdown
    setIsOpen(false);
    
    // Show a brief notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 z-[200] px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg transform transition-all duration-300 translate-x-full';
    notification.textContent = `Switched to ${getRoleDisplayName(role)}`;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
    
    console.log('=== ROLE SWITCH COMPLETE ===');
  };

  return (
    <div className="relative">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Current Role Display */}
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg border border-white/20 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 backdrop-blur-sm relative"
          onClick={() => {
            console.log('Role switcher button clicked, current state:', isOpen);
            setIsOpen(!isOpen);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          title={`Current Role: ${getRoleDisplayName(currentRole)} - Click to switch`}
        >
          <CurrentIcon className="w-4 h-4" />
          <span className="font-medium text-sm">
            {getRoleDisplayName(currentRole)}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
          {/* Development indicator */}
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          
          {/* Hover indicator */}
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-lg opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>

        {/* Role Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full right-0 mt-2 w-72 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3 border-b border-white/10">
                <h3 className="text-sm font-semibold text-white">Switch Role</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {ROLES.length} roles available - Development mode only
                </p>
              </div>
              
              <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                {ROLES.map((role, index) => {
                  const Icon = roleIcons[role];
                  const isActive = role === currentRole;
                  
                  // Debug logging for each role
                  console.log(`Rendering role ${index + 1}/${ROLES.length}:`, role, 'Active:', isActive);
                  
                  return (
                    <motion.button
                      key={role}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-white/5 ${
                        isActive 
                          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-l-2 border-purple-400' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Role button clicked:', role);
                        handleRoleChange(role);
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${isActive ? 'text-white' : 'text-slate-200'}`}>
                          {getRoleDisplayName(role)}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {getRoleDescription(role)}
                        </p>
                      </div>
                      {isActive && (
                        <motion.div 
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
              
              <div className="p-3 border-t border-white/10 bg-slate-900/50">
                <p className="text-xs text-slate-500 text-center">
                  Changes are temporary and for testing only
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            onClick={() => {
              console.log('Backdrop clicked, closing dropdown');
              setIsOpen(false);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 