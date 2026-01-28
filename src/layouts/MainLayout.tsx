import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { clsx } from 'clsx';

export const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        "fixed md:static inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out transform h-full",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        isSidebarCollapsed ? "md:w-20" : "md:w-64",
        "w-64" // Mobile width is always 64
      )}>
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <div className="flex-1 flex flex-col h-full min-w-0 transition-all duration-300 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden overflow-y-auto w-full relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
