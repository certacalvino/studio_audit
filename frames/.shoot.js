const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const file = process.argv[2];
  const out = process.argv[3];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(file));
  await page.waitForTimeout(400);
  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  console.log('shot ->', out);
})();
