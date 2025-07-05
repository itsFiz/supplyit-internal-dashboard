'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { canAccessBudget } from '@/lib/rbac';
import { BudgetSubCategory, BudgetMainCategory } from '@/hooks/useBudgetNested';

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  subCategory?: BudgetSubCategory | null;
  mainCategory: BudgetMainCategory;
  onSave: (mainCategoryId: number, name: string, estimatedCost: number, actualCost: number, notes?: string) => Promise<boolean>;
  onUpdate?: (id: number, name: string, estimatedCost: number, actualCost: number, notes?: string) => Promise<boolean>;
  mode: 'create' | 'edit';
}

export default function SubCategoryModal({ 
  isOpen, 
  onClose, 
  subCategory, 
  mainCategory,
  onSave,
  onUpdate,
  mode 
}: SubCategoryModalProps) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    estimatedCost: 0,
    actualCost: 0,
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Predefined subcategory suggestions based on main category
  const getSubCategorySuggestions = (mainCategoryName: string) => {
    const suggestions: Record<string, string[]> = {
      'Product & Tech Development': [
        'UI/UX Design',
        'Frontend Development',
        'Backend Development',
        'Mobile App Development',
        'Quality Testing',
        'DevOps & Infrastructure',
        'API Development',
        'Database Setup',
        'Code Review & Architecture'
      ],
      'Company Setup & Admin': [
        'Company Incorporation',
        'IP/Trademark Registration',
        'Google Workspace',
        'Legal Documentation',
        'Accounting Software',
        'Business Insurance',
        'Office Setup',
        'Equipment Purchase'
      ],
      'Marketing & Branding': [
        'Landing Page Development',
        'Brand Identity Design',
        'Pitch Deck Creation',
        'Content Creation',
        'Digital Marketing',
        'Social Media Setup',
        'SEO & Analytics',
        'Marketing Materials'
      ],
      'Operations & Logistics': [
        'Pilot Logistics',
        'Client Onboarding',
        'Driver Recruitment',
        'Operations Management',
        'Customer Support',
        'Training Materials',
        'Process Documentation',
        'Quality Assurance'
      ],
      'Fundraising & Investor Relations': [
        'Advisory Services',
        'Investor Deck',
        'Travel & Meetings',
        'Legal Documentation',
        'Due Diligence',
        'Pitch Preparation',
        'Valuation Services',
        'Compliance'
      ]
    };
    
    return suggestions[mainCategoryName] || [
      'Research & Analysis',
      'Planning & Strategy',
      'Implementation',
      'Testing & Quality',
      'Documentation',
      'Training & Support'
    ];
  };

  const subCategorySuggestions = getSubCategorySuggestions(mainCategory.name);

  // Check permissions
  const canCreate = session?.user?.role && canAccessBudget(session.user.role, 'CREATE');
  const canUpdate = session?.user?.role && canAccessBudget(session.user.role, 'UPDATE');

  useEffect(() => {
    if (subCategory && mode === 'edit') {
      setFormData({
        name: subCategory.name,
        estimatedCost: Number(subCategory.estimatedCost),
        actualCost: Number(subCategory.actualCost),
        notes: subCategory.notes || ''
      });
    } else {
      setFormData({
        name: '',
        estimatedCost: 0,
        actualCost: 0,
        notes: ''
      });
    }
    setErrors({});
  }, [subCategory, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subcategory name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Subcategory name must be at least 3 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Subcategory name must be less than 100 characters';
    }

    if (formData.estimatedCost <= 0) {
      newErrors.estimatedCost = 'Estimated cost must be greater than 0';
    } else if (formData.estimatedCost > Number(mainCategory.totalBudget)) {
      newErrors.estimatedCost = `Estimated cost cannot exceed main category budget (${formatCurrency(Number(mainCategory.totalBudget))})`;
    }

    if (formData.actualCost < 0) {
      newErrors.actualCost = 'Actual cost cannot be negative';
    } else if (formData.actualCost > formData.estimatedCost * 1.5) {
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
      let success = false;
      if (mode === 'create') {
        success = await onSave(mainCategory.id, formData.name, formData.estimatedCost, formData.actualCost, formData.notes);
      } else if (mode === 'edit' && subCategory && onUpdate) {
        success = await onUpdate(subCategory.id, formData.name, formData.estimatedCost, formData.actualCost, formData.notes);
      }
      
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
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

  const filteredSuggestions = subCategorySuggestions.filter(suggestion =>
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

  // Calculate remaining budget in main category
  const usedBudget = mainCategory.subcategories.reduce((sum, sub) => {
    if (mode === 'edit' && subCategory && sub.id === subCategory.id) {
      return sum; // Don't count the current subcategory being edited
    }
    return sum + Number(sub.estimatedCost);
  }, 0);
  const remainingBudget = Number(mainCategory.totalBudget) - usedBudget;

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
            <div>
              <h2 className="text-xl font-bold text-white">
                {mode === 'create' ? 'Add Subcategory' : 'Edit Subcategory'}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                in {mainCategory.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Budget Info */}
          <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">Main Category Budget:</span>
              <span className="text-white">{formatCurrency(Number(mainCategory.totalBudget))}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-blue-300">Remaining Budget:</span>
              <span className={`${remainingBudget >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {formatCurrency(remainingBudget)}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subcategory Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Subcategory Name *
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
                placeholder="e.g., UI/UX Design, Frontend Development"
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
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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