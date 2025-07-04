import Layout from '@/components/Layout';
import { Target, Eye, Lightbulb, TrendingUp, Users, CheckCircle, Clock, AlertCircle, DollarSign } from 'lucide-react';

export default function StrategyPage() {
  const strategyData = {
    vision: {
      statement: "To create the logistics infrastructure that empowers Southeast Asia's SMEs to operate with the efficiency and reach of global enterprises — driving economic growth and sustainable supply chain transformation.",
      status: "completed"
    },
    mission: {
      statement: "We digitize, automate, and streamline procurement, delivery, and documentation for SMEs across Southeast Asia — starting with a centralized, gig-enabled logistics SaaS platform built for procurement-heavy industries.",
      status: "completed"
    },
    uvp: {
      summary: "Enterprise-grade logistics infrastructure tailored for Southeast Asian SMEs — combining procurement, delivery, and compliance into one integrated platform.",
      problems: [
        { issue: "85% of SMEs still manage procurement manually", solution: "Centralized digital procurement workflow" },
        { issue: "20+ hours/week wasted on WhatsApp/calls", solution: "Real-time gig logistics coordination & tracking" },
        { issue: "91% rely on physical documents or spreadsheets", solution: "Digital documentation with e-signatures & compliance" },
        { issue: "Higher procurement costs vs large companies", solution: "Aggregated supply marketplace + optimized routing" }
      ],
      status: "completed"
    },
    gtm: {
      target: "SMEs in Klang Valley (Retail & Construction sectors)",
      phases: [
        {
          name: "Phase 1: Pre-MVP",
          timeline: "Now → Q4 2025",
          tactics: [
            "Finalize UI/UX & internal dashboard",
            "Create pitch deck & investor assets",
            "Outreach via Irfan to gov and angels",
            "Secure LOIs from pilot SMEs"
          ],
          status: "in-progress"
        },
        {
          name: "Phase 2: MVP Dev & Pilot",
          timeline: "Q1–Q2 2026",
          tactics: [
            "Build & test vendor ordering + delivery status",
            "Onboard 3 pilot clients",
            "Recruit 200+ gig drivers",
            "Track KPI: deliveries, GMV, feedback"
          ],
          status: "pending"
        },
        {
          name: "Phase 3: Post-Pilot Expansion",
          timeline: "Q3 2026",
          tactics: [
            "Expand to 100 SMEs & 50 suppliers",
            "Launch delivery coordination at scale",
            "Apply for SME digitization grants",
            "Begin BD outreach to other verticals"
          ],
          status: "pending"
        }
      ]
    },
    businessModel: {
      customerSegments: ["SME retailers", "Construction firms", "Event planners", "Agriculture ops", "Suppliers", "Gig drivers"],
      valuePropositions: [
        "Digital procurement + marketplace",
        "Gig delivery management",
        "Paperless documentation & e-signature",
        "Supply chain cost reduction",
        "Analytics for visibility & ROI"
      ],
      revenueStreams: [
        "SaaS subscription (monthly/annual)",
        "Gig delivery commission",
        "Premium analytics (future)",
        "API integrations/licensing"
      ]
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
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
            <Target className="w-8 h-8 text-purple-400" />
            Strategy & Vision
          </h1>
          <p className="text-gray-300 text-lg">
            Core strategic framework and business direction for SupplyIT
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`bg-white/10 backdrop-blur-md border rounded-2xl p-6 ${getStatusColor(strategyData.vision.status)}`}>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Vision Statement</h2>
              {getStatusIcon(strategyData.vision.status)}
            </div>
            <p className="text-gray-300 leading-relaxed">{strategyData.vision.statement}</p>
          </div>

          <div className={`bg-white/10 backdrop-blur-md border rounded-2xl p-6 ${getStatusColor(strategyData.mission.status)}`}>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Mission Statement</h2>
              {getStatusIcon(strategyData.mission.status)}
            </div>
            <p className="text-gray-300 leading-relaxed">{strategyData.mission.statement}</p>
          </div>
        </div>

        {/* UVP */}
        <div className={`bg-white/10 backdrop-blur-md border rounded-2xl p-6 ${getStatusColor(strategyData.uvp.status)}`}>
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Unique Value Proposition</h2>
            {getStatusIcon(strategyData.uvp.status)}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Summary</h3>
            <p className="text-gray-300 italic">{strategyData.uvp.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategyData.uvp.problems.map((item, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-red-300 text-sm font-medium mb-2">{item.issue}</p>
                    <p className="text-green-300 text-sm">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GTM Strategy */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Go-To-Market Strategy</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Initial Target</h3>
            <p className="text-gray-300">{strategyData.gtm.target}</p>
          </div>

          <div className="space-y-4">
            {strategyData.gtm.phases.map((phase, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(phase.status)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-white">{phase.name}</h4>
                  {getStatusIcon(phase.status)}
                </div>
                <p className="text-gray-400 text-sm mb-3">{phase.timeline}</p>
                <ul className="space-y-2">
                  {phase.tactics.map((tactic, tacticIndex) => (
                    <li key={tacticIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {tactic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Business Model */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Customer Segments</h3>
            </div>
            <ul className="space-y-2">
              {strategyData.businessModel.customerSegments.map((segment, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  {segment}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-bold text-white">Value Propositions</h3>
            </div>
            <ul className="space-y-2">
              {strategyData.businessModel.valuePropositions.map((value, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Revenue Streams</h3>
            </div>
            <ul className="space-y-2">
              {strategyData.businessModel.revenueStreams.map((revenue, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  {revenue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
} 