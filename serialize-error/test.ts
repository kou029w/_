import assert from "node:assert";
import { deserializeError, serializeError } from "npm:serialize-error";
import { E } from "./main.ts";

Deno.test("serializeError", () => {
  const e = serializeError(new E());
  assert(e.code === "ERR");
  assert(e.stack?.match(/^Error\n/));
});

Deno.test("deserializeError", () => {
  assert(deserializeError({ name: "E", message: "🦄" }) instanceof E);
});
