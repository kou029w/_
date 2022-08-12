// @ts-check
const title = "Example Docs";
const locales = ["ja"];

/** @type {import("@docusaurus/types").Config} */
module.exports = {
  url: "http://localhost:3000",
  baseUrl: "/",
  title,
  i18n: { locales, defaultLocale: locales[0] },
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: {
          editUrl: "https://github.com/kou029w/_/tree/main/docusaurus",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
      }),
    ],
  ],
  themeConfig: {
    navbar: {
      title,
    },
  },
};
