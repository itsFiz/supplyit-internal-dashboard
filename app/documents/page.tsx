'use client';

import Layout from '@/components/Layout';
import { 
  FolderOpen, 
  Upload, 
  Search, 
  Filter, 
  FileText, 
  Image, 
  File, 
  Download, 
  Trash2, 
  Eye,
  Calendar,
  User,
} from 'lucide-react';
import { useState } from 'react';

interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
  url: string;
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', color: 'bg-gray-500' },
    { id: 'strategy', name: 'Strategy & Vision', color: 'bg-purple-500' },
    { id: 'legal', name: 'Legal & Structure', color: 'bg-blue-500' },
    { id: 'fundraising', name: 'Fundraising & Finance', color: 'bg-green-500' },
    { id: 'product', name: 'Product & Tech', color: 'bg-orange-500' },
    { id: 'operations', name: 'Operations & Pilot', color: 'bg-red-500' },
    { id: 'brand', name: 'Brand & Marketing', color: 'bg-pink-500' },
    { id: 'invoices', name: 'Invoices & Receipts', color: 'bg-yellow-500' },
    { id: 'contracts', name: 'Contracts & Agreements', color: 'bg-indigo-500' },
    { id: 'reports', name: 'Reports & Analytics', color: 'bg-teal-500' }
  ];

  const fileTypes = [
    { id: 'all', name: 'All Types', icon: File },
    { id: 'pdf', name: 'PDF', icon: FileText },
    { id: 'doc', name: 'Documents', icon: FileText },
    { id: 'image', name: 'Images', icon: Image },
    { id: 'spreadsheet', name: 'Spreadsheets', icon: FileText },
    { id: 'presentation', name: 'Presentations', icon: FileText }
  ];

  // Mock data - replace with actual data from your backend
  const documents: Document[] = [
    {
      id: '1',
      name: 'SupplyIT Vision Statement.pdf',
      category: 'strategy',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'Fiz',
      uploadedAt: '2025-01-15',
      tags: ['vision', 'strategy', 'core'],
      url: '#'
    },
    {
      id: '2',
      name: 'Founder Agreement Draft.docx',
      category: 'legal',
      type: 'doc',
      size: '1.8 MB',
      uploadedBy: 'Muhaimin',
      uploadedAt: '2025-01-14',
      tags: ['legal', 'founder', 'agreement'],
      url: '#'
    },
    {
      id: '3',
      name: 'Pre-Seed Pitch Deck.pptx',
      category: 'fundraising',
      type: 'presentation',
      size: '15.2 MB',
      uploadedBy: 'Irfan',
      uploadedAt: '2025-01-13',
      tags: ['pitch', 'fundraising', 'investor'],
      url: '#'
    },
    {
      id: '4',
      name: 'MVP Architecture Diagram.png',
      category: 'product',
      type: 'image',
      size: '3.1 MB',
      uploadedBy: 'Fiz',
      uploadedAt: '2025-01-12',
      tags: ['architecture', 'tech', 'mvp'],
      url: '#'
    },
    {
      id: '5',
      name: 'SME Onboarding SOP.pdf',
      category: 'operations',
      type: 'pdf',
      size: '4.7 MB',
      uploadedBy: 'Arif',
      uploadedAt: '2025-01-11',
      tags: ['sop', 'onboarding', 'sme'],
      url: '#'
    },
    {
      id: '6',
      name: 'Brand Guidelines.pdf',
      category: 'brand',
      type: 'pdf',
      size: '8.9 MB',
      uploadedBy: 'Arif',
      uploadedAt: '2025-01-10',
      tags: ['brand', 'guidelines', 'design'],
      url: '#'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-400" />;
      case 'doc':
        return <FileText className="w-6 h-6 text-blue-400" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-400" />;
      case 'spreadsheet':
        return <FileText className="w-6 h-6 text-green-400" />;
      case 'presentation':
        return <FileText className="w-6 h-6 text-orange-400" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'bg-gray-500';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        alert('File uploaded successfully!');
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <FolderOpen className="w-8 h-8 text-green-400" />
            Document Center
          </h1>
          <p className="text-gray-300 text-lg">
            Centralized storage for all SupplyIT documents and files
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Upload Documents</h2>
          </div>
          
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
            <p className="text-white mb-4">Drag and drop files here, or click to browse</p>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.gif"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Choose Files
                </>
              )}
            </label>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Filters & Search</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id} className="bg-slate-800">
                  {category.name}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
            >
              {fileTypes.map(type => (
                <option key={type.id} value={type.id} className="bg-slate-800">
                  {type.name}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Documents ({filteredDocuments.length})</h2>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Showing {filteredDocuments.length} of {documents.length} documents</span>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No documents found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map(doc => (
                <div key={doc.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    {getFileIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{doc.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${getCategoryColor(doc.category)}`}></span>
                        <span className="text-gray-400 text-xs">
                          {categories.find(cat => cat.id === doc.category)?.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Calendar className="w-3 h-3" />
                      {doc.uploadedAt}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <User className="w-3 h-3" />
                      {doc.uploadedBy}
                    </div>
                    <div className="text-gray-400 text-xs">{doc.size}</div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {doc.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-xs hover:bg-blue-500/30 transition-all duration-300">
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-xs hover:bg-green-500/30 transition-all duration-300">
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-xs hover:bg-red-500/30 transition-all duration-300 ml-auto">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Overview */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Storage by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.slice(1).map(category => {
              const count = documents.filter(doc => doc.category === category.id).length;
              return (
                <div key={category.id} className="text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-medium text-sm">{category.name}</p>
                  <p className="text-gray-400 text-xs">{count} files</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
} 