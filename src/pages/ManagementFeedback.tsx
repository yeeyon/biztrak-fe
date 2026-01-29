import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Search, Filter, User, Calendar, Clock, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface Feedback {
    id: string;
    period: string;
    subsidiary: string;
    topic: string;
    question: string;
    response: string | null;
    requestedBy: string;
    requestedDate: string;
    respondedBy: string | null;
    respondedDate: string | null;
    status: 'Pending Response' | 'Responded' | 'Acknowledged';
    priority: 'High' | 'Medium' | 'Low';
}

const mockFeedback: Feedback[] = [
    {
        id: '1',
        period: 'Jan 2026',
        subsidiary: 'Securemetric MY',
        topic: 'Revenue Recognition',
        question: 'Can you clarify the timing of revenue recognition for the ABC Corp deal? The contract signing date differs from the delivery date by 2 weeks.',
        response: 'Revenue was recognized upon delivery of software licenses on Jan 15th per MFRS 15 criteria. Contract signing occurred earlier but acceptance was confirmed on delivery date.',
        requestedBy: 'Group CFO',
        requestedDate: '2026-01-20',
        respondedBy: 'John Doe',
        respondedDate: '2026-01-22',
        status: 'Acknowledged',
        priority: 'High',
    },
    {
        id: '2',
        period: 'Jan 2026',
        subsidiary: 'Securemetric SG',
        topic: 'Expense Allocation',
        question: 'Please explain the increase in marketing expenses. Is this a one-time spend or recurring?',
        response: 'This includes the regional conference sponsorship (SGD 50K) which is annual, plus digital campaign costs (SGD 30K). Conference is one-time annual event.',
        requestedBy: 'Group CFO',
        requestedDate: '2026-01-25',
        respondedBy: 'Jane Smith',
        respondedDate: '2026-01-26',
        status: 'Responded',
        priority: 'Medium',
    },
    {
        id: '3',
        period: 'Jan 2026',
        subsidiary: 'Securemetric ID',
        topic: 'Working Capital',
        question: 'Receivables aging shows increase in 60+ day balances. What collection actions are being taken?',
        response: null,
        requestedBy: 'Group CFO',
        requestedDate: '2026-01-27',
        respondedBy: null,
        respondedDate: null,
        status: 'Pending Response',
        priority: 'High',
    },
];

export const ManagementFeedback: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'responded'>('all');

    const getStatusBadge = (status: Feedback['status']) => {
        const config = {
            'Acknowledged': { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-800', icon: CheckCircle },
            'Responded': { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-100 dark:border-blue-800', icon: MessageCircle },
            'Pending Response': { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-800', icon: Clock },
        };
        const { bg, text, border, icon: Icon } = config[status];
        return (
            <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border', bg, text, border)}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const getPriorityBadge = (priority: Feedback['priority']) => {
        const config = {
            'High': 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800',
            'Medium': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
            'Low': 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        };
        return (
            <span className={clsx('px-2 py-0.5 rounded text-xs font-semibold border', config[priority])}>
                {priority}
            </span>
        );
    };

    const filteredFeedback = mockFeedback.filter(f => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return f.status === 'Pending Response';
        if (activeTab === 'responded') return f.status !== 'Pending Response';
        return true;
    });

    return (
        <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">
                        Management <span className="text-gradient-primary">Feedback</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Track questions and responses between Group and subsidiaries</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                        <MessageCircle size={16} /> New Question
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600 dark:text-amber-400">
                            <Clock size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">5</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Awaiting Response</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                            <MessageCircle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Responded</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400">
                            <ThumbsUp size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">23</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Acknowledged</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-xl text-rose-600 dark:text-rose-400">
                            <ThumbsDown size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">2</p>
                            <p className="text-sm text-[var(--color-text-muted)]">High Priority</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback List */}
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
                            onClick={() => setActiveTab('responded')}
                            className={clsx(
                                'px-4 py-2 text-sm font-bold rounded-lg transition-all',
                                activeTab === 'responded' ? 'bg-[var(--color-bg-page)] text-blue-600 shadow-sm' : 'text-[var(--color-text-muted)]'
                            )}
                        >
                            Responded
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
                    {filteredFeedback.map((feedback) => (
                        <div key={feedback.id} className="p-6 hover:bg-[var(--color-bg-page)] transition-all">
                            <div className="flex flex-col lg:flex-row gap-4 lg:items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[var(--color-bg-page)] rounded-xl">
                                        <MessageCircle size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-bold text-[var(--color-text-main)]">{feedback.topic}</span>
                                            {getPriorityBadge(feedback.priority)}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                                            <span>{feedback.subsidiary}</span>
                                            <span>•</span>
                                            <span>{feedback.period}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {getStatusBadge(feedback.status)}
                                </div>
                            </div>

                            {/* Question */}
                            <div className="ml-0 lg:ml-16 mb-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                                    <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 mb-2">
                                        <User size={14} />
                                        <span className="font-medium">{feedback.requestedBy}</span>
                                        <span>•</span>
                                        <Calendar size={14} />
                                        <span>{feedback.requestedDate}</span>
                                    </div>
                                    <p className="text-[var(--color-text-main)]">{feedback.question}</p>
                                </div>
                            </div>

                            {/* Response */}
                            {feedback.response && (
                                <div className="ml-0 lg:ml-16">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800">
                                        <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                                            <User size={14} />
                                            <span className="font-medium">{feedback.respondedBy}</span>
                                            <span>•</span>
                                            <Calendar size={14} />
                                            <span>{feedback.respondedDate}</span>
                                        </div>
                                        <p className="text-[var(--color-text-main)]">{feedback.response}</p>
                                    </div>
                                </div>
                            )}

                            {/* Action buttons for pending */}
                            {feedback.status === 'Pending Response' && (
                                <div className="mt-4 ml-0 lg:ml-16">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-1">
                                        <MessageCircle size={14} /> Add Response
                                    </button>
                                </div>
                            )}

                            {/* Acknowledge button for responded */}
                            {feedback.status === 'Responded' && (
                                <div className="mt-4 ml-0 lg:ml-16">
                                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all flex items-center gap-1">
                                        <ThumbsUp size={14} /> Acknowledge
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
