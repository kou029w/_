import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("https://example.com/");
const l1 = await page.evaluate(() => location.href);
console.log(l1);
await page.click("a");
const l2 = await page.evaluate(() => location.href);
console.log(l2);
await browser.close();
