import React from 'react';
import { Download, Share2, ChevronDown, Calendar, Layout, TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

interface ReportRow {
    id: string;
    name: string;
    level: 1 | 2 | 3;
    current: number;
    previous: number;
}

const mockBalanceSheet: ReportRow[] = [
    { id: '1', name: 'ASSETS', level: 1, current: 25800000, previous: 23500000 },
    { id: '1-1', name: 'Current Assets', level: 2, current: 12400000, previous: 11200000 },
    { id: '1-1-1', name: 'Cash & Bank Balances', level: 3, current: 8400000, previous: 7200000 },
    { id: '1-1-2', name: 'Trade Receivables', level: 3, current: 3200000, previous: 3100000 },
    { id: '1-1-3', name: 'Other Receivables', level: 3, current: 800000, previous: 900000 },
    { id: '1-2', name: 'Non-Current Assets', level: 2, current: 13400000, previous: 12300000 },
    { id: '1-2-1', name: 'Property, Plant & Equipment', level: 3, current: 8500000, previous: 8000000 },
    { id: '1-2-2', name: 'Intangible Assets', level: 3, current: 4900000, previous: 4300000 },
    { id: '2', name: 'LIABILITIES', level: 1, current: 8200000, previous: 7800000 },
    { id: '2-1', name: 'Current Liabilities', level: 2, current: 5400000, previous: 5200000 },
    { id: '2-1-1', name: 'Trade Payables', level: 3, current: 2800000, previous: 2600000 },
    { id: '2-1-2', name: 'Accruals', level: 3, current: 1600000, previous: 1500000 },
    { id: '2-1-3', name: 'Short-term Borrowings', level: 3, current: 1000000, previous: 1100000 },
    { id: '2-2', name: 'Non-Current Liabilities', level: 2, current: 2800000, previous: 2600000 },
    { id: '2-2-1', name: 'Long-term Debt', level: 3, current: 2800000, previous: 2600000 },
    { id: '3', name: 'EQUITY', level: 1, current: 17600000, previous: 15700000 },
    { id: '3-1', name: 'Share Capital', level: 2, current: 5000000, previous: 5000000 },
    { id: '3-2', name: 'Retained Earnings', level: 2, current: 12600000, previous: 10700000 },
];

export const BalanceSheet: React.FC = () => {
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

    return (
        <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">
                        Balance <span className="text-gradient-primary">Sheet</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Consolidated statement of financial position</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
                        <Share2 size={16} /> Share
                    </button>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="card-premium overflow-hidden">
                <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col lg:flex-row gap-4 justify-between bg-[var(--color-bg-card)] items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Layout size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                            <select className="pl-9 pr-8 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 appearance-none cursor-pointer text-[var(--color-text-main)]">
                                <option>Consolidated (Group)</option>
                                <option>Securemetric MY</option>
                                <option>Securemetric SG</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                        </div>
                        <div className="relative">
                            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                            <select className="pl-9 pr-8 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 appearance-none cursor-pointer text-[var(--color-text-main)]">
                                <option>As at Jan 31, 2026</option>
                                <option>As at Dec 31, 2025</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
                            <tr>
                                <th className="px-6 py-4 text-left w-1/2 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Line Item</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Jan 2026</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Dec 2025</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Change %</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                            {mockBalanceSheet.map((row) => {
                                const variance = calculateVariance(row.current, row.previous);
                                return (
                                    <tr
                                        key={row.id}
                                        className={clsx(
                                            "hover:bg-[var(--color-bg-page)] transition-all",
                                            row.level === 1 && "bg-[var(--color-bg-page)]"
                                        )}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={clsx(
                                                    row.level === 1 ? "font-bold text-[var(--color-text-main)]" :
                                                        row.level === 2 ? "font-semibold text-[var(--color-text-main)]" :
                                                            "font-medium text-[var(--color-text-muted)]"
                                                )}
                                                style={{ paddingLeft: `${(row.level - 1) * 1.5}rem` }}
                                            >
                                                {row.name}
                                            </span>
                                        </td>
                                        <td className={clsx("px-6 py-4 text-right font-mono", row.level === 1 && "font-bold")}>
                                            {formatCurrency(row.current)}
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-[var(--color-text-muted)]">
                                            {formatCurrency(row.previous)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={clsx(
                                                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold",
                                                variance > 0 ? "bg-emerald-50 text-emerald-700" :
                                                    variance < 0 ? "bg-rose-50 text-rose-700" :
                                                        "bg-[var(--color-bg-page)] text-[var(--color-text-muted)]"
                                            )}>
                                                {variance > 0 ? <TrendingUp size={12} /> : variance < 0 ? <TrendingDown size={12} /> : null}
                                                {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
