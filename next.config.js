module.exports = require("@next/mdx")({
  extension: /\.mdx?$/
})({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  assetPrefix: process.env.NEXT_ASSET_PREFIX || ""
});
