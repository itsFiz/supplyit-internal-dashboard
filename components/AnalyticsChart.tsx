'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 12000, expenses: 8000, profit: 4000 },
  { month: 'Feb', revenue: 15000, expenses: 9000, profit: 6000 },
  { month: 'Mar', revenue: 18000, expenses: 11000, profit: 7000 },
  { month: 'Apr', revenue: 22000, expenses: 13000, profit: 9000 },
  { month: 'May', revenue: 25000, expenses: 14000, profit: 11000 },
  { month: 'Jun', revenue: 28000, expenses: 16000, profit: 12000 },
];

export default function AnalyticsChart() {
  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold mb-4 text-white">Financial Performance</h3>
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
            tickFormatter={(value) => `$${value}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stackId="1"
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="expenses" 
            stackId="1"
            stroke="#ef4444" 
            fill="#ef4444" 
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            stackId="1"
            stroke="#3b82f6" 
            fill="#3b82f6" 
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 