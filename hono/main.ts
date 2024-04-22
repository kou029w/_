import { Hono } from "npm:hono";
import { showRoutes } from "npm:hono/dev";
import { html } from "npm:hono/html";
import { Foo } from "./foo.tsx";

const app = new Hono();

const Html = html`<!DOCTYPE html>
  <html>
    <head>
      <title>Hello</title>
    </head>
    <body>
      ${Foo({
        messages: ["bar", "baz"],
      })}
    </body>
  </html>`;

app.get("/", (c) => {
  return c.html(Html);
});

const port = 3000;

Deno.serve({ port }, app.fetch);
showRoutes(app);
