import React from 'react';
import { FileText, FileSpreadsheet, FileJson, CheckCircle } from 'lucide-react';

const ReportCard = ({ title, desc, icon: Icon, color }: any) => (
  <div className="border border-[var(--color-border-subtle)] rounded-xl p-5 hover:border-primary hover:shadow-md transition-all cursor-pointer group bg-[var(--color-bg-card)]">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="font-bold text-[var(--color-text-main)] mb-1 group-hover:text-primary">{title}</h3>
    <p className="text-sm text-[var(--color-text-muted)]">{desc}</p>
    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[var(--color-text-muted)] group-hover:text-primary">
      Generate Report <span className="group-hover:translate-x-1 transition-transform">→</span>
    </div>
  </div>
);

export const ExportBoardPack: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-main)]">Export & Board Pack</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Generate monthly reports and management presentations</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 dark:border dark:border-slate-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Monthly Board Pack Generator</h2>
          <p className="text-slate-300 max-w-xl mb-6">
            Automatically compile the Executive Summary, Consolidated P&L, Variance Analysis, and Management Commentary into a single professional PDF.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-colors flex items-center gap-2">
              <FileText size={20} /> Generate Jan 2026 Pack
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle size={16} className="text-green-400" />
              <span>All data validated</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
          <FileText size={250} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-4">Standard Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReportCard
            title="Consolidated Financials"
            desc="Full Group P&L, Balance Sheet, and Cash Flow in Excel format with formulas."
            icon={FileSpreadsheet}
            color="bg-green-600"
          />
          <ReportCard
            title="Subsidiary Performance"
            desc="Detailed breakdown of revenue and expenses by country/entity."
            icon={FileText}
            color="bg-blue-600"
          />
          <ReportCard
            title="Raw Data Export"
            desc="Full transaction dump for audit and external analysis usage (CSV/JSON)."
            icon={FileJson}
            color="bg-orange-500"
          />
        </div>
      </div>

      <div className="bg-[var(--color-bg-card)] rounded-xl shadow-sm border border-[var(--color-border-subtle)] p-6">
        <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-4">Scheduled Exports</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--color-bg-page)] text-[var(--color-text-muted)] font-medium">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Report Name</th>
                <th className="px-4 py-3">Frequency</th>
                <th className="px-4 py-3">Recipients</th>
                <th className="px-4 py-3">Next Run</th>
                <th className="px-4 py-3 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              <tr className="text-[var(--color-text-main)]">
                <td className="px-4 py-3 font-medium">Daily Sales Flash</td>
                <td className="px-4 py-3">Daily (8:00 AM)</td>
                <td className="px-4 py-3">Management Team</td>
                <td className="px-4 py-3">Tomorrow, 8:00 AM</td>
                <td className="px-4 py-3"><span className="text-green-600 font-medium">Active</span></td>
              </tr>
              <tr className="text-[var(--color-text-main)]">
                <td className="px-4 py-3 font-medium">Monthly Board Pack</td>
                <td className="px-4 py-3">Monthly (5th day)</td>
                <td className="px-4 py-3">Board Members, CFO</td>
                <td className="px-4 py-3">Feb 5, 2026</td>
                <td className="px-4 py-3"><span className="text-green-600 font-medium">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
