/**
 * Sprout Design System - Copy Linter & Compliance Auditor
 * Scans code, markup, JSON, and SVG for prohibited financial marketing claims.
 * Also verifies disclaimer minimum font-size requirement (>= 12px).
 */

const fs = require('fs');
const path = require('path');

// Prohibited terms per regulatory compliance mandate
const BANNED_PATTERNS = [
  { pattern: /\bguarantee(d|s|ing)?\b/i, name: 'guarantee/guaranteed/guarantees' },
  { pattern: /\brisk[\s-]?free\b/i, name: 'risk-free / risk free' },
  { pattern: /\briskless\b/i, name: 'riskless' },
  { pattern: /\bassured\b/i, name: 'assured' },
  { pattern: /\bsure[\s-]?shot\b/i, name: 'sure-shot' },
  { pattern: /\bno[\s-]risk\b/i, name: 'no risk' },
  { pattern: /\bcan('?t|not)[\s-]lose\b/i, name: "can't lose" },
  { pattern: /\b(safe|safer|safest)\b/i, name: 'safe/safer/safest', reviewOnly: true }
];

// Context exceptions allowed (e.g. CSS properties like env(safe-area-inset))
const ALLOWED_EXCEPTIONS = [
  /safe-area/i,
  /safety cushion/i, /* used in goals description as everyday metaphor */
  /safeguard/i
];

const SCAN_DIRS = ['site', 'assets', 'design-system'];
const SCAN_EXTENSIONS = ['.html', '.css', '.js', '.json', '.svg'];

let errorsFound = 0;
let warningsFound = 0;
const results = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    BANNED_PATTERNS.forEach(({ pattern, name, reviewOnly }) => {
      const match = line.match(pattern);
      if (match) {
        const isException = ALLOWED_EXCEPTIONS.some(ex => ex.test(line));
        if (isException) {
          results.push({
            file: filePath,
            line: lineNum,
            term: match[0],
            category: 'REVIEW (Allowed Context)',
            context: line.trim()
          });
          return;
        }

        if (reviewOnly) {
          warningsFound++;
          results.push({
            file: filePath,
            line: lineNum,
            term: match[0],
            category: 'WARNING / REVIEW REQUIRED',
            context: line.trim()
          });
        } else {
          errorsFound++;
          results.push({
            file: filePath,
            line: lineNum,
            term: match[0],
            category: 'CRITICAL COMPLIANCE VIOLATION',
            context: line.trim()
          });
        }
      }
    });
  });
}

function traverse(currentDir) {
  if (!fs.existsSync(currentDir)) return;
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        traverse(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SCAN_EXTENSIONS.includes(ext)) {
        scanFile(fullPath);
      }
    }
  }
}

console.log('--- Sprout Copy & Compliance Audit ---');
SCAN_DIRS.forEach(dir => traverse(path.join(__dirname, '..', dir)));

// Verify Disclaimer Font-Size Floor in CSS Tokens
const tokensCssPath = path.join(__dirname, '..', 'design-system', 'tokens.css');
let disclaimerFontPass = true;
if (fs.existsSync(tokensCssPath)) {
  const tokensCss = fs.readFileSync(tokensCssPath, 'utf-8');
  const match = tokensCss.match(/--text-disclaimer:\s*([0-9.]+)rem/);
  if (match) {
    const remVal = parseFloat(match[1]);
    const pxVal = remVal * 16;
    if (pxVal < 12) {
      disclaimerFontPass = false;
      errorsFound++;
      console.error(`DISCLAIMER FONT SIZE VIOLATION: --text-disclaimer is ${pxVal}px (minimum is 12px)`);
    } else {
      console.log(`Disclaimer token verified: ${pxVal}px (meets >= 12px mandatory requirement).`);
    }
  }
}

if (results.length > 0) {
  console.log('\nMatches for compliance review:');
  results.forEach(r => {
    console.log(`[${r.category}] ${r.file}:${r.line} - Term "${r.term}"`);
    console.log(`  Snippet: "${r.context.substring(0, 100)}"`);
  });
}

console.log(`\nAudit Summary:`);
console.log(`Critical Violations: ${errorsFound}`);
console.log(`Review Items: ${warningsFound}`);
console.log(`Disclaimer Font Floor >= 12px: ${disclaimerFontPass ? 'PASS' : 'FAIL'}`);

if (errorsFound > 0 || !disclaimerFontPass) {
  console.error('\nCopy lint FAILED: Prohibited compliance terms or invalid font floor detected.');
  process.exit(1);
} else {
  console.log('\nCopy lint PASSED: No prohibited financial guarantee claims detected.');
}
