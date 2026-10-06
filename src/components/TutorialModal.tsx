import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Lightbulb, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { TUTORIALS } from '../data/tutorialsData';
import type { TutorialGuide } from '../types/pagespeed';

interface TutorialModalProps {
  tutorialKey: string | null;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ tutorialKey, onClose }) => {
  if (!tutorialKey) return null;

  const tutorial: TutorialGuide | undefined = TUTORIALS[tutorialKey] || {
    id: tutorialKey,
    title: 'Optimization Recommendation',
    category: 'Performance Audit',
    overview: 'This audit evaluates whether this resource or configuration adheres to Google Lighthouse web performance standards.',
    whyItMatters: 'Resolving this improves your Google PageSpeed score and optimizes real-world user metrics (Core Web Vitals).',
    impact: 'Medium',
    solutions: [
      {
        platform: 'General Solution',
        instructions: 'Inspect the resource in Chrome DevTools Network and Performance tabs to analyze render delays and cache headers.',
      },
    ],
    learnMoreUrl: 'https://web.dev/fast/',
  };

  const [activePlatformIndex, setActivePlatformIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeSolution = tutorial.solutions[activePlatformIndex] || tutorial.solutions[0];

  const handleCopy = (codeText?: string) => {
    if (!codeText) return;
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 no-print animate-fade-in">
      <div
        className="relative bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/60">
                {tutorial.category}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  tutorial.impact === 'High'
                    ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                    : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                }`}
              >
                {tutorial.impact} Impact
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {tutorial.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              What this audit checks
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/50">
              {tutorial.overview}
            </p>
          </div>

          {/* Why it Matters */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />
              Why it matters for PageSpeed
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {tutorial.whyItMatters}
            </p>
          </div>

          {/* Platform Tabs & Solutions */}
          {tutorial.solutions && tutorial.solutions.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                How to fix (Choose your platform)
              </h3>

              {/* Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-3 border-b border-slate-100 pb-2">
                {tutorial.solutions.map((sol, idx) => (
                  <button
                    key={sol.platform}
                    onClick={() => setActivePlatformIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      activePlatformIndex === idx
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sol.platform}
                  </button>
                ))}
              </div>

              {/* Instructions */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80">
                <p className="text-xs sm:text-sm text-slate-700 font-medium whitespace-pre-line leading-relaxed mb-3">
                  {activeSolution.instructions}
                </p>

                {/* Code Snippet Box */}
                {activeSolution.code && (
                  <div className="relative rounded-lg bg-slate-900 text-slate-100 overflow-hidden text-xs">
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-800/80 border-b border-slate-700/60 text-slate-400 font-mono text-[11px]">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-orange-400" />
                        {activeSolution.codeLanguage || 'config'}
                      </span>
                      <button
                        onClick={() => handleCopy(activeSolution.code)}
                        className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-slate-300"
                        title="Copy configuration snippet"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-sans">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="font-sans">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3.5 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed text-emerald-300 selection:bg-slate-700">
                      <code>{activeSolution.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <a
            href={tutorial.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            <span>Official Google web.dev documentation</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
