const playwright = require("playwright");

async function main() {
  for (const browserType of ["chromium", "firefox", "webkit"]) {
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://whatsmyuseragent.org/");
    await page.screenshot({
      path: `screenshot/${
        process.env.PLAYWRIGHT_RUNNER || "example"
      }-${browserType}.png`,
    });
    await browser.close();
  }
}
main();
