import React from 'react';
import { Search, ArrowRightLeft, Link2, Unlink, Filter, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

interface MappingRecord {
    id: string;
    subsidiaryCode: string;
    subsidiaryName: string;
    subsidiary: string;
    groupCode: string;
    groupName: string;
    status: 'Mapped' | 'Pending' | 'Unmapped';
    lastUpdated: string;
}

const mockMappings: MappingRecord[] = [
    { id: '1', subsidiaryCode: '4110-MY', subsidiaryName: 'Software Revenue - Malaysia', subsidiary: 'Securemetric MY', groupCode: '4110', groupName: 'Software Sales', status: 'Mapped', lastUpdated: '2026-01-15' },
    { id: '2', subsidiaryCode: '4111-MY', subsidiaryName: 'Hardware Revenue - Malaysia', subsidiary: 'Securemetric MY', groupCode: '4120', groupName: 'Hardware Sales', status: 'Mapped', lastUpdated: '2026-01-15' },
    { id: '3', subsidiaryCode: '4100-SG', subsidiaryName: 'Product Sales - Singapore', subsidiary: 'Securemetric SG', groupCode: '4110', groupName: 'Software Sales', status: 'Mapped', lastUpdated: '2026-01-10' },
    { id: '4', subsidiaryCode: '4200-SG', subsidiaryName: 'Support Services - Singapore', subsidiary: 'Securemetric SG', groupCode: '4130', groupName: 'Maintenance & Support', status: 'Mapped', lastUpdated: '2026-01-10' },
    { id: '5', subsidiaryCode: '4150-ID', subsidiaryName: 'Consulting Revenue - Indonesia', subsidiary: 'Securemetric ID', groupCode: '', groupName: '', status: 'Pending', lastUpdated: '2026-01-20' },
    { id: '6', subsidiaryCode: '4999-VN', subsidiaryName: 'Miscellaneous Income - Vietnam', subsidiary: 'Securemetric VN', groupCode: '', groupName: '', status: 'Unmapped', lastUpdated: '2026-01-22' },
];

const groupAccounts = [
    { code: '4110', name: 'Software Sales' },
    { code: '4120', name: 'Hardware Sales' },
    { code: '4130', name: 'Maintenance & Support' },
    { code: '4210', name: 'Interest Income' },
    { code: '4220', name: 'Other Income' },
];

export const SubsidiaryMapping: React.FC = () => {

    const getStatusBadge = (status: MappingRecord['status']) => {
        const config = {
            'Mapped': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: CheckCircle },
            'Pending': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: AlertTriangle },
            'Unmapped': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', icon: Unlink },
        };
        const { bg, text, border, icon: Icon } = config[status];
        return (
            <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border', bg, text, border)}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const stats = {
        total: mockMappings.length,
        mapped: mockMappings.filter(m => m.status === 'Mapped').length,
        pending: mockMappings.filter(m => m.status === 'Pending').length,
        unmapped: mockMappings.filter(m => m.status === 'Unmapped').length,
    };

    return (
        <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">
                        Subsidiary <span className="text-gradient-primary">Mapping</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Map subsidiary accounts to Group Chart of Accounts</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
                        <Download size={16} /> Export
                    </button>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                        <Link2 size={16} /> Auto-Map
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
                            <p className="text-2xl font-bold text-[var(--color-text-main)]">{stats.total}</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Total Accounts</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <Link2 size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-600">{stats.mapped}</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Mapped</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <AlertTriangle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Pending</p>
                        </div>
                    </div>
                </div>
                <div className="card-premium p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                            <Unlink size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-rose-600">{stats.unmapped}</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Unmapped</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mapping Table */}
            <div className="card-premium overflow-hidden">
                <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col md:flex-row gap-4 items-center bg-[var(--color-bg-page)]">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                        <input
                            type="text"
                            placeholder="Search by account code or name..."
                            className="pl-10 pr-4 py-2.5 border border-[var(--color-border-subtle)] rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full text-sm bg-[var(--color-bg-card)] text-[var(--color-text-main)] shadow-sm"
                        />
                    </div>
                    <select className="px-4 py-2.5 border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium bg-[var(--color-bg-card)] text-[var(--color-text-main)]">
                        <option value="">All Subsidiaries</option>
                        <option value="my">Securemetric MY</option>
                        <option value="sg">Securemetric SG</option>
                        <option value="id">Securemetric ID</option>
                        <option value="vn">Securemetric VN</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl text-sm font-medium text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)] transition-all">
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Subsidiary Account</th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Entity</th>
                                <th className="px-6 py-4 text-center font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs"></th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Group Account</th>
                                <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Status</th>
                                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                            {mockMappings.map((mapping) => (
                                <tr key={mapping.id} className="hover:bg-[var(--color-bg-page)] transition-all group">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-mono text-sm font-semibold text-[var(--color-text-main)]">{mapping.subsidiaryCode}</p>
                                            <p className="text-sm text-[var(--color-text-muted)]">{mapping.subsidiaryName}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[var(--color-text-muted)]">{mapping.subsidiary}</td>
                                    <td className="px-6 py-4 text-center">
                                        <ArrowRightLeft size={16} className="text-[var(--color-text-muted)]" />
                                    </td>
                                    <td className="px-6 py-4">
                                        {mapping.status === 'Mapped' ? (
                                            <div>
                                                <p className="font-mono text-sm font-semibold text-[var(--color-text-main)]">{mapping.groupCode}</p>
                                                <p className="text-sm text-[var(--color-text-muted)]">{mapping.groupName}</p>
                                            </div>
                                        ) : (
                                            <select
                                                className="px-3 py-2 border border-[var(--color-border-subtle)] rounded-lg text-sm bg-[var(--color-bg-card)] text-[var(--color-text-main)] w-full"
                                                defaultValue=""
                                            >
                                                <option value="">Select Group Account...</option>
                                                {groupAccounts.map(acc => (
                                                    <option key={acc.code} value={acc.code}>{acc.code} - {acc.name}</option>
                                                ))}
                                            </select>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">{getStatusBadge(mapping.status)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[var(--color-text-muted)] hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all text-sm font-medium">
                                            {mapping.status === 'Mapped' ? 'Edit' : 'Map'}
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
