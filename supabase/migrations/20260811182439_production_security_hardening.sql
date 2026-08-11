-- Production authorization hardening.
--
-- Billing fields are intentionally server-managed. Quiz content remains readable
-- by guests, while all user-owned data is restricted to the authenticated owner.

begin;

-- Drop the legacy policies so that the policy set below is the single source of
-- truth. service_role bypasses RLS and does not need permissive policies.
do $drop_policies$
declare
  policy_record record;
begin
  for policy_record in
    select schemaname, tablename, policyname
    from pg_policies
    where (schemaname = 'public' and tablename in (
      'documents',
      'profiles',
      'quiz_attempts',
      'rules_questions',
      'signs_questions',
      'user_freemium_quiz_counts',
      'user_incorrect_questions'
    ))
    or (schemaname = 'storage' and tablename = 'objects' and policyname in (
      'Allow authenticated users to upload question images',
      'Allow public read access to question images',
      'Allow service role to manage question images'
    ))
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      policy_record.policyname,
      policy_record.schemaname,
      policy_record.tablename
    );
  end loop;
end
$drop_policies$;

alter table public.documents enable row level security;
alter table public.profiles enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.rules_questions enable row level security;
alter table public.signs_questions enable row level security;
alter table public.user_freemium_quiz_counts enable row level security;
alter table public.user_incorrect_questions enable row level security;

create policy "Active rules are publicly readable"
on public.rules_questions
for select
to anon, authenticated
using (coalesce(is_active, true));

create policy "Active signs are publicly readable"
on public.signs_questions
for select
to anon, authenticated
using (coalesce(is_active, true));

create policy "Users can view their profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can view their quiz attempts"
on public.quiz_attempts
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their quiz attempts"
on public.quiz_attempts
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can view their incorrect questions"
on public.user_incorrect_questions
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their incorrect questions"
on public.user_incorrect_questions
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their incorrect questions"
on public.user_incorrect_questions
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their incorrect questions"
on public.user_incorrect_questions
for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can view their quiz usage"
on public.user_freemium_quiz_counts
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Question images are publicly readable"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'question-images');

-- Explicit Data API grants prevent accidental GraphQL/PostgREST exposure.
revoke all on table public.documents from anon, authenticated;
revoke all on table public.profiles from anon, authenticated;
revoke all on table public.quiz_attempts from anon, authenticated;
revoke all on table public.rules_questions from anon, authenticated;
revoke all on table public.signs_questions from anon, authenticated;
revoke all on table public.user_freemium_quiz_counts from anon, authenticated;
revoke all on table public.user_incorrect_questions from anon, authenticated;

grant select on table public.rules_questions to anon, authenticated;
grant select on table public.signs_questions to anon, authenticated;
grant select on table public.profiles to authenticated;
grant select, insert on table public.quiz_attempts to authenticated;
grant select on table public.user_freemium_quiz_counts to authenticated;
grant select, insert, update, delete on table public.user_incorrect_questions to authenticated;

revoke all on sequence public.quiz_attempts_id_seq from anon, authenticated;
grant usage, select on sequence public.quiz_attempts_id_seq to authenticated;

-- Basic data integrity for client-originated quiz records.
alter table public.quiz_attempts
  drop constraint if exists quiz_attempts_score_bounds,
  add constraint quiz_attempts_score_bounds check (
    score is null
    or (
      score >= 0
      and total_questions_in_attempt is not null
      and score <= total_questions_in_attempt
    )
  ) not valid;

alter table public.quiz_attempts
  drop constraint if exists quiz_attempts_total_questions_bounds,
  add constraint quiz_attempts_total_questions_bounds check (
    total_questions_in_attempt is null
    or total_questions_in_attempt between 1 and 100
  ) not valid;

alter table public.quiz_attempts
  drop constraint if exists quiz_attempts_time_taken_nonnegative,
  add constraint quiz_attempts_time_taken_nonnegative check (
    time_taken_seconds is null or time_taken_seconds >= 0
  ) not valid;

alter table public.user_freemium_quiz_counts
  drop constraint if exists user_freemium_quiz_counts_nonnegative,
  add constraint user_freemium_quiz_counts_nonnegative check (count >= 0) not valid;

