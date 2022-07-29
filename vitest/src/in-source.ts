function sum(a: number, b: number) {
  return a + b;
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test("1 + 1 = 2", () => {
    expect(sum(1, 1)).toBe(2);
  });
}
