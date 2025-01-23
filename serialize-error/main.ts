import { addKnownErrorConstructor } from "npm:serialize-error";

export class E extends Error {
  code = "ERR";
}

addKnownErrorConstructor(E);
