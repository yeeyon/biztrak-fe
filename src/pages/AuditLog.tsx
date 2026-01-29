import React from 'react';
import { FileText, Edit, Upload, Settings, Search, Filter, Download } from 'lucide-react';
import { clsx } from 'clsx';

const logs = [
  { id: 1, action: 'Upload', user: 'Jane Smith', details: 'Uploaded BizTrak_MY_Jan26.csv', date: '2026-01-28 10:30', ip: '192.168.1.15' },
  { id: 2, action: 'Edit', user: 'Kelvin Yong', details: 'Modified COA mapping for account 4500', date: '2026-01-28 09:45', ip: '10.0.0.5' },
  { id: 3, action: 'System', user: 'System', details: 'Auto-matched 15 inter-company transactions', date: '2026-01-28 08:00', ip: 'Localhost' },
  { id: 4, action: 'Login', user: 'Robert Johnson', details: 'User login successful', date: '2026-01-27 18:30', ip: '203.115.44.12' },
  { id: 5, action: 'Export', user: 'Kelvin Yong', details: 'Exported Monthly Board Pack (PDF)', date: '2026-01-27 16:20', ip: '10.0.0.5' },
];

export const AuditLog: React.FC = () => {
  const getIcon = (action: string) => {
    switch (action) {
      case 'Upload': return <Upload size={16} className="text-blue-600" />;
      case 'Edit': return <Edit size={16} className="text-amber-500" />;
      case 'System': return <Settings size={16} className="text-slate-500" />;
      case 'Export': return <Download size={16} className="text-emerald-500" />;
      default: return <FileText size={16} className="text-slate-400" />;
    }
  };

  const getBadgeStyle = (action: string) => {
    switch (action) {
      case 'Upload': return "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
      case 'Edit': return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
      case 'System': return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
      case 'Export': return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800";
      default: return "bg-[var(--color-bg-page)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)]";
    }
  };

  return (
    <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">Audit <span className="text-gradient-primary">Log</span></h1>
          <p className="text-[var(--color-text-muted)]">Track all system activities and data changes for governance</p>
        </div>
        <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
          <Download size={16} /> Export Log
        </button>
      </div>

      <div className="card-premium overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--color-border-subtle)] flex flex-col md:flex-row gap-4 bg-[var(--color-bg-card)]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search user, action, or details..."
              className="pl-10 pr-4 py-2.5 border border-[var(--color-border-subtle)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition-shadow shadow-sm bg-[var(--color-bg-card)] text-[var(--color-text-main)] placeholder-[var(--color-text-muted)]"
            />
          </div>
          <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--color-bg-page)] transition-all flex items-center gap-2 shadow-sm">
            <Filter size={16} /> Filter Date
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--color-bg-page)] text-[var(--color-text-muted)] font-bold uppercase tracking-wider text-xs border-b border-[var(--color-border-subtle)]">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[var(--color-bg-page)] transition-colors group">
                  <td className="px-6 py-4 text-[var(--color-text-muted)] font-mono text-xs whitespace-nowrap">{log.date}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[var(--color-text-main)] group-hover:text-blue-600 transition-colors">{log.user}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                      getBadgeStyle(log.action)
                    )}>
                      {getIcon(log.action)}
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-main)] font-medium">{log.details}</td>
                  <td className="px-6 py-4 text-right text-[var(--color-text-muted)] font-mono text-xs font-medium">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[var(--color-border-subtle)] text-center bg-[var(--color-bg-page)]">
          <button className="text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors">Load More Records</button>
        </div>
      </div>
    </div>
  );
};
