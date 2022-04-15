import { vi } from "vitest";

/**
 * 標準出力のテストのためのヘルパー
 * @param proc 実行する関数
 * @return 標準出力の結果
 */
async function run(proc: () => PromiseLike<void>): Promise<string> {
  const out: string[] = [];
  const stdout = vi.spyOn(process.stdout, "write").mockImplementation((val) => {
    out.push(val as string);
    return true;
  });
  await proc();
  stdout.mockRestore();
  return out.join("");
}

export default run;
