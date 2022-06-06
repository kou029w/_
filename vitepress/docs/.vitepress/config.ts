import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "ja-JP",
  title: "VitePressのデモ",
  description: "こんにちはVitePress",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "右上のナビゲーション", link: "/second", activeMatch: "/second" },
    ],
    sidebar: {
      "/": [
        {
          text: "ドキュメント",
          collapsible: true,
          items: [
            { text: "最初のページ", link: "/" },
            { text: "2 番目のページ", link: "/second" },
          ],
        },
      ],
    },

    editLink: {
      repo: "kou029w/_",
      dir: "vitepress/docs",
      text: "Edit this page on GitHub",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/kou029w/_" }],
    footer: {
      message: "フッターです",
      copyright: "Copyright © kou029w",
    },
  },
});