-- Content functions run with caller privileges. A fixed search_path removes
-- object-shadowing risk without changing their existing signatures.
alter function public.get_g1_questions_by_category(character varying, character varying, integer, character varying)
  security invoker;
alter function public.get_g1_questions_by_category(character varying, character varying, integer, character varying)
  set search_path = 'public';
alter function public.get_g1_simulation_questions()
  security invoker;
alter function public.get_g1_simulation_questions()
  set search_path = 'public';
alter function public.get_random_g1_questions(integer, integer, integer, character varying, jsonb)
  security invoker;
alter function public.get_random_g1_questions(integer, integer, integer, character varying, jsonb)
  set search_path = 'public';
alter function public.get_random_questions(integer)
  security invoker;
alter function public.get_random_questions(integer)
  set search_path = 'public';
alter function public.get_rules_practice_questions(integer)
  security invoker;
alter function public.get_rules_practice_questions(integer)
  set search_path = 'public';
alter function public.get_signs_practice_questions(integer)
  security invoker;
alter function public.get_signs_practice_questions(integer)
  set search_path = 'public';
alter function public.get_random_practice_questions(uuid, integer, boolean)
  security invoker;
alter function public.get_random_practice_questions(uuid, integer, boolean)
  set search_path = 'public';

-- User-specific read functions now rely on RLS and therefore cannot read data
-- belonging to a UUID supplied by another user.
alter function public.get_incorrect_questions(uuid)
  security invoker;
alter function public.get_incorrect_questions(uuid)
  set search_path = 'public';
alter function public.get_incorrect_questions(uuid, text)
  security invoker;
alter function public.get_incorrect_questions(uuid, text)
  set search_path = 'public';
alter function public.get_user_quiz_attempt_count(uuid, character varying)
  security invoker;
alter function public.get_user_quiz_attempt_count(uuid, character varying)
  set search_path = 'public';
alter function public.get_user_quiz_statistics(uuid)
  security invoker;
alter function public.get_user_quiz_statistics(uuid)
  set search_path = 'public';

