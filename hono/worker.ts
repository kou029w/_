import { Hono } from "hono";
import { html } from "hono/html";

const app = new Hono();

const Html = html`<!DOCTYPE html>
  <html>
    <head>
      <title>Hello</title>
    </head>
    <body>
      hello from worker.ts
    </body>
  </html>`;

app.get("/", (c) => {
  return c.html(Html);
});

export default app;
