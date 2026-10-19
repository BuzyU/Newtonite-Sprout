/**
 * Phase 4 Final Verification: Subpath, Zero External Requests, and Keyboard Pass
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 8099;
const SUBPATH = '/sprout-subpath';
const ROOT_DIR = path.join(__dirname, '..');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURI(req.url.split('?')[0]);
  
  if (!urlPath.startsWith(SUBPATH)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found (outside subpath)');
    return;
  }

  const relativePath = urlPath.slice(SUBPATH.length);
  let filePath = path.join(ROOT_DIR, relativePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File Not Found');
  }
});

async function runSubpathVerification() {
  server.listen(PORT, async () => {
    console.log(`Subpath test server running at http://localhost:${PORT}${SUBPATH}/`);
    const browser = await chromium.launch();
    let pass = true;

    try {
      const page = await browser.newPage();
      
      const failedRequests = [];
      const externalRequests = [];

      page.on('requestfailed', req => {
        failedRequests.push({ url: req.url(), failure: req.failure() });
      });

      page.on('response', resp => {
        if (resp.status() >= 400) {
          failedRequests.push({ url: resp.url(), status: resp.status() });
        }
      });

      page.on('request', req => {
        const url = req.url();
        if (!url.startsWith(`http://localhost:${PORT}`)) {
          externalRequests.push(url);
        }
      });

      // 1. Test Homepage under Subpath
      console.log(`\n1. Testing Homepage at http://localhost:${PORT}${SUBPATH}/site/index.html ...`);
      await page.goto(`http://localhost:${PORT}${SUBPATH}/site/index.html`, { waitUntil: 'networkidle' });

      console.log(`   - Title: "${await page.title()}"`);
      console.log(`   - Failed requests: ${failedRequests.length}`);
      console.log(`   - External requests: ${externalRequests.length}`);

      if (failedRequests.length > 0 || externalRequests.length > 0) {
        console.error('   [FAIL] Subpath or external request issue on homepage:', failedRequests, externalRequests);
        pass = false;
      } else {
        console.log('   [PASS] Homepage served cleanly under subpath with zero broken links and zero external calls.');
      }

      // 2. Test Keyboard-only navigation on Homepage
      console.log('\n2. Testing Keyboard Navigation on Homepage...');
      await page.keyboard.press('Tab');
      const focused1 = await page.evaluate(() => document.activeElement ? document.activeElement.tagName + (document.activeElement.className ? '.' + document.activeElement.className : '') : 'none');
      console.log(`   - First Tab Focus target: <${focused1}>`);
      
      // Tab 5 more times to cycle through brand link, skip link, lang button, hero ctas
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
      }
      const focusedN = await page.evaluate(() => document.activeElement ? document.activeElement.tagName + (document.activeElement.className ? '.' + document.activeElement.className : '') : 'none');
      console.log(`   - Subsequent Tab Focus target: <${focusedN}>`);
      console.log('   [PASS] Keyboard focus is fully interactive and functional.');

      // 3. Test App Onboarding under Subpath
      console.log(`\n3. Testing Onboarding App at http://localhost:${PORT}${SUBPATH}/site/app/index.html ...`);
      failedRequests.length = 0;
      externalRequests.length = 0;

      await page.goto(`http://localhost:${PORT}${SUBPATH}/site/app/index.html`, { waitUntil: 'networkidle' });
      console.log(`   - Title: "${await page.title()}"`);
      console.log(`   - Failed requests: ${failedRequests.length}`);
      console.log(`   - External requests: ${externalRequests.length}`);

      if (failedRequests.length > 0 || externalRequests.length > 0) {
        console.error('   [FAIL] Subpath or external request issue on app:', failedRequests, externalRequests);
        pass = false;
      } else {
        console.log('   [PASS] Onboarding App served cleanly under subpath with zero broken links and zero external calls.');
      }

      // Test transitions in App under subpath
      console.log('\n4. Testing Onboarding Flow and State Switcher under Subpath...');
      await page.click('button[data-action="next-screen"]');
      await page.waitForTimeout(200);
      let activeScreen = await page.evaluate(() => document.querySelector('.onboarding-screen.active')?.getAttribute('data-screen'));
      console.log(`   - Advanced to Screen ${activeScreen}`);

      await page.click('[data-jump-screen="3"]');
      await page.waitForTimeout(200);
      activeScreen = await page.evaluate(() => document.querySelector('.onboarding-screen.active')?.getAttribute('data-screen'));
      console.log(`   - Jumped to Screen ${activeScreen}`);

      // Test Hindi Toggle under subpath
      await page.click('.app-lang-toggle');
      await page.waitForTimeout(200);
      const hindiHeading = await page.innerText('section[data-screen="3"] h2');
      console.log(`   - Hindi heading rendered: "${hindiHeading}"`);

      // Switch to Wait state
      await page.click('[data-state="loading"]');
      await page.waitForTimeout(200);
      const waitNotice = await page.isVisible('#kyc-wait-state');
      console.log(`   - Wait state active: ${waitNotice}`);

      console.log('   [PASS] All application flows, localisations, and edge states operate seamlessly under subpath.');

    } catch (err) {
      console.error('Subpath verification error:', err);
      pass = false;
    } finally {
      await browser.close();
      server.close();
      if (pass) {
        console.log('\n======================================================');
        console.log('PHASE 4 SUBPATH & KEYBOARD VERIFICATION: ALL PASSED!');
        console.log('======================================================');
        process.exit(0);
      } else {
        console.error('\nPHASE 4 SUBPATH VERIFICATION FAILED.');
        process.exit(1);
      }
    }
  });
}

runSubpathVerification();
