module.exports = require("@next/mdx")({
  extension: /\.mdx?$/
})({
  pageExtensions: ["ts", "tsx", "md", "mdx"]
});
