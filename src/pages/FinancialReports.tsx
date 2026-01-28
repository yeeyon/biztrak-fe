import React, { useState } from 'react';
import { Download, Share2, Filter, ChevronDown, ChevronRight, Maximize2, Calendar, Layout } from 'lucide-react';
import { clsx } from 'clsx';

type ReportType = 'pl' | 'bs' | 'cf';

interface ReportRow {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  values: {
    current: number;
    previous: number;
    budget: number;
  };
  children?: ReportRow[];
  isExpanded?: boolean;
}

const mockPLData: ReportRow[] = [
  {
    id: 'rev',
    name: 'Revenue',
    level: 1,
    isExpanded: true,
    values: { current: 12500000, previous: 11200000, budget: 12000000 },
    children: [
      {
        id: 'sales',
        name: 'Sales Revenue',
        level: 2,
        values: { current: 12000000, previous: 10800000, budget: 11500000 },
      },
      {
        id: 'other',
        name: 'Other Income',
        level: 2,
        values: { current: 500000, previous: 400000, budget: 500000 },
      }
    ]
  },
  {
    id: 'cos',
    name: 'Cost of Sales',
    level: 1,
    isExpanded: false,
    values: { current: -4500000, previous: -4200000, budget: -4300000 },
    children: []
  },
  {
    id: 'gp',
    name: 'Gross Profit',
    level: 1,
    values: { current: 8000000, previous: 7000000, budget: 7700000 }, // Calculated
  },
  {
    id: 'opex',
    name: 'Operating Expenses',
    level: 1,
    isExpanded: true,
    values: { current: -3200000, previous: -3000000, budget: -3100000 },
    children: [
      { id: 'salaries', name: 'Salaries & Wages', level: 2, values: { current: -2000000, previous: -1800000, budget: -1900000 } },
      { id: 'rent', name: 'Rent & Utilities', level: 2, values: { current: -500000, previous: -500000, budget: -500000 } },
      { id: 'marketing', name: 'Marketing', level: 2, values: { current: -700000, previous: -700000, budget: -700000 } },
    ]
  },
  {
    id: 'ebitda',
    name: 'EBITDA',
    level: 1,
    values: { current: 4800000, previous: 4000000, budget: 4600000 },
  }
];

