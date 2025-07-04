import Layout from '../components/Layout';
import BudgetTable from '../components/BudgetTable';

export default function BudgetPage() {
  return (
    <Layout>
      <div className="p-6">
        <BudgetTable />
      </div>
    </Layout>
  );
} 