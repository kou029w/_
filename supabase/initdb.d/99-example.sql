ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL PRIVILEGES ON TABLES FROM anon, authenticated;

CREATE TABLE users (
  uuid    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role    NAME NOT NULL DEFAULT current_user,
  name    TEXT
);

GRANT ALL PRIVILEGES (name) ON users TO authenticated;
GRANT SELECT ON users TO anon, authenticated;

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY users_policy ON users USING (role = current_user);