export const FinancialReports: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>('pl');
  const [data, setData] = useState(mockPLData);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const calculateVariance = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / Math.abs(previous)) * 100;
  };

  const toggleExpand = (id: string) => {
    const toggleRecursive = (items: ReportRow[]): ReportRow[] => {
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
    setData(toggleRecursive(data));
  };

  const renderRows = (items: ReportRow[]) => {
    return items.map(item => {
      const varPrev = calculateVariance(item.values.current, item.values.previous);
      const varBudget = calculateVariance(item.values.current, item.values.budget);

      return (
        <React.Fragment key={item.id}>
          <tr
            className={clsx(
              "hover:bg-[var(--color-bg-page)] transition-all cursor-pointer group border-b border-[var(--color-bg-page)] last:border-none",
              item.level === 1 ? "bg-[var(--color-bg-page)]" : ""
            )}
            onClick={() => item.children && toggleExpand(item.id)}
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div
                className="flex items-center gap-3"
                style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}
              >
                {item.children && item.children.length > 0 ? (
                  <div className="text-[var(--color-text-muted)] group-hover:text-blue-600 transition-colors">
                    {item.isExpanded ? <ChevronDown size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />}
                  </div>
                ) : <div className="w-3.5" />}
                <span className={clsx(
                  item.level === 1 ? "font-bold text-[var(--color-text-main)]" : "font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)]"
                )}>
                  {item.name}
                </span>
              </div>
            </td>
            <td className={clsx("px-6 py-4 text-right font-mono text-[var(--color-text-main)]", item.level === 1 && "font-bold")}>{formatCurrency(item.values.current)}</td>
            <td className="px-6 py-4 text-right font-mono text-[var(--color-text-muted)]">{formatCurrency(item.values.previous)}</td>
            <td className="px-6 py-4 text-right font-mono">
              <span className={clsx(
                "px-2 py-0.5 rounded text-xs font-semibold",
                varPrev > 0 ? "bg-emerald-50 text-emerald-700" : varPrev < 0 ? "bg-rose-50 text-rose-700" : "bg-[var(--color-bg-page)] text-[var(--color-text-muted)]"
              )}>
                {varPrev > 0 ? '+' : ''}{varPrev.toFixed(1)}%
              </span>
            </td>
            <td className="px-6 py-4 text-right font-mono text-[var(--color-text-muted)]">{formatCurrency(item.values.budget)}</td>
            <td className="px-6 py-4 text-right font-mono">
              <span className={clsx(
                "px-2 py-0.5 rounded text-xs font-semibold",
                varBudget > 0 ? "bg-emerald-50 text-emerald-700" : varBudget < 0 ? "bg-rose-50 text-rose-700" : "bg-[var(--color-bg-page)] text-[var(--color-text-muted)]"
              )}>
                {varBudget > 0 ? '+' : ''}{varBudget.toFixed(1)}%
              </span>
            </td>
          </tr>
          {item.isExpanded && item.children && renderRows(item.children)}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">Financial <span className="text-gradient-primary">Reports</span></h1>
          <p className="text-[var(--color-text-muted)]">Consolidated financial statements for Securemetric Group</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
            <Share2 size={16} /> Share
          </button>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col lg:flex-row gap-4 justify-between bg-[var(--color-bg-card)] items-center">
          <div className="flex items-center bg-[var(--color-bg-page)] p-1 rounded-xl self-start lg:self-auto">
            <button
              onClick={() => setReportType('pl')}
              className={clsx(
                "px-5 py-2 text-sm font-bold rounded-lg transition-all",
                reportType === 'pl' ? "bg-[var(--color-bg-card)] text-blue-600 shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
              )}
            >
              Income Statement
            </button>
            <button
              onClick={() => setReportType('bs')}
              className={clsx(
                "px-5 py-2 text-sm font-bold rounded-lg transition-all",
                reportType === 'bs' ? "bg-[var(--color-bg-card)] text-blue-600 shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
              )}
            >
              Balance Sheet
            </button>
            <button
              onClick={() => setReportType('cf')}
              className={clsx(
                "px-5 py-2 text-sm font-bold rounded-lg transition-all",
                reportType === 'cf' ? "bg-[var(--color-bg-card)] text-blue-600 shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
              )}
            >
              Cash Flow
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative">
              <Layout size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <select className="pl-9 pr-8 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer hover:border-slate-400 transition-colors text-[var(--color-text-main)]">
                <option>Consolidated (Group)</option>
                <option>Securemetric MY</option>
                <option>Securemetric SG</option>
                <option>Securemetric ID</option>
                <option>Securemetric VN</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            </div>

            <div className="h-6 w-px bg-[var(--color-border-subtle)] hidden lg:block"></div>

            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <select className="pl-9 pr-8 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer hover:border-slate-400 transition-colors text-[var(--color-text-main)]">
                <option>Jan 2026</option>
                <option>Dec 2025</option>
                <option>Q4 2025</option>
                <option>FY 2025</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            </div>

            <button className="p-2 text-[var(--color-text-muted)] hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all border border-transparent hover:border-blue-100">
              <Filter size={18} />
            </button>
            <button className="p-2 text-[var(--color-text-muted)] hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all border border-transparent hover:border-blue-100">
              <Maximize2 size={18} />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
                <tr>
                  <th className="px-6 py-4 text-left w-1/3 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Line Item</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Actual (Jan 26)</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Prior (Dec 25)</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">MoM %</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Budget (Jan 26)</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Var %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {renderRows(data)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
