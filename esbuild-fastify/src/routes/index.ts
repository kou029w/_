import { FastifyInstance, FastifyReply } from "fastify";

async function sayHello(_: unknown, reply: FastifyReply) {
  await reply.send("hello!");
}

async function index(fastify: FastifyInstance) {
  fastify.get("/", sayHello);
}

export default index;
