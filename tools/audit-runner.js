/**
 * Sprout Design System - Phase 1 Comprehensive Multi-Viewport Audit Runner
 * Opens all pages across viewports: 320px, 360px, 390px, 768px, 1280px.
 * Records actual measured results for horizontal overflow, axe violations, tap targets,
 * disclaimers, external requests, and subpath URL safety.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');

const PORT = 8092;
const siteDir = path.join(__dirname, '..', 'site');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

function createStaticServer() {
  return http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(siteDir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
}

const VIEWPORTS = [
  { name: 'Mobile Mini', width: 320, height: 568 },
  { name: 'Mobile Android Standard', width: 360, height: 740 },
  { name: 'Mobile iPhone Standard', width: 390, height: 844 },
  { name: 'Tablet / Foldable', width: 768, height: 1024 },
  { name: 'Desktop Large', width: 1280, height: 800 }
];

const PAGES_TO_TEST = [
  { name: 'Homepage', url: '/index.html' },
  { name: 'Onboarding Screen 1 (Welcome)', url: '/app/index.html?screen=1' },
  { name: 'Onboarding Screen 2 (Goals)', url: '/app/index.html?screen=2' },
  { name: 'Onboarding Screen 3 (Keep Ready EN)', url: '/app/index.html?screen=3&lang=en' },
  { name: 'Onboarding Screen 3 (Keep Ready HI)', url: '/app/index.html?screen=3&lang=hi' },
  { name: 'Onboarding Screen 4 (Verify Default)', url: '/app/index.html?screen=4&state=default' },
  { name: 'Onboarding Screen 4 (Wait State)', url: '/app/index.html?screen=4&state=loading' },
  { name: 'Onboarding Screen 4 (OTP Delay)', url: '/app/index.html?screen=4&state=otp%20delay' },
  { name: 'Onboarding Screen 4 (Error State)', url: '/app/index.html?screen=4&state=error' },
  { name: 'Onboarding Screen 4 (Offline State)', url: '/app/index.html?screen=4&state=offline' },
  { name: 'Onboarding Screen 4 (Success State)', url: '/app/index.html?screen=4&state=success' },
  { name: 'Onboarding Screen 5 (Amount Selector)', url: '/app/index.html?screen=5&state=default' },
  { name: 'Onboarding Screen 5 (Celebration)', url: '/app/index.html?screen=5&state=success' }
];

async function runAudit() {
  const server = createStaticServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Audit static server listening at http://localhost:${PORT}`);

  const browser = await chromium.launch({ headless: true });
  const auditReport = {
    timestamp: new Date().toISOString(),
    viewportsTested: VIEWPORTS,
    pageResults: [],
    externalRequestsDetected: [],
    absoluteUrlIssues: [],
    currencyFormatIssues: [],
    bannedWordOccurrences: [],
    tapTargetIssues: [],
    disclaimerAudits: []
  };

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Intercept requests to detect any external requests
    page.on('request', req => {
      const url = req.url();
      if (!url.startsWith(`http://localhost:${PORT}`)) {
        auditReport.externalRequestsDetected.push(url);
      }
    });

    for (const testPage of PAGES_TO_TEST) {
      console.log(`\nAuditing: ${testPage.name}...`);
      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`http://localhost:${PORT}${testPage.url}`, { waitUntil: 'networkidle' });

        // 1. Horizontal overflow check
        const overflow = await page.evaluate(() => {
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
          };
        });

        // 2. Disclaimer font size & viewport position
        const disclaimerMetrics = await page.evaluate(() => {
          const disclaimerEl = document.querySelector('.disclaimer-box, .disclaimer, .regulatory-disclaimer, .hero-disclaimer, [data-disclaimer]');
          if (!disclaimerEl) return null;
          const textEl = disclaimerEl.querySelector('.disclaimer-text') || disclaimerEl;
          const rect = textEl.getBoundingClientRect();
          const comp = window.getComputedStyle(textEl);
          return {
            fontSizePx: parseFloat(comp.fontSize),
            top: rect.top,
            bottom: rect.bottom,
            visibleInFirstViewport: rect.top < window.innerHeight && rect.bottom > 0,
            textSnippet: textEl.textContent.trim().substring(0, 90)
          };
        });

        // 3. Axe A11y
        const axeResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

        // 4. Tap target sizes for interactive elements (WCAG 2.1 AA 2.5.5 / 2.5.8 compliant)
        const tapTargets = await page.evaluate(() => {
          const interactives = Array.from(document.querySelectorAll('button, a, input, select, [role="button"], .interactive-target'));
          return interactives.map(el => {
            let targetEl = el;
            if (el.tagName.toLowerCase() === 'input' && (el.type === 'radio' || el.type === 'checkbox')) {
              const label = el.closest('label') || (el.id ? document.querySelector(`label[for="${el.id}"]`) : null);
              if (label) targetEl = label;
            }
            const rect = targetEl.getBoundingClientRect();
            const text = (targetEl.textContent || el.value || el.getAttribute('aria-label') || '').trim().substring(0, 30);
            return {
              tag: el.tagName.toLowerCase(),
              text,
              width: Math.round(rect.width * 10) / 10,
              height: Math.round(rect.height * 10) / 10,
              isUnder44: (rect.width < 44 || rect.height < 44) && rect.width > 0 && rect.height > 0
            };
          }).filter(t => t.isUnder44);
        });

        const resultEntry = {
          page: testPage.name,
          url: testPage.url,
          viewport: `${vp.width}x${vp.height} (${vp.name})`,
          overflow,
          disclaimerMetrics,
          axeA11yViolations: axeResults.violations.length,
          violationsList: axeResults.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description })),
          smallTapTargetsCount: tapTargets.length,
          smallTapTargets: tapTargets.slice(0, 5) // first 5 if any
        };

        auditReport.pageResults.push(resultEntry);
        console.log(`  [${vp.width}px] Overflow: ${overflow.hasHorizontalOverflow ? 'FAIL' : 'PASS'} | Axe: ${axeResults.violations.length} | Tap Target < 44px: ${tapTargets.length}`);
      }
    }

    // Now check for absolute URLs across files
    console.log('\nAuditing absolute URLs & currency formatting in source files...');
    function checkSourceFiles(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          checkSourceFiles(fullPath);
        } else if (/\.(html|js|css)$/.test(entry.name)) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          // Check for absolute path src="/..." or href="/..."
          const absMatches = content.matchAll(/(?:href|src|action)=["'](\/[^"'/][^"']*)["']/g);
          for (const m of absMatches) {
            auditReport.absoluteUrlIssues.push({
              file: path.relative(siteDir, fullPath),
              match: m[0],
              path: m[1]
            });
          }

          // Check for "Rs." or "Rs " or "Rs"
          const rsMatches = content.matchAll(/\b(Rs\.?|INR)\s*(\d+)/gi);
          for (const m of rsMatches) {
            auditReport.currencyFormatIssues.push({
              file: path.relative(siteDir, fullPath),
              found: m[0]
            });
          }
        }
      }
    }
    checkSourceFiles(siteDir);

  } finally {
    await browser.close();
    server.close();
  }

  const outJson = path.join(__dirname, '..', 'case-study', 'audit-raw-results.json');
  fs.writeFileSync(outJson, JSON.stringify(auditReport, null, 2), 'utf-8');
  console.log(`\nAudit finished! Raw results written to ${outJson}`);
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
