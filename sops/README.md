# SOPS

Secret management using SOPS (Secrets OPerationS) encryption.

## Files

- `credentials.enc.yml` - Encrypted credentials file
- `jwk.enc.json` - Encrypted JWK file
- `Makefile` - Build and encryption commands

## Usage

```bash
make encrypt
make decrypt
```