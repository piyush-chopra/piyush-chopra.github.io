import { chromium } from "playwright-core";
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : { channel: "chrome" },
);
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    reducedMotion: "reduce",
  });
  await page.goto(
    `${process.env.PORTFOLIO_BASE || "http://127.0.0.1:4173"}/scripts/social-card.html`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: new URL("../assets/social-card.png", import.meta.url).pathname,
  });
} finally {
  await browser.close();
}
