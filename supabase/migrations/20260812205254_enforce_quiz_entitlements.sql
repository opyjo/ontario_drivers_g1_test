begin;

-- Quiz usage is deliberately kept outside the exposed Data API schema. The
-- public RPC below is the only application path and derives the user from the
-- authenticated request rather than trusting a caller-supplied user id.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table private.quiz_usage (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid not null,
  mode text not null check (mode in ('practice', 'simulation')),
  used_on date not null,
  created_at timestamp with time zone not null default now(),
  constraint quiz_usage_user_session_unique unique (user_id, session_id)
);

create index quiz_usage_user_mode_day_idx
  on private.quiz_usage (user_id, mode, used_on);

alter table private.quiz_usage enable row level security;
revoke all on table private.quiz_usage from public, anon, authenticated;
revoke all on sequence private.quiz_usage_id_seq from public, anon, authenticated;

create or replace function public.consume_quiz_access(
  p_mode text,
  p_session_id uuid,
  p_question_limit integer default 10
)
returns table (
  allowed boolean,
  is_paid boolean,
  reason text,
  practice_remaining integer,
  simulation_remaining integer,
  reset_at timestamp with time zone
)
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_today date := (now() at time zone 'America/Toronto')::date;
  v_is_paid boolean := false;
  v_practice_count integer := 0;
  v_simulation_count integer := 0;
  v_existing_mode text;
  v_limit integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if p_mode not in ('practice', 'simulation') then
    raise exception 'Invalid quiz mode' using errcode = '22023';
  end if;

  if p_session_id is null then
    raise exception 'A session id is required' using errcode = '22023';
  end if;

  if p_question_limit not in (10, 20, 40) then
    raise exception 'Invalid question limit' using errcode = '22023';
  end if;

  -- Serialize starts per user so simultaneous browser tabs cannot both pass a
  -- daily limit check. The transaction-scoped lock is released automatically.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(v_user_id::text, 0)
  );

  select exists (
    select 1
    from public.profiles as profile
    where profile.id = v_user_id
      and profile.access_level in ('lifetime', 'subscribed_monthly')
  ) into v_is_paid;

  select usage.mode
    into v_existing_mode
  from private.quiz_usage as usage
  where usage.user_id = v_user_id
    and usage.session_id = p_session_id;

  select
    count(*) filter (where usage.mode = 'practice'),
    count(*) filter (where usage.mode = 'simulation')
  into v_practice_count, v_simulation_count
  from private.quiz_usage as usage
  where usage.user_id = v_user_id
    and usage.used_on = v_today;

  reset_at := ((v_today + 1)::timestamp at time zone 'America/Toronto');
  is_paid := v_is_paid;

  if v_is_paid then
    allowed := true;
    reason := 'allowed';
    practice_remaining := null;
    simulation_remaining := null;
    return next;
    return;
  end if;

  if p_mode = 'practice' and p_question_limit <> 10 then
    allowed := false;
    reason := 'upgrade_required';
    practice_remaining := greatest(0, 5 - v_practice_count);
    simulation_remaining := greatest(0, 2 - v_simulation_count);
    return next;
    return;
  end if;

  -- A repeated request with the same id is a retry, not another attempt.
  if v_existing_mode is not null then
    allowed := v_existing_mode = p_mode;
    reason := case when allowed then 'allowed' else 'invalid_session' end;
    practice_remaining := greatest(0, 5 - v_practice_count);
    simulation_remaining := greatest(0, 2 - v_simulation_count);
    return next;
    return;
  end if;

  v_limit := case when p_mode = 'practice' then 5 else 2 end;
  if (p_mode = 'practice' and v_practice_count >= v_limit)
     or (p_mode = 'simulation' and v_simulation_count >= v_limit) then
    allowed := false;
    reason := 'daily_limit';
    practice_remaining := greatest(0, 5 - v_practice_count);
    simulation_remaining := greatest(0, 2 - v_simulation_count);
    return next;
    return;
  end if;

  insert into private.quiz_usage (user_id, session_id, mode, used_on)
  values (v_user_id, p_session_id, p_mode, v_today);

  if p_mode = 'practice' then
    v_practice_count := v_practice_count + 1;
  else
    v_simulation_count := v_simulation_count + 1;
  end if;

  allowed := true;
  reason := 'allowed';
  practice_remaining := greatest(0, 5 - v_practice_count);
  simulation_remaining := greatest(0, 2 - v_simulation_count);
  return next;
end;
$$;

revoke execute on function public.consume_quiz_access(text, uuid, integer)
  from public, anon;
grant execute on function public.consume_quiz_access(text, uuid, integer)
  to authenticated;

comment on function public.consume_quiz_access(text, uuid, integer) is
  'Atomically enforces paid and daily free quiz-start entitlements for the authenticated user.';

commit;
