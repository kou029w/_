import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { html } from "hono/html";
import { showRoutes } from "hono/dev";
import { Foo } from "./foo";

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

serve({ ...app, port });
showRoutes(app);
