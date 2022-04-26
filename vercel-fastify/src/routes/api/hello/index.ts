import { FastifyInstance } from "fastify";

async function index(fastify: FastifyInstance): Promise<void> {
  fastify.get("/", async () => "Hello, World!");
}

export default index;
