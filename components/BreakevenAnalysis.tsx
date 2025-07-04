'use client';

import { useState, useEffect } from 'react';
import { Target, TrendingUp, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';

interface BreakevenData {
  fixedCosts: number;
  variableCosts: number;
  currentRevenue: number;
  targetRevenue: number;
  currentUnits: number;
  targetUnits: number;
  pricePerUnit: number;
  contributionMargin: number;
  breakevenUnits: number;
  breakevenRevenue: number;
  monthsToBreakeven: number;
  breakevenDate: string;
}

export default function BreakevenAnalysis() {
  const [breakevenData, setBreakevenData] = useState<BreakevenData>({
    fixedCosts: 12500,
    variableCosts: 0.30, // 30% of revenue
    currentRevenue: 8500,
    targetRevenue: 12500,
    currentUnits: 100,
    targetUnits: 147,
    pricePerUnit: 85,
    contributionMargin: 0.70, // 70% contribution margin
    breakevenUnits: 147,
    breakevenRevenue: 12500,
    monthsToBreakeven: 8,
    breakevenDate: '2025-08-15'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateBreakeven = () => {
    const contributionMarginPerUnit = breakevenData.pricePerUnit * breakevenData.contributionMargin;
    const breakevenUnits = Math.ceil(breakevenData.fixedCosts / contributionMarginPerUnit);
    const breakevenRevenue = breakevenUnits * breakevenData.pricePerUnit;
    
    const monthlyGrowth = (breakevenData.targetRevenue - breakevenData.currentRevenue) / breakevenData.monthsToBreakeven;
    const monthsToBreakeven = Math.ceil((breakevenData.targetRevenue - breakevenData.currentRevenue) / monthlyGrowth);

    setBreakevenData(prev => ({
      ...prev,
      breakevenUnits,
      breakevenRevenue,
      monthsToBreakeven
    }));
  };

  useEffect(() => {
    calculateBreakeven();
  }, []);

  const getStatusColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (percentage >= 75) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    if (percentage >= 50) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    return 'text-red-500 bg-red-500/10 border-red-500/20';
  };

  const getStatusIcon = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return <CheckCircle className="w-5 h-5" />;
    if (percentage >= 75) return <TrendingUp className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5" />;
  };

  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Breakeven Analysis</h3>
          <p className="text-slate-400 text-sm">Calculate when your business will become profitable</p>
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
        >
          {showAdvanced ? 'Simple View' : 'Advanced View'}
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-slate-400 text-sm">Breakeven Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(breakevenData.breakevenRevenue)}</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400 text-sm">Breakeven Units</span>
          </div>
          <p className="text-2xl font-bold text-white">{breakevenData.breakevenUnits}</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-slate-400 text-sm">Months to Breakeven</span>
          </div>
          <p className="text-2xl font-bold text-white">{breakevenData.monthsToBreakeven}</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-5 h-5 text-orange-400" />
            <span className="text-slate-400 text-sm">Contribution Margin</span>
          </div>
          <p className="text-2xl font-bold text-white">{(breakevenData.contributionMargin * 100).toFixed(0)}%</p>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Revenue Progress */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-3">Revenue Progress</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Current Revenue</span>
              <span className="text-white">{formatCurrency(breakevenData.currentRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Target Revenue</span>
              <span className="text-white">{formatCurrency(breakevenData.targetRevenue)}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(breakevenData.currentRevenue / breakevenData.targetRevenue) * 100}%` }}
              ></div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${getStatusColor(breakevenData.currentRevenue, breakevenData.targetRevenue)}`}>
              {getStatusIcon(breakevenData.currentRevenue, breakevenData.targetRevenue)}
              <span className="text-sm font-medium">
                {((breakevenData.currentRevenue / breakevenData.targetRevenue) * 100).toFixed(1)}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Units Progress */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-3">Units Progress</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Current Units</span>
              <span className="text-white">{breakevenData.currentUnits}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Target Units</span>
              <span className="text-white">{breakevenData.targetUnits}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(breakevenData.currentUnits / breakevenData.targetUnits) * 100}%` }}
              ></div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${getStatusColor(breakevenData.currentUnits, breakevenData.targetUnits)}`}>
              {getStatusIcon(breakevenData.currentUnits, breakevenData.targetUnits)}
              <span className="text-sm font-medium">
                {((breakevenData.currentUnits / breakevenData.targetUnits) * 100).toFixed(1)}% Complete
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Calculations */}
      {showAdvanced && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <h4 className="text-white font-medium mb-4">Detailed Calculations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-slate-300 font-medium mb-3">Cost Structure</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Fixed Costs (Monthly)</span>
                  <span className="text-white">{formatCurrency(breakevenData.fixedCosts)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Variable Cost %</span>
                  <span className="text-white">{(breakevenData.variableCosts * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Price per Unit</span>
                  <span className="text-white">{formatCurrency(breakevenData.pricePerUnit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contribution Margin</span>
                  <span className="text-white">{(breakevenData.contributionMargin * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-slate-300 font-medium mb-3">Breakeven Formula</h5>
              <div className="space-y-2 text-sm">
                <div className="text-slate-400">
                  <p>Breakeven Units = Fixed Costs ÷ Contribution Margin per Unit</p>
                  <p className="text-white mt-1">
                    {breakevenData.fixedCosts} ÷ {(breakevenData.pricePerUnit * breakevenData.contributionMargin).toFixed(0)} = {breakevenData.breakevenUnits} units
                  </p>
                </div>
                <div className="text-slate-400 mt-3">
                  <p>Breakeven Revenue = Breakeven Units × Price per Unit</p>
                  <p className="text-white mt-1">
                    {breakevenData.breakevenUnits} × {breakevenData.pricePerUnit} = {formatCurrency(breakevenData.breakevenRevenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assumptions and Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-3">Key Assumptions</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300">Fixed costs remain constant</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300">Linear growth trajectory</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300">No major market disruptions</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300">Pricing model maintained</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-3">Risk Factors</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300">Cost inflation</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300">Market competition</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300">Economic downturn</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300">Regulatory changes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 