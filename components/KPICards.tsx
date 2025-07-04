import { TrendingUp, TrendingDown, DollarSign, Users, Target, Calendar } from 'lucide-react';

export default function KPICards() {
  const kpis = [
    { 
      label: "Today's Spend", 
      value: 'RM 1,200', 
      change: '+5.2%', 
      positive: true,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30'
    },
    { 
      label: 'Total Budget', 
      value: 'RM 25,000', 
      change: '80% used', 
      positive: true,
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    { 
      label: 'Milestones Complete', 
      value: '1/5', 
      change: '20%', 
      positive: true,
      icon: Calendar,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
    { 
      label: 'Team Members', 
      value: '3', 
      change: '+1 this month', 
      positive: true,
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30'
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