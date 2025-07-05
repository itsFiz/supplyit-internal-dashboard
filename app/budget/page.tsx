'use client';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { DollarSign, Plus, TrendingDown, PieChart, BarChart3, Settings, X, Folder, Pencil, Trash2, FolderOpen } from 'lucide-react';
import { useBudgetNested } from '@/hooks/useBudgetNested';
import { useSession } from 'next-auth/react';
import { canAccessBudget } from '@/lib/rbac';
import { useState } from 'react';
import MainCategoryModal from '@/components/MainCategoryModal';
import SubCategoryModal from '@/components/SubCategoryModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { BudgetMainCategory, BudgetSubCategory } from '@/hooks/useBudgetNested';
import toast, { Toaster } from 'react-hot-toast';

export default function BudgetPage() {
  const { data: session } = useSession();
  const { 
    mainCategories, 
    loading, 
    addMainCategory,
    updateMainCategory,
    deleteMainCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory
  } = useBudgetNested();
  
  const [isMainCategoryModalOpen, setIsMainCategoryModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [editingMainCategory, setEditingMainCategory] = useState<BudgetMainCategory | null>(null);
  const [editingSubCategory, setEditingSubCategory] = useState<BudgetSubCategory | null>(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState<BudgetMainCategory | null>(null);
  const [mainCategoryModalMode, setMainCategoryModalMode] = useState<'create' | 'edit'>('create');
  const [subCategoryModalMode, setSubCategoryModalMode] = useState<'create' | 'edit'>('create');
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<{type: 'main' | 'sub', item: BudgetMainCategory | BudgetSubCategory} | null>(null);

  // Check permissions
  const canCreate = session?.user?.role && canAccessBudget(session.user.role, 'CREATE');
  const canUpdate = session?.user?.role && canAccessBudget(session.user.role, 'UPDATE');
  const canDelete = session?.user?.role && canAccessBudget(session.user.role, 'DELETE');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : '0';
  };

  // Calculate totals across all categories
  const totals = mainCategories.reduce((acc, mainCat) => {
    const categoryEstimated = mainCat.subcategories.reduce((sum, sub) => sum + Number(sub.estimatedCost), 0);
    const categoryActual = mainCat.subcategories.reduce((sum, sub) => sum + Number(sub.actualCost), 0);
    
    return {
      estimated: acc.estimated + categoryEstimated,
      actual: acc.actual + categoryActual,
      remaining: acc.remaining + (categoryEstimated - categoryActual),
      // Add main category budget totals
      mainCategoryBudgets: acc.mainCategoryBudgets + Number(mainCat.totalBudget),
      allocated: acc.allocated + categoryEstimated,
    };
  }, { estimated: 0, actual: 0, remaining: 0, mainCategoryBudgets: 0, allocated: 0 });

  // Check for budget violations
  const budgetViolations = mainCategories.filter(mainCat => {
    const categoryEstimated = mainCat.subcategories.reduce((sum, sub) => sum + Number(sub.estimatedCost), 0);
    return categoryEstimated > Number(mainCat.totalBudget);
  });

  // Main Category Handlers
  const handleCreateMainCategory = () => {
    setEditingMainCategory(null);
    setMainCategoryModalMode('create');
    setIsMainCategoryModalOpen(true);
  };

  const handleEditMainCategory = (mainCategory: BudgetMainCategory) => {
    setEditingMainCategory(mainCategory);
    setMainCategoryModalMode('edit');
    setIsMainCategoryModalOpen(true);
  };

  const handleSaveMainCategory = async (name: string, totalBudget: number) => {
    try {
      let success = false;
      if (mainCategoryModalMode === 'create') {
        success = await addMainCategory(name, totalBudget);
        if (success) {
          toast.success(`Main category "${name}" created successfully!`);
        }
      } else if (editingMainCategory) {
        success = await updateMainCategory(editingMainCategory.id, name, totalBudget);
        if (success) {
          toast.success(`Main category "${name}" updated successfully!`);
        }
      }
      return success;
    } catch {
      toast.error('An error occurred while saving the main category');
      return false;
    }
  };

  // Subcategory Handlers
  const handleCreateSubCategory = (mainCategory: BudgetMainCategory) => {
    setSelectedMainCategory(mainCategory);
    setEditingSubCategory(null);
    setSubCategoryModalMode('create');
    setIsSubCategoryModalOpen(true);
  };

  const handleEditSubCategory = (subCategory: BudgetSubCategory, mainCategory: BudgetMainCategory) => {
    setSelectedMainCategory(mainCategory);
    setEditingSubCategory(subCategory);
    setSubCategoryModalMode('edit');
    setIsSubCategoryModalOpen(true);
  };

  const handleSaveSubCategory = async (mainCategoryId: number, name: string, estimatedCost: number, actualCost: number, notes?: string) => {
    try {
      const success = await addSubCategory(mainCategoryId, name, estimatedCost, actualCost, notes);
      if (success) {
        toast.success(`Subcategory "${name}" created successfully!`);
      }
      return success;
    } catch {
      toast.error('An error occurred while saving the subcategory');
      return false;
    }
  };

  const handleUpdateSubCategory = async (id: number, name: string, estimatedCost: number, actualCost: number, notes?: string) => {
    try {
      const success = await updateSubCategory(id, name, estimatedCost, actualCost, notes);
      if (success) {
        toast.success(`Subcategory "${name}" updated successfully!`);
      }
      return success;
    } catch {
      toast.error('An error occurred while updating the subcategory');
      return false;
    }
  };

  // Delete Handlers
  const handleDeleteMainCategory = (mainCategory: BudgetMainCategory) => {
    setDeletingItem({ type: 'main', item: mainCategory });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSubCategory = (subCategory: BudgetSubCategory) => {
    setDeletingItem({ type: 'sub', item: subCategory });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingItem) return;

    try {
      let success = false;
      if (deletingItem.type === 'main') {
        const mainCat = deletingItem.item as BudgetMainCategory;
        success = await deleteMainCategory(mainCat.id);
        if (success) {
          toast.success(`Main category "${mainCat.name}" deleted successfully!`);
        }
      } else {
        const subCat = deletingItem.item as BudgetSubCategory;
        success = await deleteSubCategory(subCat.id);
        if (success) {
          toast.success(`Subcategory "${subCat.name}" deleted successfully!`);
        }
      }
      
      if (!success) {
        throw new Error('Failed to delete item');
      }
    } catch {
      toast.error('An error occurred while deleting the item');
    } finally {
      setDeletingItem(null);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Toaster position="top-center" />
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Budget Management</h1>
              <p className="text-slate-400">Track and manage your project budget allocation with main categories and subcategories</p>
            </div>
            {canCreate && (
              <motion.button
                onClick={handleCreateMainCategory}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                Add Main Category
              </motion.button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Budget</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totals.mainCategoryBudgets)}</p>
                  <p className="text-xs text-slate-500 mt-1">Main Categories</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Allocated</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totals.allocated)}</p>
                  <p className="text-xs text-slate-500 mt-1">Subcategories</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Spent</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totals.actual)}</p>
                  <p className="text-xs text-slate-500 mt-1">Actual Costs</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Spent %</p>
                  <p className="text-2xl font-bold text-white">
                    {formatPercentage(totals.actual, totals.mainCategoryBudgets)}%
                  </p>
                  <p className="text-xs text-slate-500 mt-1">of Total Budget</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Budget Violations Alert */}
          {budgetViolations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h4 className="text-red-400 font-medium">Budget Violations Detected</h4>
                  <p className="text-red-300 text-sm mt-1">
                    {budgetViolations.length} main {budgetViolations.length === 1 ? 'category has' : 'categories have'} subcategories exceeding their allocated budget:
                  </p>
                  <ul className="text-red-300 text-sm mt-2 space-y-1">
                    {budgetViolations.map(mainCat => {
                      const categoryEstimated = mainCat.subcategories.reduce((sum, sub) => sum + Number(sub.estimatedCost), 0);
                      const overAmount = categoryEstimated - Number(mainCat.totalBudget);
                      return (
                        <li key={mainCat.id} className="flex items-center gap-2">
                          <span>•</span>
                          <span className="font-medium">{mainCat.name}</span>
                          <span>is over by {formatCurrency(overAmount)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'details'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              Details
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {mainCategories.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
                      <Folder className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Main Categories</h3>
                    <p className="text-slate-400 mb-6">Get started by adding your first main budget category</p>
                    {canCreate && (
                      <motion.button
                        onClick={handleCreateMainCategory}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="w-4 h-4 inline mr-2" />
                        Add Main Category
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mainCategories.map((mainCategory, index) => {
                      const categoryEstimated = mainCategory.subcategories.reduce((sum, sub) => sum + Number(sub.estimatedCost), 0);
                      const categoryActual = mainCategory.subcategories.reduce((sum, sub) => sum + Number(sub.actualCost), 0);
                      const categoryRemaining = categoryEstimated - categoryActual;
                      const categorySpentPercentage = categoryEstimated > 0 ? (categoryActual / categoryEstimated) * 100 : 0;
                      const totalBudgetPercentage = totals.mainCategoryBudgets > 0 ? (Number(mainCategory.totalBudget) / totals.mainCategoryBudgets) * 100 : 0;
                      const isOverBudget = categoryEstimated > Number(mainCategory.totalBudget);
                      
                      const gradients = [
                        'from-blue-500 to-cyan-500',
                        'from-purple-500 to-pink-500',
                        'from-green-500 to-emerald-500',
                        'from-orange-500 to-red-500',
                        'from-indigo-500 to-purple-500',
                        'from-yellow-500 to-orange-500',
                        'from-teal-500 to-blue-500',
                        'from-red-500 to-pink-500'
                      ];
                      const gradient = gradients[index % gradients.length];
                      
                      return (
                        <motion.div
                          key={mainCategory.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 ${
                            isOverBudget ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'
                          }`}
                        >
                          {/* Main Category Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                                <FolderOpen className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-white">{mainCategory.name}</h3>
                                <p className="text-sm text-slate-400">
                                  {totalBudgetPercentage.toFixed(1)}% of total budget
                                </p>
                                {isOverBudget && (
                                  <p className="text-xs text-red-400 mt-1">
                                    ⚠️ Over budget by {formatCurrency(categoryEstimated - Number(mainCategory.totalBudget))}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {canUpdate && (
                                <button
                                  onClick={() => handleEditMainCategory(mainCategory)}
                                  className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                                  title="Edit main category"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                              )}
                              {canDelete && (
                                <button
                                  onClick={() => handleDeleteMainCategory(mainCategory)}
                                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                                  title="Delete main category"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Budget Summary */}
                          <div className="grid grid-cols-4 gap-3 mb-4">
                            <div className="text-center">
                              <p className="text-xs text-slate-400">Allocated</p>
                              <p className="text-lg font-bold text-white">{formatCurrency(Number(mainCategory.totalBudget))}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-400">Estimated</p>
                              <p className={`text-lg font-bold ${isOverBudget ? 'text-red-400' : 'text-white'}`}>
                                {formatCurrency(categoryEstimated)}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-400">Spent</p>
                              <p className="text-lg font-bold text-white">{formatCurrency(categoryActual)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-400">Remaining</p>
                              <p className={`text-lg font-bold ${categoryRemaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {formatCurrency(categoryRemaining)}
                              </p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-slate-400">Progress</span>
                              <span className="text-sm text-white font-medium">{categorySpentPercentage.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${gradient} transition-all duration-500`}
                                style={{ width: `${Math.min(categorySpentPercentage, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Subcategories */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-slate-300">Subcategories ({mainCategory.subcategories.length})</h4>
                              {canCreate && (
                                <button
                                  onClick={() => handleCreateSubCategory(mainCategory)}
                                  className="flex items-center gap-1 px-2 py-1 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add
                                </button>
                              )}
                            </div>
                            
                            {mainCategory.subcategories.length === 0 ? (
                              <div className="text-center py-4 text-slate-400 text-sm">
                                No subcategories yet
                              </div>
                            ) : (
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {mainCategory.subcategories.map((subCategory) => {
                                  const subSpentPercentage = Number(subCategory.estimatedCost) > 0 ? (Number(subCategory.actualCost) / Number(subCategory.estimatedCost)) * 100 : 0;
                                  const subTotalPercentage = totals.mainCategoryBudgets > 0 ? (Number(subCategory.estimatedCost) / totals.mainCategoryBudgets) * 100 : 0;
                                  
                                  return (
                                    <div
                                      key={subCategory.id}
                                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <p className="text-sm font-medium text-white">{subCategory.name}</p>
                                          <div className="flex items-center gap-2">
                                            {canUpdate && (
                                              <button
                                                onClick={() => handleEditSubCategory(subCategory, mainCategory)}
                                                className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                                                title="Edit subcategory"
                                              >
                                                <Pencil className="w-3 h-3" />
                                              </button>
                                            )}
                                            {canDelete && (
                                              <button
                                                onClick={() => handleDeleteSubCategory(subCategory)}
                                                className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                                                title="Delete subcategory"
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                                          <span>
                                            {formatCurrency(Number(subCategory.estimatedCost))} • {formatCurrency(Number(subCategory.actualCost))} spent
                                          </span>
                                          <span>{subTotalPercentage.toFixed(1)}% of total</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1 mt-2">
                                          <div 
                                            className={`h-1 rounded-full bg-gradient-to-r ${gradient} transition-all duration-300`}
                                            style={{ width: `${Math.min(subSpentPercentage, 100)}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Budget Categories Detail View</h3>
                  {canCreate && (
                    <motion.button
                      onClick={handleCreateMainCategory}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Main Category
                    </motion.button>
                  )}
                </div>

                {mainCategories.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No main categories found</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {mainCategories.map((mainCategory) => {
                      const categoryEstimated = mainCategory.subcategories.reduce((sum, sub) => sum + Number(sub.estimatedCost), 0);
                      const categoryActual = mainCategory.subcategories.reduce((sum, sub) => sum + Number(sub.actualCost), 0);
                      const totalBudgetPercentage = totals.mainCategoryBudgets > 0 ? (Number(mainCategory.totalBudget) / totals.mainCategoryBudgets) * 100 : 0;
                      const isOverBudget = categoryEstimated > Number(mainCategory.totalBudget);
                      
                      return (
                        <div key={mainCategory.id} className={`border rounded-lg overflow-hidden ${
                          isOverBudget ? 'border-red-500/50' : 'border-white/10'
                        }`}>
                          {/* Main Category Header */}
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-semibold text-lg">
                                  {mainCategory.name}
                                  {isOverBudget && <span className="text-red-300 ml-2">⚠️</span>}
                                </h4>
                                <p className="text-white/80 text-sm">
                                  Budget: {formatCurrency(Number(mainCategory.totalBudget))} • Estimated: {formatCurrency(categoryEstimated)} • Spent: {formatCurrency(categoryActual)}
                                </p>
                                <p className="text-white/70 text-xs mt-1">
                                  {totalBudgetPercentage.toFixed(1)}% of total budget
                                  {isOverBudget && (
                                    <span className="text-red-300 ml-2">
                                      (Over by {formatCurrency(categoryEstimated - Number(mainCategory.totalBudget))})
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {canCreate && (
                                  <button
                                    onClick={() => handleCreateSubCategory(mainCategory)}
                                    className="flex items-center gap-1 px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
                                  >
                                    <Plus className="w-3 h-3" />
                                    Add Sub
                                  </button>
                                )}
                                {canUpdate && (
                                  <button
                                    onClick={() => handleEditMainCategory(mainCategory)}
                                    className="p-2 text-white/80 hover:text-white transition-colors"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                )}
                                {canDelete && (
                                  <button
                                    onClick={() => handleDeleteMainCategory(mainCategory)}
                                    className="p-2 text-white/80 hover:text-white transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Subcategories Table */}
                          <div className="bg-white/5">
                            {mainCategory.subcategories.length === 0 ? (
                              <div className="text-center py-8 text-slate-400">
                                No subcategories in this main category
                              </div>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead className="bg-white/5">
                                    <tr>
                                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Subcategory</th>
                                      <th className="px-4 py-3 text-right text-sm font-medium text-slate-300">Estimated</th>
                                      <th className="px-4 py-3 text-right text-sm font-medium text-slate-300">Actual</th>
                                      <th className="px-4 py-3 text-right text-sm font-medium text-slate-300">Remaining</th>
                                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-300">% of Group</th>
                                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-300">% of Total</th>
                                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-300">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-white/10">
                                    {mainCategory.subcategories.map((subCategory) => {
                                      const subEstimated = Number(subCategory.estimatedCost);
                                      const subActual = Number(subCategory.actualCost);
                                      const subRemaining = subEstimated - subActual;
                                      const groupPercentage = categoryEstimated > 0 ? (subEstimated / categoryEstimated) * 100 : 0;
                                      const totalPercentage = totals.mainCategoryBudgets > 0 ? (subEstimated / totals.mainCategoryBudgets) * 100 : 0;
                                      
                                      return (
                                        <tr key={subCategory.id} className="hover:bg-white/5 transition-colors">
                                          <td className="px-4 py-4">
                                            <div>
                                              <p className="text-white font-medium">{subCategory.name}</p>
                                              {subCategory.notes && (
                                                <p className="text-slate-400 text-sm mt-1">{subCategory.notes}</p>
                                              )}
                                            </div>
                                          </td>
                                          <td className="px-4 py-4 text-right text-white">
                                            {formatCurrency(subEstimated)}
                                          </td>
                                          <td className="px-4 py-4 text-right text-white">
                                            {formatCurrency(subActual)}
                                          </td>
                                          <td className="px-4 py-4 text-right">
                                            <span className={subRemaining < 0 ? 'text-red-400' : 'text-white'}>
                                              {formatCurrency(subRemaining)}
                                            </span>
                                          </td>
                                          <td className="px-4 py-4 text-center text-white">
                                            {groupPercentage.toFixed(1)}%
                                          </td>
                                          <td className="px-4 py-4 text-center text-white">
                                            {totalPercentage.toFixed(1)}%
                                          </td>
                                          <td className="px-4 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                              {canUpdate && (
                                                <button
                                                  onClick={() => handleEditSubCategory(subCategory, mainCategory)}
                                                  className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                                                  title="Edit"
                                                >
                                                  <Pencil className="w-4 h-4" />
                                                </button>
                                              )}
                                              {canDelete && (
                                                <button
                                                  onClick={() => handleDeleteSubCategory(subCategory)}
                                                  className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                                                  title="Delete"
                                                >
                                                  <Trash2 className="w-4 h-4" />
                                                </button>
                                              )}
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Category Modal */}
        <MainCategoryModal
          isOpen={isMainCategoryModalOpen}
          onClose={() => setIsMainCategoryModalOpen(false)}
          mainCategory={editingMainCategory}
          onSave={handleSaveMainCategory}
          mode={mainCategoryModalMode}
        />

        {/* Subcategory Modal */}
        {selectedMainCategory && (
          <SubCategoryModal
            isOpen={isSubCategoryModalOpen}
            onClose={() => setIsSubCategoryModalOpen(false)}
            subCategory={editingSubCategory}
            mainCategory={selectedMainCategory}
            onSave={handleSaveSubCategory}
            onUpdate={handleUpdateSubCategory}
            mode={subCategoryModalMode}
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingItem(null);
          }}
          onConfirm={confirmDelete}
          title={`Delete ${deletingItem?.type === 'main' ? 'Main Category' : 'Subcategory'}`}
          message={`Are you sure you want to delete this ${deletingItem?.type === 'main' ? 'main category' : 'subcategory'}?`}
          itemName={deletingItem?.item ? ('name' in deletingItem.item ? deletingItem.item.name : (deletingItem.item as BudgetSubCategory).name) : undefined}
        />
      </div>
    </Layout>
  );
} 