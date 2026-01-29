import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  Upload,
  CheckCircle,
  GitBranch,
  ArrowRightLeft,
  FileText,
  Clock,
  PieChart,
  FileBarChart,
  Scale,
  Coins,
  TrendingUp,
  BarChart3,
  Search,
  MessageSquare,
  MessageCircle,
  ThumbsUp,
  Globe,
  Users,
  Download,
  Settings,
  X,
  LogOut,
  ChevronDown,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { clsx } from 'clsx';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path?: string;
  children?: {
    icon: LucideIcon;
    label: string;
    path: string;
  }[];
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  {
    icon: Database,
    label: 'Data Management',
    children: [
      { icon: Upload, label: 'BizTrak Upload', path: '/data-management' },
      { icon: CheckCircle, label: 'Data Validation', path: '/data-validation' },
    ],
  },
  {
    icon: GitBranch,
    label: 'Chart of Accounts',
    children: [
      { icon: FileText, label: 'Group COA', path: '/coa' },
      { icon: ArrowRightLeft, label: 'Subsidiary Mapping', path: '/coa/subsidiary-mapping' },
    ],
  },
  {
    icon: ArrowRightLeft,
    label: 'Inter-Company',
    children: [
      { icon: FileText, label: 'Transactions', path: '/inter-company' },
      { icon: Clock, label: 'Adjustments', path: '/inter-company/adjustments' },
    ],
  },
  {
    icon: PieChart,
    label: 'Financial Reports',
    children: [
      { icon: FileBarChart, label: 'Income Statement', path: '/financial-reports' },
      { icon: Scale, label: 'Balance Sheet', path: '/financial-reports/balance-sheet' },
      { icon: Coins, label: 'Cash Flow', path: '/financial-reports/cash-flow' },
    ],
  },
  {
    icon: TrendingUp,
    label: 'Variance Analysis',
    children: [
      { icon: BarChart3, label: 'Period Comparison', path: '/variance-analysis' },
      { icon: Search, label: 'Drill-Down', path: '/variance-analysis/drill-down' },
    ],
  },
  {
    icon: MessageSquare,
    label: 'Commentary & Review',
    children: [
      { icon: MessageCircle, label: 'Admin Commentary', path: '/commentary' },
      { icon: ThumbsUp, label: 'Management Feedback', path: '/commentary/management-feedback' },
    ],
  },
  { icon: Globe, label: 'Multi-Currency & FX', path: '/multi-currency' },
  { icon: Users, label: 'User Management', path: '/users' },
  { icon: Download, label: 'Export & Board Pack', path: '/export' },
  { icon: Settings, label: 'System Settings', path: '/settings' },
];

