import Layout from '@/components/Layout';
import { 
  Wrench, 
  Target, 
  Users, 
  Truck, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BarChart3,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Settings,
  TrendingUp
} from 'lucide-react';

export default function OperationsPage() {
  const operationsData = {
    pilot: {
      objectives: [
        { goal: "SME clients onboarded", target: "3 confirmed pilot SMEs (retail/logistics)", status: "pending" },
        { goal: "Deliveries completed", target: "500 deliveries logged", status: "pending" },
        { goal: "Driver partners recruited", target: "200 registered (active pool: 50)", status: "pending" },
        { goal: "GMV milestone", target: "RM 500,000 by Q2 2027", status: "pending" },
        { goal: "Feedback sessions", target: "At least 2 rounds per SME", status: "pending" }
      ],
      timeline: [
        {
          month: "Oct 2026",
          activities: "Finalize onboarding materials + test internally",
          lead: "Fiz, Arif",
          status: "pending"
        },
        {
          month: "Nov 2026",
          activities: "First SME onboarded + first delivery via platform",
          lead: "Muhaimin, Luqman",
          status: "pending"
        },
        {
          month: "Dec 2026",
          activities: "3 SMEs live + delivery volume starts tracking",
          lead: "Arif, Luqman",
          status: "pending"
        },
        {
          month: "Jan 2027",
          activities: "UAT feedback from SMEs & vendors",
          lead: "Whole Team",
          status: "pending"
        },
        {
          month: "Feb 2027",
          activities: "Dashboard v2 launched with analytics & logs",
          lead: "Fiz",
          status: "pending"
        },
        {
          month: "Mar 2027",
          activities: "Grant discussions initiated based on pilot success",
          lead: "Irfan",
          status: "pending"
        }
      ]
    },
    sop: {
      smeOnboarding: {
        owner: "Arif & Muhaimin",
        checklist: [
          "Procurement volume RM 10K+/mo",
          "Has existing supplier network",
          "Willing to test new digital workflows"
        ],
        process: [
          "Intro meeting + demo",
          "SupplyIT.io registration",
          "Account walkthrough",
          "Training session for staff"
        ],
        materials: [
          "SME playbook PDF",
          "Walkthrough video (optional)",
          "WhatsApp/Slack support group"
        ]
      },
      supplierWorkflow: {
        owner: "Muhaimin",
        steps: [
          "Partnering with existing suppliers of onboarded SMEs",
          "Listing & catalog setup",
          "PO receiving & fulfillment testing",
          "Optional commission waivers during pilot",
          "Documenting bottlenecks in inventory, delivery, or pricing"
        ]
      },
      driverOps: {
        owner: "Luqman",
        onboarding: [
          "Digital registration form",
          "ID verification (IC, license)",
          "Vehicle type tagging",
          "Orientation on task app (basic)"
        ],
        coordination: [
          "Task received → Accept → Pickup → Dropoff → POD upload",
          "Performance rating system (early MVP version)",
          "Hotline & WhatsApp fallback",
          "Incentive structure (bonus after X tasks)"
        ]
      },
      documentCompliance: {
        owner: "Fiz",
        requirements: [
          "Digital POs",
          "Uploaded invoices",
          "POD scans or signature photos"
        ],
        repository: [
          "Tagging: Vendor, SME, Delivery ID",
          "Search, download, comment enabled",
          "Basic version control (manual)"
        ]
      }
    },
    kpis: [
      {
        name: "Weekly Deliveries",
        frequency: "Weekly",
        owner: "Luqman",
        current: 0,
        target: 500,
        status: "pending"
      },
      {
        name: "Registered Drivers",
        frequency: "Monthly",
        owner: "Luqman",
        current: 0,
        target: 200,
        status: "pending"
      },
      {
        name: "SME Activity Rate",
        frequency: "Weekly",
        owner: "Muhaimin",
        current: 0,
        target: 100,
        status: "pending"
      },
      {
        name: "Average Delivery Time",
        frequency: "Monthly",
        owner: "Fiz",
        current: 0,
        target: 120,
        status: "pending"
      },
      {
        name: "Document Submission Compliance",
        frequency: "Monthly",
        owner: "Muhaimin",
        current: 0,
        target: 95,
        status: "pending"
      },
      {
        name: "Pilot Feedback Summary",
        frequency: "Biweekly",
        owner: "Arif",
        current: 0,
        target: 10,
        status: "pending"
      }
    ],
    risks: [
      {
        risk: "Drivers abandon tasks",
        likelihood: "Medium",
        mitigation: "Task bonus system, fallback hotline",
        status: "monitoring"
      },
      {
        risk: "SMEs don't engage daily",
        likelihood: "Medium",
        mitigation: "Daily touchpoints by Arif",
        status: "monitoring"
      },
      {
        risk: "Delivery delays",
        likelihood: "High",
        mitigation: "Add buffer time, log root causes",
        status: "active"
      },
      {
        risk: "Document issues (missed POD)",
        likelihood: "Medium",
        mitigation: "Auto-reminders, manual uploads",
        status: "monitoring"
      },
      {
        risk: "Tech bugs",
        likelihood: "High",
        mitigation: "Fiz to deploy hotfixes weekly",
        status: "active"
      }
    ],
    pilotClients: [
      {
        name: "Retail SME #1",
        sector: "Retail",
        location: "Klang Valley",
        procurementVolume: "RM 15K/month",
        status: "prospecting",
        contact: "Arif"
      },
      {
        name: "Construction SME #1",
        sector: "Construction",
        location: "Klang Valley",
        procurementVolume: "RM 25K/month",
        status: "prospecting",
        contact: "Muhaimin"
      },
      {
        name: "Event Planning SME #1",
        sector: "Events",
        location: "Klang Valley",
        procurementVolume: "RM 12K/month",
        status: "prospecting",
        contact: "Arif"
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
      case 'monitoring':
        return <BarChart3 className="w-5 h-5 text-blue-500" />;
      case 'active':
        return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'prospecting':
        return <Users className="w-5 h-5 text-purple-500" />;
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
      case 'monitoring':
        return 'border-blue-500/30 bg-blue-500/10';
      case 'active':
        return 'border-red-500/30 bg-red-500/10';
      case 'prospecting':
        return 'border-purple-500/30 bg-purple-500/10';
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
            <Wrench className="w-8 h-8 text-red-400" />
            Operations & Pilot
          </h1>
          <p className="text-gray-300 text-lg">
            Pilot preparation, operational procedures, and KPI tracking
          </p>
        </div>

        {/* Pilot Objectives */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Pilot Objectives (2026–2027)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operationsData.pilot.objectives.map((objective, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(objective.status)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-white">{objective.goal}</h4>
                  {getStatusIcon(objective.status)}
                </div>
                <p className="text-gray-300">{objective.target}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pilot Timeline */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Pilot Timeline</h2>
          </div>

          <div className="space-y-4">
            {operationsData.pilot.timeline.map((item, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(item.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 font-bold">{item.month}</span>
                    <h4 className="text-lg font-semibold text-white">{item.activities}</h4>
                    {getStatusIcon(item.status)}
                  </div>
                  <span className="text-gray-400 text-sm">{item.lead}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Standard Operating Procedures */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Standard Operating Procedures</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SME Onboarding */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">SME Onboarding</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">Owner: {operationsData.sop.smeOnboarding.owner}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-medium mb-2">Qualification Checklist</h4>
                  <ul className="space-y-1">
                    {operationsData.sop.smeOnboarding.checklist.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Onboarding Process</h4>
                  <ul className="space-y-1">
                    {operationsData.sop.smeOnboarding.process.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Driver Operations */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-semibold text-white">Driver Operations</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">Owner: {operationsData.sop.driverOps.owner}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-medium mb-2">Onboarding Steps</h4>
                  <ul className="space-y-1">
                    {operationsData.sop.driverOps.onboarding.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Gig Coordination</h4>
                  <ul className="space-y-1">
                    {operationsData.sop.driverOps.coordination.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">KPI Dashboard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operationsData.kpis.map((kpi, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(kpi.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">{kpi.name}</h4>
                  {getStatusIcon(kpi.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Current</span>
                    <span className="text-white font-bold">{kpi.current}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Target</span>
                    <span className="text-green-400 font-bold">{kpi.target}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Owner</span>
                    <span className="text-blue-400 text-sm">{kpi.owner}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Frequency</span>
                    <span className="text-purple-400 text-sm">{kpi.frequency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Management */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-bold text-white">Risk Management</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operationsData.risks.map((risk, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(risk.status)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-white">{risk.risk}</h4>
                  {getStatusIcon(risk.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Likelihood</span>
                    <span className={`text-sm font-medium ${
                      risk.likelihood === 'High' ? 'text-red-400' : 
                      risk.likelihood === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {risk.likelihood}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{risk.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pilot Clients */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Pilot Clients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {operationsData.pilotClients.map((client, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(client.status)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-white">{client.name}</h4>
                  {getStatusIcon(client.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <MapPin className="w-4 h-4" />
                    {client.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Settings className="w-4 h-4" />
                    {client.sector}
                  </div>
                  <div className="text-gray-300 text-sm">
                    Procurement: {client.procurementVolume}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Users className="w-4 h-4" />
                    Contact: {client.contact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operations Tools */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Operations Tools</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-medium">SME Playbook</p>
              <p className="text-gray-400 text-xs">Onboarding guide</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <Phone className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-medium">Support Hotline</p>
              <p className="text-gray-400 text-xs">24/7 assistance</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <BarChart3 className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-medium">KPI Tracker</p>
              <p className="text-gray-400 text-xs">Performance monitoring</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <Mail className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-medium">Feedback System</p>
              <p className="text-gray-400 text-xs">Client communication</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 