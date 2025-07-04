import { Users, Plus, UserPlus, TrendingUp, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';


export default function TeamOverview() {
  const teamMembers = [
    {
      id: 1,
      name: 'Fiz',
      role: 'Founder & CTO',
      email: 'fiz@supplyit.io',
      phone: '+60 12-345 6789',
      location: 'Kuala Lumpur, Malaysia',
      avatar: 'F',
      status: 'active',
      department: 'Leadership',
      joinDate: 'Jan 2024',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      name: 'Irfan',
      role: 'CEO',
      email: 'irfan@supplyit.io',
      phone: '+60 12-345 6790',
      location: 'Kuala Lumpur, Malaysia',
      avatar: 'I',
      status: 'active',
      department: 'Leadership',
      joinDate: 'Jan 2024',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Arif',
      role: 'Head of Operations',
      email: 'arif@supplyit.io',
      phone: '+60 12-345 6791',
      location: 'Kuala Lumpur, Malaysia',
      avatar: 'A',
      status: 'active',
      department: 'Operations',
      joinDate: 'Feb 2024',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      name: 'Muhaimin',
      role: 'Head of Product',
      email: 'muhaimin@supplyit.io',
      phone: '+60 12-345 6792',
      location: 'Kuala Lumpur, Malaysia',
      avatar: 'M',
      status: 'active',
      department: 'Product',
      joinDate: 'Feb 2024',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      name: 'Luqman',
      role: 'Head of Engineering',
      email: 'luqman@supplyit.io',
      phone: '+60 12-345 6793',
      location: 'Kuala Lumpur, Malaysia',
      avatar: 'L',
      status: 'active',
      department: 'Engineering',
      joinDate: 'Mar 2024',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const departments = [
    { name: 'Leadership', count: 2, color: 'from-purple-500 to-pink-500' },
    { name: 'Operations', count: 1, color: 'from-green-500 to-emerald-500' },
    { name: 'Product', count: 1, color: 'from-orange-500 to-red-500' },
    { name: 'Engineering', count: 1, color: 'from-indigo-500 to-purple-500' }
  ];

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

  return (
    <div className="space-y-8">
      {/* Team Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Total Team Members', value: '5', icon: Users, color: 'from-blue-500 to-cyan-500' },
          { label: 'Departments', value: '4', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
          { label: 'Active Members', value: '5', icon: UserPlus, color: 'from-purple-500 to-pink-500' },
          { label: 'Avg. Tenure', value: '3.2 months', icon: Calendar, color: 'from-orange-500 to-red-500' }
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

      {/* Department Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Department Overview
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {departments.map((dept) => (
            <motion.div
              key={dept.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl bg-gradient-to-br ${dept.color} text-white`}
            >
              <h3 className="font-bold text-lg mb-1">{dept.name}</h3>
              <p className="text-2xl font-bold">{dept.count}</p>
              <p className="text-sm opacity-90">members</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <motion.h2 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Team Members
          </motion.h2>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            Add Member
          </motion.button>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div 
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {member.avatar}
                </motion.div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${member.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span className="text-xs text-slate-400 capitalize">{member.status}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{member.role}</p>
              <p className="text-slate-300 text-sm mb-4">{member.department}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{member.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Joined {member.joinDate}</span>
                <motion.button
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
} 