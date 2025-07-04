import Layout from '../../components/Layout';
import { Calendar, CheckCircle, Clock, Target } from 'lucide-react';

export default function Roadmap() {
  const roadmapItems = [
    {
      phase: 'Phase 1: Foundation',
      status: 'completed',
      items: [
        { title: 'Company Incorporation', status: 'completed', date: 'Jan 2024' },
        { title: 'Core Team Formation', status: 'completed', date: 'Feb 2024' },
        { title: 'Initial Funding Round', status: 'completed', date: 'Mar 2024' },
      ]
    },
    {
      phase: 'Phase 2: MVP Development',
      status: 'in-progress',
      items: [
        { title: 'Platform Architecture', status: 'completed', date: 'Apr 2024' },
        { title: 'Core Features Development', status: 'in-progress', date: 'May 2024' },
        { title: 'Beta Testing', status: 'pending', date: 'Jun 2024' },
      ]
    },
    {
      phase: 'Phase 3: Market Entry',
      status: 'pending',
      items: [
        { title: 'Pilot Client Onboarding', status: 'pending', date: 'Jul 2024' },
        { title: 'Market Validation', status: 'pending', date: 'Aug 2024' },
        { title: 'Series A Funding', status: 'pending', date: 'Sep 2024' },
      ]
    },
    {
      phase: 'Phase 4: Scale',
      status: 'pending',
      items: [
        { title: 'Team Expansion', status: 'pending', date: 'Oct 2024' },
        { title: 'Market Expansion', status: 'pending', date: 'Nov 2024' },
        { title: 'International Launch', status: 'pending', date: 'Dec 2024' },
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Target className="h-5 w-5 text-gray-400" />;
      default:
        return <Target className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'in-progress':
        return 'border-blue-200 bg-blue-50';
      case 'pending':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Product Roadmap</h1>
            <p className="text-slate-400 mt-1">Strategic timeline and milestone planning</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl text-purple-300 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
              Export Timeline
            </button>
            <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300">
              Add Milestone
            </button>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-8">
          {roadmapItems.map((phase, phaseIndex) => (
            <div key={phaseIndex} className={`border-2 rounded-2xl p-6 ${getStatusColor(phase.status)}`}>
              <div className="flex items-center gap-3 mb-6">
                {getStatusIcon(phase.status)}
                <h2 className="text-xl font-semibold text-gray-900">{phase.phase}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                  phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {phase.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-4">
                {phase.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                    {getStatusIcon(item.status)}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Completed</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">4</p>
            <p className="text-slate-400 text-sm">Milestones achieved</p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">In Progress</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">2</p>
            <p className="text-slate-400 text-sm">Active milestones</p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-500/20 rounded-xl">
                <Target className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Pending</h3>
            </div>
            <p className="text-3xl font-bold text-gray-400">6</p>
            <p className="text-slate-400 text-sm">Upcoming milestones</p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 