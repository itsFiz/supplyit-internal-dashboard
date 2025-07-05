import { Role } from './rbac';
import { 
  LayoutDashboard, 
  Users, 
  Flag, 
  Wallet, 
  BarChart3, 
  Settings, 
  TrendingUp,
  Target,
  Building2,
  DollarSign,
  Code,
  Wrench,
  Megaphone,
  FolderOpen,
  Calculator,
  TrendingDown,
  LucideIcon,
} from 'lucide-react';

// Navigation item interface
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  module: string;
  category: string;
  description?: string;
  badge?: string;
  roles: Role[];
  permissions: ('CREATE' | 'READ' | 'UPDATE' | 'DELETE')[];
}

// Navigation categories
export const NAV_CATEGORIES = {
  DASHBOARD: 'Dashboard',
  STRATEGIC_PLANNING: 'Strategic Planning',
  FINANCIAL_MANAGEMENT: 'Financial Management',
  PRODUCT_TECH: 'Product & Technology',
  OPERATIONS: 'Operations',
  DOCUMENT_MANAGEMENT: 'Document Management',
  SYSTEM: 'System',
} as const;

// Complete navigation configuration
export const NAVIGATION_CONFIG: NavItem[] = [
  // Dashboard
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    module: 'KPI_DASHBOARD',
    category: NAV_CATEGORIES.DASHBOARD,
    description: 'Overview of key metrics and performance',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'FINANCE_CONTROLLER', 'PRODUCT_OWNER', 'OPS_MANAGER', 'TECH_LEAD', 'STRATEGY_LEAD', 'SALES_LEAD', 'INVESTOR', 'PILOT_CLIENT', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },

  // Strategic Planning
  {
    href: '/strategy',
    label: 'Strategy & Vision',
    icon: Target,
    module: 'ROADMAP_TIMELINE_VIEW',
    category: NAV_CATEGORIES.STRATEGIC_PLANNING,
    description: 'Strategic planning and vision alignment',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'STRATEGY_LEAD', 'PRODUCT_OWNER', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },
  {
    href: '/legal',
    label: 'Legal & Structure',
    icon: Building2,
    module: 'COMPLIANCE_RISK_LOGS',
    category: NAV_CATEGORIES.STRATEGIC_PLANNING,
    description: 'Legal compliance and corporate structure',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'STRATEGY_LEAD', 'INVESTOR', 'ADVISOR'],
    permissions: ['READ', 'UPDATE'],
  },
  {
    href: '/fundraising',
    label: 'Fundraising & Finance',
    icon: DollarSign,
    module: 'INVESTOR_REPORT_GENERATOR',
    category: NAV_CATEGORIES.STRATEGIC_PLANNING,
    description: 'Fundraising activities and investor relations',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'FINANCE_CONTROLLER', 'STRATEGY_LEAD', 'SALES_LEAD', 'INVESTOR', 'ADVISOR'],
    permissions: ['READ', 'UPDATE'],
  },

  // Product & Technology
  {
    href: '/product',
    label: 'Product & Tech',
    icon: Code,
    module: 'DEV_PROGRESS_INFRA_STATUS',
    category: NAV_CATEGORIES.PRODUCT_TECH,
    description: 'Product development and technical infrastructure',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'PRODUCT_OWNER', 'TECH_LEAD', 'STRATEGY_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },
  {
    href: '/operations',
    label: 'Operations & Pilot',
    icon: Wrench,
    module: 'DELIVERY_NETWORK_METRICS',
    category: NAV_CATEGORIES.OPERATIONS,
    description: 'Operational processes and pilot program management',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'OPS_MANAGER', 'PRODUCT_OWNER', 'STRATEGY_LEAD', 'SALES_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },
  {
    href: '/brand',
    label: 'Brand & Marketing',
    icon: Megaphone,
    module: 'KPI_DASHBOARD',
    category: NAV_CATEGORIES.OPERATIONS,
    description: 'Brand strategy and marketing initiatives',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'SALES_LEAD', 'STRATEGY_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },

  // Document Management
  {
    href: '/documents',
    label: 'Document Center',
    icon: FolderOpen,
    module: 'COMPLIANCE_RISK_LOGS',
    category: NAV_CATEGORIES.DOCUMENT_MANAGEMENT,
    description: 'Centralized document management and storage',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'FINANCE_CONTROLLER', 'PRODUCT_OWNER', 'OPS_MANAGER', 'STRATEGY_LEAD', 'SALES_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },

  // Team & People
  {
    href: '/team',
    label: 'Team',
    icon: Users,
    module: 'HIRING_HEADCOUNT_PLAN',
    category: NAV_CATEGORIES.OPERATIONS,
    description: 'Team management and hiring plans',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'OPS_MANAGER', 'SALES_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },
  {
    href: '/milestones',
    label: 'Milestones',
    icon: Flag,
    module: 'MVP_MILESTONE_PROGRESS',
    category: NAV_CATEGORIES.OPERATIONS,
    description: 'Project milestones and progress tracking',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'PRODUCT_OWNER', 'TECH_LEAD', 'STRATEGY_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },

  // Financial Management
  {
    href: '/financial-metrics',
    label: 'Financial Metrics',
    icon: Calculator,
    module: 'KPI_DASHBOARD',
    category: NAV_CATEGORIES.FINANCIAL_MANAGEMENT,
    description: 'Key financial metrics and performance indicators',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'FINANCE_CONTROLLER', 'STRATEGY_LEAD', 'SALES_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },
  {
    href: '/financial-projections',
    label: 'Financial Projections',
    icon: TrendingDown,
    module: 'FINANCIAL_PROJECTIONS',
    category: NAV_CATEGORIES.FINANCIAL_MANAGEMENT,
    description: 'Financial forecasting and projections',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'FINANCE_CONTROLLER', 'STRATEGY_LEAD', 'SALES_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },
  {
    href: '/budget',
    label: 'Budget',
    icon: Wallet,
    module: 'CAPITAL_USAGE_BUDGET',
    category: NAV_CATEGORIES.FINANCIAL_MANAGEMENT,
    description: 'Budget planning and capital allocation',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'FINANCE_CONTROLLER', 'STRATEGY_LEAD', 'SALES_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },

  // Analytics & Reporting
  {
    href: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
    module: 'KPI_DASHBOARD',
    category: NAV_CATEGORIES.OPERATIONS,
    description: 'Advanced analytics and reporting',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'FINANCE_CONTROLLER', 'PRODUCT_OWNER', 'OPS_MANAGER', 'TECH_LEAD', 'STRATEGY_LEAD', 'SALES_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },
  {
    href: '/roadmap',
    label: 'Roadmap',
    icon: TrendingUp,
    module: 'ROADMAP_TIMELINE_VIEW',
    category: NAV_CATEGORIES.OPERATIONS,
    description: 'Product roadmap and timeline planning',
    roles: ['FOUNDER', 'SUPER_ADMIN', 'PRODUCT_OWNER', 'STRATEGY_LEAD', 'INVESTOR', 'ADVISOR', 'TEAM'],
    permissions: ['READ', 'UPDATE'],
  },

  // System
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    module: 'USER_MANAGEMENT',
    category: NAV_CATEGORIES.SYSTEM,
    description: 'System settings and user management',
    roles: ['FOUNDER', 'SUPER_ADMIN'],
    permissions: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
  },
];

// Get navigation items for a specific role
export function getNavigationForRole(role: Role): NavItem[] {
  return NAVIGATION_CONFIG.filter(item => item.roles.includes(role));
}

// Get navigation items grouped by category for a role
export function getNavigationByCategory(role: Role): Record<string, NavItem[]> {
  const items = getNavigationForRole(role);
  const grouped: Record<string, NavItem[]> = {};
  
  items.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });
  
  return grouped;
}

// Get category order for consistent display
export const CATEGORY_ORDER = [
  NAV_CATEGORIES.DASHBOARD,
  NAV_CATEGORIES.STRATEGIC_PLANNING,
  NAV_CATEGORIES.FINANCIAL_MANAGEMENT,
  NAV_CATEGORIES.PRODUCT_TECH,
  NAV_CATEGORIES.OPERATIONS,
  NAV_CATEGORIES.DOCUMENT_MANAGEMENT,
  NAV_CATEGORIES.SYSTEM,
];

// Get category styling
export function getCategoryStyling(category: string) {
  const styles: Record<string, {
    color: string;
    gradient: string;
    borderColor: string;
    iconColor: string;
    dotColor: string;
  }> = {
    [NAV_CATEGORIES.DASHBOARD]: {
      color: 'blue',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      dotColor: 'bg-blue-400',
    },
    [NAV_CATEGORIES.STRATEGIC_PLANNING]: {
      color: 'purple',
      gradient: 'from-purple-500/20 to-blue-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      dotColor: 'bg-purple-400',
    },
    [NAV_CATEGORIES.FINANCIAL_MANAGEMENT]: {
      color: 'green',
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400',
      dotColor: 'bg-green-400',
    },
    [NAV_CATEGORIES.PRODUCT_TECH]: {
      color: 'indigo',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-400',
      dotColor: 'bg-indigo-400',
    },
    [NAV_CATEGORIES.OPERATIONS]: {
      color: 'orange',
      gradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-400',
      dotColor: 'bg-orange-400',
    },
    [NAV_CATEGORIES.DOCUMENT_MANAGEMENT]: {
      color: 'emerald',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      dotColor: 'bg-emerald-400',
    },
    [NAV_CATEGORIES.SYSTEM]: {
      color: 'slate',
      gradient: 'from-slate-500/20 to-gray-500/20',
      borderColor: 'border-slate-500/30',
      iconColor: 'text-slate-400',
      dotColor: 'bg-slate-400',
    },
  };
  
  return styles[category] || styles[NAV_CATEGORIES.SYSTEM];
}

// Check if user has permission for a navigation item
export function canAccessNavItem(role: Role, item: NavItem): boolean {
  return item.roles.includes(role);
}

// Get role display name
export function getRoleDisplayName(role: Role): string {
  const displayNames: Record<Role, string> = {
    FOUNDER: 'Founder',
    SUPER_ADMIN: 'Super Admin',
    FINANCE_CONTROLLER: 'Finance Controller',
    PRODUCT_OWNER: 'Product Owner',
    OPS_MANAGER: 'Operations Manager',
    TECH_LEAD: 'Tech Lead',
    STRATEGY_LEAD: 'Strategy Lead',
    SALES_LEAD: 'Sales Lead',
    INVESTOR: 'Investor',
    PILOT_CLIENT: 'Pilot Client',
    ADVISOR: 'Advisor',
    FOUNDING_TEAM: 'Founding Team',
    TEAM: 'Team Member',
  };
  
  return displayNames[role] || role;
}

// Get role description
export function getRoleDescription(role: Role): string {
  const descriptions: Record<Role, string> = {
    FOUNDER: 'Full system access and control',
    SUPER_ADMIN: 'Administrative access to all features',
    FINANCE_CONTROLLER: 'Financial management and reporting',
    PRODUCT_OWNER: 'Product development and roadmap',
    OPS_MANAGER: 'Operations and delivery management',
    TECH_LEAD: 'Technical development and infrastructure',
    STRATEGY_LEAD: 'Strategic planning and investor relations',
    SALES_LEAD: 'Sales and business development',
    INVESTOR: 'Read-only access to business metrics',
    PILOT_CLIENT: 'Limited access to relevant metrics',
    ADVISOR: 'Advisory access to business information',
    FOUNDING_TEAM: 'Founding team member access',
    TEAM: 'Basic access to team-relevant information',
  };
  
  return descriptions[role] || 'Standard team member access';
} 