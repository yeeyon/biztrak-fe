import React from 'react';
import { ArrowRightLeft, Search, Filter, Plus, Download, Clock, CheckCircle, AlertTriangle, Eye } from 'lucide-react';
import { clsx } from 'clsx';

interface Transaction {
    id: string;
    transactionRef: string;
    date: string;
    fromEntity: string;
    toEntity: string;
    description: string;
    amount: number;
    currency: string;
    status: 'Matched' | 'Pending' | 'Unmatched';
    type: 'Sale' | 'Purchase' | 'Loan' | 'Dividend' | 'Management Fee';
}

const mockTransactions: Transaction[] = [
    {
        id: '1',
        transactionRef: 'IC-2026-0001',
        date: '2026-01-28',
        fromEntity: 'Securemetric MY',
        toEntity: 'Securemetric SG',
        description: 'Software license transfer Q1 2026',
        amount: 250000,
        currency: 'MYR',
        status: 'Matched',
        type: 'Sale',
    },
    {
        id: '2',
        transactionRef: 'IC-2026-0002',
        date: '2026-01-27',
        fromEntity: 'Securemetric SG',
        toEntity: 'Securemetric MY',
        description: 'Management fee - January 2026',
        amount: 45000,
        currency: 'SGD',
        status: 'Matched',
        type: 'Management Fee',
    },
    {
        id: '3',
        transactionRef: 'IC-2026-0003',
        date: '2026-01-25',
        fromEntity: 'Securemetric MY',
        toEntity: 'Securemetric ID',
        description: 'Inter-company loan disbursement',
        amount: 500000,
        currency: 'MYR',
        status: 'Pending',
        type: 'Loan',
    },
    {
        id: '4',
        transactionRef: 'IC-2026-0004',
        date: '2026-01-22',
        fromEntity: 'Securemetric VN',
        toEntity: 'Securemetric MY',
        description: 'Dividend distribution FY2025',
        amount: 180000,
        currency: 'VND',
        status: 'Unmatched',
        type: 'Dividend',
    },
];

export const Transactions: React.FC = () => {
    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-MY', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
    };

    const getStatusBadge = (status: Transaction['status']) => {
        const config = {
            'Matched': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: CheckCircle },
            'Pending': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: Clock },
            'Unmatched': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', icon: AlertTriangle },
        };
        const { bg, text, border, icon: Icon } = config[status];
        return (
            <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border', bg, text, border)}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const getTypeBadge = (type: Transaction['type']) => {
        return (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-bg-page)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
                {type}
            </span>
        );
    };

    return (
        <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">
                        Inter-Company <span className="text-gradient-primary">Transactions</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Track and match inter-company transactions across entities</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
                        <Download size={16} /> Export
                    </button>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                        <Plus size={16} /> New Transaction
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <ArrowRightLeft size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--color-text-main)]">24</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Total Transactions</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <CheckCircle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-600">18</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Matched</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <Clock size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-600">4</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Pending</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                            <AlertTriangle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-rose-600">2</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Unmatched</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
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
                        <option value="matched">Matched</option>
                        <option value="pending">Pending</option>
                        <option value="unmatched">Unmatched</option>
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
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">From → To</th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Description</th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Type</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Amount</th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Status</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                            {mockTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-[var(--color-bg-page)] transition-all group">
                                    <td className="px-6 py-4 font-mono font-semibold text-[var(--color-text-main)]">{tx.transactionRef}</td>
                                    <td className="px-6 py-4 text-[var(--color-text-muted)]">{tx.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[var(--color-text-main)] font-medium">{tx.fromEntity}</span>
                                            <ArrowRightLeft size={14} className="text-[var(--color-text-muted)]" />
                                            <span className="text-[var(--color-text-main)] font-medium">{tx.toEntity}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[var(--color-text-muted)] max-w-xs truncate">{tx.description}</td>
                                    <td className="px-6 py-4">{getTypeBadge(tx.type)}</td>
                                    <td className="px-6 py-4 text-right font-mono font-semibold text-[var(--color-text-main)]">{formatCurrency(tx.amount, tx.currency)}</td>
                                    <td className="px-6 py-4">{getStatusBadge(tx.status)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[var(--color-text-muted)] hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all">
                                            <Eye size={16} />
                                        </button>
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
