import React from 'react';
import { Gauge, Key, History } from 'lucide-react';

interface HeaderProps {
  onOpenApiKeyModal: () => void;
  onOpenHistoryDrawer: () => void;
  hasApiKey: boolean;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApiKeyModal,
  onOpenHistoryDrawer,
  hasApiKey,
  historyCount,
}) => {
  return (
    <header className="pt-8 pb-6 text-center relative no-print">
      {/* Top action shortcuts */}
      <div className="max-w-5xl mx-auto px-4 flex justify-end items-center gap-3 mb-4">
        <button
          onClick={onOpenHistoryDrawer}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-full border border-slate-200/80 shadow-xs transition-colors"
          title="Recent Audits History"
        >
          <History className="w-3.5 h-3.5 text-slate-500" />
          <span>History</span>
          {historyCount > 0 && (
            <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-full">
              {historyCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenApiKeyModal}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
            hasApiKey
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
              : 'text-slate-600 bg-white border-slate-200/80 hover:bg-slate-100'
          }`}
          title="Configure Google PageSpeed API Key"
        >
          <Key className={`w-3.5 h-3.5 ${hasApiKey ? 'text-emerald-600' : 'text-slate-500'}`} />
          <span>{hasApiKey ? 'Custom API Key Active' : 'API Key'}</span>
        </button>
      </div>

      {/* Brand Pill matching Image 1 */}
      <div className="inline-flex items-center justify-center">
        <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff4d26] via-[#ff3366] to-[#ff2a5f] text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
            <Gauge className="w-4 h-4 text-white animate-pulse-subtle" />
          </div>
          <span className="font-bold text-base tracking-wide">Speed Test Tool</span>
        </div>
      </div>

      {/* Subtitle matching Image 1 */}
      <p className="mt-3.5 text-sm sm:text-base text-slate-600 font-normal max-w-xl mx-auto px-4">
        Analyze your website&apos;s performance using Google PageSpeed Insights API
      </p>
    </header>
  );
};
