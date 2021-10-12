import { create, start } from "./server.js";

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT;

async function main() {
  const server = create({ isDev, port });
  await start(server);
}

main();
