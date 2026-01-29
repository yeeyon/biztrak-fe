import React, { useState } from 'react';
import { Globe, RefreshCw, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { clsx } from 'clsx';

interface ExchangeRate {
  currency: string;
  name: string;
  rate: number;
  change: number;
  lastUpdated: string;
}

const mockRates: ExchangeRate[] = [
  { currency: 'USD', name: 'US Dollar', rate: 4.65, change: 0.2, lastUpdated: '2026-01-28 17:00' },
  { currency: 'SGD', name: 'Singapore Dollar', rate: 3.45, change: -0.1, lastUpdated: '2026-01-28 17:00' },
  { currency: 'IDR', name: 'Indonesian Rupiah (1000)', rate: 0.30, change: 0.0, lastUpdated: '2026-01-28 17:00' },
  { currency: 'VND', name: 'Vietnamese Dong (1000)', rate: 0.19, change: 0.5, lastUpdated: '2026-01-28 17:00' },
  { currency: 'PHP', name: 'Philippine Peso', rate: 0.08, change: -0.3, lastUpdated: '2026-01-28 17:00' },
];

export const MultiCurrencyFX: React.FC = () => {
  const [rates, setRates] = useState(mockRates);

  const refreshRates = () => {
    // Simulate API call
    const newRates = rates.map(r => ({
      ...r,
      rate: r.rate * (1 + (Math.random() * 0.02 - 0.01)),
      lastUpdated: new Date().toLocaleString()
    }));
    setRates(newRates);
  };

  return (
    <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">Multi-Currency <span className="text-gradient-primary">& FX</span></h1>
          <p className="text-[var(--color-text-muted)]">Manage exchange rates and translation adjustments</p>
        </div>
        <button
          onClick={refreshRates}
          className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-bg-page)] transition-all shadow-sm flex items-center gap-2"
        >
          <RefreshCw size={16} /> Sync Live Rates
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Exchange Rate Table */}
        <div className="card-premium overflow-hidden">
          <div className="p-5 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] flex items-center gap-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
              <Globe size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-[var(--color-text-main)] text-lg">Exchange Rates (to MYR)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
                <tr>
                  <th className="px-6 py-4 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Currency</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Rate</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Change %</th>
                  <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {rates.map((r) => (
                  <tr key={r.currency} className="hover:bg-[var(--color-bg-page)] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-bg-page)] flex items-center justify-center font-bold text-xs text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
                          {r.currency.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-[var(--color-text-main)]">{r.currency}</div>
                          <div className="text-xs text-[var(--color-text-muted)] font-medium">{r.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-[var(--color-text-main)]">{r.rate.toFixed(4)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={clsx(
                        "inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border",
                        r.change > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          r.change < 0 ? 'bg-rose-50 text-rose-700 border-rose-100' :
                            'bg-[var(--color-bg-page)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)]'
                      )}>
                        {r.change > 0 ? <TrendingUp size={12} strokeWidth={2.5} /> : r.change < 0 ? <TrendingDown size={12} strokeWidth={2.5} /> : null}
                        {r.change > 0 ? '+' : ''}{r.change.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-[var(--color-text-muted)] text-xs font-medium">{r.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FX Impact Summary */}
        <div className="space-y-6">
          <div className="card-premium p-6 border-l-4 border-l-emerald-500">
            <h3 className="font-bold text-[var(--color-text-main)] mb-6 text-lg flex items-center gap-2">
              Unrealized FX Gain/Loss (YTD)
            </h3>
            <div className="flex items-center gap-5 mb-8">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800">
                <DollarSign size={32} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-4xl font-bold text-[var(--color-text-main)] tracking-tight">+ RM 245,000</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold mt-1 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-lg inline-block border border-emerald-100 dark:border-emerald-800/50">
                  Gain due to strengthening USD
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-[var(--color-border-subtle)]">
              <div className="flex justify-between items-center text-sm p-3 bg-[var(--color-bg-page)] rounded-xl hover:bg-[var(--color-bg-card)] hover:shadow-sm border border-transparent hover:border-[var(--color-border-subtle)] transition-all">
                <span className="font-semibold text-[var(--color-text-muted)] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div> USD Impact
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">+ RM 280,000</span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 bg-[var(--color-bg-page)] rounded-xl hover:bg-[var(--color-bg-card)] hover:shadow-sm border border-transparent hover:border-[var(--color-border-subtle)] transition-all">
                <span className="font-semibold text-[var(--color-text-muted)] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div> SGD Impact
                </span>
                <span className="font-bold text-rose-600 dark:text-rose-400">- RM 15,000</span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 bg-[var(--color-bg-page)] rounded-xl hover:bg-[var(--color-bg-card)] hover:shadow-sm border border-transparent hover:border-[var(--color-border-subtle)] transition-all">
                <span className="font-semibold text-[var(--color-text-muted)] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div> IDR Impact
                </span>
                <span className="font-bold text-rose-600 dark:text-rose-400">- RM 20,000</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-2xl p-6 shadow-sm relative overflow-hidden group/recommendation">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover/recommendation:opacity-[0.05] transition-opacity translate-x-4 -translate-y-4">
              <TrendingUp size={120} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                <TrendingUp size={18} />
              </div>
              <h4 className="font-bold text-[var(--color-text-main)] text-sm uppercase tracking-wider">Hedging Recommendation</h4>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-medium">
              USD exposure has increased by <span className="text-indigo-600 dark:text-indigo-400 font-bold text-base">15%</span> this quarter.
              Consider locking in forward contracts for upcoming procurement payments in <span className="text-[var(--color-text-main)] font-bold italic">Q2</span> to mitigate currency risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
