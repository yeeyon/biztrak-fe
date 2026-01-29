import React, { useState } from 'react';
import { MessageSquare, Search, Filter, Plus, Clock, CheckCircle, User, Calendar, Eye, Edit2 } from 'lucide-react';
import { clsx } from 'clsx';

interface Commentary {
    id: string;
    period: string;
    subsidiary: string;
    account: string;
    variance: string;
    varianceAmount: number;
    comment: string;
    author: string;
    date: string;
    status: 'Pending' | 'Reviewed' | 'Approved';
}

const mockCommentaries: Commentary[] = [
    {
        id: '1',
        period: 'Jan 2026',
        subsidiary: 'Securemetric MY',
        account: 'Software Revenue',
        variance: '+8.0%',
        varianceAmount: 400000,
        comment: 'Strong performance driven by new enterprise deals. Closed 3 major contracts including ABC Corp (RM150K) and XYZ Ltd (RM120K). Pipeline remains healthy for Q1.',
        author: 'John Doe',
        date: '2026-01-28',
        status: 'Approved',
    },
    {
        id: '2',
        period: 'Jan 2026',
        subsidiary: 'Securemetric SG',
        account: 'Hardware Revenue',
        variance: '-14.3%',
        varianceAmount: -100000,
        comment: 'Delayed shipment from supplier impacted January sales. Orders are in backlog and expected to be fulfilled in February. No revenue risk.',
        author: 'Jane Smith',
        date: '2026-01-27',
        status: 'Reviewed',
    },
    {
        id: '3',
        period: 'Jan 2026',
        subsidiary: 'Securemetric ID',
        account: 'Operating Expenses',
        variance: '+5.2%',
        varianceAmount: -80000,
        comment: 'One-time recruitment costs for new technical team. 4 engineers hired to support upcoming project. Expected to normalize next month.',
        author: 'Ahmad Rahman',
        date: '2026-01-26',
        status: 'Pending',
    },
];

export const AdminCommentary: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'reviewed'>('all');

    const getStatusBadge = (status: Commentary['status']) => {
        const config = {
            'Approved': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: CheckCircle },
            'Reviewed': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', icon: Eye },
            'Pending': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: Clock },
        };
        const { bg, text, border, icon: Icon } = config[status];
        return (
            <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border', bg, text, border)}>
                <Icon size={14} />
                {status}
            </span>
        );
    };



    const filteredCommentaries = mockCommentaries.filter(c => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return c.status === 'Pending';
        if (activeTab === 'reviewed') return c.status !== 'Pending';
        return true;
    });

    return (
        <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">
                        Admin <span className="text-gradient-primary">Commentary</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Review and manage variance explanations from subsidiaries</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                        <Plus size={16} /> Request Commentary
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <Clock size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-600">8</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Pending Review</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Eye size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-600">12</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Reviewed</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <CheckCircle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-600">45</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Approved</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Commentary List */}
            <div className="card-premium overflow-hidden">
                <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center bg-[var(--color-bg-card)] p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={clsx(
                                'px-4 py-2 text-sm font-bold rounded-lg transition-all',
                                activeTab === 'all' ? 'bg-[var(--color-bg-page)] text-blue-600 shadow-sm' : 'text-[var(--color-text-muted)]'
                            )}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={clsx(
                                'px-4 py-2 text-sm font-bold rounded-lg transition-all',
                                activeTab === 'pending' ? 'bg-[var(--color-bg-page)] text-blue-600 shadow-sm' : 'text-[var(--color-text-muted)]'
                            )}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setActiveTab('reviewed')}
                            className={clsx(
                                'px-4 py-2 text-sm font-bold rounded-lg transition-all',
                                activeTab === 'reviewed' ? 'bg-[var(--color-bg-page)] text-blue-600 shadow-sm' : 'text-[var(--color-text-muted)]'
                            )}
                        >
                            Reviewed
                        </button>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2.5 border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-blue-500 w-full text-sm bg-[var(--color-bg-card)] text-[var(--color-text-main)] shadow-sm"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium text-[var(--color-text-main)]">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-[var(--color-border-subtle)]">
                    {filteredCommentaries.map((commentary) => (
                        <div key={commentary.id} className="p-6 hover:bg-[var(--color-bg-page)] transition-all">
                            <div className="flex flex-col lg:flex-row gap-4 lg:items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[var(--color-bg-page)] rounded-xl">
                                        <MessageSquare size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-[var(--color-text-main)]">{commentary.account}</span>
                                            <span className={clsx(
                                                "text-sm font-semibold",
                                                commentary.varianceAmount >= 0 ? "text-emerald-600" : "text-rose-600"
                                            )}>
                                                {commentary.variance}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                                            <span>{commentary.subsidiary}</span>
                                            <span>•</span>
                                            <span>{commentary.period}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {getStatusBadge(commentary.status)}
                                </div>
                            </div>
                            <div className="ml-0 lg:ml-16">
                                <p className="text-[var(--color-text-main)] mb-3 leading-relaxed">{commentary.comment}</p>
                                <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                                    <div className="flex items-center gap-1">
                                        <User size={14} />
                                        <span>{commentary.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>{commentary.date}</span>
                                    </div>
                                </div>
                            </div>
                            {commentary.status === 'Pending' && (
                                <div className="mt-4 ml-0 lg:ml-16 flex gap-2">
                                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all flex items-center gap-1">
                                        <CheckCircle size={14} /> Approve
                                    </button>
                                    <button className="px-4 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] rounded-lg text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all flex items-center gap-1">
                                        <Edit2 size={14} /> Request Revision
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
