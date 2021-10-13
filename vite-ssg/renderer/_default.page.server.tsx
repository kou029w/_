import renderToString from "preact-render-to-string";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import type { PageContextBuiltIn } from "vite-plugin-ssr/types";

export async function render(pageContext: PageContextBuiltIn) {
  const html = renderToString(
    <html>
      <head>
        <title>vite-ssg-example</title>
      </head>
      <body>
        <pageContext.Page />
      </body>
    </html>
  );

  return escapeInject`<!DOCTYPE html>${dangerouslySkipEscape(html)}`;
}
