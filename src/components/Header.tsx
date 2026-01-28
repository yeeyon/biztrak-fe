import React from 'react';
import { Bell, Search, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-[var(--color-bg-card)] border-b border-[var(--color-border-subtle)] h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 w-full transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-[var(--color-text-muted)] hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Menu size={20} />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
          <input
            type="text"
            placeholder="Search reports..."
            className="pl-10 pr-4 py-2 border border-[var(--color-border-subtle)] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm w-48 md:w-64 transition-all bg-[var(--color-bg-page)] text-[var(--color-text-main)] placeholder-[var(--color-text-muted)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-[var(--color-text-muted)] hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="relative p-2 text-[var(--color-text-muted)] hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="h-8 w-px bg-[var(--color-border-subtle)] mx-1 md:mx-2"></div>
        <div className="flex items-center gap-2 max-w-[120px] md:max-w-none">
          <span className="text-sm font-medium text-[var(--color-text-main)] truncate">Securemetric Berhad</span>
        </div>
      </div>
    </header>
  );
};
