import { createEndpoint, createRouter } from "npm:better-call";
import { z } from "npm:zod";

export const createItem = createEndpoint(
  "/item/:id",
  {
    method: "GET",
    query: z.object({
      id: z.string("The id of the item"),
    }),
    metadata: {
      openapi: {
        description: "This endpoint creates an item based on the provided ID.",
        responses: {
          200: {
            description: "Successful response with the created item.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    item: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          description: "The ID of the created item.",
                        },
                      },
                      required: ["id"],
                    },
                  },
                  required: ["item"],
                },
              },
            },
          },
        },
      },
    },
  },
  async (ctx) => ({ item: { id: ctx.query.id } }),
);

if (import.meta.main) {
  Deno.serve(
    createRouter({
      redirectToDocs: createEndpoint("/", { method: "GET" }, async (ctx) =>
        ctx.redirect("/api/reference"),
      ),
      createItem,
    }),
  );
}
