import { chromium } from "playwright";
import { mkdirSync, existsSync } from "fs";

const OUT = "results/verify";
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: "mobile", width: 375, height: 812, deviceScaleFactor: 3 },
  { name: "mobile-large", width: 428, height: 926, deviceScaleFactor: 3 },
  { name: "tablet", width: 768, height: 1024, deviceScaleFactor: 2 },
  { name: "desktop", width: 1280, height: 800, deviceScaleFactor: 1 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:3001", { waitUntil: "networkidle" });

  // Wait for fonts/images to settle
  await page.waitForTimeout(2000);

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `${OUT}/${vp.name}-home.png`,
      fullPage: true,
    });
    console.log(`Saved ${vp.name}-home.png (${vp.width}x${vp.height})`);
  }

  // Mobile menu open test (iPhone size)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(1000);
  const hamburger = page.locator('button[aria-label="Open menu"]');
  if (await hamburger.count() > 0) {
    await hamburger.click();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: `${OUT}/mobile-menu-open.png`,
      fullPage: false,
    });
    console.log("Saved mobile-menu-open.png");

    // Verify links are visible in the drawer
    const links = page.locator("nav[aria-label='Main'] a");
    const count = await links.count();
    console.log(`Mobile drawer visible links: ${count}`);
    for (let i = 0; i < count; i++) {
      const txt = await links.nth(i).textContent();
      console.log(`  link[${i}]: ${txt}`);
    }

    // Close via Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${OUT}/mobile-menu-closed-via-escape.png`,
      fullPage: false,
    });
    console.log("Saved mobile-menu-closed-via-escape.png");
  }

  await browser.close();
  console.log("Done.");
})();
