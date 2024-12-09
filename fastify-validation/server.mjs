import fastify from "fastify";
import { parse as JsonParse } from "secure-json-parse";

const server = fastify({ logger: true });

server.get("/array", {
  schema: {
    querystring: {
      type: "object",
      properties: { array: { type: "array", items: { type: "string" } } },
      required: ["array"],
    },
  },
  async preValidation(req) {
    req.query.array = [req.query.array].flat().flatMap((s) => {
      try {
        const parsed = JsonParse(s);
        return Array.isArray(parsed) ? parsed : [s];
      } catch {
        return [s];
      }
    });
  },
  handler({ query }) {
    console.log({ ...query });
    return "ok";
  },
});

// valid
await server.inject(`/array?array=["123",4]`);

/*
server.get("/dateTime", {
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
await server.inject("/dateTime?dateTime=2021-09-10T15:30:00Z");

// valid: fasitfy@4.22.2, invalid fastify@5.1.0: querystring/dateTime must match format "date-time"
await server.inject("/dateTime?dateTime=2021-09-10T15:30:00");

// invalid: querystring/dateTime must match format "date-time"
await server.inject("/dateTime?dateTime=2021-09-10");
*/
