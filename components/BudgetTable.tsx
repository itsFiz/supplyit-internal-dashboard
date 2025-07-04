const data = [
  { category: 'UI/UX Design', estCost: 8000, notes: 'Wireframes, prototype, feedback loops' },
  { category: 'Initial Dev Setup', estCost: 10000, notes: 'Basic frontend/backend, repo setup' },
  { category: 'Domain & Infra', estCost: 5000, notes: 'Google Workspace, domain, hosting' },
  { category: 'Ops & Admin', estCost: 2000, notes: 'Pre-incorporation tasks, templates, compliance docs' },
];

export default function BudgetTable() {
  return (
    <div className="bg-zinc-900/80 rounded-xl p-6 shadow border border-zinc-800 w-full">
      <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-zinc-400 text-xs uppercase">
            <th className="py-2">Category</th>
            <th className="py-2">Est. Cost (RM)</th>
            <th className="py-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.category} className="border-t border-zinc-800">
              <td className="py-2 font-medium">{row.category}</td>
              <td className="py-2">RM {row.estCost.toLocaleString()}</td>
              <td className="py-2 text-zinc-400">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 