-- This mutation needs elevated rights because direct writes to usage counters
-- are denied. It is safe only for the current authenticated user.
create or replace function public.increment_user_quiz_mode_attempts(
  p_user_id uuid,
  p_quiz_mode character varying
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is null or p_user_id <> (select auth.uid()) then
    raise exception 'Not authorized' using errcode = '42501';
  end if;

  if p_quiz_mode not in ('practice', 'standard', 'timed') then
    raise exception 'Invalid quiz mode' using errcode = '22023';
  end if;

  insert into public.user_freemium_quiz_counts (
    user_id,
    mode,
    count,
    last_attempted
  )
  values (p_user_id, p_quiz_mode, 1, now())
  on conflict (user_id, mode)
  do update set
    count = public.user_freemium_quiz_counts.count + 1,
    last_attempted = now(),
    updated_at = now();
end;
$$;

alter function public.reset_user_quiz_attempt_count(uuid, character varying)
  security definer;
alter function public.reset_user_quiz_attempt_count(uuid, character varying)
  set search_path = '';

-- Documents cannot be selected directly. This narrowly-scoped authenticated
-- RPC returns only matching content and never exposes embedding vectors.
create or replace function public.match_documents(
  query_embedding vector,
  filter jsonb default '{}'::jsonb,
  match_count integer default 10
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity double precision
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding operator(public.<=>) query_embedding) as similarity
  from public.documents as d
  where d.embedding is not null
    and (filter = '{}'::jsonb or d.metadata @> filter)
    and 1 - (d.embedding operator(public.<=>) query_embedding) > 0.78
  order by similarity desc
  limit greatest(1, least(coalesce(match_count, 10), 20));
$$;

-- Distributed per-user AI rate limiting. The backing table lives outside the
-- exposed API schema and only the server role can execute the RPC.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists private.ai_rate_limits (
  user_id uuid primary key references auth.users(id) on delete cascade,
  window_started_at timestamp with time zone not null default now(),
  request_count integer not null default 0 check (request_count >= 0)
);

revoke all on table private.ai_rate_limits from public, anon, authenticated;

create or replace function public.consume_ai_rate_limit(p_user_id uuid)
returns boolean
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  allowed boolean;
begin
  if p_user_id is null then
    return false;
  end if;

  insert into private.ai_rate_limits as limits (
    user_id,
    window_started_at,
    request_count
  )
  values (p_user_id, now(), 1)
  on conflict (user_id)
  do update set
    window_started_at = case
      when limits.window_started_at <= now() - interval '1 minute' then now()
      else limits.window_started_at
    end,
    request_count = case
      when limits.window_started_at <= now() - interval '1 minute' then 1
      else limits.request_count + 1
    end
  returning request_count <= 10 into allowed;

  return allowed;
end;
$$;

-- Trigger functions cannot be invoked through the Data API.
alter function public.block_delete_and_truncate() set search_path = '';
alter function public.handle_new_user() set search_path = '';
alter function public.handle_updated_at() set search_path = '';
alter function public.update_updated_at_column() set search_path = '';

revoke execute on function public.block_delete_and_truncate() from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.handle_updated_at() from public, anon, authenticated;
revoke execute on function public.update_updated_at_column() from public, anon, authenticated;

-- Start with no inherited PUBLIC execute privilege, then allow only the roles
-- needed by each application surface.
revoke execute on function public.get_g1_questions_by_category(character varying, character varying, integer, character varying) from public;
revoke execute on function public.get_g1_simulation_questions() from public;
revoke execute on function public.get_random_g1_questions(integer, integer, integer, character varying, jsonb) from public;
revoke execute on function public.get_random_questions(integer) from public;
revoke execute on function public.get_rules_practice_questions(integer) from public;
revoke execute on function public.get_signs_practice_questions(integer) from public;
revoke execute on function public.get_random_practice_questions(uuid, integer, boolean) from public;
revoke execute on function public.get_incorrect_questions(uuid) from public;
revoke execute on function public.get_incorrect_questions(uuid, text) from public;
revoke execute on function public.get_user_quiz_attempt_count(uuid, character varying) from public;
revoke execute on function public.get_user_quiz_statistics(uuid) from public;
revoke execute on function public.increment_user_quiz_mode_attempts(uuid, character varying) from public;
revoke execute on function public.reset_user_quiz_attempt_count(uuid, character varying) from public;
revoke execute on function public.match_documents(vector, jsonb, integer) from public;
revoke execute on function public.consume_ai_rate_limit(uuid) from public;

revoke execute on function public.get_incorrect_questions(uuid) from anon;
revoke execute on function public.get_incorrect_questions(uuid, text) from anon;
revoke execute on function public.get_user_quiz_attempt_count(uuid, character varying) from anon;
revoke execute on function public.get_user_quiz_statistics(uuid) from anon;
revoke execute on function public.increment_user_quiz_mode_attempts(uuid, character varying) from anon;
revoke execute on function public.reset_user_quiz_attempt_count(uuid, character varying) from anon, authenticated;
revoke execute on function public.match_documents(vector, jsonb, integer) from anon;
revoke execute on function public.consume_ai_rate_limit(uuid) from anon, authenticated;

grant execute on function public.get_g1_questions_by_category(character varying, character varying, integer, character varying) to anon, authenticated;
grant execute on function public.get_g1_simulation_questions() to anon, authenticated;
grant execute on function public.get_random_g1_questions(integer, integer, integer, character varying, jsonb) to anon, authenticated;
grant execute on function public.get_random_questions(integer) to anon, authenticated;
grant execute on function public.get_rules_practice_questions(integer) to anon, authenticated;
grant execute on function public.get_signs_practice_questions(integer) to anon, authenticated;
grant execute on function public.get_random_practice_questions(uuid, integer, boolean) to anon, authenticated;
grant execute on function public.get_incorrect_questions(uuid) to authenticated;
grant execute on function public.get_incorrect_questions(uuid, text) to authenticated;
grant execute on function public.get_user_quiz_attempt_count(uuid, character varying) to authenticated;
grant execute on function public.get_user_quiz_statistics(uuid) to authenticated;
grant execute on function public.increment_user_quiz_mode_attempts(uuid, character varying) to authenticated;
grant execute on function public.reset_user_quiz_attempt_count(uuid, character varying) to service_role;
grant execute on function public.match_documents(vector, jsonb, integer) to authenticated, service_role;
grant execute on function public.consume_ai_rate_limit(uuid) to service_role;

commit;
