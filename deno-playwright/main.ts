import { chromium } from "npm:playwright";

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto("https://example.com");
await new Promise((r) => setTimeout(r, 10_000));
await browser.close();
