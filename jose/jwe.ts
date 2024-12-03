import {
  compactDecrypt,
  CompactEncrypt,
  exportJWK,
  generateKeyPair,
  importJWK,
} from "npm:jose";

/*
 * JWE_SECRET=$(openssl rand -base64 32) deno run -A jwe.ts
 */

const encryptionKey = await importJWK({
  kty: "oct",
  k: Deno.env.get("JWE_SECRET"),
});

const keyToEncrypt = await generateKeyPair("ES256", { extractable: true });
const privateKeyJWK = await exportJWK(keyToEncrypt.privateKey);

// encrypt
const jwe = await new CompactEncrypt(
  new TextEncoder().encode(JSON.stringify(privateKeyJWK)),
)
  .setProtectedHeader({
    alg: "dir",
    enc: "A256GCM",
  })
  .encrypt(encryptionKey);

// decrypt
const res = await compactDecrypt(jwe, encryptionKey);
const jwk = JSON.parse(new TextDecoder().decode(res.plaintext));

console.log({
  jwe,
  jwk,
});
