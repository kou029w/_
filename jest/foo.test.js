import foo from "./foo.js";

test("positive number", () => {
  expect(foo(1)).toBe(1);
});

// test("negative number", () => {
//   expect(foo(-1)).toBe(0);
// });
