import React from 'react';
import { User, Shield, Clock, MoreVertical, Plus, Search } from 'lucide-react';

import { clsx } from 'clsx';

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@securemetric.com', role: 'Group CFO', status: 'Active', lastActive: '2 mins ago' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@securemetric.com', role: 'Subsidiary Admin (MY)', status: 'Active', lastActive: '1 hour ago' },
  { id: 3, name: 'Robert Johnson', email: 'robert.j@securemetric.com', role: 'Viewer (Board)', status: 'Active', lastActive: '3 days ago' },
  { id: 4, name: 'Sarah Lee', email: 'sarah.lee@securemetric.com', role: 'Subsidiary Admin (SG)', status: 'Inactive', lastActive: '2 weeks ago' },
];

export const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">User <span className="text-gradient-primary">Management</span></h1>
          <p className="text-[var(--color-text-muted)]">Manage access and permissions for the financial dashboard</p>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
          <Plus size={18} /> Add User
        </button>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-[var(--color-text-main)] text-lg flex items-center gap-2">
            <div className="bg-blue-50 p-1.5 rounded-lg text-blue-600"><User size={20} /></div>
            System Users
          </h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-[var(--color-border-subtle)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[var(--color-bg-page)] text-[var(--color-text-main)] placeholder-[var(--color-text-muted)]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
              <tr>
                <th className="px-6 py-4 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">User</th>
                <th className="px-6 py-4 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Role</th>
                <th className="px-6 py-4 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Last Active</th>
                <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--color-bg-page)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-slate-700">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[var(--color-text-main)]">{user.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[var(--color-text-main)] font-medium">
                      <Shield size={14} className="text-blue-500" />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border",
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'
                    )}>
                      <div className={clsx(
                        "w-1.5 h-1.5 rounded-full mr-1.5",
                        user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                      )} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-muted)] text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[var(--color-text-muted)]" />
                      {user.lastActive}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[var(--color-text-muted)] hover:text-blue-600 transition-colors bg-[var(--color-bg-card)] hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1.5 rounded-lg border border-transparent hover:border-blue-100">
                      <MoreVertical size={18} />
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
