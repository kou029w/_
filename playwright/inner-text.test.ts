import { expect, test } from "@playwright/test";

test("first", async ({ page }) => {
  // @ts-ignore
  await page.goto(`file:///${__dirname}/test.html`);

  // playwright test --browser=chromium : pass
  // playwright test --browser=firefox  : pass
  // playwright test --browser=webkit   : fail (return `1\n`)
  expect(await page.innerText("first-test")).toBe(`1`);
});

test("second", async ({ page }) => {
  // @ts-ignore
  await page.goto(`file:///${__dirname}/test.html`);

  // playwright test --browser=chromium : pass
  // playwright test --browser=firefox  : pass
  // playwright test --browser=webkit   : fail (return `2\n`)
  expect(await page.innerText("second-test")).toBe(`2`);
});
