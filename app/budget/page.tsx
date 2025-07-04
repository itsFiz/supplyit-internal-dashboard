'use client';
import Layout from '@/components/Layout';
import BudgetTable from '@/components/BudgetTable';
import PageWrapper from '@/components/PageWrapper';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export default function BudgetPage() {
  const budgetStats = [
    { label: 'Total Budget', value: 'RM 225,000', icon: DollarSign, color: 'from-blue-500 to-cyan-500' },
    { label: 'Spent', value: 'RM 37,500', icon: TrendingDown, color: 'from-red-500 to-pink-500' },
    { label: 'Remaining', value: 'RM 187,500', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Runway', value: '18 months', icon: Calendar, color: 'from-purple-500 to-pink-500' }
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
      <PageWrapper 
        title="Budget Management"
        description="Track your capital usage, financial projections, and spending analytics."
      >
        {/* Budget Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {budgetStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Budget Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <BudgetTable />
        </motion.div>
      </PageWrapper>
    </Layout>
  );
} 