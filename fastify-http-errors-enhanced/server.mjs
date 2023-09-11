import fastify from "fastify";
import fastifyHttpErrorsEnhanced from "fastify-http-errors-enhanced";
import { ForbiddenError } from "http-errors-enhanced";

const server = fastify();

await server.register(fastifyHttpErrorsEnhanced);

// code プロパティが失われる
server.get("/error", () => new ForbiddenError());

// これらは同じで、エラーの引数のメッセージだったものが、スタックトレースが取れるようになる
// また、NODE_ENV=production のとき "An error occurred trying to process your request." にすべて置き換わる
server.get("/return", {
  handler() {
    return new Error("return.");
  },
});
server.get("/throw", {
  handler() {
    throw new Error("throw.");
  },
});
server.get("/async", {
  async handler() {
    throw new Error("async.");
  },
});
server.get("/async-return", {
  async handler() {
    return new Error("async return.");
  },
});

server.get("/validation", {
  schema: {
    // 400 エラーの構造が変わり failedValidations.query.a プロパティが生える
    querystring: {
      type: "object",
      properties: { a: { type: "string" } },
      required: ["a"],
    },
  },
  async handler() {
    return "ok";
  },
});

await server.listen({ port: 3000 });
