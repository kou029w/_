import { serve } from "https://deno.land/std@0.56.0/http/server.ts";

async function main() {
  const port = 8000;
  console.log(`http://localhost:${port}/`);
  for await (const req of serve({ port })) {
    req.respond({ body: "Hello World\n" });
  }
}
main();
