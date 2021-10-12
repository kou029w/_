import fastify, { FastifyInstance } from "fastify";
import cors from "fastify-cors";
import autoLoad from "fastify-autoload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

type Option = {
  port: string | number;
  isDev?: boolean;
};

type Server = {
  app: FastifyInstance;
  port: string | number;
};

const __dirname: string = dirname(fileURLToPath(import.meta.url));

export function create(option: Option): Server {
  const app = fastify({ logger: option.isDev });
  app.register(cors);
  app.register(autoLoad, { dir: join(__dirname, "routes") });
  return { app, port: option.port };
}

export async function start(server: Server): Promise<string> {
  return await server.app.listen(server.port, "::");
}
