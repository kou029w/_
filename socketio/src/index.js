// @ts-check
const path = require("path");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = Number(process.env.PORT) || 8080;

app.get("/", function(_, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

http.listen(port, function() {
  console.log(`listening on http://localhost:${port}`);
});

io.on("connect", socket => {
  socket.on("message", message => io.send(message));
});
