const now = new Date();

if (import.meta.main) {
  Deno.serve(() => new Response(`${now}: Hello World!`));
}

// $ curl https://great-crow-36.deno.dev/
// Mon Apr 22 2024 03:13:21 GMT+0000 (Coordinated Universal Time): Hello World!
