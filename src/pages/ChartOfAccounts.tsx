import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronRight, ChevronDown, Edit2, Lock, ListFilter } from 'lucide-react';
import { clsx } from 'clsx';

interface COAItem {
  id: string;
  code: string;
  name: string;
  type: 'Revenue' | 'Cost of Sales' | 'OPEX' | 'Asset' | 'Liability' | 'Equity';
  level: 1 | 2 | 3 | 4 | 5;
  children?: COAItem[];
  isExpanded?: boolean;
}

const initialCOA: COAItem[] = [
  {
    id: '1',
    code: '4000',
    name: 'Revenue',
    type: 'Revenue',
    level: 1,
    isExpanded: true,
    children: [
      {
        id: '1-1',
        code: '4100',
        name: 'Sales Revenue',
        type: 'Revenue',
        level: 2,
        isExpanded: true,
        children: [
          { id: '1-1-1', code: '4110', name: 'Software Sales', type: 'Revenue', level: 3 },
          { id: '1-1-2', code: '4120', name: 'Hardware Sales', type: 'Revenue', level: 3 },
          { id: '1-1-3', code: '4130', name: 'Maintenance & Support', type: 'Revenue', level: 3 },
        ]
      },
      {
        id: '1-2',
        code: '4200',
        name: 'Other Income',
        type: 'Revenue',
        level: 2,
        isExpanded: false,
        children: [
          { id: '1-2-1', code: '4210', name: 'Interest Income', type: 'Revenue', level: 3 },
        ]
      }
    ]
  },
  {
    id: '2',
    code: '5000',
    name: 'Cost of Sales',
    type: 'Cost of Sales',
    level: 1,
    isExpanded: false,
    children: []
  },
  {
    id: '3',
    code: '6000',
    name: 'Operating Expenses',
    type: 'OPEX',
    level: 1,
    isExpanded: false,
    children: []
  }
];

export const ChartOfAccounts: React.FC = () => {
  const [coaData, setCoaData] = useState(initialCOA);

  const toggleExpand = (id: string) => {
    const toggleRecursive = (items: COAItem[]): COAItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, isExpanded: !item.isExpanded };
        }
        if (item.children) {
          return { ...item, children: toggleRecursive(item.children) };
        }
        return item;
      });
    };
    setCoaData(toggleRecursive(coaData));
  };

  const renderTree = (items: COAItem[]) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        <div
          className={clsx(
            "flex items-center py-3.5 border-b border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-page)] transition-all cursor-pointer group",
            item.level === 1 ? "bg-[var(--color-bg-page)] font-semibold" : ""
          )}
          style={{ paddingLeft: `${item.level * 1.5}rem` }}
          onClick={() => toggleExpand(item.id)}
        >
          <div className="mr-3 text-[var(--color-text-muted)] group-hover:text-blue-600 transition-colors">
            {item.children && item.children.length > 0 ? (
              item.isExpanded ? <ChevronDown size={16} strokeWidth={2} /> : <ChevronRight size={16} strokeWidth={2} />
            ) : <div className="w-4" />}
          </div>
          <div className="w-24 font-mono text-xs font-semibold text-[var(--color-text-muted)]">{item.code}</div>
          <div className="flex-1 text-sm text-[var(--color-text-main)] group-hover:text-blue-700 font-medium transition-colors">{item.name}</div>
          <div className="w-32 text-xs">
            <span className={clsx(
              "px-2.5 py-1 rounded-full border font-semibold",
              item.type === 'Revenue' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                item.type === 'Cost of Sales' ? "bg-rose-50 text-rose-700 border-rose-100" :
                  "bg-[var(--color-bg-page)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)]"
            )}>
              {item.type}
            </span>
          </div>
          <div className="w-20 flex justify-end px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-[var(--color-text-muted)] hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1.5 rounded-lg transition-all">
              <Edit2 size={16} />
            </button>
          </div>
        </div>
        {item.isExpanded && item.children && renderTree(item.children)}
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">Chart of <span className="text-gradient-primary">Accounts</span></h1>
          <p className="text-[var(--color-text-muted)]">Manage Group Standard COA and consolidation rules</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
            <Filter size={18} /> <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
            <Plus size={18} /> <span className="hidden sm:inline">Add Account</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col md:flex-row gap-4 bg-[var(--color-bg-page)] items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search by account code or name..."
              className="pl-10 pr-4 py-2.5 border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full text-sm bg-[var(--color-bg-card)] text-[var(--color-text-main)] shadow-sm transition-all placeholder-[var(--color-text-muted)]"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl px-3 py-1.5 shadow-sm">
              <ListFilter size={16} className="text-[var(--color-text-muted)]" />
              <select className="text-sm font-medium text-[var(--color-text-main)] bg-transparent border-none focus:ring-0 cursor-pointer">
                <option>All Types</option>
                <option>Revenue</option>
                <option>Expenses</option>
              </select>
            </div>
            <select className="border border-[var(--color-border-subtle)] rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[var(--color-bg-card)] text-[var(--color-text-main)] shadow-sm">
              <option>Current (Jan 2026)</option>
              <option>Future (Feb 2026)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)] py-3 flex text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              <div className="w-4 ml-[1.5rem]" /> {/* Indent spacer */}
              <div className="w-24 px-2">Code</div>
              <div className="flex-1 px-2">Account Name</div>
              <div className="w-32 px-2">Type</div>
              <div className="w-20 text-right px-4">Actions</div>
            </div>
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {renderTree(coaData)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-bg-page)] border border-[var(--color-border-subtle)] rounded-2xl p-6 relative overflow-hidden group/note">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <div className="flex items-start gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-xl text-blue-600 dark:text-blue-400">
            <Lock size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--color-text-main)] mb-1">Governance Note</h4>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
              Changes to Level 1 and Level 2 accounts require <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider">Approval from Group CFO</span>.
              All modifications are automatically logged in the <span className="font-medium text-[var(--color-text-main)] underline decoration-blue-500/30 underline-offset-4">Audit Trail</span> for enterprise compliance purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
