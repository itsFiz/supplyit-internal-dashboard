'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Download, Search, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useBudget, BudgetCategory, CreateBudgetData, UpdateBudgetData } from '@/hooks/useBudget';
import BudgetModal from './BudgetModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { canAccessBudget } from '@/lib/rbac';

export default function BudgetTable() {
  const { data: session } = useSession();
  const { 
    budgetCategories, 
    loading, 
    error, 
    totals, 
    getBudgetStatus,
    createBudgetCategory,
    updateBudgetCategory,
    deleteBudgetCategory 
  } = useBudget();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetCategory | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: BudgetCategory | null;
  }>({ isOpen: false, item: null });

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'over-budget':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'under-budget':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600 bg-green-100/10';
      case 'over-budget':
        return 'text-red-600 bg-red-100/10';
      case 'under-budget':
        return 'text-blue-600 bg-blue-100/10';
      default:
        return 'text-gray-600 bg-gray-100/10';
    }
  };

  const filteredData = budgetCategories.filter(item => 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingItem(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEdit = (item: BudgetCategory) => {
    setEditingItem(item);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (item: BudgetCategory) => {
    setDeleteModal({ isOpen: true, item });
  };

  const confirmDelete = async () => {
    if (deleteModal.item) {
      await deleteBudgetCategory(deleteModal.item.id);
      setDeleteModal({ isOpen: false, item: null });
    }
  };

  const handleSave = async (data: CreateBudgetData | UpdateBudgetData) => {
    if (modalMode === 'create') {
      await createBudgetCategory(data as CreateBudgetData);
    } else if (editingItem) {
      await updateBudgetCategory(editingItem.id, data as UpdateBudgetData);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          {canCreate && (
            <motion.button
              onClick={handleCreate}
              data-action="add-budget"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Add Category
            </motion.button>
          )}
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Estimated</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(totals.estimated)}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(totals.actual)}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Remaining</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(totals.remaining)}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Budget Table */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Category</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Estimated</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Actual</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Remaining</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-slate-300">Status</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    {searchTerm ? 'No categories found matching your search.' : 'No budget categories yet.'}
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const status = getBudgetStatus(item);
                  const remaining = Number(item.estimatedCost) - Number(item.actualCost);
                  
                  return (
                    <motion.tr
                      key={item.id}
                      variants={itemVariants}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{item.category}</p>
                          {item.notes && (
                            <p className="text-slate-400 text-sm mt-1">{item.notes}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-white">
                        {formatCurrency(Number(item.estimatedCost))}
                      </td>
                      <td className="px-6 py-4 text-right text-white">
                        {formatCurrency(Number(item.actualCost))}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={remaining < 0 ? 'text-red-400' : 'text-white'}>
                          {formatCurrency(remaining)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {getStatusIcon(status)}
                          {status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            disabled={!canUpdate}
                            className="p-1 text-slate-400 hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                                                     <button
                             onClick={() => handleDelete(item)}
                             disabled={!canDelete}
                             className="p-1 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                             title="Delete"
                           >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Budget Modal */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        budgetItem={editingItem}
        onSave={handleSave}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Budget Category"
        message="Are you sure you want to delete this budget category?"
        itemName={deleteModal.item?.category}
      />
    </div>
  );
} 