/**
 * Sprout Design System - Markdown Image & Link Integrity Checker
 * Verifies that all image references and relative links in tracked markdown files resolve to existing local files,
 * and ensures zero absolute paths (file:///, C:\, /Users/, umerz) exist in documentation.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

// Get all git tracked markdown files
function getTrackedMarkdownFiles() {
  try {
    const output = execSync('git ls-files "*.md"', { cwd: ROOT_DIR, encoding: 'utf-8' });
    return output.split('\n').map(l => l.trim()).filter(Boolean).map(f => path.join(ROOT_DIR, f));
  } catch (err) {
    console.error('Failed to query git tracked markdown files:', err);
    process.exit(1);
  }
}

function auditMarkdownLinks() {
  const mdFiles = getTrackedMarkdownFiles();
  console.log(`Checking link and image integrity across ${mdFiles.length} tracked markdown files...\n`);

  let totalLinks = 0;
  let brokenCount = 0;
  let absolutePathCount = 0;

  for (const mdFile of mdFiles) {
    const relMdPath = path.relative(ROOT_DIR, mdFile).replace(/\\/g, '/');
    const content = fs.readFileSync(mdFile, 'utf-8');
    const dir = path.dirname(mdFile);

    // Regex for markdown images and links
    const linkRegex = /!?\[([^\]]*)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      totalLinks++;
      const [fullMatch, text, rawTarget] = match;
      const target = rawTarget.trim();

      // Check for forbidden absolute paths/usernames
      if (/(?:file:\/\/\/|^[a-zA-Z]:[\\\/]|\/Users\/|umerz)/i.test(target)) {
        console.error(`[ABSOLUTE PATH ERROR] ${relMdPath}:`);
        console.error(`  Link: ${fullMatch}`);
        console.error(`  Found forbidden absolute path in target: "${target}"\n`);
        absolutePathCount++;
        continue;
      }

      // Skip external links and pure in-page anchors
      if (/^(https?:|mailto:|tel:|#)/i.test(target)) {
        continue;
      }

      // Separate path from query params and hash anchors
      let cleanTarget = target.split('#')[0].split('?')[0].trim();
      if (!cleanTarget) {
        // Was only an anchor, e.g. (#section)
        continue;
      }

      // Decode URL encoding if any
      cleanTarget = decodeURIComponent(cleanTarget);

      // Resolve relative path
      const resolvedPath = path.resolve(dir, cleanTarget);

      if (!fs.existsSync(resolvedPath)) {
        console.error(`[BROKEN TARGET ERROR] ${relMdPath}:`);
        console.error(`  Text: "${text}"`);
        console.error(`  Target: "${target}"`);
        console.error(`  Resolved To Missing File: "${path.relative(ROOT_DIR, resolvedPath).replace(/\\/g, '/')}"\n`);
        brokenCount++;
      }
    }
  }

  console.log('--- Markdown Link Audit Summary ---');
  console.log(`Total Links & Images Evaluated: ${totalLinks}`);
  console.log(`Absolute Path Violations: ${absolutePathCount}`);
  console.log(`Broken Relative Link Targets: ${brokenCount}`);

  if (absolutePathCount > 0 || brokenCount > 0) {
    console.error('\nMarkdown link check FAILED.');
    process.exit(1);
  } else {
    console.log('\nMarkdown link check PASSED: All local links and images exist with strictly relative paths.');
    process.exit(0);
  }
}

auditMarkdownLinks();
