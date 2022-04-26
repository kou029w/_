import fastify, { FastifyInstance } from "fastify";
import autoload from "fastify-autoload";
import path from "node:path";

type Options = {
  isDev?: boolean;
  quiet?: boolean;
};

type Server = FastifyInstance;

export function create(options: Options): Server {
  const app = fastify({
    logger: !options.quiet && { prettyPrint: options.isDev },
  });
  app.register(autoload, {
    dir: path.resolve(__dirname, "routes"),
    routeParams: true,
  });
  return app;
}

export async function start(server: Server, port: string): Promise<string> {
  await server.ready();
  const address: string = await server.listen(port, "::");
  return address;
}
