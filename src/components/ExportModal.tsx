import React, { useState } from 'react';
import { X, Printer, FileText, Download, Check, Copy, FileSpreadsheet } from 'lucide-react';
import type { PageSpeedResult } from '../types/pagespeed';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: PageSpeedResult;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  const [copiedMd, setCopiedMd] = useState(false);

  // 1. Print / Save as PDF
  const handlePrint = () => {
    window.print();
  };

  // 2. Download JSON
  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `pagespeed-report-${new URL(result.url).hostname}-${Date.now()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 3. Download CSV
  const handleDownloadCsv = () => {
    const rows = [
      ['PageSpeed Insights Audit Report'],
      ['Tested URL', result.url],
      ['Date', result.timestamp],
      ['Mobile Score', result.mobile.score.toString()],
      ['Desktop Score', result.desktop.score.toString()],
      [],
      ['Core Web Vitals (Mobile)'],
      ['Metric', 'Value', 'Status', 'Target Threshold'],
      ...result.mobile.vitals.map((v) => [v.name, v.value, v.status, v.goodThreshold]),
      [],
      ['Audits Breakdown (Mobile)'],
      ['Category', 'Audit Name', 'Status', 'Description'],
      ...result.mobile.auditCategories.flatMap((cat) =>
        cat.items.map((item) => [cat.title, item.title, item.status, item.description])
      ),
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((row) => row.map((cell) => `"${(cell || '').replace(/"/g, '""')}"`).join(',')).join('\n');

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute(
      'download',
      `pagespeed-report-${new URL(result.url).hostname}.csv`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 4. Copy Markdown Summary
  const handleCopyMarkdown = () => {
    const md = `# PageSpeed Insights Report: ${result.url}
**Audited at:** ${new Date(result.timestamp).toLocaleString()}

## 🚀 Performance Scores
- **Mobile Score:** ${result.mobile.score} / 100
- **Desktop Score:** ${result.desktop.score} / 100

## ⚡ Core Web Vitals (Mobile)
| Metric | Value | Status | Target |
|---|---|---|---|
${result.mobile.vitals.map((v) => `| **${v.shortName}** (${v.name}) | ${v.value} | ${v.status} | ${v.goodThreshold} |`).join('\n')}

## 📋 Audits Summary
${result.mobile.auditCategories
  .map(
    (cat) =>
      `### ${cat.title} (${cat.items.filter((i) => i.status === 'pass').length}/${cat.items.length} Passed)\n` +
      cat.items.map((i) => `- [${i.status === 'pass' ? 'x' : ' '}] **${i.title}**: ${i.description}`).join('\n')
  )
  .join('\n\n')}
`;

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 no-print animate-fade-in">
      <div
        className="relative bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Export Report</h2>
            <p className="text-xs text-slate-500 mt-0.5">{result.url}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options list */}
        <div className="p-5 space-y-3">
          {/* 1. Print / PDF */}
          <button
            onClick={handlePrint}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200/80 hover:border-orange-500 hover:bg-orange-50/20 text-left transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                Print or Save as PDF
              </h4>
              <p className="text-xs text-slate-500">
                Generate clean print-friendly visual PDF report
              </p>
            </div>
          </button>

          {/* 2. Download JSON */}
          <button
            onClick={handleDownloadJson}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-500 hover:bg-blue-50/20 text-left transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                Download JSON Report
              </h4>
              <p className="text-xs text-slate-500">
                Raw structured metrics and complete audit data
              </p>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </button>

          {/* 3. Download CSV */}
          <button
            onClick={handleDownloadCsv}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-500 hover:bg-emerald-50/20 text-left transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                Download CSV Spreadsheet
              </h4>
              <p className="text-xs text-slate-500">
                Metrics and audits in tabular spreadsheet format
              </p>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
          </button>

          {/* 4. Copy Markdown */}
          <button
            onClick={handleCopyMarkdown}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200/80 hover:border-purple-500 hover:bg-purple-50/20 text-left transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {copiedMd ? (
                <Check className="w-5 h-5 text-emerald-600" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                {copiedMd ? 'Copied to Clipboard!' : 'Copy Markdown Summary'}
              </h4>
              <p className="text-xs text-slate-500">
                Ready to paste into GitHub issues, Slack, or Notion
              </p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
