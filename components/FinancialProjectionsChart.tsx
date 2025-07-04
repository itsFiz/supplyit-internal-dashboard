'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Generate time-based data for different scenarios
const generateTimeData = (scenario: 'low' | 'medium' | 'high', region: 'klangValley' | 'malaysia' | 'sea') => {
  const baseRevenue = {
    klangValley: { low: 82800, medium: 248400, high: 414000 },
    malaysia: { low: 414000, medium: 1656000, high: 4140000 },
    sea: { low: 1656000, medium: 8280000, high: 20700000 }
  };

  const baseBurnRate = {
    klangValley: 125000,
    malaysia: 200000,
    sea: 500000
  };

  const monthlyGrowth = {
    low: 0.05, // 5% monthly growth
    medium: 0.08, // 8% monthly growth
    high: 0.12 // 12% monthly growth
  };

  // Burn rate growth factors based on expansion phases
  const getBurnRateGrowth = (year: number, region: string) => {
    let growthFactor = 1;
    
    // Phase 1: Initial growth (Years 1-3) - Team expansion
    if (year <= 3) {
      growthFactor = 1 + (year - 1) * 0.15; // 15% annual growth
    }
    // Phase 2: Market expansion (Years 4-7) - Regional scaling
    else if (year <= 7) {
      growthFactor = 1.45 + (year - 3) * 0.25; // 25% annual growth
    }
    // Phase 3: International expansion (Years 8-15) - Global scaling
    else if (year <= 15) {
      growthFactor = 2.45 + (year - 7) * 0.20; // 20% annual growth
    }
    // Phase 4: Mature operations (Years 16-20) - Optimization
    else {
      growthFactor = 4.05 + (year - 15) * 0.10; // 10% annual growth
    }

    // Regional multipliers
    const regionalMultiplier = {
      klangValley: 1,
      malaysia: 1.5,
      sea: 2.5
    };

    return growthFactor * regionalMultiplier[region as keyof typeof regionalMultiplier];
  };

  const data = [];
  let currentRevenue = baseRevenue[region][scenario];
  let currentBurnRate = baseBurnRate[region];

  // Generate 20 years of data (240 months)
  for (let month = 1; month <= 240; month++) {
    const year = Math.ceil(month / 12);
    const burnRateGrowth = getBurnRateGrowth(year, region);
    
    data.push({
      month: month,
      revenue: Math.round(currentRevenue),
      burnRate: Math.round(currentBurnRate * burnRateGrowth),
      year: year,
      monthName: month <= 12 ? month : ((month - 1) % 12) + 1
    });
    
    // Apply growth rate to revenue
    currentRevenue *= (1 + monthlyGrowth[scenario]);
    
    // Apply burn rate growth annually
    if (month % 12 === 0) {
      currentBurnRate *= 1.15; // 15% annual burn rate growth
    }
  }

  return data;
};

interface FinancialProjectionsChartProps {
  region: 'klangValley' | 'malaysia' | 'sea';
  timeframe: 'monthly' | 'annual';
  scenario: 'low' | 'medium' | 'high';
  selectedYear?: number;
  yearDuration?: number;
  onRegionChange?: (region: 'klangValley' | 'malaysia' | 'sea') => void;
  onTimeframeChange?: (timeframe: 'monthly' | 'annual') => void;
  onScenarioChange?: (scenario: 'low' | 'medium' | 'high') => void;
  onYearChange?: (year: number) => void;
  onYearDurationChange?: (duration: number) => void;
}

