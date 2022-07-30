import { test, expect } from "@playwright/test";
import sum from "./sum";

test("1 + 1 = 2", () => {
  expect(sum(1, 1)).toBe(2);
});
