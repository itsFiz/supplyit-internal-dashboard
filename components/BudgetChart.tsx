'use client';

import { BudgetCategory } from '@/hooks/useBudget';
import { Pencil, Trash2 } from 'lucide-react';

interface BudgetChartProps {
  budgetCategories: BudgetCategory[];
  onEdit?: (category: BudgetCategory) => void;
  onDelete?: (category: BudgetCategory) => void;
  canUpdate?: boolean;
  canDelete?: boolean;
}

interface CategoryGroup {
  name: string;
  color: string;
  categories: BudgetCategory[];
}

interface GroupData {
  id: string;
  name: string;
  color: string;
  estimatedCost: number;
  actualCost: number;
  categories: BudgetCategory[];
}

// Group categories by main areas
const getCategoryGroup = (categoryName: string) => {
  if (categoryName.includes('UI/UX') || categoryName.includes('Frontend') || categoryName.includes('Backend') || categoryName.includes('Testing')) {
    return { name: 'Product & Tech Development', color: 'from-blue-500 to-cyan-500' };
  }
  if (categoryName.includes('Incorporation') || categoryName.includes('IP/Trademark') || categoryName.includes('Google Workspace')) {
    return { name: 'Company Setup & Admin', color: 'from-purple-500 to-pink-500' };
  }
  if (categoryName.includes('Landing Page') || categoryName.includes('Brand Identity') || categoryName.includes('Pitch Deck')) {
    return { name: 'Marketing & Branding', color: 'from-green-500 to-emerald-500' };
  }
  if (categoryName.includes('Pilot Logistics') || categoryName.includes('Client Onboarding') || categoryName.includes('Driver Recruitment')) {
    return { name: 'Client Pilot & GTM Ops', color: 'from-orange-500 to-red-500' };
  }
  if (categoryName.includes('Advisory') || categoryName.includes('Investor Deck') || categoryName.includes('Travel')) {
    return { name: 'Fundraising & Investor Relations', color: 'from-indigo-500 to-purple-500' };
  }
  return { name: 'Other', color: 'from-gray-500 to-slate-500' };
};

export default function BudgetChart({ budgetCategories, onEdit, onDelete, canUpdate, canDelete }: BudgetChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Group budget categories
  const groupedCategories = budgetCategories.reduce((groups, category) => {
    const group = getCategoryGroup(category.category);
    if (!groups[group.name]) {
      groups[group.name] = {
        name: group.name,
        color: group.color,
        categories: []
      };
    }
    groups[group.name].categories.push(category);
    return groups;
  }, {} as Record<string, CategoryGroup>);

  // Calculate group data for status display
  const groupData = Object.values(groupedCategories).map((group: CategoryGroup): GroupData => {
    const groupTotal = group.categories.reduce((sum: number, cat: BudgetCategory) => sum + Number(cat.estimatedCost), 0);
    const groupSpent = group.categories.reduce((sum: number, cat: BudgetCategory) => sum + Number(cat.actualCost), 0);
    
    return {
      id: group.name,
      name: group.name,
      color: group.color,
      estimatedCost: groupTotal,
      actualCost: groupSpent,
      categories: group.categories
    };
  });

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 budget-chart-container">
      <h3 className="text-lg font-semibold text-white mb-4">Budget Distribution</h3>
      {groupData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 mb-4">No budget categories found</p>
          <p className="text-slate-500 text-sm">Add budget categories to see the distribution chart</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Budget Status by Area</h4>
          <div className="space-y-4">
            {groupData.map((group: GroupData, index: number) => {
              const colors = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-indigo-500 to-purple-500'];
              const groupTotal = Number(group.estimatedCost);
              const groupSpent = Number(group.actualCost);
              const groupRemaining = groupTotal - groupSpent;
              const spentPercentage = groupTotal > 0 ? (groupSpent / groupTotal) * 100 : 0;
              
              // Determine group status
              let groupStatus = { status: 'under-budget', color: 'text-green-400', bgColor: 'bg-white/5' };
              if (spentPercentage >= 100) {
                groupStatus = { status: 'over-budget', color: 'text-red-400', bgColor: 'bg-white/5' };
              } else if (spentPercentage >= 80) {
                groupStatus = { status: 'on-track', color: 'text-yellow-400', bgColor: 'bg-white/5' };
              }
              
              return (
                <div key={group.name} className={`p-4 rounded-lg ${groupStatus.bgColor} border border-white/10`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors[index % colors.length]}`}></div>
                      <h5 className="text-white font-medium">{group.name}</h5>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${groupStatus.color} bg-white/10`}>
                        {groupStatus.status.replace('-', ' ')}
                      </span>
                      {canUpdate && group.categories.length > 0 && (
                        <button
                          onClick={() => onEdit && onEdit(group.categories[0])}
                          className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                          title="Edit first category in group"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                      {canDelete && group.categories.length > 0 && (
                        <button
                          onClick={() => onDelete && onDelete(group.categories[0])}
                          className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                          title="Delete first category in group"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Estimated:</span>
                      <span className="text-white">{formatCurrency(groupTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Spent:</span>
                      <span className="text-white">{formatCurrency(groupSpent)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Remaining:</span>
                      <span className="text-white">{formatCurrency(groupRemaining)}</span>
                  </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div 
                        className={`h-1.5 rounded-full bg-gradient-to-r ${colors[index % colors.length]} transition-all duration-500`}
                        style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                    ></div>
                    </div>
                    <div className="text-xs text-slate-400 text-center">
                      {spentPercentage.toFixed(1)}% spent
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 