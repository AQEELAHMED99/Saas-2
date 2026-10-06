import React, { useState } from 'react';
import { Globe, Zap, RotateCw, Loader2 } from 'lucide-react';

interface SearchBarProps {
  currentUrl: string;
  cachedAtText?: string;
  isLoading: boolean;
  loadingStep?: string;
  onTestSpeed: (url: string, forceRefresh: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  currentUrl,
  cachedAtText = 'Cached 0h ago',
  isLoading,
  loadingStep,
  onTestSpeed,
}) => {
  const [urlInput, setUrlInput] = useState(currentUrl || 'https://scaxa.ae');

  const handleSubmit = (e: React.FormEvent, forceRefresh: boolean = false) => {
    e.preventDefault();
    if (!urlInput.trim() || isLoading) return;
    onTestSpeed(urlInput.trim(), forceRefresh);
  };

  const samplePresets = [
    { label: 'scaxa.ae', url: 'https://scaxa.ae' },
    { label: 'apple.com', url: 'https://apple.com' },
    { label: 'stripe.com', url: 'https://stripe.com' },
    { label: 'github.com', url: 'https://github.com' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8 no-print">
      {/* Search Bar Card matching Image 1 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-slate-200/80 transition-shadow hover:shadow-md">
        <form
          onSubmit={(e) => handleSubmit(e, false)}
          className="flex flex-col md:flex-row items-stretch md:items-center gap-3"
        >
          {/* Input field with Globe */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-slate-200/60 focus-within:border-orange-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/10 transition-all">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                <Globe className="w-4 h-4 text-slate-500" />
              </div>

              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                disabled={isLoading}
                className="w-full bg-transparent text-slate-800 text-sm sm:text-base font-medium placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Sub-label matching Image 1: "Cached 0h ago" */}
            <div className="flex items-center justify-between px-3 pt-1.5">
              <span className="text-[11px] text-slate-500 font-medium">
                {isLoading && loadingStep ? (
                  <span className="text-orange-600 flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    {loadingStep}
                  </span>
                ) : (
                  cachedAtText
                )}
              </span>

              {/* Sample Quick-Picks on desktop */}
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500">
                <span>Try:</span>
                {samplePresets.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => {
                      setUrlInput(preset.url);
                      onTestSpeed(preset.url, false);
                    }}
                    className="hover:text-orange-600 hover:underline px-1 py-0.5 rounded transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons matching Image 1 */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            {/* Primary Orange Button: Test Speed */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff4d26] to-[#f97316] hover:from-[#ea3b14] hover:to-[#ea580c] active:scale-98 text-white font-semibold text-sm shadow-sm shadow-orange-500/30 hover:shadow-md transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 fill-white" />
              )}
              <span>Test Speed</span>
            </button>

            {/* Secondary Green Button: Re-test */}
            <button
              type="button"
              disabled={isLoading}
              onClick={(e) => handleSubmit(e, true)}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00a86b] hover:bg-[#00925d] active:scale-98 text-white font-semibold text-sm shadow-sm shadow-emerald-500/20 hover:shadow-md transition-all duration-200 disabled:opacity-60 cursor-pointer"
              title="Force re-test without using cached results"
            >
              <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Re-test</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
