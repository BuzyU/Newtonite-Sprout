/**
 * Sprout Design System - Comprehensive Test Runner
 * Executes copy lint, contrast audit, asset weight budgeting, HTML semantics, and a11y tests.
 */

const { execSync } = require('child_process');

const tests = [
  { name: 'Copy & Regulatory Compliance Lint', cmd: 'node tools/copy-lint.js' },
  { name: 'WCAG 2.1 AA Contrast Ratio Audit', cmd: 'node tools/contrast-check.js' },
  { name: 'Performance & Asset Weight Budgeting', cmd: 'node tools/weight-check.js' },
  { name: 'Semantic HTML & Landmark Validation', cmd: 'node tools/html-validate-check.js' },
  { name: 'Axe Core Accessibility Evaluation', cmd: 'node tools/a11y-check.js' },
  { name: 'Subpath Routing & Network Isolation Verification', cmd: 'node tools/test-subpath.js' }
];

let failed = false;

console.log('====================================================');
console.log('Sprout Design System - Automated Quality Test Suite');
console.log('====================================================\n');

for (const t of tests) {
  console.log(`>>> Running: ${t.name}...`);
  try {
    execSync(t.cmd, { stdio: 'inherit' });
    console.log(`[PASS] ${t.name}\n`);
  } catch (err) {
    console.error(`[FAIL] ${t.name} failed with exit code ${err.status}\n`);
    failed = true;
    break;
  }
}

if (failed) {
  console.error('Test suite FAILED.');
  process.exit(1);
} else {
  console.log('====================================================');
  console.log('All Sprout Design System checks PASSED successfully!');
  console.log('====================================================');
}
