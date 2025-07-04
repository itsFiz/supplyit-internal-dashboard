'use client';

import { useState } from 'react';
import { CheckCircle, Clock, Target, Calendar, Plus } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'MVP Development',
    description: 'Core platform development and feature implementation',
    status: 'in-progress',
    progress: 75,
    dueDate: '2024-03-31',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Beta Testing',
    description: 'Internal beta testing phase with core team',
    status: 'pending',
    progress: 0,
    dueDate: '2024-04-15',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Pilot Client Onboarding',
    description: 'First 3 pilot clients integration',
    status: 'completed',
    progress: 100,
    dueDate: '2024-02-28',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Investor Pitch Deck',
    description: 'Prepare Series A funding presentation',
    status: 'in-progress',
    progress: 60,
    dueDate: '2024-05-01',
    priority: 'high'
  },
  {
    id: 5,
    title: 'Team Expansion',
    description: 'Hire key positions for growth phase',
    status: 'pending',
    progress: 0,
    dueDate: '2024-06-01',
    priority: 'medium'
  }
];

export default function MilestoneTracker() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredMilestones = selectedStatus === 'all' 
    ? milestones 
    : milestones.filter(milestone => milestone.status === selectedStatus);

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const inProgressCount = milestones.filter(m => m.status === 'in-progress').length;
  const pendingCount = milestones.filter(m => m.status === 'pending').length;

  return (
    <div className="glass-effect rounded-2xl p-6 border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Milestone Tracker</h3>
          <p className="text-slate-400 text-sm">MVP progress and project timeline</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl text-purple-300 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-slate-400 text-sm">Completed</span>
          </div>
          <p className="text-2xl font-bold text-white">{completedCount}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <span className="text-slate-400 text-sm">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-white">{inProgressCount}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-5 w-5 text-gray-400" />
            <span className="text-slate-400 text-sm">Pending</span>
          </div>
          <p className="text-2xl font-bold text-white">{pendingCount}</p>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {filteredMilestones.map((milestone) => (
          <div key={milestone.id} className={`border-2 rounded-xl p-4 ${getStatusColor(milestone.status)}`}>
            <div className="flex items-start gap-4">
              {getStatusIcon(milestone.status)}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(milestone.priority)}`}>
                      {milestone.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                      milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {milestone.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Due: {formatDate(milestone.dueDate)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-gray-300'
                    }`}
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Progress</span>
                  <span>{milestone.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 