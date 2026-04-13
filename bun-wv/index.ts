await using view = new Bun.WebView();
await view.navigate("chrome://version/");
const url = view.url;
const title = await view.evaluate("document.title");
console.log(url, title);
const screenshot = await view.screenshot({ format: "webp" });
await Bun.write("linux-chrome-screenshot.webp", screenshot);
