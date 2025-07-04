import Layout from '../components/Layout';
import KPICards from '../components/KPICards';
import BudgetTable from '../components/BudgetTable';
import MilestoneTracker from '../components/MilestoneTracker';

export default function Home() {
  return (
    <Layout>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <KPICards />
        <BudgetTable />
        <MilestoneTracker />
      </div>
    </Layout>
  );
} 