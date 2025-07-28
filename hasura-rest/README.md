# Hasura REST

Hasura GraphQL Engine setup with REST endpoints and database migrations.

## Structure

- `metadata/` - Hasura metadata configuration
- `migrations/` - Database migration files
- `compose.yml` - Docker Compose setup
- `config.yaml` - Hasura configuration

## Usage

```bash
docker compose up
make migrate
```