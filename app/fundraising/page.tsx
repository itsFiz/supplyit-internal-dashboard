import Layout from '@/components/Layout';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  Target, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BarChart3,
  FileText,
  Building2,
} from 'lucide-react';

export default function FundraisingPage() {
  const fundraisingData = {
    preSeed: {
      amount: "RM 300,000",
      equity: "10%",
      valuation: "RM 3,000,000",
      runway: "24 months (2026–2028)",
      status: "planning",
      allocation: [
        { category: "MVP Dev + Infra", budget: "RM 80,000", notes: "Internal dashboard, vendor flow, delivery system" },
        { category: "Founder & Intern Stipends", budget: "RM 60,000", notes: "RM2K/mo founder, 1–2 interns over 2 years" },
        { category: "Ops & Legal", budget: "RM 30,000", notes: "Agreements, IP protection, pre-incorporation structure" },
        { category: "BD & PR", budget: "RM 30,000", notes: "Government relations, SME pilot outreach" },
        { category: "Marketing & Design", budget: "RM 30,000", notes: "Landing page, visual branding, prototype polish" },
        { category: "Travel & Events", budget: "RM 10,000", notes: "Site visits, industry roadshows, early SME leads" },
        { category: "Runway/Buffer", budget: "RM 60,000", notes: "Safety net for burn overruns or optional hires/tools" }
      ]
    },
    seed: {
      amount: "RM 1,500,000",
      equity: "15%",
      valuation: "RM 10,000,000",
      targetDate: "Q3 2028",
      status: "planned",
      allocation: [
        { category: "Tech & Product Dev", budget: "RM 400,000", notes: "Advanced features, analytics, integrations" },
        { category: "Driver & Ops Scaling", budget: "RM 300,000", notes: "Fleet coordination, SOPs, ops team scale" },
        { category: "SME Sales & Onboarding", budget: "RM 300,000", notes: "SME acquisition campaigns, onboarding portal" },
        { category: "Government & PR", budget: "RM 200,000", notes: "Events, lobbying, grant applications" },
        { category: "Legal & Compliance", budget: "RM 100,000", notes: "Sdn Bhd setup, IP filings, financial audit support" },
        { category: "Runway/Contingency", budget: "RM 200,000", notes: "Working capital + buffer for scale" }
      ]
    },
    milestones: [
      {
        quarter: "Q2 2026",
        milestone: "Pre-seed funds closed, MVP architecture finalized",
        owner: "Fiz",
        status: "pending"
      },
      {
        quarter: "Q3 2026",
        milestone: "UI/UX + clickable prototype demoed to stakeholders",
        owner: "Fiz + Intern",
        status: "pending"
      },
      {
        quarter: "Q4 2026",
        milestone: "MVP launched for pilot SMEs (delivery + vendor flow working)",
        owner: "Fiz, Muhaimin",
        status: "pending"
      },
      {
        quarter: "Q1 2027",
        milestone: "3 pilot clients onboarded, 100+ deliveries",
        owner: "Muhaimin, Luqman",
        status: "pending"
      },
      {
        quarter: "Q2 2027",
        milestone: "RM 500K GMV milestone achieved",
        owner: "Muhaimin + Arif",
        status: "pending"
      },
      {
        quarter: "Q3 2027",
        milestone: "Grant/partnership engagement underway (MDEC, SME Bank)",
        owner: "Irfan",
        status: "pending"
      },
      {
        quarter: "Q1 2028",
        milestone: "Internal dashboard, analytics, and audit tools refined",
        owner: "Fiz",
        status: "pending"
      }
    ],
    capTable: {
      current: [
        { stakeholder: "Fiz (CEO & CTO)", equity: 50 },
        { stakeholder: "Muhaimin (COO)", equity: 35 },
        { stakeholder: "Irfan (CRO)", equity: 5 },
        { stakeholder: "Luqman (CLO)", equity: 5 },
        { stakeholder: "Arif (CE)", equity: 5 }
      ],
      postPreSeed: [
        { stakeholder: "Fiz", equity: 45 },
        { stakeholder: "Muhaimin", equity: 30 },
        { stakeholder: "Irfan", equity: 5 },
        { stakeholder: "Luqman", equity: 5 },
        { stakeholder: "Arif", equity: 5 },
        { stakeholder: "Pre-Seed Investors", equity: 10 }
      ],
      postSeed: [
        { stakeholder: "Fiz", equity: 42.5 },
        { stakeholder: "Muhaimin", equity: 29.75 },
        { stakeholder: "Irfan", equity: 4.25 },
        { stakeholder: "Luqman", equity: 4.25 },
        { stakeholder: "Arif", equity: 4.25 },
        { stakeholder: "Pre-Seed Investors", equity: 8.5 },
        { stakeholder: "Seed Investors", equity: 6.5 }
      ]
    },
    grants: [
      {
        name: "MDEC SME Digitization Grant",
        amount: "RM 50,000 - 200,000",
        status: "researching",
        requirements: ["SME pilot success", "Digital transformation focus", "Local tech development"]
      },
      {
        name: "SME Bank Innovation Fund",
        amount: "RM 100,000 - 500,000",
        status: "researching",
        requirements: ["Proven business model", "Job creation potential", "Innovation component"]
      },
      {
        name: "BSN Digital Grant",
        amount: "RM 25,000 - 100,000",
        status: "researching",
        requirements: ["Financial inclusion", "Digital payment integration", "SME empowerment"]
      }
    ],
    investorPipeline: [
      {
        name: "Irfan's Network",
        type: "Angel Investors",
        status: "warm",
        notes: "Government and private sector connections"
      },
      {
        name: "MDEC Partners",
        type: "Strategic Partners",
        status: "researching",
        notes: "Digital transformation focus"
      },
      {
        name: "SME Associations",
        type: "Industry Partners",
        status: "researching",
        notes: "Potential pilot clients and investors"
      }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
      case 'planning':
        return <Target className="w-5 h-5 text-blue-500" />;
      case 'planned':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      case 'researching':
        return <BarChart3 className="w-5 h-5 text-orange-500" />;
      case 'warm':
        return <Users className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/30 bg-green-500/10';
      case 'in-progress':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'pending':
        return 'border-gray-500/30 bg-gray-500/10';
      case 'planning':
        return 'border-blue-500/30 bg-blue-500/10';
      case 'planned':
        return 'border-purple-500/30 bg-purple-500/10';
      case 'researching':
        return 'border-orange-500/30 bg-orange-500/10';
      case 'warm':
        return 'border-green-500/30 bg-green-500/10';
      default:
        return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <DollarSign className="w-8 h-8 text-green-400" />
            Fundraising & Finance
          </h1>
          <p className="text-gray-300 text-lg">
            Financial strategy, fundraising roadmap, and investor pipeline
          </p>
        </div>

        {/* Pre-Seed Round */}
        <div className={`bg-white/10 backdrop-blur-md border rounded-2xl p-6 ${getStatusColor(fundraisingData.preSeed.status)}`}>
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Pre-Seed Round</h2>
            {getStatusIcon(fundraisingData.preSeed.status)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Amount</p>
              <p className="text-white font-bold text-xl">{fundraisingData.preSeed.amount}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Equity</p>
              <p className="text-white font-bold text-xl">{fundraisingData.preSeed.equity}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Valuation</p>
              <p className="text-white font-bold text-xl">{fundraisingData.preSeed.valuation}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Runway</p>
              <p className="text-white font-bold text-xl">{fundraisingData.preSeed.runway}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-white mb-4">Fund Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fundraisingData.preSeed.allocation.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{item.category}</h4>
                  <span className="text-green-400 font-bold">{item.budget}</span>
                </div>
                <p className="text-gray-300 text-sm">{item.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seed Round */}
        <div className={`bg-white/10 backdrop-blur-md border rounded-2xl p-6 ${getStatusColor(fundraisingData.seed.status)}`}>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Seed Round (Planned)</h2>
            {getStatusIcon(fundraisingData.seed.status)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Amount</p>
              <p className="text-white font-bold text-xl">{fundraisingData.seed.amount}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Equity</p>
              <p className="text-white font-bold text-xl">{fundraisingData.seed.equity}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Valuation</p>
              <p className="text-white font-bold text-xl">{fundraisingData.seed.valuation}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Target Date</p>
              <p className="text-white font-bold text-xl">{fundraisingData.seed.targetDate}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-white mb-4">Fund Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fundraisingData.seed.allocation.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{item.category}</h4>
                  <span className="text-purple-400 font-bold">{item.budget}</span>
                </div>
                <p className="text-gray-300 text-sm">{item.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Funding Milestones</h2>
          </div>

          <div className="space-y-4">
            {fundraisingData.milestones.map((milestone, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(milestone.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">{milestone.quarter}</span>
                    <h4 className="text-lg font-semibold text-white">{milestone.milestone}</h4>
                    {getStatusIcon(milestone.status)}
                  </div>
                  <span className="text-gray-400 text-sm">{milestone.owner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cap Table Evolution */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Cap Table Evolution</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Current</h3>
              <div className="space-y-3">
                {fundraisingData.capTable.current.map((stakeholder, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{stakeholder.stakeholder}</span>
                      <span className="text-white font-bold">{stakeholder.equity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Pre-Seed */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Post Pre-Seed</h3>
              <div className="space-y-3">
                {fundraisingData.capTable.postPreSeed.map((stakeholder, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{stakeholder.stakeholder}</span>
                      <span className="text-white font-bold">{stakeholder.equity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Seed */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Post Seed</h3>
              <div className="space-y-3">
                {fundraisingData.capTable.postSeed.map((stakeholder, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{stakeholder.stakeholder}</span>
                      <span className="text-white font-bold">{stakeholder.equity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grants & Alternative Funding */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Grants & Alternative Funding</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fundraisingData.grants.map((grant, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(grant.status)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-white">{grant.name}</h4>
                  {getStatusIcon(grant.status)}
                </div>
                <p className="text-green-400 font-bold mb-3">{grant.amount}</p>
                <ul className="space-y-1">
                  {grant.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Pipeline */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Investor Pipeline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fundraisingData.investorPipeline.map((investor, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(investor.status)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-white">{investor.name}</h4>
                  {getStatusIcon(investor.status)}
                </div>
                <p className="text-gray-400 text-sm mb-2">{investor.type}</p>
                <p className="text-gray-300 text-sm">{investor.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Documents */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-bold text-white">Financial Documents</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <FileText className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-white font-medium">Pitch Deck</p>
              <p className="text-gray-400 text-xs">10-slide investor presentation</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-medium">Financial Model</p>
              <p className="text-gray-400 text-xs">3-year projections & burn rate</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-medium">Due Diligence</p>
              <p className="text-gray-400 text-xs">Data room & investor FAQ</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 