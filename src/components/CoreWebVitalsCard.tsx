import React from 'react';
import { Gauge, Smartphone, Monitor } from 'lucide-react';
import type { CoreWebVitalMetric, DeviceStrategy } from '../types/pagespeed';

interface CoreWebVitalsCardProps {
  vitals: CoreWebVitalMetric[];
  strategy: DeviceStrategy;
  onToggleStrategy: (s: DeviceStrategy) => void;
}

export const CoreWebVitalsCard: React.FC<CoreWebVitalsCardProps> = ({
  vitals,
  strategy,
  onToggleStrategy,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80">
        {/* Header matching Image 1: Speedometer icon + "Core Web Vitals" */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Gauge className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
              Core Web Vitals
            </h2>
          </div>

          {/* Strategy switcher tab */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl self-start sm:self-auto no-print">
            <button
              onClick={() => onToggleStrategy('mobile')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                strategy === 'mobile'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Vitals</span>
            </button>
            <button
              onClick={() => onToggleStrategy('desktop')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                strategy === 'desktop'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop Vitals</span>
            </button>
          </div>
        </div>

        {/* 6 Metric Cards Grid matching Image 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {vitals.map((metric) => {
            // Status dot color
            let dotColor = 'bg-emerald-500 ring-emerald-500/20';
            if (metric.status === 'needs-improvement') {
              dotColor = 'bg-amber-500 ring-amber-500/20';
            } else if (metric.status === 'poor') {
              dotColor = 'bg-rose-500 ring-rose-500/20';
            }

            return (
              <div
                key={metric.id}
                className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/50 rounded-xl sm:rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Top line: Short Name + Status Dot */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {metric.shortName}
                  </span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ring-4 ${dotColor}`}
                    title={`Status: ${metric.status} (${metric.goodThreshold})`}
                  />
                </div>

                {/* Big Metric Value matching Image 1 */}
                <div className="my-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                    {metric.value}
                  </span>
                </div>

                {/* Full Description / Label */}
                <div className="mt-1">
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate group-hover:text-slate-700 transition-colors">
                    {metric.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Target: {metric.goodThreshold}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
