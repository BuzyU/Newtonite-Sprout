/**
 * Sprout Design System - Headless Screenshot Generator
 * Uses Playwright to render and capture high-resolution PNG screenshots of every screen and state.
 * Saves output to /screens directory.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 8091;
const prototypeDir = path.join(__dirname, '..', 'prototype');
const screensDir = path.join(__dirname, '..', 'screens');

if (!fs.existsSync(screensDir)) {
  fs.mkdirSync(screensDir, { recursive: true });
}

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
    const filePath = path.join(prototypeDir, reqPath);

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

async function captureScreenshots() {
  const server = createStaticServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Screenshot server listening at http://localhost:${PORT}`);

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ deviceScaleFactor: 2 });

    // 1. Homepage Mobile (360x740)
    console.log('Capturing: Homepage Mobile (360px)...');
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screensDir, 'homepage-mobile-360.png'), fullPage: false });
    await page.screenshot({ path: path.join(screensDir, 'homepage-mobile-full.png'), fullPage: true });

    // 2. Homepage Desktop (1280x800)
    console.log('Capturing: Homepage Desktop (1280px)...');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screensDir, 'homepage-desktop-1280.png'), fullPage: false });
    await page.screenshot({ path: path.join(screensDir, 'homepage-desktop-full.png'), fullPage: true });

    // 3. Simulator Full Overview
    console.log('Capturing: Onboarding Simulator Desktop Overview...');
    await page.setViewportSize({ width: 1200, height: 920 });
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=1`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screensDir, 'app-simulator-overview.png'), fullPage: false });

    // Helper to capture phone frame element specifically
    async function capturePhoneFrame(filename) {
      const phoneEl = await page.$('.phone-frame');
      if (phoneEl) {
        await phoneEl.screenshot({ path: path.join(screensDir, filename) });
      }
    }

    // 4. App Screen 1: Welcome
    console.log('Capturing: Screen 1 Welcome...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=1`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-1-welcome.png');

    // 5. App Screen 2: Goals
    console.log('Capturing: Screen 2 Goals...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=2`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-2-goals.png');

    // 6. App Screen 3: Keep Ready (English)
    console.log('Capturing: Screen 3 Keep Ready (English)...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=3&lang=en`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-3-keep-ready-en.png');

    // 7. App Screen 3: Keep Ready (Hindi Demo)
    console.log('Capturing: Screen 3 Keep Ready (Hindi Demo)...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=3&lang=hi`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-3-keep-ready-hi.png');

    // 8. App Screen 4: Verification Default State
    console.log('Capturing: Screen 4 Verification Default...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=4&state=default`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-4-verification-default.png');

    // 9. App Screen 4: Wait State / Registry Connection
    console.log('Capturing: Screen 4 Wait State...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=4&state=loading`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-4-wait-state.png');

    // 10. App Screen 4: OTP Delay State
    console.log('Capturing: Screen 4 OTP Delay State...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=4&state=otp%20delay`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-4-otp-delay.png');

    // 11. App Screen 4: Human Error State
    console.log('Capturing: Screen 4 Human Error State...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=4&state=error`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-4-error-state.png');

    // 12. App Screen 4: Offline State
    console.log('Capturing: Screen 4 Offline State...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=4&state=offline`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-4-offline-state.png');

    // 13. App Screen 4: Success State
    console.log('Capturing: Screen 4 Success State...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=4&state=success`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-4-success-state.png');

    // 14. App Screen 5: First ₹100 Amount Selector
    console.log('Capturing: Screen 5 First ₹100...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=5&state=default`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-5-first-100.png');

    // 15. App Screen 5: Celebration / Order Confirmation
    console.log('Capturing: Screen 5 Celebration...');
    await page.goto(`http://localhost:${PORT}/app/index.html?screen=5&state=success`, { waitUntil: 'networkidle' });
    await capturePhoneFrame('app-screen-5-celebration.png');

    console.log(`\nAll screenshots successfully saved to ${screensDir}`);

  } finally {
    await browser.close();
    server.close();
  }
}

captureScreenshots().catch(err => {
  console.error('Screenshot generation failed:', err);
  process.exit(1);
});
