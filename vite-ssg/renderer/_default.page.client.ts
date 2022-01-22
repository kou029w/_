import { hydrate as solidHydrate } from "solid-js/web";
import { getPage } from "vite-plugin-ssr/client";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/types";

export async function hydrate() {
  const pageContext = await getPage<PageContextBuiltInClient>();
  solidHydrate(pageContext.Page, document.body);
}
