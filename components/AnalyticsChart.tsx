'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 3000, expenses: 12500, profit: -9500, burnRate: 12500, runway: 18 },
  { month: 'Feb', revenue: 4500, expenses: 12500, profit: -8000, burnRate: 12500, runway: 17 },
  { month: 'Mar', revenue: 6000, expenses: 12500, profit: -6500, burnRate: 12500, runway: 16 },
  { month: 'Apr', revenue: 8000, expenses: 12500, profit: -4500, burnRate: 12500, runway: 15 },
  { month: 'May', revenue: 10000, expenses: 12500, profit: -2500, burnRate: 12500, runway: 14 },
  { month: 'Jun', revenue: 12500, expenses: 12500, profit: 0, burnRate: 12500, runway: 13 },
  { month: 'Jul', revenue: 15000, expenses: 12500, profit: 2500, burnRate: 12500, runway: 12 },
  { month: 'Aug', revenue: 18000, expenses: 12500, profit: 5500, burnRate: 12500, runway: 11 },
  { month: 'Sep', revenue: 21000, expenses: 12500, profit: 8500, burnRate: 12500, runway: 10 },
  { month: 'Oct', revenue: 24000, expenses: 12500, profit: 11500, burnRate: 12500, runway: 9 },
  { month: 'Nov', revenue: 27000, expenses: 12500, profit: 14500, burnRate: 12500, runway: 8 },
  { month: 'Dec', revenue: 30000, expenses: 12500, profit: 17500, burnRate: 12500, runway: 7 },
];

export default function AnalyticsChart() {
  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold mb-4 text-white">12-Month Financial Projection</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tickFormatter={(value) => `RM${value}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value: number, name: string) => [
              `RM${value.toLocaleString()}`, 
              name === 'revenue' ? 'Revenue' : 
              name === 'expenses' ? 'Expenses' : 
              name === 'profit' ? 'Profit/Loss' : name
            ]}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="expenses" 
            stroke="#ef4444" 
            fill="#ef4444" 
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            stroke="#3b82f6" 
            fill="#3b82f6" 
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-2">Breakeven Point</h4>
          <p className="text-green-400 font-bold">June 2024</p>
          <p className="text-slate-400 text-sm">When revenue equals expenses</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-2">Monthly Burn Rate</h4>
          <p className="text-red-400 font-bold">RM 12,500</p>
          <p className="text-slate-400 text-sm">Current monthly cash burn</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-medium mb-2">Projected Annual Revenue</h4>
          <p className="text-blue-400 font-bold">RM 195,000</p>
          <p className="text-slate-400 text-sm">Based on current trajectory</p>
        </div>
      </div>
    </div>
  );
} 