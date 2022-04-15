import { test, expect } from "vitest";
import { stdout } from "stdout-stderr";
import Hello from "../../../src/commands/hello/index";

test("hello", async () => {
  await Hello.run(["friend", "--from=oclif"]);
  expect(stdout.output).toContain("hello friend from oclif!");
});
