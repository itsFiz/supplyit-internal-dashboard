'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import FinancialProjectionsChart from '@/components/FinancialProjectionsChart';
import { 
  TrendingUp, 
  MapPin, 
  DollarSign,
  Target,
  BarChart3,
  Globe,
  Building2
} from 'lucide-react';

export default function FinancialProjectionsPage() {
  const [selectedRegion, setSelectedRegion] = useState<'klangValley' | 'malaysia' | 'sea'>('klangValley');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'monthly' | 'annual'>('annual');
  const [selectedScenario, setSelectedScenario] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [yearDuration, setYearDuration] = useState<number>(15);

  // Define the region type
  type RegionKey = 'klangValley' | 'malaysia' | 'sea';

  const regionData = {
    klangValley: {
      name: 'Klang Valley',
      description: 'Greater Kuala Lumpur metropolitan area',
      totalSMEs: '500,000+',
      marketSize: 'RM 2.1B',
      icon: <Building2 className="w-6 h-6" />
    },
    malaysia: {
      name: 'Malaysia',
      description: 'National market expansion',
      totalSMEs: '1.2M+',
      marketSize: 'RM 8.5B',
      icon: <MapPin className="w-6 h-6" />
    },
    sea: {
      name: 'Southeast Asia',
      description: 'Regional expansion across ASEAN',
      totalSMEs: '70M+',
      marketSize: 'RM 450B',
      icon: <Globe className="w-6 h-6" />
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Financial Projections</h1>
            <p className="text-slate-400 mt-1">Revenue projections and burn rate analysis across different markets</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl text-green-300 hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-300">
              Export Data
            </button>
            <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300">
              Update Assumptions
            </button>
          </div>
        </div>

        {/* Region Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(regionData).map(([key, data]) => (
            <div 
              key={key}
              className={`glass-effect rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedRegion === key 
                  ? 'border-green-500/50 bg-green-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedRegion(key as RegionKey)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedRegion === key 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/10 text-white/70'
                }`}>
                  {data.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{data.name}</h3>
                  <p className="text-slate-400 text-sm">{data.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Total SMEs</span>
                  <span className="text-white font-medium">{data.totalSMEs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Market Size</span>
                  <span className="text-white font-medium">{data.marketSize}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-1">
            <button 
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === 'monthly' 
                  ? 'bg-green-500 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedTimeframe('monthly')}
            >
              Monthly View
            </button>
            <button 
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === 'annual' 
                  ? 'bg-green-500 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedTimeframe('annual')}
            >
              Annual View
            </button>
          </div>
        </div>

        {/* Main Chart */}
        <FinancialProjectionsChart 
          region={selectedRegion} 
          timeframe={selectedTimeframe}
          scenario={selectedScenario}
          selectedYear={selectedYear}
          yearDuration={yearDuration}
          onRegionChange={setSelectedRegion}
          onTimeframeChange={setSelectedTimeframe}
          onScenarioChange={setSelectedScenario}
          onYearChange={setSelectedYear}
          onYearDurationChange={setYearDuration}
        />

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Growth Rate</p>
                <p className="text-xl font-bold text-white">
                  {selectedScenario === 'low' ? '5%' : 
                   selectedScenario === 'medium' ? '8%' : '12%'}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Monthly revenue growth</p>
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Breakeven Timeline</p>
                <p className="text-xl font-bold text-white">
                  {selectedScenario === 'low' ? '2028-2029' : 
                   selectedScenario === 'medium' ? '2027-2028' : '2026-2027'}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">20-year projection</p>
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Market Potential</p>
                <p className="text-xl font-bold text-white">
                  {selectedRegion === 'klangValley' ? 'RM 2.1B' : 
                   selectedRegion === 'malaysia' ? 'RM 8.5B' : 'RM 450B'}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Total addressable market</p>
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Revenue per SME</p>
                <p className="text-xl font-bold text-white">RM 828</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Monthly average</p>
          </div>
        </div>

        {/* Assumptions and Methodology */}
        <div className="glass-effect rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">20-Year Projection Assumptions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Revenue Model</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">SaaS Subscription</span>
                  <span className="text-white">RM 349/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Delivery Commissions</span>
                  <span className="text-white">RM 400/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Analytics/Add-ons</span>
                  <span className="text-white">RM 79/month</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-white font-medium">Total per SME</span>
                  <span className="text-green-400 font-bold">RM 828/month</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Dynamic Burn Rate Model</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Phase 1 (2026-2028)</span>
                  <span className="text-white">Team expansion: +15% annually</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Phase 2 (2029-2032)</span>
                  <span className="text-white">Market scaling: +25% annually</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Phase 3 (2033-2040)</span>
                  <span className="text-white">Global expansion: +20% annually</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Phase 4 (2041-2045)</span>
                  <span className="text-white">Optimization: +10% annually</span>
                </div>
                <div className="text-slate-400 text-xs mt-3">
                  * Regional multipliers: Klang Valley (1x), Malaysia (1.5x), SEA (2.5x)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 