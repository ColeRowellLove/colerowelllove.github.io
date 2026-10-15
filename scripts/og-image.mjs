// Renders scripts/og-image.html to public/og-image.jpg (1200x630), the social preview card.
// Usage: npm run og-image    (set CHROME_PATH to use a specific Chrome/Chromium binary)
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

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

const source = pathToFileURL(fileURLToPath(new URL('./og-image.html', import.meta.url))).href;
const output = fileURLToPath(new URL('../public/og-image.jpg', import.meta.url));

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: true,
  // The template loads the font and photo from local files.
  args: ['--no-sandbox', '--allow-file-access-from-files'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(source, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  await page.screenshot({ path: output, type: 'jpeg', quality: 90 });
  console.log(`Wrote ${output}`);
} finally {
  await browser.close();
}
