const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("about:blank");
  try {
    for (let i = 0 /* NOP */; ; i++) {
      const seq = i.toString().padStart(6, "0");
      const title = await page.title();
      const date = new Date().toISOString().split("T")[0];
      const path = `screenshot/${date}/${seq}-${title}.png`;
      await page.screenshot({ path });
      await page.waitForTimeout(1_000);
    }
  } catch {
    // NOP
  }
  await page.close();
  await context.close();
  await browser.close();
}

main();
