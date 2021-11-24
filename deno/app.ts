import { Handler, ServeInit, serve } from "http/server.ts";

const handler: Handler = () => new Response("Hello World\n");
const options: ServeInit = { addr: "localhost:8080" };

serve(handler, options);
console.log(`Server running on http://${options.addr}`);
