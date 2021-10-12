import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import ssr from "vite-plugin-ssr/plugin";

export default defineConfig({
  plugins: [preact(), ssr()],
});
