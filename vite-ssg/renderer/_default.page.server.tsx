import renderToString from "preact-render-to-string";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import type { PageContextBuiltIn } from "vite-plugin-ssr/types";

export async function render(pageContext: PageContextBuiltIn) {
  const { Page } = pageContext;
  const html = renderToString(<Page />);

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>vite-ssg-example</title>
      </head>
      <body>${dangerouslySkipEscape(html)}</body>
    </html>`;
}