export default function FinancialProjectionsChart({ 
  region, 
  timeframe, 
  scenario,
  selectedYear = 1,
  yearDuration = 15,
  onRegionChange, 
  onTimeframeChange,
  onScenarioChange,
  onYearChange,
  onYearDurationChange
}: FinancialProjectionsChartProps) {
  const getRegionName = () => {
    switch (region) {
      case 'klangValley':
        return 'Klang Valley';
      case 'malaysia':
        return 'Malaysia';
      case 'sea':
        return 'Southeast Asia';
      default:
        return 'Klang Valley';
    }
  };

  const getScenarioName = () => {
    switch (scenario) {
      case 'low':
        return 'Low Adoption';
      case 'medium':
        return 'Medium Adoption';
      case 'high':
        return 'High Adoption';
      default:
        return 'Medium Adoption';
    }
  };

  const data = generateTimeData(scenario, region);
  
  // Filter data based on timeframe
  const filteredData = timeframe === 'monthly' 
    ? data.filter(item => item.year === selectedYear) // Filter by selected year for monthly view
    : data.filter((item, index) => (index + 1) % 12 === 0 && item.year <= yearDuration).map((item, index) => ({
        ...item,
        month: index + 1 // Reset month numbers for yearly view
      }));



  const formatXAxis = (value: number) => {
    if (timeframe === 'monthly') {
      return value.toString();
    } else {
      return (2025 + value).toString();
    }
  };

  const formatTooltip = (value: number, name: string) => {
    if (name === 'revenue') {
      return [`RM${value.toLocaleString()}`, 'Revenue'];
    } else if (name === 'burnRate') {
      return [`RM${value.toLocaleString()}`, 'Burn Rate'];
    }
    return [`RM${value.toLocaleString()}`, name];
  };

  const formatTooltipLabel = (label: string) => {
    if (timeframe === 'monthly') {
      return `Month ${label}`;
    } else {
      return (2025 + parseInt(label)).toString();
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">
          {getRegionName()} Financial Projections - {getScenarioName()}
        </h3>
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              timeframe === 'monthly' 
                ? 'bg-green-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            onClick={() => onTimeframeChange?.('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              timeframe === 'annual' 
                ? 'bg-green-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            onClick={() => onTimeframeChange?.('annual')}
          >
            Annual
          </button>
        </div>
      </div>

      {/* Year Selector for Monthly View */}
      {timeframe === 'monthly' && (
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-3">
            <label className="text-white text-sm font-medium">Select Year:</label>
            <select 
              value={selectedYear}
              onChange={(e) => onYearChange?.(parseInt(e.target.value))}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(year => (
                <option key={year} value={year} className="bg-slate-800 text-white">
                  {(2025 + year).toString()}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Year Duration Selector for Annual View */}
      {timeframe === 'annual' && (
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-3">
            <label className="text-white text-sm font-medium">Duration:</label>
            <select 
              value={yearDuration}
              onChange={(e) => onYearDurationChange?.(parseInt(e.target.value))}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
            >
              <option value={5} className="bg-slate-800 text-white">2026-2030 (5 Years)</option>
              <option value={10} className="bg-slate-800 text-white">2026-2035 (10 Years)</option>
              <option value={15} className="bg-slate-800 text-white">2026-2040 (15 Years)</option>
              <option value={20} className="bg-slate-800 text-white">2026-2045 (20 Years)</option>
            </select>
          </div>
        </div>
      )}

      {/* Scenario Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-1">
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              scenario === 'low' 
                ? 'bg-blue-500 text-white' 
                : 'text-white/70 hover:text-white'
            }`}
            onClick={() => onScenarioChange?.('low')}
          >
            Low Adoption
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              scenario === 'medium' 
                ? 'bg-blue-500 text-white' 
                : 'text-white/70 hover:text-white'
            }`}
            onClick={() => onScenarioChange?.('medium')}
          >
            Medium Adoption
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              scenario === 'high' 
                ? 'bg-blue-500 text-white' 
                : 'text-white/70 hover:text-white'
            }`}
            onClick={() => onScenarioChange?.('high')}
          >
            High Adoption
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tickFormatter={formatXAxis}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tickFormatter={(value) => `RM${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              color: 'white',
              padding: '12px'
            }}
            formatter={formatTooltip}
            labelFormatter={formatTooltipLabel}
          />
          <Legend 
            wrapperStyle={{
              color: 'white',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
            name="Revenue"
          />
          <Line 
            type="monotone" 
            dataKey="burnRate" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#ef4444', strokeWidth: 2 }}
            name="Burn Rate"
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-2">Breakeven Point</h4>
          <p className="text-green-400 font-bold">
            {data.find(d => d.revenue >= d.burnRate) 
              ? (2025 + (data.find(d => d.revenue >= d.burnRate)?.year || 0)).toString()
              : 'Not Reached'
            }
          </p>
          <p className="text-slate-400 text-sm">
            {data.find(d => d.revenue >= d.burnRate) 
              ? 'Revenue exceeds burn rate'
              : 'Revenue below burn rate'
            }
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-2">{yearDuration}-Year Revenue</h4>
          <p className="text-green-400 font-bold">
            RM{((data.find(d => d.year === yearDuration)?.revenue || 0) / 1000000).toFixed(1)}M
          </p>
          <p className="text-slate-400 text-sm">
            {timeframe === 'monthly' ? 'Monthly' : 'Annual'} at {(2025 + yearDuration).toString()}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-2">Growth Rate</h4>
          <p className="text-blue-400 font-bold">
            {scenario === 'low' ? '5%' : scenario === 'medium' ? '8%' : '12%'}
          </p>
          <p className="text-slate-400 text-sm">
            Monthly revenue growth
          </p>
        </div>
      </div>

      {/* Region Selector */}
      <div className="flex gap-2 mt-6">
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            region === 'klangValley' 
              ? 'bg-blue-500 text-white' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
          onClick={() => onRegionChange?.('klangValley')}
        >
          Klang Valley
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            region === 'malaysia' 
              ? 'bg-blue-500 text-white' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
          onClick={() => onRegionChange?.('malaysia')}
        >
          Malaysia
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            region === 'sea' 
              ? 'bg-blue-500 text-white' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
          onClick={() => onRegionChange?.('sea')}
        >
          Southeast Asia
        </button>
      </div>
    </div>
  );
} 