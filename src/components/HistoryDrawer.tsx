import React from 'react';
import { X, History, Trash2, ArrowUpRight, Smartphone, Monitor } from 'lucide-react';
import type { AuditHistoryEntry } from '../types/pagespeed';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: AuditHistoryEntry[];
  onSelectUrl: (url: string) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectUrl,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end no-print animate-fade-in">
      <div
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-600">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Audit History</h2>
              <p className="text-xs text-slate-500">{history.length} past runs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <History className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No past audits yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Audited websites will appear here for fast re-testing.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectUrl(item.url);
                  onClose();
                }}
                className="p-3 rounded-xl border border-slate-200/80 hover:border-orange-500 hover:bg-orange-50/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-orange-600 transition-colors truncate">
                    {item.url}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 shrink-0" />
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Smartphone className="w-3 h-3 text-blue-500" />
                      <strong
                        className={
                          item.mobileScore >= 90
                            ? 'text-emerald-600'
                            : item.mobileScore >= 50
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        }
                      >
                        {item.mobileScore}
                      </strong>
                    </span>

                    <span className="flex items-center gap-1 text-slate-600">
                      <Monitor className="w-3 h-3 text-purple-500" />
                      <strong
                        className={
                          item.desktopScore >= 90
                            ? 'text-emerald-600'
                            : item.desktopScore >= 50
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        }
                      >
                        {item.desktopScore}
                      </strong>
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    {new Date(item.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <button
              onClick={onClearHistory}
              className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
