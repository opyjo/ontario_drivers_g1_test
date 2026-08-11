begin;

-- The application API authenticates the user and calls these operations with
-- the server role. They are not part of the browser-facing RPC surface.
revoke execute on function public.match_documents(vector, jsonb, integer)
  from authenticated;
grant execute on function public.match_documents(vector, jsonb, integer)
  to service_role;

revoke execute on function public.increment_user_quiz_mode_attempts(uuid, character varying)
  from authenticated;
grant execute on function public.increment_user_quiz_mode_attempts(uuid, character varying)
  to service_role;

-- Keep an explicit deny policy as documentation and to prevent future table
-- grants from exposing embeddings accidentally.
create policy "Documents have no direct browser access"
on public.documents
for select
to anon, authenticated
using (false);

commit;
