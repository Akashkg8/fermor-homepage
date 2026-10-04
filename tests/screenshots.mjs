// Full-page screenshots at the four review widths: node tests/screenshots.mjs [outDir]
import { chromium } from "@playwright/test";

const out = process.argv[2] ?? "screenshots";
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "chrome" });
for (const width of [375, 768, 1280, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(process.env.BASE_URL ?? "http://localhost:3100", { waitUntil: "networkidle" });
  await page.screenshot({ path: `${out}/home-${width}.png`, fullPage: true });
  await page.screenshot({ path: `${out}/fold-${width}.png` });
  await page.close();
}
await browser.close();
