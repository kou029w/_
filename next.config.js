const withTypescript = require("@zeit/next-typescript");
const withMDX = require("@zeit/next-mdx");

module.exports = [
  [
    withMDX({
      extension: /\.mdx?$/
    }),
    {
      pageExtensions: ["md", "mdx"]
    }
  ],
  [withTypescript]
].reduce((o, [f, a]) => f(Object.assign(o, a)), {});
