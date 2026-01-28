import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, CloudUpload } from 'lucide-react';
import { clsx } from 'clsx';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadHistoryItem {
  id: string;
  filename: string;
  subsidiary: string;
  period: string;
  date: string;
  status: 'Success' | 'Failed' | 'Processing';
  rows: number;
}

const mockHistory: UploadHistoryItem[] = [
  { id: '1', filename: 'biztrak_my_jan2026.csv', subsidiary: 'Securemetric MY', period: 'Jan 2026', date: '2026-01-28 10:30', status: 'Success', rows: 1250 },
  { id: '2', filename: 'biztrak_sg_jan2026.csv', subsidiary: 'Securemetric SG', period: 'Jan 2026', date: '2026-01-28 09:15', status: 'Success', rows: 840 },
  { id: '3', filename: 'biztrak_id_jan2026_v1.csv', subsidiary: 'Securemetric ID', period: 'Jan 2026', date: '2026-01-27 17:45', status: 'Failed', rows: 0 },
];

export const BizTrakUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setStatus('idle');
  };

  const uploadFile = () => {
    setStatus('uploading');
    // Simulate upload delay
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="space-y-8 p-2 sm:p-6 max-w-7xl mx-auto animate-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">BizTrak <span className="text-gradient-primary">Data Upload</span></h1>
          <p className="text-[var(--color-text-muted)]">Upload and validate financial data from BizTrak CSV exports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Upload Area */}
        <div className="xl:col-span-2 space-y-6">
          <div className="card-premium p-8 h-full">
            <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-2">
              <CloudUpload className="text-blue-600" size={24} />
              Upload New File
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Subsidiary</label>
                <select className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[var(--color-bg-page)] text-[var(--color-text-main)] transition-all">
                  <option>Select Subsidiary...</option>
                  <option>Securemetric MY</option>
                  <option>Securemetric SG</option>
                  <option>Securemetric ID</option>
                  <option>Securemetric VN</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Period</label>
                <input
                  type="month"
                  className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[var(--color-bg-page)] text-[var(--color-text-main)] transition-all"
                  defaultValue="2026-01"
                />
              </div>
            </div>

            <div
              className={clsx(
                "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 min-h-[300px] cursor-pointer relative overflow-hidden group",
                dragActive
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 scale-[1.02]"
                  : "border-[var(--color-border-subtle)] hover:border-slate-300 hover:bg-[var(--color-bg-page)] dark:hover:bg-slate-800"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                type="file"
                className="hidden"
                id="file-upload"
                accept=".csv"
                onChange={handleChange}
              />

              {!selectedFile ? (
                <div className="text-center z-10 transition-transform group-hover:scale-105 duration-300">
                  <div className="bg-blue-100/50 dark:bg-blue-900/30 p-4 rounded-full inline-flex mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Upload size={40} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--color-text-main)] mb-2">Click to upload or drag and drop</h4>
                  <p className="text-[var(--color-text-muted)] text-sm mb-6">Supported formats: CSV, XLS (Max 10MB)</p>
                  <span className="bg-[var(--color-bg-card)] text-[var(--color-text-main)] border border-[var(--color-border-subtle)] px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm group-hover:shadow-md transition-all">
                    Browse Files
                  </span>
                </div>
              ) : (
                <div className="w-full max-w-md z-10">
                  <div className="flex items-center justify-between bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] p-5 rounded-xl shadow-sm mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <FileText className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--color-text-main)]">{selectedFile.name}</p>
                        <p className="text-xs text-[var(--color-text-muted)] font-medium">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                      className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 p-2 rounded-full transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {status === 'idle' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); uploadFile(); }}
                      className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98]"
                    >
                      Process & Validate Data
                    </button>
                  )}

                  {status === 'uploading' && (
                    <div className="space-y-3">
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite] w-2/3 rounded-full"></div>
                      </div>
                      <p className="text-xs text-center text-slate-500 font-medium">Validating data structure and GL codes...</p>
                    </div>
                  )}

                  {status === 'success' && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-4 animate-enter">
                      <CheckCircle className="text-emerald-600 mt-0.5 shrink-0" size={20} />
                      <div>
                        <h4 className="text-sm font-bold text-emerald-900">Validation Successful</h4>
                        <p className="text-xs text-emerald-700 mt-1 font-medium leading-relaxed">
                          File uploaded successfully. 1,250 rows processed with 0 errors. Data is now ready for consolidation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-start gap-3 text-sm text-slate-600 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
              <AlertCircle size={18} className="text-blue-600 mt-0.5 shrink-0" />
              <p>System automatically validates account codes against Group COA. Any unmapped accounts will be flagged for review in the Data Mapping section.</p>
            </div>
          </div>
        </div>

        {/* Upload History */}
        <div className="card-premium p-6 h-fit sticky top-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[var(--color-text-main)]">Recent Uploads</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {mockHistory.map((item, i) => (
              <div key={item.id} className={`group border border-[var(--color-border-subtle)] rounded-xl p-4 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer bg-[var(--color-bg-card)] animate-enter delay-${i * 100}`}>
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border
                    ${item.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      item.status === 'Failed' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'}`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] font-medium">{item.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  <h4 className="text-sm font-bold text-[var(--color-text-main)] truncate group-hover:text-blue-600 transition-colors" title={item.filename}>
                    {item.filename}
                  </h4>
                </div>
                <div className="flex justify-between items-center mt-3 text-xs text-[var(--color-text-muted)] font-medium">
                  <span>{item.subsidiary}</span>
                  <span>{item.rows.toLocaleString()} rows</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