interface SidebarProps {
  onClose?: () => void;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

// Selection indicator position state
interface IndicatorPosition {
  top: number;
  height: number;
  opacity: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose, isCollapsed = false, toggleCollapse }) => {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorPosition>({ top: 0, height: 0, opacity: 0 });

  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(() => {
    // Auto-expand menu containing current path
    const expanded = new Set<string>();
    menuItems.forEach(item => {
      if (item.children) {
        const isChildActive = item.children.some(child => location.pathname === child.path);
        if (isChildActive) {
          expanded.add(item.label);
        }
      }
    });
    return expanded;
  });

  // Update indicator position when location changes
  const updateIndicatorPosition = useCallback(() => {
    const activeLink = linkRefs.current.get(location.pathname);
    const navElement = navRef.current;

    if (activeLink && navElement) {
      const navRect = navElement.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setIndicatorStyle({
        top: linkRect.top - navRect.top + navElement.scrollTop,
        height: linkRect.height,
        opacity: 1,
      });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  // Update position on location change and after menu expansion animations
  useEffect(() => {
    // Small delay to allow for menu expansion animation
    const timeoutId = setTimeout(updateIndicatorPosition, 50);
    return () => clearTimeout(timeoutId);
  }, [location.pathname, expandedMenus, isCollapsed, updateIndicatorPosition]);

  // Also update on window resize
  useEffect(() => {
    window.addEventListener('resize', updateIndicatorPosition);
    return () => window.removeEventListener('resize', updateIndicatorPosition);
  }, [updateIndicatorPosition]);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const setLinkRef = (path: string) => (el: HTMLAnchorElement | null) => {
    if (el) {
      linkRefs.current.set(path, el);
    } else {
      linkRefs.current.delete(path);
    }
  };

  const renderNavLink = (
    icon: LucideIcon,
    label: string,
    path: string,
    isChild: boolean = false
  ) => {
    const Icon = icon;
    const isActive = location.pathname === path;

    return (
      <NavLink
        key={path}
        to={path}
        ref={setLinkRef(path)}
        onClick={onClose}
        title={isCollapsed ? label : undefined}
        className={clsx(
          'group flex items-center gap-3 py-2.5 mx-3 rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20 relative',
          isCollapsed ? "pl-[18px]" : isChild ? "pl-9" : "pl-3",
          isActive
            ? 'bg-blue-50 text-blue-600 font-semibold dark:bg-blue-950/50'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)]',
        )}
      >
        <Icon
          size={isChild ? 18 : 20}
          strokeWidth={isActive ? 2 : 1.75}
          className={clsx(
            "shrink-0 transition-transform duration-200",
            isActive ? "scale-100" : "group-hover:scale-110"
          )}
        />
        <span className={clsx(
          "truncate transition-all duration-300 ease-in-out text-[14px]",
          isCollapsed ? "w-0 opacity-0 translate-x-[-10px] ml-0" : "w-auto opacity-100 translate-x-0 ml-0"
        )}>
          {label}
        </span>
      </NavLink>
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    if (item.children) {
      const isExpanded = expandedMenus.has(item.label);
      const hasActiveChild = item.children.some(child => location.pathname === child.path);
      const Icon = item.icon;

      return (
        <div key={item.label}>
          <button
            onClick={() => toggleMenu(item.label)}
            title={isCollapsed ? item.label : undefined}
            className={clsx(
              'group flex items-center gap-3 py-2.5 mx-3 rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20 relative w-[calc(100%-1.5rem)]',
              isCollapsed ? "pl-[18px]" : "pl-3",
              hasActiveChild
                ? 'text-blue-600 font-semibold'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)]',
            )}
          >
            <Icon
              size={20}
              strokeWidth={hasActiveChild ? 2 : 1.75}
              className={clsx(
                "shrink-0 transition-transform duration-200",
                hasActiveChild ? "scale-100" : "group-hover:scale-110"
              )}
            />
            <span className={clsx(
              "truncate transition-all duration-300 ease-in-out text-[14px] flex-1 text-left",
              isCollapsed ? "w-0 opacity-0 translate-x-[-10px] ml-0" : "w-auto opacity-100 translate-x-0 ml-0"
            )}>
              {item.label}
            </span>
            {!isCollapsed && (
              <div className="mr-2 text-[var(--color-text-muted)] transition-transform duration-200">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            )}
          </button>

          {/* Submenu */}
          <div className={clsx(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded && !isCollapsed ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}>
            {item.children.map(child => renderNavLink(child.icon, child.label, child.path, true))}
          </div>
        </div>
      );
    }

    return renderNavLink(item.icon, item.label, item.path!, false);
  };

  return (
    <aside className={clsx(
      "h-full flex flex-col bg-[var(--color-bg-card)] border-r border-[var(--color-border-subtle)] transition-all duration-300 relative",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header - Logo Acts as Toggle */}
      <div className={clsx(
        "flex shrink-0 transition-all duration-300 border-b border-[var(--color-border-subtle)] h-16 items-center overflow-hidden",
        isCollapsed ? "px-[20px]" : "px-6"
      )}>
        {/* Clickable Logo Container */}
        <button
          onClick={toggleCollapse}
          className={clsx(
            "flex items-center gap-3 overflow-hidden group outline-none text-left w-full sm:w-auto",
          )}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0 transition-transform group-hover:scale-105 active:scale-95 duration-200 bg-[var(--color-bg-card)] z-10">
            <span className="text-white font-display font-bold text-xl">B</span>
          </div>
          <div className={clsx(
            "flex flex-col transition-all duration-300 ease-in-out whitespace-nowrap",
            isCollapsed ? "w-0 opacity-0 scale-95 translate-x-[-10px]" : "w-auto opacity-100 scale-100 translate-x-0"
          )}>
            <span className="font-display font-bold text-[var(--color-text-main)] text-lg leading-tight group-hover:text-blue-600 transition-colors">BizTrak</span>
            <span className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-widest">Group</span>
          </div>
        </button>

        {/* Mobile Close */}
        {onClose && (
          <button onClick={onClose} className={clsx(
            "md:hidden text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] p-1 ml-auto",
            isCollapsed && "hidden"
          )}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav ref={navRef} className="flex-1 overflow-y-auto py-6 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] relative">
        {/* Animated Selection Indicator */}
        <div
          className="absolute left-3 w-1 bg-blue-600 rounded-full pointer-events-none z-10"
          style={{
            top: indicatorStyle.top,
            height: indicatorStyle.height,
            opacity: indicatorStyle.opacity,
            transition: 'top 300ms cubic-bezier(0.4, 0, 0.2, 1), height 200ms ease-out, opacity 200ms ease-out',
          }}
        />
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-page)]/50">
        <div className={clsx(
          "flex items-center gap-3 p-2 rounded-xl transition-all duration-200 hover:bg-[var(--color-bg-card)] hover:shadow-sm border border-transparent hover:border-[var(--color-border-subtle)] cursor-pointer group",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white shadow-sm shrink-0 overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=0f172a&color=fff"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>

          <div className={clsx(
            "flex-1 min-w-0 transition-all duration-300 ease-in-out",
            isCollapsed ? "w-0 opacity-0 translate-x-[-10px] hidden" : "w-auto opacity-100 translate-x-0"
          )}>
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-sm font-bold text-[var(--color-text-main)] truncate">John Doe</p>
            </div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] truncate">Group CFO</p>
          </div>

          {!isCollapsed && (
            <LogOut size={16} className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    </aside>
  );
};
