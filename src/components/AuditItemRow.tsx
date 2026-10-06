import React from 'react';
import { CheckCircle2, XCircle, Play, AlertTriangle } from 'lucide-react';
import type { AuditItem } from '../types/pagespeed';

interface AuditItemRowProps {
  item: AuditItem;
  onOpenTutorial: (tutorialKey: string) => void;
}

export const AuditItemRow: React.FC<AuditItemRowProps> = ({ item, onOpenTutorial }) => {
  const isPass = item.status === 'pass';
  const isFail = item.status === 'fail';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-4 sm:px-6 hover:bg-slate-50/70 transition-colors border-t border-slate-100 first:border-t-0 gap-3">
      {/* Left Column: Status Icon + Title + Tutorial Badge + Subtitle */}
      <div className="flex items-start gap-3.5 min-w-0 flex-1">
        {/* Left Circular Status Icon matching Image 2 */}
        <div className="mt-0.5 shrink-0">
          {isPass ? (
            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
            </div>
          ) : isFail ? (
            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <XCircle className="w-5 h-5 stroke-[2.2]" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
            </div>
          )}
        </div>

        {/* Text and Badges */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-800 text-sm sm:text-base">
              {item.title}
            </span>

            {/* Red / Coral "▶ Tutorial" Badge matching Image 2 */}
            <button
              onClick={() => onOpenTutorial(item.tutorialKey)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold text-[#ff4d26] bg-orange-50 hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-pointer"
              title="Click to view step-by-step fix guide"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Tutorial</span>
            </button>
          </div>

          {/* Subtitle matching Image 2 (e.g. "Check cache headers", "✓ Text compression (Gzip/Brotli) is enabled") */}
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span>{item.description}</span>
            {item.displayValue && (
              <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                {item.displayValue}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Right Column: Status Badge matching Image 2 */}
      <div className="shrink-0 self-end sm:self-center ml-9 sm:ml-0">
        {isPass ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50/90 border border-emerald-200/60 shadow-2xs">
            <span>✓ Pass</span>
          </span>
        ) : isFail ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200/60 shadow-2xs">
            <span>✗ Fail</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/60">
            <span>! Warning</span>
          </span>
        )}
      </div>
    </div>
  );
};
