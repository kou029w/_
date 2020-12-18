import { readFile } from "fs/promises";
import esbuild from "esbuild";
const { build } = esbuild;
const entryPoint = "src/index.ts";
const { main: cjs, module: esm } = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
);
const base = { entryPoints: [entryPoint], sourcemap: true, bundle: true };
build({ ...base, outfile: esm, format: "esm" });
build({ ...base, outfile: cjs, format: "cjs" });
