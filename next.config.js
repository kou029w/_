const NEXT_BASE_PATH = process.env.NEXT_ASSET_PREFIX || "";

module.exports = require("@next/mdx")({
  extension: /\.mdx?$/
})({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  assetPrefix: NEXT_BASE_PATH,
  env: { NEXT_BASE_PATH }
});
