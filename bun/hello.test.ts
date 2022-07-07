import { test, expect } from "bun:test";
import hello from "./hello";

test("response", async () => {
  const res = hello.fetch(new Request(""));
  expect(await res.text()).toBe("Hello, World!");
});
