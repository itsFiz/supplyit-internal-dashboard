'use client';
import Layout from '@/components/Layout';
import KPICards from '@/components/KPICards';
import AnalyticsChart from '@/components/AnalyticsChart';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  DollarSign, 
  Target, 
  Users, 
  Building2,
  Code,
  Wrench,
  Megaphone,
  Flag,
  Wallet,
  BarChart3,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { data: session } = useSession();
  
  const strategicCategories = [
    {
      href: "/strategy",
      icon: Target,
      title: "Strategy & Vision",
      description: "Mission, UVP, GTM strategy, business model",
      color: "from-purple-500 to-blue-600"
    },
    {
      href: "/legal",
      icon: Building2,
      title: "Legal & Structure",
      description: "Incorporation, agreements, cap table",
      color: "from-blue-500 to-indigo-600"
    },
    {
      href: "/fundraising",
      icon: DollarSign,
      title: "Fundraising & Finance",
      description: "Pitch decks, projections, investor pipeline",
      color: "from-green-500 to-emerald-600"
    },
    {
      href: "/product",
      icon: Code,
      title: "Product & Tech",
      description: "MVP specs, roadmap, development tracking",
      color: "from-orange-500 to-red-600"
    },
    {
      href: "/operations",
      icon: Wrench,
      title: "Operations & Pilot",
      description: "SOPs, onboarding, KPI tracking",
      color: "from-red-500 to-pink-600"
    },
    {
      href: "/brand",
      icon: Megaphone,
      title: "Brand & Marketing",
      description: "Brand identity, launch plan, messaging",
      color: "from-pink-500 to-purple-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Dashboard
        </motion.h1>
        <motion.p 
          className="text-slate-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome back, {session?.user?.name || 'User'}! Here&apos;s an overview of SupplyIT relevant metrics.
        </motion.p>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <KPICards />
        </motion.div>

        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <AnalyticsChart />
        </motion.div>

        {/* Strategic Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Strategic Categories
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {strategicCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.href}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href={category.href}
                    className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{ 
                        rotate: 5, 
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <motion.div 
                      className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      View Details
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Quick Actions
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { href: "/milestones", icon: Flag, label: "View Milestones", color: "from-purple-500 to-pink-500" },
              { href: "/budget", icon: Wallet, label: "Check Budget", color: "from-green-500 to-emerald-500" },
              { href: "/analytics", icon: BarChart3, label: "Analytics", color: "from-blue-500 to-cyan-500" },
              { href: "/team", icon: Users, label: "Team Overview", color: "from-orange-500 to-red-500" }
            ].map((action) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={action.href}
                    className={`block p-4 rounded-xl bg-gradient-to-br ${action.color} text-white text-center hover:shadow-lg transition-all duration-300`}
                  >
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                    </motion.div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
} 