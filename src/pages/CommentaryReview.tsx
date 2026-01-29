import React from 'react';
import { MessageSquare, Paperclip, MoreHorizontal, UserCircle, CheckCheck } from 'lucide-react';

const threads = [
  {
    id: 1,
    title: 'Q1 OPEX Variance Inquiry',
    status: 'Action Required',
    author: 'Kelvin Yong (CFO)',
    date: '2 hours ago',
    preview: 'Please explain the significant increase in legal fees for the Indonesia subsidiary...',
    comments: 3
  },
  {
    id: 2,
    title: 'Revenue Recognition Adjustment',
    status: 'Resolved',
    author: 'Jane Smith (MY Admin)',
    date: '1 day ago',
    preview: 'Adjustment made for the SaaS contract #8821 per IFRS 15 guidelines...',
    comments: 5
  },
  {
    id: 3,
    title: 'March 2026 Budget Approval',
    status: 'Pending',
    author: 'Board Director',
    date: '3 days ago',
    preview: 'The marketing budget seems low given the new product launch...',
    comments: 1
  }
];

export const CommentaryReview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-main)]">Commentary & Review</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Collaborate on financial reports and variance explanations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Thread List */}
        <div className="bg-[var(--color-bg-card)] rounded-xl shadow-sm border border-[var(--color-border-subtle)] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border-subtle)]">
            <h3 className="font-bold text-[var(--color-text-main)]">Discussions</h3>
            <div className="flex gap-2 mt-2">
              <span className="bg-[var(--color-bg-page)] text-[var(--color-text-muted)] px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-[var(--color-border-subtle)]">All</span>
              <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400">Action Required</span>
              <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400">Resolved</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map((thread) => (
              <div key={thread.id} className="p-4 border-b border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-page)] cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-[var(--color-text-main)] text-sm">{thread.title}</h4>
                  <span className="text-xs text-[var(--color-text-muted)] whitespace-nowrap">{thread.date}</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-2">{thread.preview}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCircle size={16} className="text-[var(--color-text-muted)]" />
                    <span className="text-xs text-[var(--color-text-muted)]">{thread.author}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${thread.status === 'Action Required' ? 'bg-red-100 text-red-800' :
                      thread.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                    {thread.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-[var(--color-bg-card)] rounded-xl shadow-sm border border-[var(--color-border-subtle)] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border-subtle)] flex justify-between items-center bg-[var(--color-bg-page)]">
            <div>
              <h3 className="font-bold text-[var(--color-text-main)]">Q1 OPEX Variance Inquiry</h3>
              <p className="text-xs text-[var(--color-text-muted)]">Started by Kelvin Yong (CFO) on Jan 28, 2026</p>
            </div>
            <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0">
                KY
              </div>
              <div>
                <div className="bg-[var(--color-bg-page)] p-3 rounded-lg rounded-tl-none">
                  <p className="text-sm text-[var(--color-text-main)]">
                    Please explain the significant increase in legal fees for the Indonesia subsidiary. It's 50% over budget.
                  </p>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">10:30 AM</p>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold shrink-0">
                AI
              </div>
              <div className="flex flex-col items-end">
                <div className="bg-primary text-white p-3 rounded-lg rounded-tr-none">
                  <p className="text-sm text-white">
                    This was due to the unexpected patent filing process we initiated last month. The invoice #INV-2026-001 is attached.
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <p className="text-xs text-[var(--color-text-muted)]">10:45 AM</p>
                  <CheckCheck size={14} className="text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-[var(--color-border-subtle)]">
            <div className="bg-[var(--color-bg-page)] border border-[var(--color-border-subtle)] rounded-lg p-2">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none text-[var(--color-text-main)] placeholder-[var(--color-text-muted)]"
                rows={3}
                placeholder="Type your reply here..."
              ></textarea>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-[var(--color-border-subtle)]">
                <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]">
                  <Paperclip size={18} />
                </button>
                <button className="bg-primary text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
                  <MessageSquare size={16} /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
