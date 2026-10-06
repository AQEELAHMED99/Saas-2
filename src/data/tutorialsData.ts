import type { TutorialGuide } from '../types/pagespeed';

export const TUTORIALS: Record<string, TutorialGuide> = {
  'cache-headers': {
    id: 'cache-headers',
    title: 'Configure Cache for Website',
    category: 'Caching & Compression',
    overview: 'A long cache lifetime can speed up repeat visits to your page by storing static files in browser memory instead of refetching them across the network.',
    whyItMatters: 'Assets with HTTP Cache-Control headers can be cached for months or up to 1 year (31536000s), saving bandwidth, reducing server load, and giving instant page loads on repeat visits.',
    impact: 'High',
    learnMoreUrl: 'https://web.dev/uses-long-cache-ttl/',
    solutions: [
      {
        platform: 'Nginx',
        instructions: 'Add cache-control headers for static assets in your nginx server block:',
        codeLanguage: 'nginx',
        code: `# Enable browser caching for static assets
location ~* \\.(jpg|jpeg|png|gif|ico|css|js|webp|avif|woff2|woff|ttf|svg)$ {
    expires 365d;
    add_header Cache-Control "public, max-age=31536000, immutable";
    access_log off;
}`,
      },
      {
        platform: 'Apache (.htaccess)',
        instructions: 'Leverage mod_expires and mod_headers in your root .htaccess file:',
        codeLanguage: 'apache',
        code: `<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>`,
      },
      {
        platform: 'Cloudflare',
        instructions: '1. In Cloudflare Dashboard, go to Rules > Configuration Rules.\n2. Add a rule for your static files path (/assets/* or /wp-content/*).\n3. Set "Browser Cache TTL" to 1 year and "Edge Cache TTL" to 1 month.',
      },
      {
        platform: 'WordPress',
        instructions: '1. Install WP Rocket, LiteSpeed Cache, or W3 Total Cache.\n2. Enable "Browser Caching" in the settings.\n3. Verify cache headers via curl -I https://yoursite.com/style.css.',
      },
    ],
  },

  'compression': {
    id: 'compression',
    title: 'Enable Gzip/Brotli Compression',
    category: 'Caching & Compression',
    overview: 'Text-based resources (HTML, CSS, JS, SVG, JSON) should be served with compression (Brotli or Gzip) to minimize total network transfer bytes.',
    whyItMatters: 'Compression typically reduces transfer size by 60% to 85%, speeding up downloads on cellular and broadband connections.',
    impact: 'High',
    learnMoreUrl: 'https://web.dev/uses-text-compression/',
    solutions: [
      {
        platform: 'Nginx',
        instructions: 'Enable Gzip and Brotli modules in your nginx.conf http block:',
        codeLanguage: 'nginx',
        code: `# Gzip Compression
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

# Brotli (if ngx_brotli module is installed)
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;`,
      },
      {
        platform: 'Apache (.htaccess)',
        instructions: 'Add mod_deflate rules in your root .htaccess file:',
        codeLanguage: 'apache',
        code: `<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript
    AddOutputFilterByType DEFLATE application/javascript application/x-javascript application/json
    AddOutputFilterByType DEFLATE application/xml image/svg+xml font/opentype
</IfModule>`,
      },
      {
        platform: 'Cloudflare',
        instructions: 'In Cloudflare Dashboard > Speed > Optimization, toggle "Brotli Compression" ON. Cloudflare will automatically compress text assets with modern Brotli.',
      },
    ],
  },

  'minify-css': {
    id: 'minify-css',
    title: 'Minify/Combine CSS Files',
    category: 'CSS Optimization',
    overview: 'Minifying CSS files can reduce payload sizes and script parse time by stripping whitespace, comments, and redundant formatting.',
    whyItMatters: 'Every kilobyte of CSS blocks the initial page render. Minifying accelerates First Contentful Paint (FCP).',
    impact: 'Medium',
    learnMoreUrl: 'https://web.dev/unminified-css/',
    solutions: [
      {
        platform: 'Vite / Modern JS',
        instructions: 'Vite automatically minifies CSS using esbuild by default in production build. Ensure your vite.config.ts has build.minify enabled:',
        codeLanguage: 'typescript',
        code: `// vite.config.ts
export default defineConfig({
  build: {
    cssMinify: 'esbuild', // or 'lightningcss' for ultra-fast CSS minification
    minify: 'esbuild',
  },
});`,
      },
      {
        platform: 'WordPress',
        instructions: '1. Install WP Rocket or Autoptimize.\n2. Navigate to File Optimization > CSS Files.\n3. Check "Minify CSS files" and "Combine CSS files" (if not using HTTP/2 multiplexing).',
      },
    ],
  },

  'unused-css': {
    id: 'unused-css',
    title: 'Remove Unused CSS',
    category: 'CSS Optimization',
    overview: 'Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease unnecessary bytes consumed by network activity.',
    whyItMatters: 'Browsers parse and evaluate all CSS before rendering the screen. Unused CSS delays the Largest Contentful Paint (LCP).',
    impact: 'High',
    learnMoreUrl: 'https://web.dev/unused-css-rules/',
    solutions: [
      {
        platform: 'Tailwind CSS',
        instructions: 'Ensure Tailwind content glob covers all template files so PurgeCSS strips every unused class automatically during production build:',
        codeLanguage: 'javascript',
        code: `// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}",
  ],
  // ...
};`,
      },
      {
        platform: 'WordPress',
        instructions: '1. In WP Rocket, enable "Remove Unused CSS" (RUCSS) under the File Optimization tab.\n2. LiteSpeed Cache also has a "Generate Critical CSS" and "Remove Unused CSS" option.',
      },
    ],
  },

  'render-blocking-css': {
    id: 'render-blocking-css',
    title: 'Reduce Render-Blocking CSS',
    category: 'CSS Optimization',
    overview: 'Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.',
    whyItMatters: 'Render-blocking CSS directly inflates First Contentful Paint (FCP) and Largest Contentful Paint (LCP).',
    impact: 'High',
    learnMoreUrl: 'https://web.dev/render-blocking-resources/',
    solutions: [
      {
        platform: 'HTML / Web',
        instructions: 'Preload the stylesheet or load non-critical stylesheets asynchronously using media print trick:',
        codeLanguage: 'html',
        code: `<!-- 1. Preload critical stylesheet -->
<link rel="preload" href="/styles/main.css" as="style">

<!-- 2. Asynchronous non-critical CSS loading -->
<link rel="stylesheet" href="/styles/deferred.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="/styles/deferred.css"></noscript>`,
      },
      {
        platform: 'WordPress',
        instructions: '1. Use WP Rocket: Settings > File Optimization > "Optimize CSS Delivery".\n2. This inlines critical above-the-fold CSS and asynchronously loads the rest.',
      },
    ],
  },

  'minify-js': {
    id: 'minify-js',
    title: 'Minify/Combine JavaScript Files',
    category: 'JavaScript Optimization',
    overview: 'Minifying JavaScript files reduces download sizes and script execution time.',
    whyItMatters: 'Smaller JavaScript bundles reduce parsing overhead on mobile CPUs with limited single-core performance.',
    impact: 'Medium',
    learnMoreUrl: 'https://web.dev/unminified-javascript/',
    solutions: [
      {
        platform: 'Vite / Rollup / Webpack',
        instructions: 'Modern bundlers use Terser or esbuild to minify production bundles automatically:',
        codeLanguage: 'typescript',
        code: `// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});`,
      },
      {
        platform: 'WordPress',
        instructions: 'In WP Rocket or Autoptimize, check "Minify JavaScript files" and "Load JavaScript deferred".',
      },
    ],
  },

  'unused-javascript': {
    id: 'unused-javascript',
    title: 'Eliminate Unused JavaScript',
    category: 'JavaScript Optimization',
    overview: 'Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity.',
    whyItMatters: 'High JS payloads delay Total Blocking Time (TBT) and Time to Interactive (TTI).',
    impact: 'High',
    learnMoreUrl: 'https://web.dev/unused-javascript/',
    solutions: [
      {
        platform: 'Next.js / React',
        instructions: 'Use dynamic imports (code splitting) for heavy components or modals not needed on page load:',
        codeLanguage: 'typescript',
        code: `import dynamic from 'next/dynamic';

// Heavy chart or rich text editor loaded only when needed
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});`,
      },
      {
        platform: 'Modern HTML',
        instructions: 'Add defer or async attributes to non-critical third-party scripts (e.g. analytics, chat widgets):',
        codeLanguage: 'html',
        code: `<script src="https://example.com/analytics.js" defer></script>`,
      },
    ],
  },

  'long-tasks': {
    id: 'long-tasks',
    title: 'Avoid Long Main-Thread Tasks',
    category: 'JavaScript Optimization',
    overview: 'Long tasks monopolize the browser main thread for 50 milliseconds or longer, freezing user interactions.',
    whyItMatters: 'Long tasks cause poor Interaction to Next Paint (INP) and high Total Blocking Time (TBT). Users perceive the page as lagging or unresponsive.',
    impact: 'High',
    learnMoreUrl: 'https://web.dev/long-tasks-devtools/',
    solutions: [
      {
        platform: 'JavaScript',
        instructions: 'Yield execution to the main thread using scheduler.yield() or setTimeout:',
        codeLanguage: 'javascript',
        code: `// Modern yielding pattern
async function processLargeList(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    
    // Yield every 50 items so browser can respond to user clicks & layout
    if (i % 50 === 0) {
      if ('scheduler' in window && 'yield' in window.scheduler) {
        await window.scheduler.yield();
      } else {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
  }
}`,
      },
    ],
  },

  'next-gen-images': {
    id: 'next-gen-images',
    title: 'Serve Images in Next-Gen Formats',
    category: 'Image & Media Optimization',
    overview: 'Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption.',
    whyItMatters: 'WebP is ~30% smaller than JPEG, and AVIF is ~50% smaller. This dramatically speeds up Largest Contentful Paint (LCP).',
    impact: 'High',
    learnMoreUrl: 'https://web.dev/uses-webp-images/',
    solutions: [
      {
        platform: 'HTML <picture> Tag',
        instructions: 'Provide AVIF and WebP with fallback to JPG/PNG for older browsers:',
        codeLanguage: 'html',
        code: `<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero banner" width="1200" height="600" fetchpriority="high">
</picture>`,
      },
      {
        platform: 'Next.js',
        instructions: 'Next.js Image component automatically converts images to AVIF and WebP on the fly:',
        codeLanguage: 'typescript',
        code: `// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};`,
      },
      {
        platform: 'WordPress',
        instructions: 'Install plugins like "Converter for Media", "Smush", or "ShortPixel" to automatically convert all media library uploads to WebP/AVIF.',
      },
    ],
  },

  'image-sizing': {
    id: 'image-sizing',
    title: 'Properly Size Images',
    category: 'Image & Media Optimization',
    overview: 'Serve images that are appropriately-sized to save cellular data and improve load time.',
    whyItMatters: 'Downloading a 4000x3000px image to render in a 400x300px mobile box wastes 90% of bandwidth and RAM.',
    impact: 'Medium',
    learnMoreUrl: 'https://web.dev/uses-responsive-images/',
    solutions: [
      {
        platform: 'Responsive HTML',
        instructions: 'Use srcset and sizes attributes so the browser selects the optimal resolution for the device:',
        codeLanguage: 'html',
        code: `<img 
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w" 
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px" 
  src="photo-800.jpg" 
  alt="Sample description"
  width="800" 
  height="600" 
  loading="lazy">`,
      },
    ],
  },

  'defer-images': {
    id: 'defer-images',
    title: 'Defer Offscreen Images (Lazy Loading)',
    category: 'Image & Media Optimization',
    overview: 'Defer loading images that are below the fold until the user scrolls near them.',
    whyItMatters: 'Reduces initial page payload and frees up bandwidth for critical above-the-fold assets.',
    impact: 'Medium',
    learnMoreUrl: 'https://web.dev/offscreen-images/',
    solutions: [
      {
        platform: 'Native HTML',
        instructions: 'Add loading="lazy" to all images below the fold (do NOT add lazy loading to your LCP hero image):',
        codeLanguage: 'html',
        code: `<!-- Critical hero image: load eagerly -->
<img src="hero.webp" fetchpriority="high" alt="Hero">

<!-- Below the fold: lazy load -->
<img src="footer-graphic.webp" loading="lazy" alt="Footer graphic">`,
      },
    ],
  },

  'ttfb-server': {
    id: 'ttfb-server',
    title: 'Reduce Initial Server Response Time (TTFB)',
    category: 'Server, Security & Network',
    overview: 'Time to First Byte measures the duration between the browser requesting a page and when the first byte of information arrives from the server.',
    whyItMatters: 'A slow server response time (>800ms) bottlenecks everything downstream. Good TTFB should be under 200ms.',
    impact: 'High',
    learnMoreUrl: 'https://web.dev/time-to-first-byte/',
    solutions: [
      {
        platform: 'Edge CDN / Cloudflare',
        instructions: '1. Use an Edge CDN (Cloudflare APO, Fastly, CloudFront).\n2. Cache HTML at the edge so repeat requests don\'t hit your origin server.\n3. Enable Cloudflare "Cache Everything" Page Rule or Cache Reserve.',
      },
      {
        platform: 'Backend / Database',
        instructions: '1. Enable Redis / Memcached object caching for database queries.\n2. Upgrade PHP to 8.2+ with OPcache enabled.\n3. Optimize slow SQL queries and missing indexes.',
      },
    ],
  },

  'dom-size': {
    id: 'dom-size',
    title: 'Avoid an Excessive DOM Size',
    category: 'DOM, SEO & Accessibility Diagnostics',
    overview: 'A large DOM tree (>1,400 nodes) with deep nesting (>32 levels) will slow down style calculations, reflows, and memory usage.',
    whyItMatters: 'High DOM node count increases memory usage, slows down user scroll performance, and delays paint operations.',
    impact: 'Medium',
    learnMoreUrl: 'https://web.dev/dom-size/',
    solutions: [
      {
        platform: 'Modern Frontend',
        instructions: 'Virtualize long lists and paginate tables rather than rendering thousands of nodes at once:',
        codeLanguage: 'typescript',
        code: `// Use TanStack Virtual / react-window for long lists
import { useVirtualizer } from '@tanstack/react-virtual';

// Only items currently in view will be rendered in DOM!`,
      },
      {
        platform: 'WordPress / Page Builders',
        instructions: 'Elementor / Divi can create redundant wrapper <div> containers. Enable "Optimized DOM Output" in Elementor Experiments.',
      },
    ],
  },
};
