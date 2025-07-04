import Layout from '@/components/Layout';
import { 
  Code, 
  Target, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  GitBranch,
  Database,
  Smartphone,
  Globe,
  Shield,
  Zap,
  BarChart3,
  Users,
  Server
} from 'lucide-react';

export default function ProductPage() {
  const productData = {
    mvp: {
      status: "in-progress",
      description: "Internal dashboard for SupplyIT operations and pilot management",
      features: [
        {
          name: "Vendor Management",
          description: "Digital procurement workflow and supplier coordination",
          status: "completed",
          priority: "high"
        },
        {
          name: "PO Tracking",
          description: "Purchase order creation, tracking, and status updates",
          status: "in-progress",
          priority: "high"
        },
        {
          name: "Delivery Status",
          description: "Real-time delivery tracking and gig logistics coordination",
          status: "pending",
          priority: "high"
        },
        {
          name: "Document Management",
          description: "Digital documentation with e-signatures and compliance",
          status: "pending",
          priority: "medium"
        },
        {
          name: "Analytics Dashboard",
          description: "KPI tracking, performance metrics, and reporting",
          status: "completed",
          priority: "medium"
        }
      ]
    },
    architecture: {
      frontend: {
        framework: "Next.js 14",
        styling: "Tailwind CSS",
        state: "React Context + Zustand",
        ui: "Custom components + Lucide icons"
      },
      backend: {
        framework: "Next.js API Routes",
        database: "PostgreSQL + Prisma ORM",
        auth: "NextAuth.js",
        hosting: "Vercel"
      },
      integrations: [
        "Payment gateways (Stripe/PayPal)",
        "SMS/WhatsApp APIs",
        "Maps & routing APIs",
        "Document signing (DocuSign)",
        "Analytics (Google Analytics)"
      ]
    },
    development: {
      sprints: [
        {
          sprint: "Sprint 1 (Oct 2025)",
          focus: "Core dashboard & authentication",
          tasks: ["User authentication", "Basic layout", "Navigation", "Database setup"],
          status: "completed",
          owner: "Fiz"
        },
        {
          sprint: "Sprint 2 (Nov 2025)",
          focus: "Strategic planning modules",
          tasks: ["Strategy page", "Legal structure", "Fundraising tracker", "Document center"],
          status: "in-progress",
          owner: "Fiz"
        },
        {
          sprint: "Sprint 3 (Dec 2025)",
          focus: "Operations & pilot tools",
          tasks: ["SME onboarding", "Driver management", "Delivery tracking", "KPI dashboard"],
          status: "pending",
          owner: "Fiz + Intern"
        },
        {
          sprint: "Sprint 4 (Jan 2026)",
          focus: "External portal & integrations",
          tasks: ["SME portal", "Supplier portal", "API integrations", "Mobile responsiveness"],
          status: "pending",
          owner: "Fiz + Intern"
        }
      ],
      ownership: {
        cto: "Fiz - Architecture, core development, deployment",
        intern: "UI/UX assistance, testing, documentation",
        future: "Frontend engineer (Q4 2026), Backend engineer (Q1 2027)"
      }
    },
    roadmap: {
      q1_2026: [
        "MVP architecture finalized",
        "UI/UX + clickable prototype",
        "Internal dashboard v1.0",
        "Basic vendor flow"
      ],
      q2_2026: [
        "MVP launched for pilot SMEs",
        "Delivery + vendor flow working",
        "Document management system",
        "Analytics & reporting"
      ],
      q3_2026: [
        "External portals (SME, Supplier)",
        "Mobile app development",
        "Advanced analytics",
        "API marketplace"
      ],
      q4_2026: [
        "Regional expansion features",
        "AI/ML integration",
        "Advanced compliance tools",
        "Enterprise features"
      ]
    },
    techStack: {
      current: [
        { category: "Frontend", tech: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", tech: ["Next.js API", "Prisma ORM", "PostgreSQL", "NextAuth.js"] },
        { category: "Infrastructure", tech: ["Vercel", "GitHub", "PostgreSQL", "Redis (planned)"] },
        { category: "Tools", tech: ["VS Code", "Figma", "Postman", "Prisma Studio"] }
      ],
      planned: [
        { category: "Mobile", tech: ["React Native", "Expo", "Push notifications"] },
        { category: "Analytics", tech: ["Google Analytics", "Mixpanel", "Custom dashboards"] },
        { category: "AI/ML", tech: ["OpenAI API", "TensorFlow", "Predictive analytics"] },
        { category: "DevOps", tech: ["Docker", "CI/CD", "Monitoring", "Logging"] }
      ]
    },
    security: {
      authentication: "NextAuth.js with multiple providers",
      authorization: "Role-based access control (RBAC)",
      data: "Encryption at rest and in transit",
      compliance: "GDPR, PDPA, SOC 2 (planned)",
      testing: "Unit tests, integration tests, security audits"
    },
    performance: {
      targets: {
        "Page Load Time": "< 2 seconds",
        "API Response Time": "< 500ms",
        "Uptime": "99.9%",
        "Mobile Performance": "Lighthouse score > 90"
      },
      monitoring: [
        "Vercel Analytics",
        "Custom performance tracking",
        "Error monitoring (Sentry)",
        "User experience metrics"
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Code className="w-8 h-8 text-orange-400" />
            Product & Tech
          </h1>
          <p className="text-gray-300 text-lg">
            MVP development, technical architecture, and product roadmap
          </p>
        </div>

        {/* MVP Overview */}
        <div className={`bg-white/10 backdrop-blur-md border rounded-2xl p-6 ${getStatusColor(productData.mvp.status)}`}>
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-bold text-white">MVP Overview</h2>
            {getStatusIcon(productData.mvp.status)}
          </div>

          <p className="text-gray-300 mb-6">{productData.mvp.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productData.mvp.features.map((feature, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(feature.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">{feature.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${getPriorityColor(feature.priority)}`}>
                      {feature.priority.toUpperCase()}
                    </span>
                    {getStatusIcon(feature.status)}
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Technical Architecture</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Frontend */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-400" />
                Frontend Stack
              </h3>
              <div className="space-y-3">
                {Object.entries(productData.architecture.frontend).map(([key, value]) => (
                  <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-gray-400 text-sm capitalize">{key}</p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-green-400" />
                Backend Stack
              </h3>
              <div className="space-y-3">
                {Object.entries(productData.architecture.backend).map(([key, value]) => (
                  <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-gray-400 text-sm capitalize">{key}</p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              Planned Integrations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {productData.architecture.integrations.map((integration, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-white text-sm">{integration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Development Sprints */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <GitBranch className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Development Sprints</h2>
          </div>

          <div className="space-y-4">
            {productData.development.sprints.map((sprint, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(sprint.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-white">{sprint.sprint}</h4>
                    {getStatusIcon(sprint.status)}
                  </div>
                  <span className="text-gray-400 text-sm">{sprint.owner}</span>
                </div>
                <p className="text-gray-300 mb-3">{sprint.focus}</p>
                <ul className="space-y-1">
                  {sprint.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Technology Stack</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Stack */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Current Stack</h3>
              <div className="space-y-4">
                {productData.techStack.current.map((category, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-2">{category.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Planned Stack */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Planned Stack</h3>
              <div className="space-y-4">
                {productData.techStack.planned.map((category, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-2">{category.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Roadmap */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Product Roadmap</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(productData.roadmap).map(([quarter, features]) => (
              <div key={quarter} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-3">{quarter.replace('_', ' ').toUpperCase()}</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">Security</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(productData.security).map(([key, value]) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-gray-400 text-sm capitalize mb-1">{key}</p>
                  <p className="text-white text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Performance Targets</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(productData.performance.targets).map(([key, value]) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-gray-400 text-sm mb-1">{key}</p>
                  <p className="text-white font-medium">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Monitoring</h3>
              <ul className="space-y-2">
                {productData.performance.monitoring.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Team Ownership */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Development Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(productData.development.ownership).map(([role, description]) => (
              <div key={role} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2 capitalize">{role}</h4>
                <p className="text-gray-300 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 