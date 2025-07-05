'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { BudgetCategory, CreateBudgetData, UpdateBudgetData } from '@/hooks/useBudget';
import { canAccessBudget } from '@/lib/rbac';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budgetItem?: BudgetCategory | null;
  onSave: (data: CreateBudgetData | UpdateBudgetData) => Promise<void>;
  mode: 'create' | 'edit';
}

export default function BudgetModal({ 
  isOpen, 
  onClose, 
  budgetItem, 
  onSave, 
  mode 
}: BudgetModalProps) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<CreateBudgetData>({
    category: '',
    estimatedCost: 0,
    actualCost: 0,
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Predefined category suggestions
  const categorySuggestions = [
    // Product & Tech Development
    'UI/UX Design',
    'Frontend Development',
    'Backend Development',
    'Mobile App Development',
    'Quality Testing',
    'DevOps & Infrastructure',
    'API Development',
    'Database Setup',
    
    // Company Setup & Admin
    'Company Incorporation',
    'IP/Trademark Registration',
    'Google Workspace',
    'Legal Documentation',
    'Accounting Software',
    'Business Insurance',
    
    // Marketing & Branding
    'Landing Page Development',
    'Brand Identity Design',
    'Pitch Deck Creation',
    'Content Creation',
    'Digital Marketing',
    'Social Media Setup',
    
    // Operations
    'Pilot Logistics',
    'Client Onboarding',
    'Driver Recruitment',
    'Operations Management',
    'Customer Support',
    'Training Materials',
    
    // Fundraising & Growth
    'Advisory Services',
    'Investor Deck',
    'Travel & Meetings',
    'Business Development',
    'Market Research',
    'Compliance & Regulations'
  ];

  // Check permissions
  const canCreate = session?.user?.role && canAccessBudget(session.user.role, 'CREATE');
  const canUpdate = session?.user?.role && canAccessBudget(session.user.role, 'UPDATE');

  useEffect(() => {
    if (budgetItem && mode === 'edit') {
      setFormData({
        category: budgetItem.category,
        estimatedCost: Number(budgetItem.estimatedCost),
        actualCost: Number(budgetItem.actualCost),
        notes: budgetItem.notes || ''
      });
    } else {
      setFormData({
        category: '',
        estimatedCost: 0,
        actualCost: 0,
        notes: ''
      });
    }
    setErrors({});
  }, [budgetItem, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    } else if (formData.category.length < 3) {
      newErrors.category = 'Category must be at least 3 characters';
    } else if (formData.category.length > 50) {
      newErrors.category = 'Category must be less than 50 characters';
    }

    if (formData.estimatedCost <= 0) {
      newErrors.estimatedCost = 'Estimated cost must be greater than 0';
    } else if (formData.estimatedCost > 1000000) {
      newErrors.estimatedCost = 'Estimated cost cannot exceed RM 1,000,000';
    }

    if ((formData.actualCost || 0) < 0) {
      newErrors.actualCost = 'Actual cost cannot be negative';
    } else if ((formData.actualCost || 0) > formData.estimatedCost * 1.5) {
      newErrors.actualCost = 'Actual cost cannot exceed 150% of estimated cost';
    }

    if (formData.notes && formData.notes.length > 500) {
      newErrors.notes = 'Notes must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving budget item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateBudgetData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredSuggestions = categorySuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(formData.category.toLowerCase()) &&
    suggestion.toLowerCase() !== formData.category.toLowerCase()
  );

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
    setShowSuggestions(false);
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
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
              {mode === 'create' ? 'Add Budget Category' : 'Edit Budget Category'}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => {
                  handleInputChange('category', e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay hiding suggestions to allow for clicks
                  setTimeout(() => setShowSuggestions(false), 150);
                }}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="e.g., UI/UX Design, Development, Marketing"
                disabled={loading}
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && formData.category && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
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
              
              {errors.category && (
                <p className="text-red-400 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Estimated Cost */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Estimated Cost (RM) *
              </label>
              <input
                type="number"
                value={formData.estimatedCost}
                onChange={(e) => handleInputChange('estimatedCost', parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.estimatedCost ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.estimatedCost && (
                <p className="text-red-400 text-sm mt-1">{errors.estimatedCost}</p>
              )}
            </div>

            {/* Actual Cost */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Actual Cost (RM)
              </label>
              <input
                type="number"
                value={formData.actualCost}
                onChange={(e) => handleInputChange('actualCost', parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.actualCost ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.actualCost && (
                <p className="text-red-400 text-sm mt-1">{errors.actualCost}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.notes ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Additional notes or description..."
                rows={3}
                disabled={loading}
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.notes && (
                  <p className="text-red-400 text-sm">{errors.notes}</p>
                )}
                <p className="text-slate-400 text-sm ml-auto">
                  {(formData.notes?.length || 0)}/500
                </p>
              </div>
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