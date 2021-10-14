/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
  mount: {
    src: "/",
  },
  plugins: ["@snowpack/plugin-typescript"],
  buildOptions: {
    jsxInject: `import { h, Fragment } from "preact"`,
  },
};

export default config;
