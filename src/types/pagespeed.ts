export type DeviceStrategy = 'mobile' | 'desktop';

export type MetricStatus = 'good' | 'needs-improvement' | 'poor';

export interface CoreWebVitalMetric {
  id: string;
  name: string;
  shortName: string;
  value: string;
  numericValue: number;
  unit: string;
  status: MetricStatus;
  description: string;
  goodThreshold: string;
  poorThreshold: string;
}

export type AuditStatus = 'pass' | 'fail' | 'warning' | 'info';

export interface AuditItem {
  id: string;
  title: string;
  status: AuditStatus;
  description: string;
  displayValue?: string;
  details?: {
    items?: Array<Record<string, any>>;
    summary?: string;
  };
  tutorialKey: string;
}

export interface AuditCategory {
  id: string;
  title: string;
  iconName: 'database' | 'code' | 'file-code' | 'image' | 'server' | 'sparkles';
  items: AuditItem[];
  colorTheme: 'blue' | 'purple' | 'amber' | 'emerald' | 'cyan' | 'rose';
}

export interface CategoryScore {
  id: string;
  title: string;
  score: number; // 0 - 100
}

export interface PageSpeedResult {
  url: string;
  finalUrl: string;
  timestamp: string;
  cachedAt: string;
  isSimulated?: boolean;
  mobile: {
    score: number;
    categories: CategoryScore[];
    vitals: CoreWebVitalMetric[];
    auditCategories: AuditCategory[];
  };
  desktop: {
    score: number;
    categories: CategoryScore[];
    vitals: CoreWebVitalMetric[];
    auditCategories: AuditCategory[];
  };
}

export interface TutorialGuide {
  id: string;
  title: string;
  category: string;
  overview: string;
  whyItMatters: string;
  impact: 'High' | 'Medium' | 'Low';
  solutions: {
    platform: string; // 'WordPress' | 'Nginx' | 'Apache' | 'Cloudflare' | 'Next.js / Vite'
    instructions: string;
    code?: string;
    codeLanguage?: string;
  }[];
  learnMoreUrl: string;
}

export interface AuditHistoryEntry {
  id: string;
  url: string;
  timestamp: string;
  mobileScore: number;
  desktopScore: number;
}
