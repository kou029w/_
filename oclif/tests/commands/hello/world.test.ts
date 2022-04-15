import {  test, expect } from "vitest";
import run from "../../run";
import World from "../../../src/commands/hello/world";

test("hello world", async () => {
  const res = await run(() => World.run());
  expect(res).toContain("hello world!");
});

test("hello world", async () => {
  const res = await run(() => World.run());
  expect(res).toContain("hello world!");
});
