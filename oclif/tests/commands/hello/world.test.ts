import { test, expect } from "vitest";
import { stdout } from "stdout-stderr";
import World from "../../../src/commands/hello/world";

test("hello world", async () => {
  await World.run();
  expect(stdout.output).toContain("hello world!");
});
