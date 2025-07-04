'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface BudgetItem {
  id: number;
  category: string;
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
    allocated: 50000,
    spent: 32000,
    remaining: 18000,
    period: 'Q1 2024',
    status: 'on-track'
  },
  {
    id: 2,
    category: 'Marketing',
    allocated: 30000,
    spent: 15000,
    remaining: 15000,
    period: 'Q1 2024',
    status: 'under-budget'
  },
  {
    id: 3,
    category: 'Operations',
    allocated: 25000,
    spent: 22000,
    remaining: 3000,
    period: 'Q1 2024',
    status: 'on-track'
  },
  {
    id: 4,
    category: 'Legal',
    allocated: 15000,
    spent: 8000,
    remaining: 7000,
    period: 'Q1 2024',
    status: 'under-budget'
  },
  {
    id: 5,
    category: 'Infrastructure',
    allocated: 20000,
    spent: 25000,
    remaining: -5000,
    period: 'Q1 2024',
    status: 'over-budget'
  }
];

export default function BudgetTable() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1 2024');

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

  const filteredData = budgetData.filter(item => item.period === selectedPeriod);

  const totalAllocated = filteredData.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = filteredData.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = filteredData.reduce((sum, item) => sum + item.remaining, 0);

  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Budget Overview</h3>
          <p className="text-slate-400 text-sm">Capital allocation and spending tracking</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Q1 2024">Q1 2024</option>
            <option value="Q2 2024">Q2 2024</option>
            <option value="Q3 2024">Q3 2024</option>
            <option value="Q4 2024">Q4 2024</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl text-purple-300 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-green-400" />
            <span className="text-slate-400 text-sm">Total Allocated</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalAllocated)}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-red-400" />
            <span className="text-slate-400 text-sm">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-blue-400" />
            <span className="text-slate-400 text-sm">Remaining</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalRemaining)}</p>
        </div>
      </div>

      {/* Budget Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-slate-400 font-medium">Category</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Allocated</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Spent</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Remaining</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <p className="text-white font-medium">{item.category}</p>
                    <p className="text-slate-400 text-sm">{item.period}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="text-white font-medium">{formatCurrency(item.allocated)}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="text-white font-medium">{formatCurrency(item.spent)}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className={`font-medium ${item.remaining < 0 ? 'text-red-400' : 'text-white'}`}>
                    {formatCurrency(item.remaining)}
                  </p>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {getStatusIcon(item.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 