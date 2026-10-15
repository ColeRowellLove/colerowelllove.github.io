// Runs axe-core against every built page in dark and light mode and fails on WCAG violations.
// Usage: npm run build && node scripts/a11y.mjs   (or: npm run a11y)
// Set CHROME_PATH to use a specific Chrome/Chromium binary.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import axe from 'axe-core';
import puppeteer from 'puppeteer-core';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = ['/', '/experience', '/projects', '/about', '/contact', '/404'];
const schemes = ['dark', 'light'];
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function chromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates =
    process.platform === 'win32'
      ? [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        ]
      : process.platform === 'darwin'
        ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
        : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error('Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.');
  return found;
}

// Minimal static server that mirrors GitHub Pages: /x serves x.html, unknown paths serve 404.html.
const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const candidates = urlPath.endsWith('/')
    ? [join(urlPath, 'index.html')]
    : extname(urlPath)
      ? [urlPath]
      : [`${urlPath}.html`];
  for (const candidate of candidates) {
    const file = normalize(join(dist, candidate));
    if (!file.startsWith(dist)) break;
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
      return;
    } catch {
      // fall through to the 404 page
    }
  }
  res.writeHead(404, { 'content-type': types['.html'] });
  res.end(await readFile(join(dist, '404.html')));
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: true,
  args: ['--no-sandbox'],
});

let failures = 0;
let checked = 0;
try {
  for (const scheme of schemes) {
    for (const path of pages) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: scheme },
        // Skip the scroll-reveal fade so every element is fully opaque when measured.
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ]);
      await page.goto(base + path, { waitUntil: 'networkidle0' });
      await page.evaluateHandle('document.fonts.ready');
      await page.evaluate(axe.source);
      const { violations } = await page.evaluate(
        (runTags) => window.axe.run(document, { runOnly: { type: 'tag', values: runTags } }),
        tags,
      );
      checked += 1;
      if (violations.length === 0) {
        console.log(`PASS  ${scheme.padEnd(5)} ${path}`);
      } else {
        failures += violations.length;
        console.log(`FAIL  ${scheme.padEnd(5)} ${path}`);
        for (const v of violations) {
          console.log(`  - ${v.id} (${v.impact}): ${v.help} [${v.nodes.length} node(s)]`);
          for (const n of v.nodes.slice(0, 3)) {
            console.log(`      ${n.target.join(' ')}`);
            console.log(`      ${(n.failureSummary ?? '').split('\n').slice(0, 2).join(' | ')}`);
          }
        }
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`\n${checked} page/scheme combinations checked, ${failures} violation(s).`);
process.exit(failures === 0 ? 0 : 1);
