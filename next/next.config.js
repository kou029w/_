module.exports = require("@next/mdx")({
  extension: /\.mdx?$/,
})({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
});
