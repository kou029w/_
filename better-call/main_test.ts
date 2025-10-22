import { assertEquals } from "@std/assert";
import { createItem } from "./main.ts";

Deno.test(async function addTest() {
  const res = await createItem({ query: { id: "1" }, params: { id: "user1" } });
  assertEquals(res.item.id, "1");
});
