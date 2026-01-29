import React from 'react';
import { Clock, Search, Filter, Plus, Download, CheckCircle, Edit2, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';

interface Adjustment {
    id: string;
    adjustmentRef: string;
    date: string;
    entity: string;
    counterparty: string;
    description: string;
    debitAccount: string;
    creditAccount: string;
    amount: number;
    currency: string;
    status: 'Posted' | 'Pending Approval' | 'Draft';
    createdBy: string;
}

const mockAdjustments: Adjustment[] = [
    {
        id: '1',
        adjustmentRef: 'ADJ-2026-001',
        date: '2026-01-28',
        entity: 'Securemetric MY',
        counterparty: 'Securemetric SG',
        description: 'Eliminate inter-company revenue and COGS',
        debitAccount: '4110 - Software Revenue',
        creditAccount: '5110 - Cost of Goods Sold',
        amount: 250000,
        currency: 'MYR',
        status: 'Posted',
        createdBy: 'Kelvin Yong',
    },
    {
        id: '2',
        adjustmentRef: 'ADJ-2026-002',
        date: '2026-01-27',
        entity: 'Securemetric SG',
        counterparty: 'Securemetric MY',
        description: 'Eliminate management fee income/expense',
        debitAccount: '4210 - Other Income',
        creditAccount: '6100 - Admin Expenses',
        amount: 45000,
        currency: 'SGD',
        status: 'Pending Approval',
        createdBy: 'Jane Smith',
    },
    {
        id: '3',
        adjustmentRef: 'ADJ-2026-003',
        date: '2026-01-25',
        entity: 'Securemetric MY',
        counterparty: 'Securemetric ID',
        description: 'Eliminate inter-company loan receivable/payable',
        debitAccount: '2100 - Loan Payable',
        creditAccount: '1200 - Loan Receivable',
        amount: 500000,
        currency: 'MYR',
        status: 'Draft',
        createdBy: 'Kelvin Yong',
    },
];

export const Adjustments: React.FC = () => {
    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-MY', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
    };

    const getStatusBadge = (status: Adjustment['status']) => {
        const config = {
            'Posted': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: CheckCircle },
            'Pending Approval': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: Clock },
            'Draft': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', icon: Edit2 },
        };
        const { bg, text, border, icon: Icon } = config[status];
        return (
            <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border', bg, text, border)}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">
                        Consolidation <span className="text-gradient-primary">Adjustments</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Manage elimination entries and consolidation adjustments</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
                        <Download size={16} /> Export
                    </button>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                        <Plus size={16} /> New Adjustment
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <CheckCircle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-600">12</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Posted</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <Clock size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-600">5</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Pending Approval</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-slate-100 rounded-xl text-slate-600">
                            <Edit2 size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-600">3</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Drafts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Adjustments Table */}
            <div className="card-premium overflow-hidden">
                <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col md:flex-row gap-4 items-center bg-[var(--color-bg-page)]">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                        <input
                            type="text"
                            placeholder="Search by reference or description..."
                            className="pl-10 pr-4 py-2.5 border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full text-sm bg-[var(--color-bg-card)] text-[var(--color-text-main)] shadow-sm"
                        />
                    </div>
                    <select className="px-4 py-2.5 border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium bg-[var(--color-bg-card)] text-[var(--color-text-main)]">
                        <option value="">All Statuses</option>
                        <option value="posted">Posted</option>
                        <option value="pending">Pending Approval</option>
                        <option value="draft">Draft</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)] transition-all">
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Reference</th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Date</th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Entities</th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Description</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Amount</th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Status</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                            {mockAdjustments.map((adj) => (
                                <tr key={adj.id} className="hover:bg-[var(--color-bg-page)] transition-all group">
                                    <td className="px-6 py-4 font-mono font-semibold text-[var(--color-text-main)]">{adj.adjustmentRef}</td>
                                    <td className="px-6 py-4 text-[var(--color-text-muted)]">{adj.date}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-[var(--color-text-main)] font-medium">{adj.entity}</p>
                                            <p className="text-xs text-[var(--color-text-muted)]">↔ {adj.counterparty}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[var(--color-text-muted)] max-w-xs truncate">{adj.description}</td>
                                    <td className="px-6 py-4 text-right font-mono font-semibold text-[var(--color-text-main)]">{formatCurrency(adj.amount, adj.currency)}</td>
                                    <td className="px-6 py-4">{getStatusBadge(adj.status)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-[var(--color-text-muted)] hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="text-[var(--color-text-muted)] hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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
