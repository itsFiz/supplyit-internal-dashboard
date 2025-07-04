'use client';
import Layout from '@/components/Layout';
import BreakevenAnalysis from '@/components/BreakevenAnalysis';
import FinancialProjectionsChart from '@/components/FinancialProjectionsChart';
import { 
  TrendingDown, 
  Calendar, 
  DollarSign, 
  Target, 
  BarChart3, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  Wrench,
  Users,
  Globe
} from 'lucide-react';

export default function FinancialMetricsPage() {
  const financialData = {
    burnRate: {
      current: 12500,
      previous: 11800,
      change: '+5.9%',
      trend: 'increasing',
      breakdown: {
        personnel: 8000,
        operations: 2500,
        marketing: 1200,
        technology: 800
      }
    },
    runway: {
      current: 18,
      unit: 'months',
      cashOnHand: 225000,
      monthlyBurn: 12500,
      critical: 6,
      warning: 12
    },
    breakeven: {
      monthlyRevenue: 8500,
      monthlyExpenses: 12500,
      gap: 4000,
      breakevenDate: '2025-08-15',
      monthsToBreakeven: 8,
      requiredGrowth: '+47%',
      assumptions: [
        'Current pricing model maintained',
        'No major cost increases',
        'Linear growth trajectory'
      ]
    },
    capexOpex: {
      capex: {
        total: 45000,
        categories: [
          { name: 'Technology Infrastructure', amount: 25000, percentage: 55.6 },
          { name: 'Office Setup', amount: 12000, percentage: 26.7 },
          { name: 'Legal & Incorporation', amount: 8000, percentage: 17.8 }
        ]
      },
      opex: {
        monthly: 12500,
        categories: [
          { name: 'Personnel', amount: 8000, percentage: 64 },
          { name: 'Operations', amount: 2500, percentage: 20 },
          { name: 'Marketing', amount: 1200, percentage: 9.6 },
          { name: 'Technology', amount: 800, percentage: 6.4 }
        ]
      }
    },
    businessModel: {
      revenueStreams: [
        {
          name: 'Transaction Fees',
          current: 2500,
          projected: 15000,
          growth: '+500%',
          description: '5% fee on delivery transactions'
        },
        {
          name: 'Subscription Fees',
          current: 0,
          projected: 8000,
          growth: 'New',
          description: 'Monthly SaaS fees for SMEs'
        },
        {
          name: 'Premium Services',
          current: 500,
          projected: 4000,
          growth: '+700%',
          description: 'Express delivery and analytics'
        }
      ],
      projections: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        revenue: [3000, 4500, 6000, 8000, 10000, 12500, 15000, 18000, 21000, 24000, 27000, 30000],
        expenses: [12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500],
        profit: [-9500, -8000, -6500, -4500, -2500, 0, 2500, 5500, 8500, 11500, 14500, 17500]
      }
    }
  };

  const getStatusColor = (value: number, thresholds: { critical: number; warning: number }) => {
    if (value <= thresholds.critical) return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (value <= thresholds.warning) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-green-500 bg-green-500/10 border-green-500/20';
  };

  const getStatusIcon = (value: number, thresholds: { critical: number; warning: number }) => {
    if (value <= thresholds.critical) return <AlertTriangle className="w-5 h-5" />;
    if (value <= thresholds.warning) return <Clock className="w-5 h-5" />;
    return <CheckCircle className="w-5 h-5" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Financial Metrics</h1>
            <p className="text-slate-400 mt-1">Comprehensive financial analysis and projections</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl text-purple-300 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
              Export Report
            </button>
            <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300">
              Update Projections
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Burn Rate */}
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Monthly Burn Rate</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(financialData.burnRate.current)}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-medium">{financialData.burnRate.change}</span>
            </div>
          </div>

          {/* Runway */}
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Cash Runway</p>
                  <p className="text-2xl font-bold text-white">{financialData.runway.current} {financialData.runway.unit}</p>
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${getStatusColor(financialData.runway.current, financialData.runway)}`}>
              {getStatusIcon(financialData.runway.current, financialData.runway)}
              <span className="text-sm font-medium">
                {financialData.runway.current <= financialData.runway.critical ? 'Critical' : 
                 financialData.runway.current <= financialData.runway.warning ? 'Warning' : 'Healthy'}
              </span>
            </div>
          </div>

          {/* Breakeven */}
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Months to Breakeven</p>
                  <p className="text-2xl font-bold text-white">{financialData.breakeven.monthsToBreakeven}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">{financialData.breakeven.requiredGrowth} growth needed</span>
            </div>
          </div>

          {/* Cash Position */}
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Cash on Hand</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(financialData.runway.cashOnHand)}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Based on current burn</span>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Burn Rate Breakdown */}
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Burn Rate Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(financialData.burnRate.breakdown).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      {category === 'personnel' && <Users className="w-4 h-4 text-blue-400" />}
                      {category === 'operations' && <Wrench className="w-4 h-4 text-green-400" />}
                      {category === 'marketing' && <Globe className="w-4 h-4 text-purple-400" />}
                      {category === 'technology' && <Building2 className="w-4 h-4 text-orange-400" />}
                    </div>
                    <span className="text-white capitalize">{category}</span>
                  </div>
                  <span className="text-white font-medium">{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Capex vs Opex */}
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Capital vs Operating Expenses</h3>
            <div className="space-y-6">
              {/* Capex */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">Capital Expenditure</h4>
                  <span className="text-white font-bold">{formatCurrency(financialData.capexOpex.capex.total)}</span>
                </div>
                <div className="space-y-2">
                  {financialData.capexOpex.capex.categories.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="text-white">{formatCurrency(item.amount)} ({item.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opex */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">Monthly Operating Expenses</h4>
                  <span className="text-white font-bold">{formatCurrency(financialData.capexOpex.opex.monthly)}</span>
                </div>
                <div className="space-y-2">
                  {financialData.capexOpex.opex.categories.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="text-white">{formatCurrency(item.amount)} ({item.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Model Projections */}
        <div className="glass-effect rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">Business Model & Revenue Projections</h3>
          
          {/* Revenue Streams */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {financialData.businessModel.revenueStreams.map((stream) => (
              <div key={stream.name} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">{stream.name}</h4>
                <p className="text-slate-400 text-sm mb-3">{stream.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Current</span>
                    <span className="text-white">{formatCurrency(stream.current)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Projected</span>
                    <span className="text-white">{formatCurrency(stream.projected)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Growth</span>
                    <span className="text-green-400 font-medium">{stream.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 12-Month Projection Chart */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-white font-medium mb-4">12-Month Financial Projection</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-2 text-slate-400">Month</th>
                    <th className="text-right py-2 px-2 text-slate-400">Revenue</th>
                    <th className="text-right py-2 px-2 text-slate-400">Expenses</th>
                    <th className="text-right py-2 px-2 text-slate-400">Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {financialData.businessModel.projections.months.map((month, index) => (
                    <tr key={month} className="border-b border-white/5">
                      <td className="py-2 px-2 text-white">{month}</td>
                      <td className="py-2 px-2 text-right text-white">{formatCurrency(financialData.businessModel.projections.revenue[index])}</td>
                      <td className="py-2 px-2 text-right text-white">{formatCurrency(financialData.businessModel.projections.expenses[index])}</td>
                      <td className={`py-2 px-2 text-right font-medium ${
                        financialData.businessModel.projections.profit[index] >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {formatCurrency(financialData.businessModel.projections.profit[index])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Breakeven Analysis */}
        <BreakevenAnalysis />

        {/* Financial Projections Chart */}
        <FinancialProjectionsChart 
          region="klangValley" 
          timeframe="annual" 
          scenario="medium"
          selectedYear={1}
          yearDuration={15}
          onRegionChange={() => {}}
          onTimeframeChange={() => {}}
          onScenarioChange={() => {}}
          onYearChange={() => {}}
          onYearDurationChange={() => {}}
        />
      </div>
    </Layout>
  );
} 