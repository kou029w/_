import { test } from "node:test";
import assert from "node:assert/strict";

test("parse json", () => {
  const json = `{"name": "太郎", "age": 42}`;
  const obj = JSON.parse(json);
  assert.deepEqual(obj, { name: "太郎", age: 42 });
});
