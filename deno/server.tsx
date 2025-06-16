#!/usr/bin/env -S deno run --watch -A
/* @jsxImportSource npm:hono/jsx */
import { writeFile } from "node:fs/promises";
import { Context, Hono } from "npm:hono";
import { HTTPException } from "npm:hono/http-exception";

if (import.meta.main) {
  const app = new Hono();

  app.get("/", (c) => c.redirect("/index.html"));
  app.get("/:file", async (c) => {
    const file = new URL(c.req.param("file"), import.meta.url).href;

    try {
      if (
        c.req.header("accept")?.match(/\btext\/html\b/) &&
        (c.req.queries("edit") || file.match(/[.][jt]sx?$/))
      ) {
        const path = c.req.queries("edit") ? import.meta.url : file;
        const { default: Component } = await import(path);
        return c.html(Component(c));
      }

      return await fetch(file);
    } catch (error) {
      throw new HTTPException(404, error as Error);
    }
  });

  app.post("/:file", async (c) => {
    const file = c.req.param("file");
    const body = await c.req.text();
    await writeFile(file, body);
    return c.text("ok");
  });

  Deno.serve(app.fetch);
}

export default function EditorPage(c: Context) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{c.req.param("file")}</title>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `\
import { javascript } from "https://esm.sh/@codemirror/lang-javascript";
import { oneDark } from "https://esm.sh/@codemirror/theme-one-dark";
import { EditorView, basicSetup } from "https://esm.sh/codemirror";

const code = await fetch(document.location.href).then(r => r.text());

const view = new EditorView({
  doc: code,
  extensions: [
    basicSetup,
    oneDark,
    javascript({ jsx: true, typescript: true }),
  ],
  parent: document.body,
});

addEventListener("keydown", async e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    await fetch(document.location.href, { method: "POST", body: view.state.doc.toString() });
    location.reload();
  }
});
`,
          }}
        />
      </head>
      <body></body>
    </html>
  );
}
