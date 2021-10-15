CREATE ROLE anonymous;
ALTER ROLE anonymous SET statement_timeout = '1s';
CREATE TABLE users (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT
);
GRANT INSERT (name) ON users TO anonymous;
