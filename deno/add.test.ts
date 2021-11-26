import { assertStrictEquals } from "testing/asserts.ts";
import { add } from "./add.ts";

Deno.test({
  name: "add",
  fn() {
    assertStrictEquals(add(1, 2), 3);
  },
});
