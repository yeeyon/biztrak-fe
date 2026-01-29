import React from 'react';
import { Download, Share2, ChevronDown, Calendar, Layout, TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

interface CashFlowRow {
    id: string;
    name: string;
    level: 1 | 2;
    current: number;
    previous: number;
    isTotal?: boolean;
}

const mockCashFlow: CashFlowRow[] = [
    { id: '1', name: 'OPERATING ACTIVITIES', level: 1, current: 0, previous: 0 },
    { id: '1-1', name: 'Profit before tax', level: 2, current: 4800000, previous: 4000000 },
    { id: '1-2', name: 'Depreciation & amortization', level: 2, current: 850000, previous: 780000 },
    { id: '1-3', name: 'Changes in working capital', level: 2, current: -420000, previous: -350000 },
    { id: '1-4', name: 'Tax paid', level: 2, current: -1200000, previous: -1000000 },
    { id: '1-t', name: 'Net cash from operating activities', level: 1, current: 4030000, previous: 3430000, isTotal: true },

    { id: '2', name: 'INVESTING ACTIVITIES', level: 1, current: 0, previous: 0 },
    { id: '2-1', name: 'Purchase of property, plant & equipment', level: 2, current: -1500000, previous: -1200000 },
    { id: '2-2', name: 'Purchase of intangible assets', level: 2, current: -800000, previous: -600000 },
    { id: '2-3', name: 'Proceeds from disposal of assets', level: 2, current: 150000, previous: 80000 },
    { id: '2-t', name: 'Net cash used in investing activities', level: 1, current: -2150000, previous: -1720000, isTotal: true },

    { id: '3', name: 'FINANCING ACTIVITIES', level: 1, current: 0, previous: 0 },
    { id: '3-1', name: 'Repayment of borrowings', level: 2, current: -300000, previous: -400000 },
    { id: '3-2', name: 'Dividends paid', level: 2, current: -500000, previous: -450000 },
    { id: '3-3', name: 'Interest paid', level: 2, current: -180000, previous: -200000 },
    { id: '3-t', name: 'Net cash used in financing activities', level: 1, current: -980000, previous: -1050000, isTotal: true },

    { id: '4', name: 'NET CHANGE IN CASH', level: 1, current: 900000, previous: 660000, isTotal: true },
    { id: '5', name: 'Cash at beginning of period', level: 2, current: 7500000, previous: 6540000 },
    { id: '6', name: 'Cash at end of period', level: 1, current: 8400000, previous: 7200000, isTotal: true },
];

export const CashFlow: React.FC = () => {
    const formatCurrency = (val: number) => {
        if (val === 0 && mockCashFlow.find(r => r.current === val)?.name.includes('ACTIVITIES') && !mockCashFlow.find(r => r.current === val)?.isTotal) {
            return '';
        }
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
                        Cash <span className="text-gradient-primary">Flow</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Consolidated statement of cash flows</p>
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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Operating Cash Flow</p>
                    <p className="text-2xl font-bold text-emerald-600">RM 4.03M</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
                        <TrendingUp size={14} />
                        <span>+17.5% vs prior</span>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Investing Cash Flow</p>
                    <p className="text-2xl font-bold text-rose-600">RM (2.15M)</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-rose-600">
                        <TrendingDown size={14} />
                        <span>-25.0% vs prior</span>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Financing Cash Flow</p>
                    <p className="text-2xl font-bold text-amber-600">RM (0.98M)</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
                        <TrendingUp size={14} />
                        <span>+6.7% vs prior</span>
                    </div>
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
                                <option>Jan 2026</option>
                                <option>Dec 2025</option>
                                <option>Q4 2025</option>
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
                            {mockCashFlow.map((row) => {
                                const variance = calculateVariance(row.current, row.previous);
                                const isHeader = row.level === 1 && !row.isTotal && row.current === 0;

                                return (
                                    <tr
                                        key={row.id}
                                        className={clsx(
                                            "hover:bg-[var(--color-bg-page)] transition-all",
                                            (row.level === 1 || row.isTotal) && "bg-[var(--color-bg-page)]"
                                        )}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={clsx(
                                                    row.isTotal ? "font-bold text-[var(--color-text-main)]" :
                                                        row.level === 1 ? "font-bold text-[var(--color-text-main)] uppercase text-xs tracking-wider" :
                                                            "font-medium text-[var(--color-text-muted)]"
                                                )}
                                                style={{ paddingLeft: row.level === 2 ? '1.5rem' : '0' }}
                                            >
                                                {row.name}
                                            </span>
                                        </td>
                                        <td className={clsx("px-6 py-4 text-right font-mono", row.isTotal && "font-bold", row.current < 0 && "text-rose-600")}>
                                            {!isHeader && formatCurrency(row.current)}
                                        </td>
                                        <td className={clsx("px-6 py-4 text-right font-mono text-[var(--color-text-muted)]", row.previous < 0 && "text-rose-400")}>
                                            {!isHeader && formatCurrency(row.previous)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {!isHeader && row.previous !== 0 && (
                                                <span className={clsx(
                                                    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold",
                                                    variance > 0 ? "bg-emerald-50 text-emerald-700" :
                                                        variance < 0 ? "bg-rose-50 text-rose-700" :
                                                            "bg-[var(--color-bg-page)] text-[var(--color-text-muted)]"
                                                )}>
                                                    {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                                                </span>
                                            )}
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
