import { test } from "node:test";
import assert from "node:assert/strict";
import message from "./hello.js";

test("say hello", () => {
  assert.equal(message, "hello!");
});
