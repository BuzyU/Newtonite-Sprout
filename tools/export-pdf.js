/**
 * Sprout Design System - Case Study PDF Exporter
 * Converts case-study/CASE_STUDY.md into an executive PDF using Playwright Chromium.
 * Output: case-study/case-study.pdf
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const caseStudyMdPath = path.join(__dirname, '..', 'case-study', 'CASE_STUDY.md');
const outputPdfPath = path.join(__dirname, '..', 'case-study', 'case-study.pdf');

function simpleMarkdownToHtml(md) {
  let html = md
    // Headers
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    // Bold & italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Blockquotes / Alerts
    .replace(/^\> \[!NOTE\]\s*(.*$)/gim, '<div class="alert note"><strong>NOTE:</strong> $1</div>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Images
    .replace(/\!\[(.*?)\]\((.*?)\)/gim, '<div class="img-container"><img alt="$1" src="$2"><p class="caption">$1</p></div>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
    // Horizontal rules
    .replace(/^---$/gim, '<hr>');

  // Process tables
  const lines = html.split('\n');
  let inTable = false;
  let tableHtml = '';
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHtml = '<table class="pdf-table"><tbody>';
      }
      if (line.includes('---')) {
        // Table divider line
        continue;
      }
      const cells = line.split('|').slice(1, -1);
      const isHeader = !tableHtml.includes('<tr>');
      const tag = isHeader ? 'th' : 'td';
      tableHtml += '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    } else {
      if (inTable) {
        tableHtml += '</tbody></table>';
        processedLines.push(tableHtml);
        inTable = false;
        tableHtml = '';
      }
      if (line.length > 0 && !line.startsWith('<h') && !line.startsWith('<hr') && !line.startsWith('<div')) {
        processedLines.push(`<p>${line}</p>`);
      } else {
        processedLines.push(line);
      }
    }
  }
  if (inTable) {
    tableHtml += '</tbody></table>';
    processedLines.push(tableHtml);
  }

  return processedLines.join('\n');
}

async function exportPdf() {
  console.log('Generating Case Study PDF from CASE_STUDY.md...');
  const mdContent = fs.readFileSync(caseStudyMdPath, 'utf-8');
  const bodyHtml = simpleMarkdownToHtml(mdContent);

  const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Sprout 2.0 Case Study</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 15mm;
      @bottom-right {
        content: counter(page);
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10pt;
      line-height: 1.55;
      color: #18221D;
      background: #FFFFFF;
    }
    h1 {
      font-family: Charter, Georgia, serif;
      font-size: 20pt;
      color: #11382B;
      border-bottom: 2pt solid #11382B;
      padding-bottom: 4pt;
      margin-top: 0;
    }
    h2 {
      font-family: Charter, Georgia, serif;
      font-size: 13pt;
      color: #11382B;
      border-bottom: 1pt solid #D1C9BE;
      padding-bottom: 2pt;
      margin-top: 16pt;
      page-break-after: avoid;
    }
    h3 {
      font-size: 11pt;
      color: #1B4D3E;
      margin-top: 12pt;
      page-break-after: avoid;
    }
    p {
      margin: 6pt 0;
      text-align: justify;
    }
    .pdf-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }
    .pdf-table th, .pdf-table td {
      border: 1pt solid #D1C9BE;
      padding: 4pt 6pt;
      text-align: left;
    }
    .pdf-table th {
      background-color: #F6F1EA;
      color: #11382B;
      font-weight: bold;
    }
    .pdf-table tr:nth-child(even) td {
      background-color: #FAF8F5;
    }
    .alert {
      background: #F0F6F2;
      border-left: 3pt solid #11382B;
      padding: 6pt 10pt;
      margin: 8pt 0;
      font-size: 9pt;
    }
    blockquote {
      border-left: 2pt solid #D97706;
      margin: 6pt 0;
      padding-left: 8pt;
      color: #55655D;
      font-style: italic;
    }
    .img-container {
      text-align: center;
      margin: 12pt 0;
      page-break-inside: avoid;
    }
    .img-container img {
      max-width: 90%;
      max-height: 240pt;
      border: 1pt solid #D1C9BE;
      border-radius: 4pt;
    }
    .caption {
      font-size: 8pt;
      color: #55655D;
      margin-top: 2pt;
      text-align: center;
    }
    hr {
      border: 0;
      border-top: 1pt solid #E5DFD7;
      margin: 12pt 0;
    }
    code {
      font-family: monospace;
      font-size: 8.5pt;
      background: #F6F1EA;
      padding: 1pt 3pt;
      border-radius: 2pt;
    }
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'load' });
    await page.pdf({
      path: outputPdfPath,
      format: 'A4',
      margin: {
        top: '15mm',
        bottom: '15mm',
        left: '15mm',
        right: '15mm'
      },
      printBackground: true
    });
    console.log(`PDF successfully generated: ${outputPdfPath}`);
  } finally {
    await browser.close();
  }
}

exportPdf().catch(err => {
  console.error('PDF export failed:', err);
  process.exit(1);
});
