import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";

/** @type {import("fastify").FastifyPluginAsync} */
const app = async (fastify, opts) => {
  fastify.get("/hello", async () => "hello");

  if (opts.dev) {
    const astro = await import("astro");
    const astroDevServer = await astro.dev({
      root: fileURLToPath(import.meta.resolve(".")),
    });
    await fastify.register(await import("@fastify/http-proxy"), {
      upstream: `http://localhost:${astroDevServer.address.port}`,
    });
  } else {
    await fastify.register(fastifyStatic, {
      root: fileURLToPath(import.meta.resolve("./dist/client")),
    });
    await fastify.register(fastifyMiddie);
    const astroServer = await import("./dist/server/entry.mjs");
    fastify.use(astroServer.handler);
  }

  fastify.get("/world", async () => "world");
};

export default app;
