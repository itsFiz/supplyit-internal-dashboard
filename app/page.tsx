'use client';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, DollarSign, Target, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster="/video-poster.jpg"
        >
          <source src="/supplyit-background.mp4" type="video/mp4" />
          <source src="/supplyit-background.webm" type="video/webm" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"
          animate={{ 
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"
          animate={{ 
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"
          animate={{ 
            x: [0, 20, -30, 0],
            y: [0, -20, 50, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-2xl backdrop-blur-sm"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <Zap className="h-10 w-10 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            SupplyIT
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Dashboard
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Executive oversight dashboard for SupplyIT&apos;s B2B logistics SaaS platform. 
            <span className="text-blue-300"> Monitor KPIs, track budget, manage milestones, and oversee team performance.</span>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/dashboard"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 backdrop-blur-sm"
              >
                <span className="relative z-10">Access Dashboard</span>
                <motion.div
                  className="ml-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/auth/signin"
                className="group relative inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-white/10 transform hover:scale-105"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            {
              icon: TrendingUp,
              title: "KPI Dashboard",
              description: "Real-time performance metrics and key indicators with advanced analytics",
              color: "from-blue-500 to-blue-600",
              bgColor: "from-blue-500/20 to-blue-500/20"
            },
            {
              icon: DollarSign,
              title: "Budget Management",
              description: "Track capital usage, financial projections, and spending analytics",
              color: "from-green-500 to-emerald-600",
              bgColor: "from-green-500/20 to-emerald-500/20"
            },
            {
              icon: Target,
              title: "Milestone Tracker",
              description: "Monitor MVP progress, project timelines, and milestone completion",
              color: "from-purple-500 to-pink-600",
              bgColor: "from-purple-500/20 to-pink-500/20"
            },
            {
              icon: Users,
              title: "Team Overview",
              description: "Manage headcount planning, team performance, and resource allocation",
              color: "from-orange-500 to-red-600",
              bgColor: "from-orange-500/20 to-red-500/20"
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgColor} rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10">
                  <motion.div 
                    className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* RBAC Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 2.0, type: "spring", stiffness: 200 }}
          >
            <Shield className="h-8 w-8 text-white" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            Role-Based Access Control
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            Secure dashboard with granular permissions. Different access levels for executives, managers, and team members.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            {[
              { role: "Executive", access: "Full dashboard access, financial data, strategic planning" },
              { role: "Manager", access: "Team management, project tracking, operational metrics" },
              { role: "Team Member", access: "Personal tasks, milestone updates, basic analytics" }
            ].map((level, index) => (
              <motion.div
                key={level.role}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">{level.role}</h3>
                <p className="text-gray-300 text-sm">{level.access}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.0 }}
        >
          <p className="text-gray-400 text-sm mb-4">
            Built with Next.js, Prisma, and Tailwind CSS • Secure • Scalable • Modern
          </p>
          <motion.a 
            href="https://f12.gg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm">Powered by </span>
            <span className="pl-2 text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
              F12.GG
            </span>
            <motion.svg 
              className="ml-1 h-3 w-3 text-gray-400 group-hover:text-blue-400 transition-all duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
