'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Download, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface BudgetItem {
  id: number;
  category: string;
  type: 'capex' | 'opex';
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
  status: 'on-track' | 'over-budget' | 'under-budget';
}

const budgetData: BudgetItem[] = [
  {
    id: 1,
    category: 'Development',
    type: 'opex',
    allocated: 50000,
    spent: 32000,
    remaining: 18000,
    period: 'Q1 2024',
    status: 'on-track'
  },
  {
    id: 2,
    category: 'Marketing',
    type: 'opex',
    allocated: 30000,
    spent: 15000,
    remaining: 15000,
    period: 'Q1 2024',
    status: 'under-budget'
  },
  {
    id: 3,
    category: 'Operations',
    type: 'opex',
    allocated: 25000,
    spent: 22000,
    remaining: 3000,
    period: 'Q1 2024',
    status: 'on-track'
  },
  {
    id: 4,
    category: 'Legal',
    type: 'opex',
    allocated: 15000,
    spent: 8000,
    remaining: 7000,
    period: 'Q1 2024',
    status: 'under-budget'
  },
  {
    id: 5,
    category: 'Infrastructure',
    type: 'capex',
    allocated: 20000,
    spent: 25000,
    remaining: -5000,
    period: 'Q1 2024',
    status: 'over-budget'
  },
  {
    id: 6,
    category: 'Office Setup',
    type: 'capex',
    allocated: 15000,
    spent: 12000,
    remaining: 3000,
    period: 'Q1 2024',
    status: 'on-track'
  },
  {
    id: 7,
    category: 'Technology Equipment',
    type: 'capex',
    allocated: 25000,
    spent: 18000,
    remaining: 7000,
    period: 'Q1 2024',
    status: 'on-track'
  }
];

export default function BudgetTable() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1 2024');
  const [selectedType, setSelectedType] = useState<'all' | 'capex' | 'opex'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'over-budget':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'under-budget':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600 bg-green-100';
      case 'over-budget':
        return 'text-red-600 bg-red-100';
      case 'under-budget':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredData = budgetData.filter(item => 
    item.period === selectedPeriod && 
    (selectedType === 'all' || item.type === selectedType) &&
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAllocated = filteredData.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = filteredData.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = filteredData.reduce((sum, item) => sum + item.remaining, 0);

  const capexData = budgetData.filter(item => item.type === 'capex' && item.period === selectedPeriod);
  const opexData = budgetData.filter(item => item.type === 'opex' && item.period === selectedPeriod);

  const capexTotal = capexData.reduce((sum, item) => sum + item.allocated, 0);
  const opexTotal = opexData.reduce((sum, item) => sum + item.allocated, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
    <div className="space-y-6">
      {/* Header Actions */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            Add Item
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Period Filter */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="Q1 2024">Q1 2024</option>
            <option value="Q2 2024">Q2 2024</option>
            <option value="Q3 2024">Q3 2024</option>
            <option value="Q4 2024">Q4 2024</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'capex' | 'opex')}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="all">All Types</option>
            <option value="capex">CAPEX</option>
            <option value="opex">OPEX</option>
          </select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search budget items..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <motion.button
            className="p-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-5 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Total Allocated', value: formatCurrency(totalAllocated), color: 'from-blue-500 to-cyan-500' },
          { label: 'Total Spent', value: formatCurrency(totalSpent), color: 'from-red-500 to-pink-500' },
          { label: 'Remaining', value: formatCurrency(totalRemaining), color: 'from-green-500 to-emerald-500' },
          { label: 'CAPEX Total', value: formatCurrency(capexTotal), color: 'from-purple-500 to-violet-500' },
          { label: 'OPEX Total', value: formatCurrency(opexTotal), color: 'from-orange-500 to-amber-500' }
        ].map((summary) => (
          <motion.div
            key={summary.label}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${summary.color} text-white`}
          >
            <h3 className="text-2xl font-bold mb-1">{summary.value}</h3>
            <p className="text-sm opacity-90">{summary.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Budget Table */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <motion.tr 
                className="bg-white/10 border-b border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Allocated</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Spent</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Remaining</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              </motion.tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredData.map((item) => (
                <motion.tr
                  key={item.id}
                  className="hover:bg-white/5 transition-colors duration-200"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{item.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'capex' 
                        ? 'text-purple-400 bg-purple-400/10 border border-purple-400/20' 
                        : 'text-orange-400 bg-orange-400/10 border border-orange-400/20'
                    }`}>
                      {item.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{formatCurrency(item.allocated)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{formatCurrency(item.spent)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm ${item.remaining < 0 ? 'text-red-400' : 'text-white'}`}>
                      {formatCurrency(item.remaining)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {getStatusIcon(item.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 