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

      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-neutral-900 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 opacity-50"></div>
        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              Premium Feature
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Monthly Board Pack Generator</h2>
            <p className="text-slate-400 text-lg max-w-xl mb-8 leading-relaxed">
              Automatically compile the Executive Summary, Consolidated P&L, Variance Analysis, and Management Commentary into a single professional PDF tailored for board reviews.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-3">
                <FileText size={20} /> Generate Jan 2026 Pack
              </button>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle size={16} className="text-emerald-400" />
                </div>
                <span>All group data validated</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="w-48 h-64 bg-slate-800 rounded-lg border border-slate-700 shadow-2xl transform rotate-6 translate-x-4"></div>
            <div className="absolute inset-0 w-48 h-64 bg-slate-700 rounded-lg border border-slate-600 shadow-2xl flex flex-col p-4 transform -rotate-3 transition-transform hover:rotate-0 duration-500 cursor-pointer">
              <div className="w-12 h-1 bg-blue-500 mb-4 rounded-full"></div>
              <div className="space-y-2">
                <div className="w-full h-2 bg-slate-600 rounded"></div>
                <div className="w-5/6 h-2 bg-slate-600 rounded"></div>
                <div className="w-4/6 h-2 bg-slate-600 rounded"></div>
              </div>
              <div className="mt-auto flex justify-between items-end">
                <div className="w-10 h-10 rounded bg-slate-800"></div>
                <FileText size={24} className="text-blue-500 opacity-50" />
              </div>
            </div>
          </div>
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
