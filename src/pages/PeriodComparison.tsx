import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { clsx } from 'clsx';

const periodComparisonData = [
    { period: 'Jan 26', actual: 12500000, budget: 12000000, prior: 11200000 },
    { period: 'Dec 25', actual: 11800000, budget: 11500000, prior: 10800000 },
    { period: 'Nov 25', actual: 10900000, budget: 11000000, prior: 10200000 },
    { period: 'Oct 25', actual: 11200000, budget: 11200000, prior: 10500000 },
    { period: 'Sep 25', actual: 10500000, budget: 10800000, prior: 9800000 },
    { period: 'Aug 25', actual: 10100000, budget: 10500000, prior: 9400000 },
];

const lineItemVariances = [
    { account: 'Software Revenue', current: 10800000, prior: 9500000, variance: 13.7, impact: 'positive' },
    { account: 'Hardware Revenue', current: 1200000, prior: 1300000, variance: -7.7, impact: 'negative' },
    { account: 'Maintenance Revenue', current: 500000, prior: 400000, variance: 25.0, impact: 'positive' },
    { account: 'Salaries & Wages', current: -2000000, prior: -1800000, variance: -11.1, impact: 'negative' },
    { account: 'Marketing Expenses', current: -700000, prior: -750000, variance: 6.7, impact: 'positive' },
    { account: 'Rent & Utilities', current: -500000, prior: -480000, variance: -4.2, impact: 'negative' },
];

export const PeriodComparison: React.FC = () => {
    const [comparisonType, setComparisonType] = useState<'budget' | 'prior'>('prior');

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-MY', {
            style: 'currency',
            currency: 'MYR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(val);
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] p-3 rounded-lg shadow-xl">
                    <p className="text-[var(--color-text-muted)] text-xs font-medium mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: <span className="font-bold">{formatCurrency(entry.value)}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">
                        Period <span className="text-gradient-primary">Comparison</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Analyze performance trends across periods</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                        <Download size={16} /> Export Analysis
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Current Period</p>
                    <p className="text-2xl font-bold text-[var(--color-text-main)]">RM 12.5M</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">January 2026</p>
                </div>
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Prior Period</p>
                    <p className="text-2xl font-bold text-[var(--color-text-muted)]">RM 11.2M</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">January 2025</p>
                </div>
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Variance</p>
                    <p className="text-2xl font-bold text-emerald-600">+RM 1.3M</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
                        <ArrowUpRight size={14} />
                        <span>+11.6%</span>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">Budget Variance</p>
                    <p className="text-2xl font-bold text-emerald-600">+RM 0.5M</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
                        <ArrowUpRight size={14} />
                        <span>+4.2%</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="card-premium p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h3 className="text-lg font-bold text-[var(--color-text-main)]">Revenue Trend</h3>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[var(--color-bg-page)] p-1 rounded-xl">
                            <button
                                onClick={() => setComparisonType('prior')}
                                className={clsx(
                                    'px-4 py-2 text-sm font-bold rounded-lg transition-all',
                                    comparisonType === 'prior' ? 'bg-[var(--color-bg-card)] text-blue-600 shadow-sm' : 'text-[var(--color-text-muted)]'
                                )}
                            >
                                vs Prior Year
                            </button>
                            <button
                                onClick={() => setComparisonType('budget')}
                                className={clsx(
                                    'px-4 py-2 text-sm font-bold rounded-lg transition-all',
                                    comparisonType === 'budget' ? 'bg-[var(--color-bg-card)] text-blue-600 shadow-sm' : 'text-[var(--color-text-muted)]'
                                )}
                            >
                                vs Budget
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={periodComparisonData} barGap={8}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="actual" name="Actual" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={32} />
                            <Bar dataKey={comparisonType} name={comparisonType === 'budget' ? 'Budget' : 'Prior Year'} fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Line Item Variances */}
            <div className="card-premium overflow-hidden">
                <div className="p-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-page)]">
                    <h3 className="text-lg font-bold text-[var(--color-text-main)]">Top Line Item Variances</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Account</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Current</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Prior</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Variance %</th>
                                <th className="px-6 py-4 text-center font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                            {lineItemVariances.map((item, index) => (
                                <tr key={index} className="hover:bg-[var(--color-bg-page)] transition-all">
                                    <td className="px-6 py-4 font-medium text-[var(--color-text-main)]">{item.account}</td>
                                    <td className={clsx("px-6 py-4 text-right font-mono", item.current < 0 && "text-rose-600")}>{formatCurrency(item.current)}</td>
                                    <td className={clsx("px-6 py-4 text-right font-mono text-[var(--color-text-muted)]", item.prior < 0 && "text-rose-400")}>{formatCurrency(item.prior)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold",
                                            item.variance > 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                                        )}>
                                            {item.variance > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                            {item.variance > 0 ? '+' : ''}{item.variance.toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {item.impact === 'positive' ? (
                                            <span className="inline-flex items-center gap-1 text-emerald-600">
                                                <ArrowUpRight size={16} />
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-rose-600">
                                                <ArrowDownRight size={16} />
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
