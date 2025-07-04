export default function KPICards() {
  const kpis = [
    { label: "Today's Spend", value: 'RM 1,200', change: '+5%', positive: true },
    { label: 'Total Budget', value: 'RM 25,000', change: '', positive: true },
    { label: 'Milestones Complete', value: '1/5', change: '', positive: true },
    { label: 'Team Members', value: '3', change: '', positive: true },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-zinc-900/80 rounded-xl p-6 shadow flex flex-col gap-2 border border-zinc-800">
          <span className="text-zinc-400 text-xs uppercase tracking-wider">{kpi.label}</span>
          <span className="text-2xl font-bold">{kpi.value}</span>
          {kpi.change && (
            <span className={kpi.positive ? 'text-green-400 text-xs' : 'text-red-400 text-xs'}>{kpi.change}</span>
          )}
        </div>
      ))}
    </div>
  );
} 