# ⚡ Speed Test Tool - Google PageSpeed Insights Audit

A modern, high-performance web auditing application inspired by Google PageSpeed Insights and Lighthouse. Built with React, TypeScript, and Tailwind CSS.

![Speed Test Tool](https://img.shields.io/badge/Google_PageSpeed-API_v5-orange?style=flat-square&logo=google)
![Lighthouse](https://img.shields.io/badge/Lighthouse-12.0-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-teal?style=flat-square&logo=tailwindcss)

---

## ✨ Features

- **🎯 Exact Visual Design Match**:
  - Top gradient pill badge **"Speed Test Tool"** with speedometer icon.
  - Subtitle: *"Analyze your website's performance using Google PageSpeed Insights API"*.
  - Search Card with Globe icon, URL field, dynamic cache indicator (*"Cached 0h ago"*), **⚡ Test Speed** (orange button) and **🔄 Re-test** (emerald button).
  - Side-by-side **Mobile Score** and **Desktop Score** cards with pulse wave icons, category score badges, and animated radial circular gauges.
  - Comprehensive **Core Web Vitals** card with status indicators:
    - **LCP** (Largest Contentful Paint)
    - **FCP** (First Contentful Paint)
    - **CLS** (Cumulative Layout Shift)
    - **TBT** (Total Blocking Time)
    - **TTI** (Time to Interactive)
    - **SI** (Speed Index)
    - **INP** (Interaction to Next Paint)

- **📋 Audit Accordions & "▶ Tutorial" Guides**:
  - Detailed accordions with pass/fail metrics, category progress bars (*"1/2 passed"*, *"2/3 passed"*), and expand/collapse animation:
    - **Caching & Compression**
    - **CSS Optimization**
    - **JavaScript Optimization**
    - **Image & Media Optimization**
    - **Server, Security & Network Performance**
    - **DOM, SEO & Accessibility Diagnostics**
  - Interactive **"▶ Tutorial"** slide-over drawers with step-by-step solutions for:
    - **WordPress** (WP Rocket, LiteSpeed, Autoptimize)
    - **Nginx** (nginx.conf directives with 1-click copy)
    - **Apache** (.htaccess directives)
    - **Cloudflare** (Page Rules, Cache Reserve, Polish)
    - **Next.js / Vite / React** (dynamic imports, code splitting)

- **🌐 Google PageSpeed Insights API v5 Integration**:
  - Queries Google's official PageSpeed API endpoint directly.
  - Optional custom API Key configuration with local storage persistence to avoid public rate-limits.
  - Built-in heuristic fallback engine ensuring seamless offline and rate-limit resilience.
  - Pre-calibrated benchmark for `https://scaxa.ae` matching the reference sample.

- **📄 Export & Sharing**:
  - **Print / Save as PDF**: Print-ready styled document layout.
  - **Download JSON**: Full structured metrics and Lighthouse audit data.
  - **Download CSV**: Tabular breakdown of scores, vitals, and audits.
  - **Copy Markdown**: Formatted summary ready for Slack, GitHub, or Notion.

- **📜 Audit History**:
  - Tracks previous runs with mobile and desktop score indicators and one-click re-testing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

The application runs at:
```
http://127.0.0.1:5173/
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript (Strict mode & `verbatimModuleSyntax`)
- **Styling**: Tailwind CSS + Custom CSS Print Stylesheet
- **Icons**: Lucide React
- **Animations**: Canvas Confetti + Custom SVG Stroke Dashoffset
