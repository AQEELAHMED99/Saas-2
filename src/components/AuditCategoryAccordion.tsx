import React, { useState } from 'react';
import {
  ChevronDown,
  Database,
  FileCode,
  Code,
  Image as ImageIcon,
  Server,
  Sparkles,
} from 'lucide-react';
import type { AuditCategory } from '../types/pagespeed';
import { AuditItemRow } from './AuditItemRow';

interface AuditCategoryAccordionProps {
  category: AuditCategory;
  defaultExpanded?: boolean;
  onOpenTutorial: (tutorialKey: string) => void;
}

export const AuditCategoryAccordion: React.FC<AuditCategoryAccordionProps> = ({
  category,
  defaultExpanded = true,
  onOpenTutorial,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Passed count calculations
  const totalCount = category.items.length;
  const passedCount = category.items.filter((i) => i.status === 'pass').length;
  const passPercentage = totalCount > 0 ? (passedCount / totalCount) * 100 : 100;
  const isAllPassed = passedCount === totalCount;

  // Icon mapping
  const renderIcon = () => {
    switch (category.iconName) {
      case 'database':
        return <Database className="w-5 h-5 text-blue-500" />;
      case 'file-code':
        return <FileCode className="w-5 h-5 text-purple-500" />;
      case 'code':
        return <Code className="w-5 h-5 text-amber-500" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-emerald-500" />;
      case 'server':
        return <Server className="w-5 h-5 text-cyan-500" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-rose-500" />;
      default:
        return <FileCode className="w-5 h-5 text-slate-500" />;
    }
  };

  // Icon container theme
  const getIconBg = () => {
    switch (category.colorTheme) {
      case 'blue':
        return 'bg-blue-50';
      case 'purple':
        return 'bg-purple-50';
      case 'amber':
        return 'bg-amber-50';
      case 'emerald':
        return 'bg-emerald-50';
      case 'cyan':
        return 'bg-cyan-50';
      case 'rose':
        return 'bg-rose-50';
      default:
        return 'bg-slate-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 mb-4 overflow-hidden transition-all duration-200">
      {/* Header Button matching Image 2 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50/50 transition-colors cursor-pointer select-none"
      >
        {/* Category Icon and Title */}
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl ${getIconBg()} flex items-center justify-center shrink-0`}
          >
            {renderIcon()}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
            {category.title}
          </h3>
        </div>

        {/* Right side: "X/Y passed" + Mini progress bar + Chevron matching Image 2 */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="text-xs sm:text-sm font-semibold text-slate-600">
            {passedCount}/{totalCount} passed
          </span>

          {/* Mini progress bar matching Image 2 */}
          <div className="w-16 sm:w-20 h-2 bg-slate-100 rounded-full overflow-hidden hidden xs:block">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isAllPassed
                  ? 'bg-emerald-500'
                  : passPercentage >= 50
                  ? 'bg-orange-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${passPercentage}%` }}
            />
          </div>

          {/* Accordion Chevron */}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isExpanded ? 'transform rotate-180 text-slate-600' : ''
            }`}
          />
        </div>
      </button>

      {/* Accordion Body */}
      {isExpanded && (
        <div className="border-t border-slate-100">
          {category.items.map((item) => (
            <AuditItemRow
              key={item.id}
              item={item}
              onOpenTutorial={onOpenTutorial}
            />
          ))}
        </div>
      )}
    </div>
  );
};
