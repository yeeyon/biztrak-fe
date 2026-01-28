import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  FileText,
  ArrowRightLeft,
  PieChart,
  TrendingUp,
  MessageSquare,
  Globe,
  Users,
  FileCheck,
  Settings,
  Download,
  X,
  LogOut,
} from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Database, label: 'Data Management', path: '/data-management' },
  { icon: FileText, label: 'Chart of Accounts', path: '/coa' },
  { icon: ArrowRightLeft, label: 'Inter-Company', path: '/inter-company' },
  { icon: PieChart, label: 'Financial Reports', path: '/financial-reports' },
  { icon: TrendingUp, label: 'Variance Analysis', path: '/variance-analysis' },
  { icon: MessageSquare, label: 'Commentary & Review', path: '/commentary' },
  { icon: Globe, label: 'Multi-Currency & FX', path: '/multi-currency' },
  { icon: Users, label: 'User Management', path: '/users' },
  { icon: FileCheck, label: 'Audit Log', path: '/audit-log' },
  { icon: Download, label: 'Export & Board Pack', path: '/export' },
  { icon: Settings, label: 'System Settings', path: '/settings' },
];

interface SidebarProps {
  onClose?: () => void;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose, isCollapsed = false, toggleCollapse }) => {
  return (
    <aside className={clsx(
      "h-full flex flex-col bg-[var(--color-bg-card)] border-r border-[var(--color-border-subtle)] transition-all duration-300 relative",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header - Logo Acts as Toggle */}
      <div className={clsx(
        "flex shrink-0 transition-all duration-300 border-b border-[var(--color-border-subtle)] h-16 items-center overflow-hidden",
        isCollapsed ? "px-[20px]" : "px-6" // 80px width. Logo 40px. 20px padding sides = Center.
      )}>
        {/* Clickable Logo Container */}
        <button
          onClick={toggleCollapse}
          className={clsx(
            "flex items-center gap-3 overflow-hidden group outline-none text-left w-full sm:w-auto",
            // Remove justify-center, rely on padding
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
      <nav className="flex-1 overflow-y-auto py-6 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            title={isCollapsed ? item.label : undefined}
            className={({ isActive }) => clsx(
              'group flex items-center gap-3 py-2.5 mx-3 rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20 relative',
              // Padding Logic for smooth icon transition
              // Collapsed: Center of 80px (w-20) is 40px. Icon 20px. Start at 30px.
              // Container has mx-3 (12px margins). So box is 80-24 = 56px wide.
              // Center of 56px is 28px. Icon 20px. Start at 18px.
              // Let's stick to simple padding on the container without margins? No, margins look nice (floating buttons)
              // If mx-3: 
              // Expanded (w-64 = 256px): Box 232px. pl-3 (12px) looks standard.
              // Collapsed (w-20 = 80px): Box 56px. Center is 28px. Icon 20px (width). Padding Left = (56 - 20)/2 = 18px.
              isCollapsed ? "pl-[18px]" : "pl-3",

              isActive
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)]',
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className={clsx(
                    "absolute left-0 w-1 bg-blue-600 rounded-r-full transition-all duration-300",
                    isCollapsed ? "h-2 top-1/2 -translate-y-1/2 left-0.5" : "h-6 top-1/2 -translate-y-1/2 left-0"
                  )} />
                )}
                <item.icon
                  size={20}
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
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-page)]/50">
        <div className={clsx(
          "flex items-center gap-3 p-2 rounded-xl transition-all duration-200 hover:bg-[var(--color-bg-card)] hover:shadow-sm border border-transparent hover:border-[var(--color-border-subtle)] cursor-pointer group",
          // Footer Center Logic: Box 80px - 32px (p-4) = 48px width.
          // Profile Pic 40px (w-10).
          // 48 - 40 = 8px. Padding 4px.
          // Expanded: Box large.
          isCollapsed ? "justify-center" : "" // Using justify-center here is ok as it contains img
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
