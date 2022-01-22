import { renderToString } from "solid-js/web";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import type { PageContextBuiltIn } from "vite-plugin-ssr/types";

export async function render(pageContext: PageContextBuiltIn) {
  const page = renderToString(pageContext.Page);
  return escapeInject`<!DOCTYPE html>
<html>
  <head>
    <title>vite-ssg-example</title>
  </head>
  <body>
    ${dangerouslySkipEscape(page)}
  </body>
</html>
`;
}
