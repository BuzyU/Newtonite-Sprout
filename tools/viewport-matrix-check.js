/**
 * Sprout Design System - Multi-Viewport Regulatory & Ergonomics Matrix Checker
 * Re-measures disclaimer position, horizontal overflow, and tap targets for:
 * - Homepage
 * - Onboarding Screens 1, 2, 3, 4, 5
 * Across viewports:
 * - 320x568 (Mobile Mini / iPhone SE)
 * - 360x640 (Android Compact)
 * - 360x740 (Android Standard)
 * - 390x844 (iPhone Standard)
 * - 768x1024 (Tablet / iPad Mini)
 * - 1280x80 (Ultra-Short Desktop Viewport)
 * - 1280x800 (Standard Desktop)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 8118;
const siteDir = path.join(__dirname, '..', 'site');

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(siteDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.svg': 'image/svg+xml',
      '.png': 'image/png'
    }[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

const viewports = [
  { name: '320x568', width: 320, height: 568 },
  { name: '360x640', width: 360, height: 640 },
  { name: '360x740', width: 360, height: 740 },
  { name: '390x844', width: 390, height: 844 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1280x80', width: 1280, height: 80 },
  { name: '1280x800', width: 1280, height: 800 }
];

const testTargets = [
  { name: 'Homepage', path: '/index.html', isInvestment: true },
  { name: 'Screen 1 (Welcome)', path: '/app/index.html?screen=1', isInvestment: true },
  { name: 'Screen 2 (Intent)', path: '/app/index.html?screen=2', isInvestment: false },
  { name: 'Screen 3 (Checklist)', path: '/app/index.html?screen=3', isInvestment: false },
  { name: 'Screen 4 (Verification)', path: '/app/index.html?screen=4', isInvestment: false },
  { name: 'Screen 5 (First ₹100)', path: '/app/index.html?screen=5', isInvestment: true }
];

async function runMatrixAudit() {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('========================================================================================');
  console.log('Sprout Design System - Viewport Measurement Matrix (Real Headless Browser Audit)');
  console.log('========================================================================================\n');

  const rows = [];
  let anyFailure = false;

  for (const target of testTargets) {
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`http://localhost:${PORT}${target.path}`, { waitUntil: 'networkidle' });

      // If testing app screen, ensure active screen is settled
      if (target.path.includes('screen=')) {
        const screenNum = target.path.split('screen=')[1];
        await page.evaluate((num) => {
          if (window.switchScreen) window.switchScreen(parseInt(num, 10));
        }, screenNum);
      }

      const evalData = await page.evaluate((vpHeight) => {
        // 1. Horizontal Scroll Check
        const scrollW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        const hasOverflow = scrollW > clientW;

        // 2. Active Screen Scope
        const activeContainer = document.querySelector('.onboarding-screen.active') || document.body;

        // 3. Disclaimer Check
        const dBox = activeContainer.querySelector('.disclaimer-box, .disclaimer, [data-disclaimer]');
        let dTop = null;
        let dFontSize = null;
        let dInFirstViewport = false;

        if (dBox) {
          const r = dBox.getBoundingClientRect();
          dTop = Math.round(r.top * 10) / 10;
          const comp = window.getComputedStyle(dBox.querySelector('p, span') || dBox);
          dFontSize = parseFloat(comp.fontSize);
          // In first viewport: top is within visible viewport and bottom > 0
          dInFirstViewport = r.top < vpHeight && r.bottom > 0;
        }

        // 4. Tap Target Check (WCAG 2.5.5 / 2.5.8 >= 44x44)
        // In standard HTML accessibility, native radio/checkbox wrapped in label uses label bounding box
        const interactives = Array.from(activeContainer.querySelectorAll('button, a, input, select, [role="button"]'));
        const smallTargets = [];

        for (const el of interactives) {
          // Skip hidden elements or parent hidden
          if (el.offsetParent === null && window.getComputedStyle(el).position !== 'fixed') continue;

          let targetBox = el;
          if (el.tagName === 'INPUT' && (el.type === 'radio' || el.type === 'checkbox') && el.closest('label')) {
            targetBox = el.closest('label');
          }

          const rect = targetBox.getBoundingClientRect();
          const w = Math.round(rect.width * 10) / 10;
          const h = Math.round(rect.height * 10) / 10;

          if ((w < 44 || h < 44) && w > 0 && h > 0) {
            smallTargets.push({
              tag: el.tagName.toLowerCase(),
              text: (el.textContent || el.value || el.getAttribute('aria-label') || '').trim().slice(0, 16),
              w,
              h
            });
          }
        }

        return {
          hasOverflow,
          scrollW,
          clientW,
          dTop,
          dFontSize,
          dInFirstViewport,
          smallCount: smallTargets.length,
          smallTargets
        };
      }, vp.height);

      const overflowPass = !evalData.hasOverflow;
      const disclaimerPass = evalData.dInFirstViewport && (evalData.dFontSize >= 12);
      const tapPass = evalData.smallCount === 0;

      const overallPass = overflowPass && disclaimerPass && tapPass;
      if (!overallPass) anyFailure = true;

      rows.push({
        page: target.name,
        viewport: vp.name,
        overflow: overflowPass ? '0px (PASS)' : `FAIL (${evalData.scrollW - evalData.clientW}px)`,
        disclaimerTop: evalData.dTop !== null ? `${evalData.dTop}px` : 'N/A',
        disclaimerFont: evalData.dFontSize ? `${evalData.dFontSize}px` : 'N/A',
        disclaimer1stVp: disclaimerPass ? 'YES (PASS)' : 'FAIL',
        tapTargets: tapPass ? '0 (<44px)' : `${evalData.smallCount} FAIL`,
        status: overallPass ? 'PASS' : 'FAIL'
      });
    }
  }

  await browser.close();
  server.close();

  // Print results table
  console.log('| Page / Screen | Viewport | Horizontal Scroll | Disclaimer Top | Font Size | In 1st Viewport? | Tap < 44px | Overall Status |');
  console.log('| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |');
  for (const r of rows) {
    console.log(`| ${r.page} | ${r.viewport} | ${r.overflow} | ${r.disclaimerTop} | ${r.disclaimerFont} | ${r.disclaimer1stVp} | ${r.tapTargets} | **${r.status}** |`);
  }

  console.log('\n--- Viewport Audit Summary ---');
  console.log(`Total Matrix Configurations Tested: ${rows.length}`);
  const passCount = rows.filter(r => r.status === 'PASS').length;
  console.log(`Passed: ${passCount} / ${rows.length}`);

  if (anyFailure) {
    console.error('\nViewport matrix audit FAILED. Please review the failures above.');
    process.exit(1);
  } else {
    console.log('\nViewport matrix audit PASSED: All 42 viewport configurations meet strict compliance & UX standards.');
    process.exit(0);
  }
}

runMatrixAudit().catch(err => {
  console.error('Audit runner encountered fatal error:', err);
  process.exit(1);
});
