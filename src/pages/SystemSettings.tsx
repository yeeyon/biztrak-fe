import React from 'react';
import { Settings, Bell, Globe, Shield, Save } from 'lucide-react';



export const SystemSettings: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 p-2 sm:p-6 animate-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">System <span className="text-gradient-primary">Settings</span></h1>
          <p className="text-[var(--color-text-muted)]">Configure global preferences and system parameters</p>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="card-premium divide-y divide-[var(--color-border-subtle)] overflow-hidden">
        <div className="p-8">
          <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Globe size={20} /></div>
            General Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[var(--color-text-main)]">Base Currency</label>
              <div className="relative">
                <select className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[var(--color-bg-page)] shadow-sm appearance-none font-medium text-[var(--color-text-main)]">
                  <option>MYR - Malaysian Ringgit</option>
                  <option>USD - US Dollar</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]">
                  <Settings size={14} className="animate-spin-slow" />
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">Reporting currency for group consolidation</p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[var(--color-text-main)]">Fiscal Year End</label>
              <select className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[var(--color-bg-page)] shadow-sm font-medium text-[var(--color-text-main)]">
                <option>December 31</option>
                <option>March 31</option>
                <option>June 30</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3">
            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><Shield size={20} /></div>
            Security & Access
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-page)] transition-all bg-[var(--color-bg-card)] shadow-sm">
              <div>
                <div className="font-bold text-[var(--color-text-main)] mb-0.5">Two-Factor Authentication</div>
                <div className="text-sm text-[var(--color-text-muted)]">Require 2FA for all admin accounts</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-[var(--color-bg-page)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-page)] transition-all bg-[var(--color-bg-card)] shadow-sm">
              <div>
                <div className="font-bold text-[var(--color-text-main)] mb-0.5">IP Restriction</div>
                <div className="text-sm text-[var(--color-text-muted)]">Restrict access to corporate VPN IPs only</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[var(--color-bg-page)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3">
            <div className="bg-amber-50 p-2 rounded-lg text-amber-600"><Bell size={20} /></div>
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-2 hover:bg-[var(--color-bg-page)] rounded-lg -ml-2 transition-colors">
              <input type="checkbox" className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md" defaultChecked />
              <label className="text-sm font-medium text-[var(--color-text-main)]">Email me when data upload is completed</label>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-[var(--color-bg-page)] rounded-lg -ml-2 transition-colors">
              <input type="checkbox" className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md" defaultChecked />
              <label className="text-sm font-medium text-[var(--color-text-main)]">Email me when monthly reports are finalized</label>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-[var(--color-bg-page)] rounded-lg -ml-2 transition-colors">
              <input type="checkbox" className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md" />
              <label className="text-sm font-medium text-[var(--color-text-main)]">Weekly summary digest</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
