import { create } from "../dist/server";

const server = create({ isDev: process.env.NODE_ENV === "development" });

async function index(req, res) {
  await server.ready();
  server.server.emit("request", req, res);
}

export default index;
