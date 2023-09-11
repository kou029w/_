import fastify from "fastify";

const server = fastify({ logger: true });

server.get("/", {
  schema: {
    querystring: {
      type: "object",
      properties: { dateTime: { type: "string", format: "date-time" } },
      required: ["dateTime"],
    },
  },
  handler() {
    return "ok";
  },
});

// valid
await server.inject("/?dateTime=2021-09-10T15:30:00Z");

// valid
await server.inject("/?dateTime=2021-09-10T15:30:00");

// invalid: querystring/dateTime must match format "date-time"
await server.inject("/?dateTime=2021-09-10");
