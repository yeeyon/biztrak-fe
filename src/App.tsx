import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { BizTrakUpload } from './pages/BizTrakUpload';
import { ChartOfAccounts } from './pages/ChartOfAccounts';
import { FinancialReports } from './pages/FinancialReports';
import { InterCompany } from './pages/InterCompany';
import { UserManagement } from './pages/UserManagement';
import { SystemSettings } from './pages/SystemSettings';
import { VarianceAnalysis } from './pages/VarianceAnalysis';
import { CommentaryReview } from './pages/CommentaryReview';
import { MultiCurrencyFX } from './pages/MultiCurrencyFX';
import { AuditLog } from './pages/AuditLog';
import { ExportBoardPack } from './pages/ExportBoardPack';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="data-management" element={<BizTrakUpload />} />
            <Route path="coa" element={<ChartOfAccounts />} />
            <Route path="inter-company" element={<InterCompany />} />
            <Route path="financial-reports" element={<FinancialReports />} />
            <Route path="variance-analysis" element={<VarianceAnalysis />} />
            <Route path="commentary" element={<CommentaryReview />} />
            <Route path="multi-currency" element={<MultiCurrencyFX />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="audit-log" element={<AuditLog />} />
            <Route path="export" element={<ExportBoardPack />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
