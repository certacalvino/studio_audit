// Renders a frame HTML file and screenshots the .frame element at 1440×900.
// Usage: node shot.mjs <html-file> <out-png>
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pw;
import path from 'node:path';

const [, , htmlFile, outPng] = process.argv;
if (!htmlFile || !outPng) {
  console.error('usage: node shot.mjs <html-file> <out-png>');
  process.exit(1);
}

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1440, height: 900 } });
await page.goto('file://' + path.resolve(htmlFile), { waitUntil: 'networkidle' });
const frame = page.locator('.frame').first();
await frame.screenshot({ path: outPng });
await browser.close();
console.log('wrote', outPng);
