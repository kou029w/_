import autoload from "@fastify/autoload";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import fastify from "fastify";
import path from "node:path";

const app = fastify();

app.register(autoload, {
  dir: path.resolve(__dirname, "_routes"),
  options: {
    prefix: "/api",
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await app.ready();
  app.server.emit("request", req, res);
}
