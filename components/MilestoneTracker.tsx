const milestones = [
  { milestone: 'Design system + wireframes ready', targetDate: '2025-10-20', status: 'Pending' },
  { milestone: 'Clickable MVP prototype demo', targetDate: '2025-10-30', status: 'Pending' },
  { milestone: 'Stakeholder feedback & alignment', targetDate: '2025-11-05', status: 'Pending' },
  { milestone: 'Tech repo and infra setup', targetDate: '2025-11-10', status: 'Pending' },
  { milestone: 'Trello roadmap & task assignments', targetDate: '2025-11-15', status: 'Pending' },
  { milestone: 'Domain/email/workspace live', targetDate: '2025-11-10', status: 'Pending' },
];

export default function MilestoneTracker() {
  return (
    <div className="bg-zinc-900/80 rounded-xl p-6 shadow border border-zinc-800 w-full">
      <h2 className="text-lg font-semibold mb-4">Milestone Tracker</h2>
      <ul className="space-y-3">
        {milestones.map((m) => (
          <li key={m.milestone} className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div>
              <span className="font-medium">{m.milestone}</span>
              <span className="ml-2 text-xs text-zinc-400">({m.targetDate})</span>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300">{m.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 