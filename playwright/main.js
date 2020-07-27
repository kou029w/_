const playwright = require("playwright");

async function main() {
  // NOTE: Unhandled promise rejection terminates Node.js process with non-zero exit code.
  process.on("unhandledRejection", (event) => {
    throw event;
  });

  for (const browserType of ["chromium", "firefox", "webkit"]) {
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://whatsmyuseragent.org/");
    await page.screenshot({
      path: `screenshots/${browserType}.png`,
    });
    await browser.close();
  }
}
main();
