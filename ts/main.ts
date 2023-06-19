import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("OK");
});

const address = app.listen(3000).address();

console.log(address);

(async () => {
  const res = await fetch(`http://127.0.0.1:${address?.port}/`);
  console.log(res.url, res.status, res.statusText);
  console.log(await res.text());
})();
