import Layout from '../../components/Layout';
import AnalyticsChart from '../../components/AnalyticsChart';

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Analytics & Insights</h1>
            <p className="text-slate-400 mt-1">Deep dive into your project metrics and performance</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl text-purple-300 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
              Export Report
            </button>
            <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300">
              Schedule Report
            </button>
          </div>
        </div>

        {/* Analytics Charts */}
        <AnalyticsChart />
      </div>
    </Layout>
  );
} 