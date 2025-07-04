import Layout from '@/components/Layout';
import { 
  Megaphone, 
  Palette, 
  Target, 
  Calendar, 
  Globe, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Image,
  Video,
  Share2,
  Hash,
  Eye
} from 'lucide-react';

export default function BrandPage() {
  const brandData = {
    identity: {
      name: "SupplyIT.io",
      tagline: "Enterprise-grade logistics infrastructure for Southeast Asia's SMEs.",
      positioning: "The first all-in-one procurement, delivery, and documentation platform built for SME supply chains in Southeast Asia — combining marketplace, gig logistics, and compliance into one seamless system.",
      status: "completed"
    },
    visual: {
      colorPalette: "Trust-centric: Navy Blue, Slate Gray, Soft White, Accent Green",
      font: "Neutral sans-serif (e.g. Inter, Manrope, or Satoshi)",
      logoConcept: "Minimal logotype with chain/route/iconography variation",
      iconography: "Supply chain, documents, trucks, SME storefronts",
      motionElements: "Clean dashboard transitions, delivery route animations",
      toneOfVoice: "Professional, accessible, SME-friendly"
    },
    assets: [
      { name: "Logo (main, monochrome, icon version)", status: "pending", dueDate: "Nov 2025" },
      { name: "Color & typography system (Figma tokenized)", status: "pending", dueDate: "Nov 2025" },
      { name: "Slide deck template (pitch + product)", status: "pending", dueDate: "Dec 2025" },
      { name: "Business card + one-pager for in-person meetings", status: "pending", dueDate: "Dec 2025" },
      { name: "Pilot playbook for SMEs (PDF + web)", status: "pending", dueDate: "Jan 2026" },
      { name: "Social banners (LinkedIn, Twitter, Facebook)", status: "pending", dueDate: "Nov 2025" },
      { name: "Explainer video or teaser trailer", status: "pending", dueDate: "Q1 2026" }
    ],
    marketing: {
      phase1: {
        name: "Pre-Launch Awareness",
        timeline: "Q4 2025–Q2 2026",
        channels: [
          { channel: "Landing Page", action: "Basic website w/ waitlist form", owner: "Fiz", status: "in-progress" },
          { channel: "Social Tease", action: "Create social handles & teaser graphics", owner: "Arif", status: "pending" },
          { channel: "BD Outreach", action: "Warm intros to SME leads + supplier contacts", owner: "Arif", status: "pending" },
          { channel: "PR Softdrop", action: "Early-stage feature in logistics/tech newsletters", owner: "Irfan", status: "pending" },
          { channel: "Investor List", action: "Prepare launch update email for pre-seed investors", owner: "Irfan", status: "pending" }
        ]
      },
      phase2: {
        name: "Pilot Launch",
        timeline: "Q4 2026–Q2 2027",
        channels: [
          { channel: "Soft Launch", action: "Limited access pilot with 3 SMEs", owner: "Team", status: "pending" },
          { channel: "Launch Post", action: "LinkedIn post + newsletter (with delivery KPI stats)", owner: "Arif", status: "pending" },
          { channel: "PR Release", action: "Official pilot launch press release", owner: "Irfan", status: "pending" },
          { channel: "Video Teaser", action: "MVP walkthrough video (1 min)", owner: "Fiz", status: "pending" },
          { channel: "Testimonials", action: "Capture 3 quotes/videos from SME clients", owner: "Arif", status: "pending" },
          { channel: "Demo Days", action: "Pitch to gov agencies / SME associations", owner: "Irfan", status: "pending" }
        ]
      },
      phase3: {
        name: "Traction Expansion",
        timeline: "Q3 2027+",
        channels: [
          { channel: "Public Onboarding", action: "Launch public SME onboarding funnel", owner: "Arif", status: "pending" },
          { channel: "Case Studies", action: "Build blog case studies (construction, retail)", owner: "Arif", status: "pending" },
          { channel: "Performance Marketing", action: "Run LinkedIn, retargeting, Google Ads", owner: "Arif", status: "pending" },
          { channel: "Grant Coverage", action: "Pitch for SME tech grant coverage", owner: "Irfan", status: "pending" }
        ]
      }
    },
    messaging: [
      {
        audience: "SME Owners",
        painPoint: "Procurement too manual, too expensive",
        message: "Digitize your supply chain in 3 clicks.",
        status: "completed"
      },
      {
        audience: "Suppliers",
        painPoint: "Messy POs, hard to track payments",
        message: "Faster fulfillment, smarter buyer network.",
        status: "completed"
      },
      {
        audience: "Drivers",
        painPoint: "Inconsistent income, poor gig platforms",
        message: "Earn flexibly, get paid transparently.",
        status: "completed"
      },
      {
        audience: "Investors/Grants",
        painPoint: "Legacy systems block SME growth",
        message: "We power the SME backbone of Southeast Asia.",
        status: "completed"
      }
    ],
    launch: [
      { asset: "Landing Page + Waitlist", targetDate: "Oct 2025", owner: "Fiz", status: "in-progress" },
      { asset: "Logo + Brand Kit (Color, Font)", targetDate: "Nov 2025", owner: "UI/UX Team", status: "pending" },
      { asset: "Social Setup + Teaser Graphics", targetDate: "Nov 2025", owner: "Arif", status: "pending" },
      { asset: "MVP Teaser Video (v1)", targetDate: "Dec 2025", owner: "Fiz", status: "pending" },
      { asset: "Pilot Client Quotes/Logos", targetDate: "Mar 2027", owner: "Arif", status: "pending" },
      { asset: "Launch Press Release", targetDate: "Apr 2027", owner: "Irfan", status: "pending" },
      { asset: "SME Onboarding Funnel", targetDate: "May 2027", owner: "Arif", status: "pending" }
    ],
    social: {
      hashtags: ["#SupplyIT", "#SMElogistics", "#ProcureSmart", "#DigitizeDelivery"],
      handles: {
        twitter: "@supplyit_io",
        linkedin: "linkedin.com/company/supplyit",
        facebook: "/supplyitofficial"
      }
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
            <Megaphone className="w-8 h-8 text-pink-400" />
            Brand & Marketing
          </h1>
          <p className="text-gray-300 text-lg">
            Brand identity, marketing strategy, and launch planning
          </p>
        </div>

        {/* Brand Identity */}
        <div className={`bg-white/10 backdrop-blur-md border rounded-2xl p-6 ${getStatusColor(brandData.identity.status)}`}>
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl font-bold text-white">Brand Identity</h2>
            {getStatusIcon(brandData.identity.status)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Core Elements</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white font-bold text-xl">{brandData.identity.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tagline</p>
                  <p className="text-white italic">{brandData.identity.tagline}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Positioning</p>
                  <p className="text-gray-300 text-sm">{brandData.identity.positioning}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Visual Direction</h3>
              <div className="space-y-3">
                {Object.entries(brandData.visual).map(([key, value]) => (
                  <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-gray-400 text-sm capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-white text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brand Assets */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Image className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Brand Assets</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brandData.assets.map((asset, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(asset.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{asset.name}</h4>
                  {getStatusIcon(asset.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Due: {asset.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Strategy */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Marketing Strategy</h2>
          </div>

          <div className="space-y-6">
            {/* Phase 1 */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Phase 1: {brandData.marketing.phase1.name}
                <span className="text-gray-400 text-sm">({brandData.marketing.phase1.timeline})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brandData.marketing.phase1.channels.map((channel, index) => (
                  <div key={index} className={`border rounded-xl p-4 ${getStatusColor(channel.status)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{channel.channel}</h4>
                      {getStatusIcon(channel.status)}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{channel.action}</p>
                    <span className="text-blue-400 text-xs">{channel.owner}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2 */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-400" />
                Phase 2: {brandData.marketing.phase2.name}
                <span className="text-gray-400 text-sm">({brandData.marketing.phase2.timeline})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brandData.marketing.phase2.channels.map((channel, index) => (
                  <div key={index} className={`border rounded-xl p-4 ${getStatusColor(channel.status)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{channel.channel}</h4>
                      {getStatusIcon(channel.status)}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{channel.action}</p>
                    <span className="text-purple-400 text-xs">{channel.owner}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 3 */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                Phase 3: {brandData.marketing.phase3.name}
                <span className="text-gray-400 text-sm">({brandData.marketing.phase3.timeline})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brandData.marketing.phase3.channels.map((channel, index) => (
                  <div key={index} className={`border rounded-xl p-4 ${getStatusColor(channel.status)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{channel.channel}</h4>
                      {getStatusIcon(channel.status)}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{channel.action}</p>
                    <span className="text-green-400 text-xs">{channel.owner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Framework */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Share2 className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Messaging Framework</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brandData.messaging.map((message, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(message.status)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-white">{message.audience}</h4>
                  {getStatusIcon(message.status)}
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-400 text-sm">Pain Point</p>
                    <p className="text-red-300 text-sm">{message.painPoint}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Our Message</p>
                    <p className="text-green-300 text-sm font-medium">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Launch Checklist */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Launch Checklist</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brandData.launch.map((item, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getStatusColor(item.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{item.asset}</h4>
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Target: {item.targetDate}</span>
                  <span className="text-indigo-400 text-sm">{item.owner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Hash className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Social Media & Hashtags</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hashtags */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Recommended Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {brandData.social.hashtags.map((hashtag, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Handles */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Social Handles</h3>
              <div className="space-y-3">
                {Object.entries(brandData.social.handles).map(([platform, handle]) => (
                  <div key={platform} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-gray-400 text-sm capitalize mb-1">{platform}</p>
                    <p className="text-white font-medium">{handle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Tools */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Marketing Tools</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-medium">Pitch Decks</p>
              <p className="text-gray-400 text-xs">Investor presentations</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <Video className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-medium">Demo Videos</p>
              <p className="text-gray-400 text-xs">Product walkthroughs</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <Image className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-medium">Brand Assets</p>
              <p className="text-gray-400 text-xs">Logos, templates</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <Share2 className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-medium">Social Content</p>
              <p className="text-gray-400 text-xs">Posts, campaigns</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 