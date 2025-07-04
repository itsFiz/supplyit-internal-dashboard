const team = [
  { role: 'Founder / PM / Dev', involvement: 'Full-time', monthlyCost: 0, notes: 'Sweat equity, leading dev' },
  { role: 'UI/UX Intern', involvement: 'Part-time', monthlyCost: 1000, notes: 'On stipend' },
  { role: 'Freelance Dev', involvement: 'Ad-hoc', monthlyCost: 1500, notes: 'Per-task basis' },
  { role: 'Advisor', involvement: 'Advisory only', monthlyCost: 0, notes: 'Equity-based contribution' },
];

export default function TeamOverview() {
  return (
    <div className="bg-zinc-900/80 rounded-xl p-6 shadow border border-zinc-800 w-full">
      <h2 className="text-lg font-semibold mb-4">Team Overview</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-zinc-400 text-xs uppercase">
            <th className="py-2">Role</th>
            <th className="py-2">Involvement</th>
            <th className="py-2">Monthly Cost (RM)</th>
            <th className="py-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member) => (
            <tr key={member.role} className="border-t border-zinc-800">
              <td className="py-2 font-medium">{member.role}</td>
              <td className="py-2">{member.involvement}</td>
              <td className="py-2">RM {member.monthlyCost.toLocaleString()}</td>
              <td className="py-2 text-zinc-400">{member.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 