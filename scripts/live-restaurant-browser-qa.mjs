import { chromium, devices } from 'playwright';
import { writeFileSync } from 'node:fs';

const origin = 'https://mybreakeven.com';
const pagePath = '/blogs/restaurant-budgeting/';
const filePath = '/downloads/restaurant-12-month-budget-template.xlsx';
const report = { checkedAt: new Date().toISOString(), origin, checks: [], success: false };
const add = (name, pass, detail) => { report.checks.push({ name, pass, detail }); console.log((pass ? 'PASS ' : 'FAIL ') + name + ': ' + detail); };
try {
  const response = await fetch(origin + filePath, { redirect: 'follow', signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'MyBreakEven-Owner-QA/1.0' } });
  const data = new Uint8Array(await response.arrayBuffer());
  const isZip = data.length > 4 && data[0] === 0x50 && data[1] === 0x4b;
  add('live-workbook-http-and-xlsx', response.ok && isZip && data.length > 4000,
      'HTTP ' + response.status + '; content-type=' + response.headers.get('content-type') + '; bytes=' + data.length + '; XLSX zip signature=' + isZip + '; final URL=' + response.url);
} catch (e) { add('live-workbook-http-and-xlsx', false, String(e)); }

let browser;
try {
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  for (const device of [
    { label: 'mobile-375', width: 375, height: 812, isMobile: true, deviceScaleFactor: 1, hasTouch: true },
    { label: 'mobile-390', width: 390, height: 844, isMobile: true, deviceScaleFactor: 1, hasTouch: true },
    { label: 'desktop-1280', width: 1280, height: 800, deviceScaleFactor: 1 }
  ]) {
    const context = await browser.newContext({ viewport: { width: device.width, height: device.height }, isMobile: device.isMobile || false, hasTouch: device.hasTouch || false, deviceScaleFactor: 1 });
    const page = await context.newPage();
    try {
      const response = await page.goto(origin + pagePath, { waitUntil: 'domcontentloaded', timeout: 35000 });
      await page.waitForTimeout(1200);
      const info = await page.evaluate(() => ({
        title: document.title,
        h1: [...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),
        viewport: window.innerWidth,
        docWidth: document.documentElement.scrollWidth,
        bodyText: document.body.innerText,
        linkCount: [...document.querySelectorAll('a[href="/downloads/restaurant-12-month-budget-template.xlsx"]')].length
      }));
      const correct = info.bodyText.includes('Download editable 12-month Excel workbook') && !info.bodyText.includes('not a separate editable 12-month file');
      add(device.label + '-page-content', response?.ok() && correct && info.linkCount > 0,
        'HTTP ' + response?.status() + '; title=' + info.title + '; workbook links=' + info.linkCount + '; corrected table=' + correct);
      const overflow = info.docWidth > info.viewport + 5;
      add(device.label + '-horizontal-overflow', !overflow, 'viewport=' + info.viewport + '; documentWidth=' + info.docWidth);
      await page.screenshot({ path: 'qa-' + device.label + '.png', fullPage: true });
    } catch (e) { add(device.label + '-browser', false, String(e)); }
    await context.close();
  }
} catch (e) { add('chromium-launch', false, String(e)); } finally { if (browser) await browser.close(); }
report.success = report.checks.every(x => x.pass);
writeFileSync('live-qa-report.json', JSON.stringify(report, null, 2));
if (!report.success) process.exitCode = 1;
