import { test, expect } from "vitest";
import run from "../../run";
import Hello from "../../../src/commands/hello/index";

test("hello", async () => {
  const res = await run(() => Hello.run(["friend", "--from=oclif"]));
  expect(res).toContain("hello friend from oclif!");
});
