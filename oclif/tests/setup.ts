import { afterEach, beforeEach } from "vitest";
import { stdout, stderr } from "stdout-stderr";

beforeEach(() => {
  stdout.start();
  stderr.start();
});

afterEach(() => {
  stdout.stop();
  stderr.stop();
});
