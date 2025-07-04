import Layout from '@/components/Layout';
import KPICards from '@/components/KPICards';
import AnalyticsChart from '@/components/AnalyticsChart';
import Link from 'next/link';
import { 
  DollarSign, 
  Target, 
  Users, 
  Building2,
  Code,
  Wrench,
  Megaphone,
  FolderOpen,
  Flag,
  Wallet,
  BarChart3,
  TrendingUp,
  Calculator
} from 'lucide-react';

export default function DashboardPage() {
  const strategicCategories = [
    {
      href: "/strategy",
      icon: Target,
      title: "Strategy & Vision",
      description: "Mission, UVP, GTM strategy, business model",
      color: "from-purple-500 to-blue-600"
    },
    {
      href: "/legal",
      icon: Building2,
      title: "Legal & Structure",
      description: "Incorporation, agreements, cap table",
      color: "from-blue-500 to-indigo-600"
    },
    {
      href: "/fundraising",
      icon: DollarSign,
      title: "Fundraising & Finance",
      description: "Pitch decks, projections, investor pipeline",
      color: "from-green-500 to-emerald-600"
    },
    {
      href: "/product",
      icon: Code,
      title: "Product & Tech",
      description: "MVP specs, roadmap, development tracking",
      color: "from-orange-500 to-red-600"
    },
    {
      href: "/operations",
      icon: Wrench,
      title: "Operations & Pilot",
      description: "SOPs, onboarding, KPI tracking",
      color: "from-red-500 to-pink-600"
    },
    {
      href: "/brand",
      icon: Megaphone,
      title: "Brand & Marketing",
      description: "Brand identity, launch plan, messaging",
      color: "from-pink-500 to-purple-600"
    }
  ];

  const operationalTools = [
    {
      href: "/documents",
      icon: FolderOpen,
      title: "Document Center",
      description: "Centralized file storage and management",
      color: "from-green-500 to-emerald-600"
    },
    {
      href: "/team",
      icon: Users,
      title: "Team Overview",
      description: "Manage team and resource allocation",
      color: "from-orange-500 to-red-600"
    },
    {
      href: "/milestones",
      icon: Flag,
      title: "Milestone Tracker",
      description: "Monitor project progress and timelines",
      color: "from-purple-500 to-pink-600"
    },
    {
      href: "/financial-metrics",
      icon: Calculator,
      title: "Financial Metrics",
      description: "Burn rate, runway, breakeven analysis",
      color: "from-red-500 to-pink-600"
    },
    {
      href: "/budget",
      icon: Wallet,
      title: "Budget Management",
      description: "Track spending and financial projections",
      color: "from-green-500 to-emerald-600"
    },
    {
      href: "/analytics",
      icon: BarChart3,
      title: "Analytics",
      description: "Performance metrics and insights",
      color: "from-blue-500 to-indigo-600"
    },
    {
      href: "/roadmap",
      icon: TrendingUp,
      title: "Roadmap",
      description: "Product development timeline",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Executive Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Real-time overview of SupplyIT&apos;s performance and progress
          </p>
        </div>

        {/* KPI Cards */}
        <KPICards />

        {/* Analytics Chart */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Performance Analytics</h2>
          <AnalyticsChart />
        </div>

        {/* Strategic Planning */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Strategic Planning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicCategories.map((category, index) => (
              <Link 
                key={index}
                href={category.href}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl mb-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
                <p className="text-gray-300 text-sm">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Operational Tools */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Operational Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operationalTools.map((tool, index) => (
              <Link 
                key={index}
                href={tool.href}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${tool.color} rounded-xl mb-4`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
                <p className="text-gray-300 text-sm">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
