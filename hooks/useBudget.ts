import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface BudgetCategory {
  id: number;
  category: string;
  estimatedCost: number;
  actualCost: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  updatedBy?: {
    id: string;
    name?: string;
    email?: string;
  };
}

export interface CreateBudgetData {
  category: string;
  estimatedCost: number;
  actualCost?: number;
  notes?: string;
}

export interface UpdateBudgetData {
  category?: string;
  estimatedCost?: number;
  actualCost?: number;
  notes?: string;
}

export function useBudget() {
  const { data: session } = useSession();
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all budget categories
  const fetchBudgetCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/budget');
      if (!response.ok) {
        throw new Error('Failed to fetch budget categories');
      }
      
      const data = await response.json();
      setBudgetCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Create new budget category
  const createBudgetCategory = async (data: CreateBudgetData): Promise<BudgetCategory | null> => {
    try {
      setError(null);
      
      const response = await fetch('/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create budget category');
      }

      const newCategory = await response.json();
      setBudgetCategories(prev => [newCategory, ...prev]);
      return newCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  };

  // Update budget category
  const updateBudgetCategory = async (id: number, data: UpdateBudgetData): Promise<BudgetCategory | null> => {
    try {
      setError(null);
      
      const response = await fetch(`/api/budget/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update budget category');
      }

      const updatedCategory = await response.json();
      setBudgetCategories(prev => 
        prev.map(category => 
          category.id === id ? updatedCategory : category
        )
      );
      return updatedCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  };

  // Delete budget category
  const deleteBudgetCategory = async (id: number): Promise<boolean> => {
    try {
      setError(null);
      
      const response = await fetch(`/api/budget/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete budget category');
      }

      setBudgetCategories(prev => prev.filter(category => category.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  // Calculate totals
  const totals = {
    estimated: budgetCategories.reduce((sum, category) => sum + Number(category.estimatedCost), 0),
    actual: budgetCategories.reduce((sum, category) => sum + Number(category.actualCost), 0),
    remaining: budgetCategories.reduce((sum, category) => sum + (Number(category.estimatedCost) - Number(category.actualCost)), 0),
  };

  // Get budget status
  const getBudgetStatus = (category: BudgetCategory) => {
    const estimated = Number(category.estimatedCost);
    const actual = Number(category.actualCost);
    const percentage = (actual / estimated) * 100;

    if (percentage >= 100) return 'over-budget';
    if (percentage >= 80) return 'on-track';
    return 'under-budget';
  };

  // Initial fetch
  useEffect(() => {
    if (session) {
      fetchBudgetCategories();
    }
  }, [session]);

  return {
    budgetCategories,
    loading,
    error,
    totals,
    getBudgetStatus,
    createBudgetCategory,
    updateBudgetCategory,
    deleteBudgetCategory,
    refetch: fetchBudgetCategories,
  };
} 