import { hydrate as reactHydrate } from "preact";
import { getPage } from "vite-plugin-ssr/client";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/types";

export async function hydrate() {
  const pageContext = await getPage<PageContextBuiltInClient>();
  const { Page } = pageContext;

  reactHydrate(<Page />, document.body);
}
