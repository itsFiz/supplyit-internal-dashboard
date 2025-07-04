import { TrendingUp, TrendingDown, DollarSign, Target, Calendar } from 'lucide-react';

export default function KPICards() {
  // Financial data calculations
  const monthlyBurnRate = 12500; // RM
  const cashOnHand = 225000; // RM
  const runwayMonths = Math.floor(cashOnHand / monthlyBurnRate);
  const runwayStatus = runwayMonths <= 6 ? 'critical' : runwayMonths <= 12 ? 'warning' : 'healthy';
  
  const kpis = [
    { 
      label: "Monthly Burn Rate", 
      value: `RM ${monthlyBurnRate.toLocaleString()}`, 
      change: '+5.9%', 
      positive: false,
      icon: TrendingDown,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-500/20 to-pink-500/20',
      borderColor: 'border-red-500/30'
    },
    { 
      label: 'Cash Runway', 
      value: `${runwayMonths} months`, 
      change: runwayStatus === 'critical' ? 'Critical' : runwayStatus === 'warning' ? 'Warning' : 'Healthy', 
      positive: runwayStatus === 'healthy',
      icon: Calendar,
      color: runwayStatus === 'critical' ? 'from-red-500 to-orange-500' : 
             runwayStatus === 'warning' ? 'from-yellow-500 to-orange-500' : 'from-green-500 to-emerald-500',
      bgColor: runwayStatus === 'critical' ? 'from-red-500/20 to-orange-500/20' : 
               runwayStatus === 'warning' ? 'from-yellow-500/20 to-orange-500/20' : 'from-green-500/20 to-emerald-500/20',
      borderColor: runwayStatus === 'critical' ? 'border-red-500/30' : 
                  runwayStatus === 'warning' ? 'border-yellow-500/30' : 'border-green-500/30'
    },
    { 
      label: 'Cash on Hand', 
      value: `RM ${cashOnHand.toLocaleString()}`, 
      change: 'Based on current burn', 
      positive: true,
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    { 
      label: 'Months to Breakeven', 
      value: '8 months', 
      change: '+47% growth needed', 
      positive: true,
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div 
            key={kpi.label} 
            className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${kpi.bgColor} border ${kpi.borderColor} card-hover`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            {/* Icon */}
            <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-4 shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <p className="text-slate-300 text-sm font-medium mb-1">{kpi.label}</p>
              <p className="text-2xl font-bold text-white mb-2">{kpi.value}</p>
              <div className="flex items-center gap-2">
                {kpi.positive ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-medium ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.change}
                </span>
              </div>
            </div>
            
            {/* Animated border */}
            <div className={`absolute inset-0 rounded-2xl border-2 ${kpi.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          </div>
        );
      })}
    </div>
  );
} 