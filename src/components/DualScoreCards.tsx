import React from 'react';
import { Activity, Smartphone, Monitor, FileDown, CheckCircle2 } from 'lucide-react';
import { ScoreGauge } from './ScoreGauge';
import type { DeviceStrategy, PageSpeedResult } from '../types/pagespeed';

interface DualScoreCardsProps {
  result: PageSpeedResult;
  activeStrategy: DeviceStrategy;
  onSelectStrategy: (strategy: DeviceStrategy) => void;
  onOpenExportModal: () => void;
}

export const DualScoreCards: React.FC<DualScoreCardsProps> = ({
  result,
  activeStrategy,
  onSelectStrategy,
  onOpenExportModal,
}) => {
  const mobileScore = result.mobile.score;
  const desktopScore = result.desktop.score;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-6">
      {/* Top right Export Report button matching Image 1 */}
      <div className="flex justify-end mb-3.5 no-print">
        <button
          onClick={onOpenExportModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff4d26] to-[#f97316] hover:from-[#ea3b14] hover:to-[#ea580c] active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-sm shadow-orange-500/25 transition-all duration-200 cursor-pointer"
        >
          <FileDown className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Two Score Cards Grid matching Image 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Mobile Score Card */}
        <div
          onClick={() => onSelectStrategy('mobile')}
          className={`relative bg-white rounded-2xl p-6 shadow-sm border transition-all duration-200 cursor-pointer ${
            activeStrategy === 'mobile'
              ? 'border-blue-400 ring-2 ring-blue-500/10 shadow-md'
              : 'border-slate-200/80 hover:border-slate-300 hover:shadow'
          }`}
        >
          {activeStrategy === 'mobile' && (
            <div className="absolute top-3 right-3 text-blue-600 flex items-center gap-1 text-[11px] font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              <span>Active View</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              {/* Header Icon + Title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                  <Activity className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5">
                    Mobile Score
                    <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Performance on mobile devices
                  </p>
                </div>
              </div>

              {/* Lighthouse Category Mini Pills */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
                {result.mobile.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200/60"
                  >
                    <span>{cat.title}:</span>
                    <span className="font-bold text-slate-800">{cat.score}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Circular Gauge Meter matching Image 1 */}
            <div className="shrink-0 flex items-center justify-center">
              <ScoreGauge score={mobileScore} size={110} strokeWidth={9} />
            </div>
          </div>
        </div>

        {/* Desktop Score Card */}
        <div
          onClick={() => onSelectStrategy('desktop')}
          className={`relative bg-white rounded-2xl p-6 shadow-sm border transition-all duration-200 cursor-pointer ${
            activeStrategy === 'desktop'
              ? 'border-purple-400 ring-2 ring-purple-500/10 shadow-md'
              : 'border-slate-200/80 hover:border-slate-300 hover:shadow'
          }`}
        >
          {activeStrategy === 'desktop' && (
            <div className="absolute top-3 right-3 text-purple-600 flex items-center gap-1 text-[11px] font-semibold bg-purple-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              <span>Active View</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              {/* Header Icon + Title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                  <Activity className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5">
                    Desktop Score
                    <Monitor className="w-3.5 h-3.5 text-slate-400" />
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Performance on desktop devices
                  </p>
                </div>
              </div>

              {/* Lighthouse Category Mini Pills */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
                {result.desktop.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200/60"
                  >
                    <span>{cat.title}:</span>
                    <span className="font-bold text-slate-800">{cat.score}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Circular Gauge Meter matching Image 1 */}
            <div className="shrink-0 flex items-center justify-center">
              <ScoreGauge score={desktopScore} size={110} strokeWidth={9} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
