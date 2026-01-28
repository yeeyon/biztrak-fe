import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
  CreditCard,
  TrendingUp,
  Download,
  Calendar,
  MoreHorizontal
} from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

const subsidiaryData = [
  { name: 'Malaysia', value: 45 },
  { name: 'Singapore', value: 25 },
  { name: 'Indonesia', value: 20 },
  { name: 'Vietnam', value: 10 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] p-3 rounded-lg shadow-xl">
        <p className="text-[var(--color-text-muted)] text-xs font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: <span className="text-[var(--color-text-main)]">RM {entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const KPICard = ({ title, value, change, isPositive, icon: Icon, delay }: any) => (
  <div className={`card-premium p-6 animate-enter ${delay}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full border ${isPositive
        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
        : 'bg-rose-50 text-rose-700 border-rose-100'
        }`}>
        {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
        {Math.abs(change)}%
      </span>
    </div>
    <h3 className="text-[var(--color-text-muted)] text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-display font-bold text-[var(--color-text-main)] tracking-tight">{value}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 p-2 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 animate-enter">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">
            Financial <span className="text-gradient-primary">Overview</span>
          </h1>
          <p className="text-[var(--color-text-muted)]">Group performance metrics for <span className="text-[var(--color-text-main)] font-medium">January 2026</span></p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <select className="appearance-none bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-[var(--color-text-main)] rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-slate-400 transition-colors w-full shadow-sm font-medium">
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>YTD</option>
            </select>
            <Calendar className="absolute right-3 top-2.5 text-[var(--color-text-muted)] pointer-events-none" size={16} />
          </div>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-slate-900/20">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue (YTD)"
          value="RM 12.5M"
          change={12.5}
          isPositive={true}
          icon={DollarSign}
          delay="delay-0"
        />
        <KPICard
          title="Net Profit Margin"
          value="18.2%"
          change={2.1}
          isPositive={true}
          icon={TrendingUp}
          delay="delay-100"
        />
        <KPICard
          title="EBITDA"
          value="RM 3.2M"
          change={-0.4}
          isPositive={false}
          icon={Activity}
          delay="delay-200"
        />
        <KPICard
          title="Cash Position"
          value="RM 8.4M"
          change={5.3}
          isPositive={true}
          icon={CreditCard}
          delay="delay-300"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-enter delay-200">
        <div className="lg:col-span-2 card-premium p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[var(--color-text-main)]">Revenue & Profit Trends</h3>
            <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                  name="Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-premium p-6">
          <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-6">Subsidiary Contribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subsidiaryData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={80}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[0, 6, 6, 0]}
                  barSize={32}
                >
                  {
                    subsidiaryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#94a3b8'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card-premium p-6 animate-enter delay-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[var(--color-text-main)]">Data Freshness Status</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium font-sans">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[var(--color-text-muted)] font-medium bg-[var(--color-bg-page)] border-y border-[var(--color-border-subtle)]">
              <tr>
                <th className="px-4 py-3 first:rounded-l-lg last:rounded-r-lg">Subsidiary</th>
                <th className="px-4 py-3">Last Upload</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right first:rounded-l-lg last:rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {[
                { name: 'Securemetric MY', date: 'Jan 28, 2026 10:30 AM', status: 'Up to Date' },
                { name: 'Securemetric SG', date: 'Jan 28, 2026 09:15 AM', status: 'Up to Date' },
                { name: 'Securemetric ID', date: 'Jan 27, 2026 05:45 PM', status: 'Pending' },
                { name: 'Securemetric VN', date: 'Jan 25, 2026 02:20 PM', status: 'Overdue' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-[var(--color-bg-page)] transition-colors">
                  <td className="px-4 py-4 font-medium text-[var(--color-text-main)] group-hover:text-blue-600 transition-colors">{row.name}</td>
                  <td className="px-4 py-4 text-[var(--color-text-muted)]">{row.date}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border
                      ${row.status === 'Up to Date' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        row.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-rose-50 text-rose-700 border-rose-100'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${row.status === 'Up to Date' ? 'bg-emerald-500' :
                        row.status === 'Pending' ? 'bg-amber-500' :
                          'bg-rose-500'
                        }`}></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-[var(--color-text-muted)] hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-all">
                      View
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
