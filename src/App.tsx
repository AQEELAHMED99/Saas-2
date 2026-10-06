import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Header,
} from './components/Header';
import { SearchBar } from './components/SearchBar';
import { DualScoreCards } from './components/DualScoreCards';
import { CoreWebVitalsCard } from './components/CoreWebVitalsCard';
import { AuditCategoryAccordion } from './components/AuditCategoryAccordion';
import { TutorialModal } from './components/TutorialModal';
import { ExportModal } from './components/ExportModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import {
  PageSpeedService,
  SCAXA_BENCHMARK,
} from './services/pagespeedService';
import type {
  DeviceStrategy,
  PageSpeedResult,
  AuditHistoryEntry,
} from './types/pagespeed';
import {
  Filter,
  Search,
  ExternalLink,
} from 'lucide-react';

const API_KEY_STORAGE = 'ps_custom_api_key';

export const App: React.FC = () => {
  // Main data states
  const [result, setResult] = useState<PageSpeedResult>(SCAXA_BENCHMARK);
  const [activeStrategy, setActiveStrategy] = useState<DeviceStrategy>('mobile');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');

  // Modals & Drawers
  const [activeTutorialKey, setActiveTutorialKey] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);

  // Settings & History
  const [apiKey, setApiKey] = useState<string>('');
  const [history, setHistory] = useState<AuditHistoryEntry[]>([]);

  // Audit list filter states
  const [auditFilter, setAuditFilter] = useState<'all' | 'fail' | 'pass'>('all');
  const [auditSearchQuery, setAuditSearchQuery] = useState<string>('');

  // Load API Key & History on mount
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem(API_KEY_STORAGE) || '';
      setApiKey(storedKey);
      setHistory(PageSpeedService.getHistory());
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Trigger celebration confetti on perfect score
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5520', '#10b981', '#3b82f6', '#8b5cf6'],
      });
    } catch {
      // ignore
    }
  };

  // Run Speed Test handler
  const handleTestSpeed = async (url: string, forceRefresh: boolean = false) => {
    setIsLoading(true);
    setLoadingStep('Initializing audit...');

    try {
      const res = await PageSpeedService.runAudit(url, {
        forceRefresh,
        apiKey,
        onProgress: (step) => setLoadingStep(step),
      });

      setResult(res);
      setHistory(PageSpeedService.getHistory());

      if (res.mobile.score === 100 && res.desktop.score === 100) {
        triggerConfetti();
      }
    } catch (err: any) {
      console.error('Audit failed:', err);
      alert('Could not complete the audit. Please verify the URL and your connection.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  // API Key saving
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    try {
      localStorage.setItem(API_KEY_STORAGE, key);
    } catch {
      // ignore
    }
  };

  // Clear history
  const handleClearHistory = () => {
    try {
      localStorage.removeItem('ps_history_log');
      setHistory([]);
    } catch {
      // ignore
    }
  };

  // Current active data set based on Mobile or Desktop strategy
  const activeDeviceData = activeStrategy === 'mobile' ? result.mobile : result.desktop;

  // Filter audit categories according to filter chip and search query
  const filteredAuditCategories = activeDeviceData.auditCategories
    .map((category) => {
      const filteredItems = category.items.filter((item) => {
        // Status filter
        if (auditFilter === 'fail' && item.status !== 'fail') return false;
        if (auditFilter === 'pass' && item.status !== 'pass') return false;

        // Search query
        if (auditSearchQuery.trim()) {
          const q = auditSearchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc) return false;
        }

        return true;
      });

      return {
        ...category,
        items: filteredItems,
      };
    })
    .filter((category) => category.items.length > 0);

  // Overall failed count for banner
  const totalFailedCount = activeDeviceData.auditCategories.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.status === 'fail').length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <div>
        {/* Header matching Image 1 top pill */}
        <Header
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          onOpenHistoryDrawer={() => setIsHistoryDrawerOpen(true)}
          hasApiKey={Boolean(apiKey)}
          historyCount={history.length}
        />

        {/* Search / Audit URL Bar matching Image 1 */}
        <SearchBar
          currentUrl={result.url}
          cachedAtText={result.cachedAt || 'Cached 0h ago'}
          isLoading={isLoading}
          loadingStep={loadingStep}
          onTestSpeed={handleTestSpeed}
        />

        {/* Results Presentation */}
        <main className="pb-16">
          {/* Dual Mobile & Desktop Score Cards matching Image 1 */}
          <DualScoreCards
            result={result}
            activeStrategy={activeStrategy}
            onSelectStrategy={setActiveStrategy}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />

          {/* Core Web Vitals Card matching Image 1 */}
          <CoreWebVitalsCard
            vitals={activeDeviceData.vitals}
            strategy={activeStrategy}
            onToggleStrategy={setActiveStrategy}
          />

          {/* Audits & Diagnostics Section matching Image 2 */}
          <section className="w-full max-w-4xl mx-auto px-4 mt-8">
            {/* Section Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Opportunities & Diagnostics</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {activeStrategy === 'mobile' ? 'Mobile' : 'Desktop'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed technical audits evaluated against Google Lighthouse standards
                </p>
              </div>

              {/* Filters toolbar */}
              <div className="flex flex-wrap items-center gap-2 no-print">
                {/* Search in audits */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search audits..."
                    value={auditSearchQuery}
                    onChange={(e) => setAuditSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 w-36 sm:w-44"
                  />
                </div>

                {/* Filter chips */}
                <div className="inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    onClick={() => setAuditFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      auditFilter === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setAuditFilter('fail')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                      auditFilter === 'fail'
                        ? 'bg-rose-500 text-white'
                        : 'text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <span>Fails</span>
                    {totalFailedCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold">
                        {totalFailedCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setAuditFilter('pass')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      auditFilter === 'pass'
                        ? 'bg-emerald-600 text-white'
                        : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    Passed
                  </button>
                </div>
              </div>
            </div>

            {/* Audit Categories Accordions matching Image 2 */}
            {filteredAuditCategories.length > 0 ? (
              filteredAuditCategories.map((category) => (
                <AuditCategoryAccordion
                  key={category.id}
                  category={category}
                  onOpenTutorial={(key) => setActiveTutorialKey(key)}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
                <Filter className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-semibold text-slate-700">No audits match your filters</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting your search query or reset filter to &quot;All&quot;.
                </p>
                <button
                  onClick={() => {
                    setAuditFilter('all');
                    setAuditSearchQuery('');
                  }}
                  className="mt-4 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 px-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Powered by Google PageSpeed Insights API v5 &amp; Lighthouse engine</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <a
              href="https://pagespeed.web.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 flex items-center gap-1 transition-colors"
            >
              <span>Google PageSpeed</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://web.dev/vitals/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 flex items-center gap-1 transition-colors"
            >
              <span>Core Web Vitals Guide</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Slide-over Modals & Drawers */}
      <TutorialModal
        tutorialKey={activeTutorialKey}
        onClose={() => setActiveTutorialKey(null)}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        result={result}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        history={history}
        onSelectUrl={(url) => handleTestSpeed(url, false)}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
};

export default App;
