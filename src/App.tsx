import type { FC } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { BizTrakUpload } from './pages/BizTrakUpload';
import { DataValidation } from './pages/DataValidation';
import { ChartOfAccounts } from './pages/ChartOfAccounts';
import { SubsidiaryMapping } from './pages/SubsidiaryMapping';
import { Transactions } from './pages/Transactions';
import { Adjustments } from './pages/Adjustments';
import { FinancialReports } from './pages/FinancialReports';
import { BalanceSheet } from './pages/BalanceSheet';
import { CashFlow } from './pages/CashFlow';
import { PeriodComparison } from './pages/PeriodComparison';
import { DrillDown } from './pages/DrillDown';
import { AdminCommentary } from './pages/AdminCommentary';
import { ManagementFeedback } from './pages/ManagementFeedback';
import { MultiCurrencyFX } from './pages/MultiCurrencyFX';
import { UserManagement } from './pages/UserManagement';
import { AuditLog } from './pages/AuditLog';
import { ExportBoardPack } from './pages/ExportBoardPack';
import { SystemSettings } from './pages/SystemSettings';

const App: FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            {/* Data Management */}
            <Route path="data-management" element={<BizTrakUpload />} />
            <Route path="data-validation" element={<DataValidation />} />
            {/* Chart of Accounts */}
            <Route path="coa" element={<ChartOfAccounts />} />
            <Route path="coa/subsidiary-mapping" element={<SubsidiaryMapping />} />
            {/* Inter-Company */}
            <Route path="inter-company" element={<Transactions />} />
            <Route path="inter-company/adjustments" element={<Adjustments />} />
            {/* Financial Reports */}
            <Route path="financial-reports" element={<FinancialReports />} />
            <Route path="financial-reports/balance-sheet" element={<BalanceSheet />} />
            <Route path="financial-reports/cash-flow" element={<CashFlow />} />
            {/* Variance Analysis */}
            <Route path="variance-analysis" element={<PeriodComparison />} />
            <Route path="variance-analysis/drill-down" element={<DrillDown />} />
            {/* Commentary & Review */}
            <Route path="commentary" element={<AdminCommentary />} />
            <Route path="commentary/management-feedback" element={<ManagementFeedback />} />
            {/* Other pages */}
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
