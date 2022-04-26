import { create, start } from "./server";

async function main() {
  const server = create({ isDev: true });
  await start(server, "3000");
}

main();
