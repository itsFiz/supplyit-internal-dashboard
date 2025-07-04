import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, DollarSign, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            SupplyIT Internal Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Executive oversight dashboard for SupplyIT&apos;s B2B logistics SaaS platform. 
            Monitor KPIs, track budget, manage milestones, and oversee team performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Access Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/auth/signin"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">KPI Dashboard</h3>
            <p className="text-gray-600 text-sm">Real-time performance metrics and key indicators</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget Management</h3>
            <p className="text-gray-600 text-sm">Track capital usage and financial projections</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Milestone Tracker</h3>
            <p className="text-gray-600 text-sm">Monitor MVP progress and project timelines</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Overview</h3>
            <p className="text-gray-600 text-sm">Manage headcount planning and team performance</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Role-Based Access Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Roles</h3>
              <p className="text-gray-600 text-sm">Full access to all modules and configurations</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Management Roles</h3>
              <p className="text-gray-600 text-sm">Granular permissions based on department and function</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">External Roles</h3>
              <p className="text-gray-600 text-sm">Limited access for investors, advisors, and clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
