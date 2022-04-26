import { FastifyInstance } from "fastify";

async function index(fastify: FastifyInstance): Promise<void> {
  fastify.get("/", async () => fastify.printRoutes());
  fastify.get("/query", async ({ query }) => query);
  fastify.post("/body", async ({ body }) => body);
}

export default index;
