import { useState } from 'react';
import { ArrowRightLeft, Check, AlertTriangle, FileInput, Plus, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';

interface Transaction {
  id: string;
  date: string;
  seller: string;
  buyer: string;
  amount: number;
  currency: string;
  status: 'Matched' | 'Unmatched' | 'Disputed';
  type: 'Sales' | 'Service' | 'Loan';
}

const mockTransactions: Transaction[] = [
  { id: 'TX001', date: '2026-01-15', seller: 'Securemetric MY', buyer: 'Securemetric SG', amount: 50000, currency: 'MYR', status: 'Matched', type: 'Sales' },
  { id: 'TX002', date: '2026-01-18', seller: 'Securemetric SG', buyer: 'Securemetric MY', amount: 12000, currency: 'SGD', status: 'Matched', type: 'Service' },
  { id: 'TX003', date: '2026-01-20', seller: 'Securemetric MY', buyer: 'Securemetric ID', amount: 25000, currency: 'MYR', status: 'Unmatched', type: 'Sales' },
  { id: 'TX004', date: '2026-01-22', seller: 'Securemetric VN', buyer: 'Securemetric MY', amount: 150000000, currency: 'VND', status: 'Disputed', type: 'Service' },
];

export const InterCompany = () => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'adjustments'>('transactions');

  return (
    <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">Inter-Company <span className="text-gradient-primary">Management</span></h1>
          <p className="text-[var(--color-text-muted)]">Reconcile and eliminate inter-company transactions</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2">
            <RefreshCw size={16} /> <span className="hidden sm:inline">Auto-Reconcile</span>
          </button>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
            <Plus size={18} /> New Adjustment
          </button>
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="border-b border-[var(--color-border-subtle)]">
          <nav className="flex px-2">
            <button
              onClick={() => setActiveTab('transactions')}
              className={clsx(
                "py-4 px-6 text-sm font-bold border-b-2 transition-all",
                activeTab === 'transactions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:border-[var(--color-border-subtle)]'
              )}
            >
              Transactions & Reconciliation
            </button>
            <button
              onClick={() => setActiveTab('adjustments')}
              className={clsx(
                "py-4 px-6 text-sm font-bold border-b-2 transition-all",
                activeTab === 'adjustments'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:border-[var(--color-border-subtle)]'
              )}
            >
              Consolidation Adjustments
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'transactions' ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 group hover:shadow-md transition-all">
                  <div className="text-emerald-800 text-sm font-bold mb-2 uppercase tracking-wider">Matched Volume</div>
                  <div className="text-3xl font-bold text-emerald-900">RM 1.2M</div>
                  <div className="text-xs text-emerald-700 mt-2 font-medium flex items-center gap-1">
                    <Check size={14} /> 15 transactions auto-matched
                  </div>
                </div>
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 group hover:shadow-md transition-all">
                  <div className="text-amber-800 text-sm font-bold mb-2 uppercase tracking-wider">Unmatched</div>
                  <div className="text-3xl font-bold text-amber-900">RM 45K</div>
                  <div className="text-xs text-amber-700 mt-2 font-medium flex items-center gap-1">
                    <ArrowRightLeft size={14} /> 3 transactions pending review
                  </div>
                </div>
                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 group hover:shadow-md transition-all">
                  <div className="text-rose-800 text-sm font-bold mb-2 uppercase tracking-wider">Disputed</div>
                  <div className="text-3xl font-bold text-rose-900">RM 28K</div>
                  <div className="text-xs text-rose-700 mt-2 font-medium flex items-center gap-1">
                    <AlertTriangle size={14} /> Action required
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[var(--color-border-subtle)]">
                <div className="min-w-[900px]">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[var(--color-bg-page)] text-[var(--color-text-muted)] font-bold uppercase tracking-wider text-xs border-b border-[var(--color-border-subtle)]">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Transaction ID</th>
                        <th className="px-6 py-4">From Entity</th>
                        <th className="px-6 py-4">To Entity</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border-subtle)]">
                      {mockTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-[var(--color-bg-page)] transition-colors group">
                          <td className="px-6 py-4 text-[var(--color-text-main)] font-medium">{tx.date}</td>
                          <td className="px-6 py-4 font-mono text-xs text-[var(--color-text-muted)]">{tx.id}</td>
                          <td className="px-6 py-4 font-medium text-[var(--color-text-main)]">{tx.seller}</td>
                          <td className="px-6 py-4 font-medium text-[var(--color-text-main)]">{tx.buyer}</td>
                          <td className="px-6 py-4 text-right font-mono font-bold text-[var(--color-text-main)]">
                            <span className="text-xs text-[var(--color-text-muted)] mr-1">{tx.currency}</span>
                            {tx.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={clsx(
                              "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold gap-1.5 border",
                              tx.status === 'Matched' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                tx.status === 'Unmatched' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                  'bg-rose-50 text-rose-700 border-rose-100'
                            )}>
                              {tx.status === 'Matched' && <Check size={12} strokeWidth={3} />}
                              {tx.status === 'Unmatched' && <ArrowRightLeft size={12} strokeWidth={3} />}
                              {tx.status === 'Disputed' && <AlertTriangle size={12} strokeWidth={3} />}
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-blue-600 hover:text-blue-800 font-bold text-xs hover:underline">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="bg-[var(--color-bg-page)] w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm border border-[var(--color-border-subtle)]">
                <FileInput className="text-[var(--color-text-muted)]" size={40} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-2">No Manual Adjustments Yet</h3>
              <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-8">
                Create manual elimination entries for complex inter-company scenarios that cannot be auto-matched.
              </p>
              <button className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-6 py-3 rounded-xl font-bold hover:bg-[var(--color-bg-page)] transition-all shadow-sm hover:shadow-md">
                Create Adjustment Entry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
