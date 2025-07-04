'use client';

import { useState } from 'react';
import { CheckCircle, Clock, Target, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const totalProgress = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Total Milestones', value: milestones.length.toString(), icon: Target, color: 'from-purple-500 to-pink-500' },
          { label: 'Completed', value: completedCount.toString(), icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
          { label: 'In Progress', value: inProgressCount.toString(), icon: Clock, color: 'from-blue-500 to-cyan-500' },
          { label: 'Pending', value: pendingCount.toString(), icon: Target, color: 'from-orange-500 to-red-500' }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Overall Progress</h3>
          <span className="text-2xl font-bold text-blue-400">{totalProgress}%</span>
        </div>
        <motion.div 
          className="w-full bg-white/10 rounded-full h-3 overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </motion.div>
      </motion.div>

      {/* Milestones List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Milestones
        </motion.h2>
        
        {/* Status Filter */}
        <div className="mb-6">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredMilestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatusColor(milestone.status)} flex items-center justify-center`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {getStatusIcon(milestone.status)}
                </motion.div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(milestone.priority)} bg-white/10`}>
                  {milestone.priority}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{milestone.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white font-medium">{milestone.progress}%</span>
                </div>
                <motion.div 
                  className="w-full bg-white/10 rounded-full h-2 overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${milestone.progress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  />
                </motion.div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(milestone.dueDate)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
} 