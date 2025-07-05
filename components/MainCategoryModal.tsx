'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { canAccessBudget } from '@/lib/rbac';
import { BudgetMainCategory } from '@/hooks/useBudgetNested';

interface MainCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mainCategory?: BudgetMainCategory | null;
  onSave: (name: string, totalBudget: number) => Promise<boolean>;
  mode: 'create' | 'edit';
}

export default function MainCategoryModal({ 
  isOpen, 
  onClose, 
  mainCategory, 
  onSave, 
  mode 
}: MainCategoryModalProps) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    totalBudget: 0
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Predefined main category suggestions
  const mainCategorySuggestions = [
    'Product & Tech Development',
    'Company Setup & Admin',
    'Marketing & Branding',
    'Operations & Logistics',
    'Fundraising & Investor Relations',
    'Human Resources',
    'Legal & Compliance',
    'Sales & Business Development',
    'Research & Development',
    'Finance & Accounting'
  ];

  // Check permissions
  const canCreate = session?.user?.role && canAccessBudget(session.user.role, 'CREATE');
  const canUpdate = session?.user?.role && canAccessBudget(session.user.role, 'UPDATE');

  useEffect(() => {
    if (mainCategory && mode === 'edit') {
      setFormData({
        name: mainCategory.name,
        totalBudget: Number(mainCategory.totalBudget)
      });
    } else {
      setFormData({
        name: '',
        totalBudget: 0
      });
    }
    setErrors({});
  }, [mainCategory, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Category name must be at least 3 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Category name must be less than 100 characters';
    }

    if (formData.totalBudget <= 0) {
      newErrors.totalBudget = 'Total budget must be greater than 0';
    } else if (formData.totalBudget > 10000000) {
      newErrors.totalBudget = 'Total budget cannot exceed RM 10,000,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const success = await onSave(formData.name, formData.totalBudget);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving main category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredSuggestions = mainCategorySuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(formData.name.toLowerCase()) &&
    suggestion.toLowerCase() !== formData.name.toLowerCase()
  );

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({ ...prev, name: category }));
    setShowSuggestions(false);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {mode === 'create' ? 'Add Main Category' : 'Edit Main Category'}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  handleInputChange('name', e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 150);
                }}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="e.g., Product & Tech Development"
                disabled={loading}
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && formData.name && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleCategorySelect(suggestion)}
                      className="w-full px-3 py-2 text-left text-white hover:bg-white/10 transition-colors text-sm border-b border-white/10 last:border-b-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Total Budget */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Total Budget (RM) *
              </label>
              <input
                type="number"
                value={formData.totalBudget}
                onChange={(e) => handleInputChange('totalBudget', parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.totalBudget ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.totalBudget && (
                <p className="text-red-400 text-sm mt-1">{errors.totalBudget}</p>
              )}
              {formData.totalBudget > 0 && (
                <p className="text-slate-400 text-sm mt-1">
                  {formatCurrency(formData.totalBudget)}
                </p>
              )}
            </div>

            {/* Info */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <p className="text-blue-300 text-sm">
                💡 <strong>Tip:</strong> The total budget will be distributed across subcategories within this main category.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || (mode === 'create' ? !canCreate : !canUpdate)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {mode === 'create' ? 'Create' : 'Update'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 