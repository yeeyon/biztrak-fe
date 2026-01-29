import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown, Filter, Download, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { clsx } from 'clsx';

interface DrillDownItem {
    id: string;
    name: string;
    level: number;
    actual: number;
    budget: number;
    variance: number;
    variancePercent: number;
    children?: DrillDownItem[];
    isExpanded?: boolean;
}

const mockDrillDownData: DrillDownItem[] = [
    {
        id: '1',
        name: 'Revenue',
        level: 1,
        actual: 12500000,
        budget: 12000000,
        variance: 500000,
        variancePercent: 4.2,
        isExpanded: true,
        children: [
            {
                id: '1-1',
                name: 'Software Revenue',
                level: 2,
                actual: 10800000,
                budget: 10200000,
                variance: 600000,
                variancePercent: 5.9,
                isExpanded: true,
                children: [
                    { id: '1-1-1', name: 'Securemetric MY', level: 3, actual: 5400000, budget: 5000000, variance: 400000, variancePercent: 8.0 },
                    { id: '1-1-2', name: 'Securemetric SG', level: 3, actual: 3200000, budget: 3100000, variance: 100000, variancePercent: 3.2 },
                    { id: '1-1-3', name: 'Securemetric ID', level: 3, actual: 1500000, budget: 1400000, variance: 100000, variancePercent: 7.1 },
                    { id: '1-1-4', name: 'Securemetric VN', level: 3, actual: 700000, budget: 700000, variance: 0, variancePercent: 0 },
                ],
            },
            {
                id: '1-2',
                name: 'Hardware Revenue',
                level: 2,
                actual: 1200000,
                budget: 1300000,
                variance: -100000,
                variancePercent: -7.7,
                isExpanded: false,
                children: [
                    { id: '1-2-1', name: 'Securemetric MY', level: 3, actual: 600000, budget: 700000, variance: -100000, variancePercent: -14.3 },
                    { id: '1-2-2', name: 'Securemetric SG', level: 3, actual: 600000, budget: 600000, variance: 0, variancePercent: 0 },
                ],
            },
            { id: '1-3', name: 'Maintenance & Support', level: 2, actual: 500000, budget: 500000, variance: 0, variancePercent: 0 },
        ],
    },
    {
        id: '2',
        name: 'Cost of Sales',
        level: 1,
        actual: -4500000,
        budget: -4300000,
        variance: -200000,
        variancePercent: -4.7,
        isExpanded: false,
        children: [],
    },
    {
        id: '3',
        name: 'Operating Expenses',
        level: 1,
        actual: -3200000,
        budget: -3100000,
        variance: -100000,
        variancePercent: -3.2,
        isExpanded: false,
        children: [],
    },
];

export const DrillDown: React.FC = () => {
    const [data, setData] = useState(mockDrillDownData);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-MY', {
            style: 'currency',
            currency: 'MYR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(val);
    };

    const toggleExpand = (id: string) => {
        const toggleRecursive = (items: DrillDownItem[]): DrillDownItem[] => {
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

    const renderRows = (items: DrillDownItem[]): React.ReactNode => {
        return items.map(item => (
            <React.Fragment key={item.id}>
                <tr
                    className={clsx(
                        "hover:bg-[var(--color-bg-page)] transition-all cursor-pointer group",
                        item.level === 1 && "bg-[var(--color-bg-page)]"
                    )}
                    onClick={() => item.children && item.children.length > 0 && toggleExpand(item.id)}
                >
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2" style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}>
                            {item.children && item.children.length > 0 ? (
                                <span className="text-[var(--color-text-muted)] group-hover:text-blue-600 transition-colors">
                                    {item.isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </span>
                            ) : (
                                <span className="w-4" />
                            )}
                            <span className={clsx(
                                item.level === 1 ? "font-bold text-[var(--color-text-main)]" :
                                    item.level === 2 ? "font-semibold text-[var(--color-text-main)]" :
                                        "font-medium text-[var(--color-text-muted)]"
                            )}>
                                {item.name}
                            </span>
                            {item.level === 3 && (
                                <Building2 size={14} className="text-[var(--color-text-muted)]" />
                            )}
                        </div>
                    </td>
                    <td className={clsx("px-6 py-4 text-right font-mono", item.level === 1 && "font-bold", item.actual < 0 && "text-rose-600")}>
                        {formatCurrency(item.actual)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[var(--color-text-muted)]">
                        {formatCurrency(item.budget)}
                    </td>
                    <td className={clsx("px-6 py-4 text-right font-mono", item.variance >= 0 ? "text-emerald-600" : "text-rose-600")}>
                        {item.variance >= 0 ? '+' : ''}{formatCurrency(item.variance)}
                    </td>
                    <td className="px-6 py-4 text-right">
                        {item.variancePercent !== 0 && (
                            <span className={clsx(
                                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold",
                                item.variancePercent > 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                            )}>
                                {item.variancePercent > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {item.variancePercent > 0 ? '+' : ''}{item.variancePercent.toFixed(1)}%
                            </span>
                        )}
                    </td>
                </tr>
                {item.isExpanded && item.children && renderRows(item.children)}
            </React.Fragment>
        ));
    };

    return (
        <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">
                        Variance <span className="text-gradient-primary">Drill-Down</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Explore variances by account and subsidiary</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Favorable Variances</p>
                    <p className="text-2xl font-bold text-emerald-600">RM 1.2M</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
                        <ArrowUpRight size={14} />
                        <span>12 accounts</span>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Unfavorable Variances</p>
                    <p className="text-2xl font-bold text-rose-600">RM (0.4M)</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-rose-600">
                        <ArrowDownRight size={14} />
                        <span>5 accounts</span>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Net Variance</p>
                    <p className="text-2xl font-bold text-emerald-600">RM 0.8M</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
                        <TrendingUp size={14} />
                        <span>+2.1% vs budget</span>
                    </div>
                </div>
            </div>

            {/* Drill-Down Table */}
            <div className="card-premium overflow-hidden">
                <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col md:flex-row gap-4 items-center bg-[var(--color-bg-page)]">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                        <input
                            type="text"
                            placeholder="Search accounts..."
                            className="pl-10 pr-4 py-2.5 border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full text-sm bg-[var(--color-bg-card)] text-[var(--color-text-main)] shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <span>Click rows to expand</span>
                        <ChevronDown size={14} />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
                            <tr>
                                <th className="px-6 py-4 text-left w-1/3 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Account / Entity</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Actual</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Budget</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Variance</th>
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
    );
};
