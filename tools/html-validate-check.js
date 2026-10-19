/**
 * Sprout Design System - HTML Validator
 * Uses html-validate to ensure semantic correctness, proper landmarks, and valid attributes.
 */

const fs = require('fs');
const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidate = new HtmlValidate({
  rules: {
    'no-trailing-whitespace': 'off',
    'element-required-attributes': 'error',
    'require-sri': 'off',
    'no-inline-style': 'off',
    'attr-quotes': 'off'
  }
});

const filesToValidate = [
  path.join(__dirname, '..', 'site', 'index.html'),
  path.join(__dirname, '..', 'site', 'app', 'index.html')
];

async function run() {
  let hasErrors = false;
  console.log('--- HTML Validation Audit ---');

  for (const file of filesToValidate) {
    const content = fs.readFileSync(file, 'utf-8');
    const report = await htmlValidate.validateString(content, file);

    if (report.valid) {
      console.log(`[PASS] ${path.relative(path.join(__dirname, '..'), file)}: Valid HTML`);
    } else {
      console.log(`[RESULTS] ${path.relative(path.join(__dirname, '..'), file)}:`);
      if (report.results) {
        report.results.forEach(res => {
          res.messages.forEach(msg => {
            const isError = msg.severity === 2;
            console.log(`  Line ${msg.line}:${msg.column} [${isError ? 'ERROR' : 'WARN'}] ${msg.message} (${msg.ruleId})`);
            if (isError) hasErrors = true;
          });
        });
      }
    }
  }

  if (hasErrors) {
    console.error('\nHTML validation FAILED.');
    process.exit(1);
  } else {
    console.log('\nHTML validation PASSED: Semantic markup and structure verified.');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
