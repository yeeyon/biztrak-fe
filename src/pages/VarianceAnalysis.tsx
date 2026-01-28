import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, ChevronDown, ChevronRight, Filter, Target, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface VarianceItem {
  id: string;
  account: string;
  current: number;
  previous: number;
  varianceAbs: number;
  variancePct: number;
  threshold: 'High' | 'Medium' | 'Low';
  reason?: string;
  children?: VarianceItem[];
  isExpanded?: boolean;
}

const mockVarianceData: VarianceItem[] = [
  {
    id: '1',
    account: 'Revenue',
    current: 12500000,
    previous: 11200000,
    varianceAbs: 1300000,
    variancePct: 11.6,
    threshold: 'Low',
    children: [
      { id: '1-1', account: 'Software Sales', current: 8500000, previous: 7200000, varianceAbs: 1300000, variancePct: 18.0, threshold: 'Medium', reason: 'New enterprise deal closed in MY' },
      { id: '1-2', account: 'Maintenance', current: 4000000, previous: 4000000, varianceAbs: 0, variancePct: 0.0, threshold: 'Low' },
    ],
    isExpanded: true
  },
  {
    id: '2',
    account: 'Cost of Sales',
    current: 4500000,
    previous: 4200000,
    varianceAbs: 300000,
    variancePct: 7.1,
    threshold: 'Low',
    children: [],
    isExpanded: false
  },
  {
    id: '3',
    account: 'Operating Expenses',
    current: 3200000,
    previous: 2100000,
    varianceAbs: 1100000,
    variancePct: 52.4,
    threshold: 'High',
    reason: 'Unexpected legal fees in Indonesia',
    children: [],
    isExpanded: false
  }
];

export const VarianceAnalysis: React.FC = () => {
  const [data, setData] = useState(mockVarianceData);
  const [period, setPeriod] = useState('MoM'); // MoM, QoQ, YoY

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const toggleExpand = (id: string) => {
    const toggleRecursive = (items: VarianceItem[]): VarianceItem[] => {
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

  const renderRows = (items: VarianceItem[], level = 0) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        <tr className={clsx("hover:bg-[var(--color-bg-page)] transition-colors group", item.threshold === 'High' ? "bg-rose-50/40 dark:bg-rose-900/10" : "")}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div
              className="flex items-center gap-3 cursor-pointer"
              style={{ paddingLeft: `${level * 1.5}rem` }}
              onClick={() => item.children && item.children.length > 0 && toggleExpand(item.id)}
            >
              {item.children && item.children.length > 0 ? (
                <div className="text-[var(--color-text-muted)] group-hover:text-blue-600 transition-colors">
                  {item.isExpanded ? <ChevronDown size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />}
                </div>
              ) : <div className="w-3.5" />}
              <span className="font-bold text-[var(--color-text-main)] group-hover:text-blue-700 transition-colors">{item.account}</span>
              {item.threshold === 'High' && <AlertCircle size={16} className="text-rose-500 animate-pulse" />}
            </div>
          </td>
          <td className="px-6 py-4 text-right font-mono text-[var(--color-text-main)] font-medium">{formatCurrency(item.current)}</td>
          <td className="px-6 py-4 text-right font-mono text-[var(--color-text-muted)]">{formatCurrency(item.previous)}</td>
          <td className="px-6 py-4 text-right font-mono font-bold">
            <span className={item.varianceAbs > 0 ? 'text-emerald-600' : 'text-rose-600'}>
              {item.varianceAbs > 0 ? '+' : ''}{formatCurrency(item.varianceAbs)}
            </span>
          </td>
          <td className="px-6 py-4 text-right">
            <span className={clsx(
              "px-2.5 py-1 rounded-full text-xs font-bold flex items-center justify-end gap-1.5 w-fit ml-auto border",
              item.variancePct > 20 ? "bg-rose-50 text-rose-700 border-rose-100" :
                item.variancePct > 10 ? "bg-amber-50 text-amber-700 border-amber-100" :
                  "bg-emerald-50 text-emerald-700 border-emerald-100"
            )}>
              {item.variancePct > 0 ? <TrendingUp size={12} strokeWidth={2.5} /> : <TrendingDown size={12} strokeWidth={2.5} />}
              {item.variancePct.toFixed(1)}%
            </span>
          </td>
          <td className="px-6 py-4 text-sm text-[var(--color-text-muted)] italic">
            {item.reason ? (
              <span className="flex items-center gap-1.5 text-[var(--color-text-main)] not-italic bg-[var(--color-bg-page)] px-2 py-1 rounded-md w-fit">
                <Target size={12} className="text-blue-500" />
                {item.reason}
              </span>
            ) : '-'}
          </td>
          <td className="px-6 py-4 text-right">
            <button className="text-blue-600 hover:text-blue-800 text-xs font-bold hover:underline flex items-center gap-1 ml-auto">
              Analyze <ArrowRight size={12} />
            </button>
          </td>
        </tr>
        {item.isExpanded && item.children && renderRows(item.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">Variance <span className="text-gradient-primary">Analysis</span></h1>
          <p className="text-[var(--color-text-muted)]">Analyze deviations against previous periods and budgets</p>
        </div>
        <div className="flex gap-1 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl p-1 shadow-sm">
          {['MoM', 'QoQ', 'YoY'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={clsx(
                "px-4 py-2 text-sm font-bold rounded-lg transition-all",
                period === p ? "bg-slate-900 text-white shadow-md dark:bg-blue-600" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)]"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium p-6 border-l-4 border-l-rose-500">
          <h3 className="text-rose-800 dark:text-rose-400 font-bold text-sm uppercase tracking-wider mb-2">Material Variances ({'>'}10%)</h3>
          <p className="text-3xl font-bold text-[var(--color-text-main)]">4 Accounts</p>
          <div className="flex items-center gap-2 mt-3 text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded-lg w-fit">
            <AlertCircle size={14} /> Requires explanation
          </div>
        </div>
        <div className="card-premium p-6 border-l-4 border-l-emerald-500">
          <h3 className="text-[var(--color-text-muted)] font-bold text-sm uppercase tracking-wider mb-2">Total Revenue Variance</h3>
          <p className="text-3xl font-bold text-emerald-600">+ RM 1.3M</p>
          <div className="flex items-center gap-2 mt-3 text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-lg w-fit">
            <TrendingUp size={14} /> Above budget
          </div>
        </div>
        <div className="card-premium p-6 border-l-4 border-l-amber-500">
          <h3 className="text-[var(--color-text-muted)] font-bold text-sm uppercase tracking-wider mb-2">Total OPEX Variance</h3>
          <p className="text-3xl font-bold text-amber-600">+ RM 1.1M</p>
          <div className="flex items-center gap-2 mt-3 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg w-fit">
            <TrendingUp size={14} /> Over budget
          </div>
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border-subtle)] flex justify-between items-center bg-[var(--color-bg-card)]">
          <h3 className="font-bold text-[var(--color-text-main)] text-lg">Variance Detail</h3>
          <button className="group flex items-center gap-2 text-sm font-bold text-[var(--color-text-muted)] hover:text-blue-600 transition-colors border border-[var(--color-border-subtle)] hover:border-blue-200 rounded-lg px-3 py-1.5">
            <Filter size={16} className="text-[var(--color-text-muted)] group-hover:text-blue-500" /> Filter High Variance
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
                <tr>
                  <th className="px-6 py-4 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Account</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Current Period</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Previous Period</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Variance (Abs)</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Variance (%)</th>
                  <th className="px-6 py-4 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Explanation</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Action</th>
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
