import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.PORTFOLIO_BASE || "http://127.0.0.1:4173";
const out = new URL("../artifacts/", import.meta.url).pathname;
await mkdir(out, { recursive: true });
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : { channel: "chrome" },
);
const errors = [];
const badResponses = [];
const results = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: "light",
    reducedMotion: "reduce",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.url().startsWith(base) && r.status() >= 400)
      badResponses.push([r.status(), r.url()]);
  });
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["tablet", 768, 1024],
    ["mobile", 390, 844],
    ["small-mobile", 320, 720],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth,
      viewport: innerWidth,
      images: [...document.images]
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.src),
    }));
    await page.locator(".featured-image img").scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      [...document.images].every((i) => i.complete && i.naturalWidth > 0),
    );
    await page.evaluate(() => scrollTo(0, 0));
    if (metrics.page > width)
      throw Error(`Horizontal overflow at ${width}: ${metrics.page}`);
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    if (name === "desktop" || name === "mobile") {
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      if (audit.violations.length)
        throw Error(JSON.stringify(audit.violations));
    }
    results.push(`${name}: no horizontal overflow`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "AI systems", exact: true }).click();
  if ((await page.locator(".project-card:visible").count()) !== 5)
    throw Error("AI filter failed");
  await page.getByRole("button", { name: "Platforms", exact: true }).click();
  if ((await page.locator(".project-card:visible").count()) !== 13)
    throw Error("Platform filter failed");
  await page.getByRole("button", { name: "All work", exact: true }).click();
  if ((await page.locator(".project-card:visible").count()) !== 18)
    throw Error("All filter failed");
  const expectedProjects = [
    "hawkai",
    "chai-point",
    "tms",
    "ppa-agent",
    "dgr",
    "travelex",
    "epm",
    "intranet-agent",
    "empower",
    "energy-forecasting",
    "suno",
    "nebula",
    "namshi",
    "mbank",
  ];
  for (const id of expectedProjects) {
    if (!(await page.locator(`#${id} h3`).isVisible()))
      throw Error(`Resume project missing: ${id}`);
  }
  const previewLinks = {
    hawkai: "https://www.hawkai.in/",
    tms: "https://assist.gentari.co.in/",
    empower: "https://empower.gentari.co.in/",
    epm: "https://appraisal.gentari.co.in/",
    "chai-point": "https://www.chaipoint.com/",
    "intranet-agent": "https://gia.gentari.co.in/",
    planetskool: "https://www.planetskool.world/",
    tracemind: "https://echo.gentari.co.in/",
  };
  for (const [id, url] of Object.entries(previewLinks)) {
    const link = page.locator(`#${id} .project-preview`);
    if (!(await link.isVisible()) || (await link.getAttribute("href")) !== url)
      throw Error(`Project preview incorrectly mapped: ${id}`);
  }
  await page.locator("#tms summary").click();
  if (!(await page.locator("#tms details").evaluate((el) => el.open)))
    throw Error("New project contribution disclosure failed");
  await page.getByText("Architecture & contribution", { exact: false }).click();
  if (
    !(await page
      .locator(".project-card details")
      .first()
      .getAttribute("open")
      .then((x) => x !== null))
  )
    throw Error("Details failed");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  if ((await page.locator("html").getAttribute("data-theme")) !== "dark")
    throw Error("Theme persistence failed");
  await page.screenshot({ path: `${out}/dark.png`, fullPage: true });
  await page.getByRole("button", { name: "Copy email address" }).click();
  await page.waitForFunction(() =>
    document.querySelector(".copy-status").textContent.includes("Email copied"),
  );
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  if (clipboard !== "piyush.chopra201998@gmail.com")
    throw Error("Clipboard contents wrong");
  const darkAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  if (darkAudit.violations.length)
    throw Error(JSON.stringify(darkAudit.violations));
  const missing = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .filter((a) => !document.getElementById(a.hash.slice(1)))
      .map((a) => a.hash),
  );
  if (missing.length) throw Error(`Missing anchors ${missing}`);
  await page.getByRole("link", { name: "Experience", exact: true }).click();
  if (!page.url().endsWith("#experience")) throw Error("Navigation failed");
  const animations = await page.evaluate(
    () =>
      document.getAnimations().filter((a) => a.playState === "running").length,
  );
  if (animations) throw Error("Reduced motion has running animations");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => {
    const nodes = [
      ...document.querySelectorAll(
        "h1,h2,h3,p,a,button,summary,li,small,.experience-date,.hero-footnote",
      ),
    ];
    const sizes = nodes.map((n) => getComputedStyle(n).fontSize);
    nodes.forEach(
      (n, i) => (n.style.fontSize = `${parseFloat(sizes[i]) * 2}px`),
    );
  });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw Error("200% text overflow");
  await page.screenshot({ path: `${out}/large-text.png`, fullPage: true });
  await page.reload();
  // Preference fallbacks and keyboard access exercise the new visual layers.
  const cdp = await context.newCDPSession(page);
  for (const feature of ["prefers-reduced-transparency", "prefers-contrast"]) {
    await cdp.send("Emulation.setEmulatedMedia", {
      features: [
        {
          name: feature,
          value: feature === "prefers-contrast" ? "more" : "reduce",
        },
      ],
    });
    const material = await page
      .locator(".site-header")
      .evaluate((el) => getComputedStyle(el).backdropFilter);
    if (material !== "none")
      throw Error(`${feature}: navigation is still translucent`);
  }
  await cdp.send("Emulation.setEmulatedMedia", { features: [] });
  await cdp.detach();
  await page.goto(base);
  await page.keyboard.press("Tab");
  if (
    !(await page
      .locator(".skip-link")
      .evaluate((el) => el === document.activeElement))
  )
    throw Error("Keyboard skip link is not first");
  await page.keyboard.press("Enter");
  if (!page.url().endsWith("#main")) throw Error("Keyboard skip link failed");
  const noJS = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
  });
  const plain = await noJS.newPage();
  await plain.goto(base);
  if (!(await plain.getByRole("heading", { level: 1 }).isVisible()))
    throw Error("No-JS missing content");
  if (await plain.locator(".filters").isVisible())
    throw Error("No-JS broken filter visible");
  const links = await plain
    .getByRole("link", { name: "Start a conversation" })
    .getAttribute("href");
  if (!links.startsWith("mailto:")) throw Error("No-JS contact failed");
  const missingPage = await context.newPage();
  await missingPage.goto(`${base}/404.html`);
  if (
    !(await missingPage
      .getByRole("link", { name: "Back to portfolio" })
      .isVisible())
  )
    throw Error("404 recovery missing");
  if (errors.length || badResponses.length)
    throw Error(JSON.stringify({ errors, badResponses }));
  results.push(
    "Filters, details, theme persistence, clipboard, anchors, reduced motion, 200% text, keyboard skip link, reduced transparency, increased contrast, no-JS content/contact, and 404 page passed.",
  );
  await writeFile(
    `${out}/results.json`,
    JSON.stringify({ base, results, errors, badResponses }, null, 2),
  );
  console.log(JSON.stringify({ base, results, errors, badResponses }, null, 2));
} finally {
  await browser.close();
}
