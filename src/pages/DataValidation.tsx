import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Search, RefreshCw, Filter, Download, Eye } from 'lucide-react';
import { clsx } from 'clsx';

interface ValidationRecord {
    id: string;
    subsidiary: string;
    period: string;
    uploadDate: string;
    totalRecords: number;
    validRecords: number;
    warningRecords: number;
    errorRecords: number;
    status: 'Validated' | 'Pending Review' | 'Failed';
}

const mockValidationData: ValidationRecord[] = [
    {
        id: '1',
        subsidiary: 'Securemetric MY',
        period: 'Jan 2026',
        uploadDate: '2026-01-28 10:30 AM',
        totalRecords: 1458,
        validRecords: 1420,
        warningRecords: 28,
        errorRecords: 10,
        status: 'Pending Review',
    },
    {
        id: '2',
        subsidiary: 'Securemetric SG',
        period: 'Jan 2026',
        uploadDate: '2026-01-28 09:15 AM',
        totalRecords: 892,
        validRecords: 892,
        warningRecords: 0,
        errorRecords: 0,
        status: 'Validated',
    },
    {
        id: '3',
        subsidiary: 'Securemetric ID',
        period: 'Jan 2026',
        uploadDate: '2026-01-27 05:45 PM',
        totalRecords: 654,
        validRecords: 512,
        warningRecords: 89,
        errorRecords: 53,
        status: 'Failed',
    },
    {
        id: '4',
        subsidiary: 'Securemetric VN',
        period: 'Dec 2025',
        uploadDate: '2026-01-25 02:20 PM',
        totalRecords: 423,
        validRecords: 423,
        warningRecords: 0,
        errorRecords: 0,
        status: 'Validated',
    },
];

const validationRules = [
    { id: '1', rule: 'Account Code Format', description: 'Validates account codes match Group COA format', enabled: true },
    { id: '2', rule: 'Debit/Credit Balance', description: 'Ensures trial balance debits equal credits', enabled: true },
    { id: '3', rule: 'Period Matching', description: 'Validates transaction dates match upload period', enabled: true },
    { id: '4', rule: 'Currency Validation', description: 'Checks currency codes are valid ISO format', enabled: true },
    { id: '5', rule: 'Duplicate Detection', description: 'Identifies potential duplicate entries', enabled: false },
];

export const DataValidation: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'results' | 'rules'>('results');

    const getStatusBadge = (status: ValidationRecord['status']) => {
        const config = {
            'Validated': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: CheckCircle },
            'Pending Review': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: AlertTriangle },
            'Failed': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', icon: XCircle },
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
                        Data <span className="text-gradient-primary">Validation</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Review and validate uploaded financial data</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
                        <RefreshCw size={16} /> Re-validate All
                    </button>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                        <Download size={16} /> Export Report
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <CheckCircle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--color-text-main)]">3,427</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Total Records</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <CheckCircle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-600">3,247</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Valid</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <AlertTriangle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-600">117</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Warnings</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                            <XCircle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-rose-600">63</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Errors</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="card-premium overflow-hidden">
                <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] p-1 flex gap-1">
                    <button
                        onClick={() => setActiveTab('results')}
                        className={clsx(
                            'px-5 py-2.5 text-sm font-bold rounded-lg transition-all',
                            activeTab === 'results' ? 'bg-[var(--color-bg-card)] text-blue-600 shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                        )}
                    >
                        Validation Results
                    </button>
                    <button
                        onClick={() => setActiveTab('rules')}
                        className={clsx(
                            'px-5 py-2.5 text-sm font-bold rounded-lg transition-all',
                            activeTab === 'rules' ? 'bg-[var(--color-bg-card)] text-blue-600 shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                        )}
                    >
                        Validation Rules
                    </button>
                </div>

                {activeTab === 'results' && (
                    <>
                        <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by subsidiary..."
                                    className="pl-10 pr-4 py-2.5 border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full text-sm bg-[var(--color-bg-card)] text-[var(--color-text-main)] shadow-sm"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)] transition-all">
                                <Filter size={16} /> Filter
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Subsidiary</th>
                                        <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Period</th>
                                        <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Upload Date</th>
                                        <th className="px-6 py-4 text-center font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Records</th>
                                        <th className="px-6 py-4 text-center font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Valid</th>
                                        <th className="px-6 py-4 text-center font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Warnings</th>
                                        <th className="px-6 py-4 text-center font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Errors</th>
                                        <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Status</th>
                                        <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--color-border-subtle)]">
                                    {mockValidationData.map((record) => (
                                        <tr key={record.id} className="hover:bg-[var(--color-bg-page)] transition-all group">
                                            <td className="px-6 py-4 font-medium text-[var(--color-text-main)]">{record.subsidiary}</td>
                                            <td className="px-6 py-4 text-[var(--color-text-muted)]">{record.period}</td>
                                            <td className="px-6 py-4 text-[var(--color-text-muted)]">{record.uploadDate}</td>
                                            <td className="px-6 py-4 text-center font-mono text-[var(--color-text-main)]">{record.totalRecords.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center font-mono text-emerald-600">{record.validRecords.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center font-mono text-amber-600">{record.warningRecords}</td>
                                            <td className="px-6 py-4 text-center font-mono text-rose-600">{record.errorRecords}</td>
                                            <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
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
                    </>
                )}

                {activeTab === 'rules' && (
                    <div className="p-6 space-y-4">
                        {validationRules.map((rule) => (
                            <div key={rule.id} className="flex items-center justify-between p-4 bg-[var(--color-bg-page)] rounded-xl border border-[var(--color-border-subtle)]">
                                <div>
                                    <h4 className="font-semibold text-[var(--color-text-main)]">{rule.rule}</h4>
                                    <p className="text-sm text-[var(--color-text-muted)]">{rule.description}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={rule.enabled} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
