import { useState, useEffect } from 'react';

export interface BudgetSubCategory {
  id: number;
  name: string;
  estimatedCost: number;
  actualCost: number;
  notes?: string;
  mainCategoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetMainCategory {
  id: number;
  name: string;
  totalBudget: number;
  subcategories: BudgetSubCategory[];
  createdAt: string;
  updatedAt: string;
}

export function useBudgetNested() {
  const [mainCategories, setMainCategories] = useState<BudgetMainCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all main categories with subcategories
  const fetchMainCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/budget/main-categories');
      if (!res.ok) throw new Error('Failed to fetch main categories');
      const data = await res.json();
      setMainCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Main Category CRUD
  const addMainCategory = async (name: string, totalBudget: number) => {
    try {
      setError(null);
      const res = await fetch('/api/budget/main-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, totalBudget }),
      });
      if (!res.ok) throw new Error('Failed to create main category');
      await fetchMainCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  const updateMainCategory = async (id: number, name: string, totalBudget: number) => {
    try {
      setError(null);
      const res = await fetch(`/api/budget/main-categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, totalBudget }),
      });
      if (!res.ok) throw new Error('Failed to update main category');
      await fetchMainCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  const deleteMainCategory = async (id: number) => {
    try {
      setError(null);
      const res = await fetch(`/api/budget/main-categories/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete main category');
      await fetchMainCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  // Subcategory CRUD
  const addSubCategory = async (mainCategoryId: number, name: string, estimatedCost: number, actualCost: number, notes?: string) => {
    try {
      setError(null);
      const res = await fetch(`/api/budget/main-categories/${mainCategoryId}/subcategories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, estimatedCost, actualCost, notes }),
      });
      if (!res.ok) throw new Error('Failed to create subcategory');
      await fetchMainCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  const updateSubCategory = async (id: number, name: string, estimatedCost: number, actualCost: number, notes?: string) => {
    try {
      setError(null);
      const res = await fetch(`/api/budget/subcategories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, estimatedCost, actualCost, notes }),
      });
      if (!res.ok) throw new Error('Failed to update subcategory');
      await fetchMainCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  const deleteSubCategory = async (id: number) => {
    try {
      setError(null);
      const res = await fetch(`/api/budget/subcategories/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete subcategory');
      await fetchMainCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  useEffect(() => {
    fetchMainCategories();
  }, []);

  return {
    mainCategories,
    loading,
    error,
    refetch: fetchMainCategories,
    addMainCategory,
    updateMainCategory,
    deleteMainCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
  };
} 