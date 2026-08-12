begin;

-- The table is isolated in a non-exposed schema with all privileges
-- revoked from PUBLIC, anon, and authenticated. RLS adds defense in depth;
-- the postgres-owned SECURITY DEFINER rate-limit function continues to be the
-- only application access path.
alter table private.ai_rate_limits enable row level security;

commit;
