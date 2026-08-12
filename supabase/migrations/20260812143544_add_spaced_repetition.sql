begin;

create table if not exists public.user_question_reviews (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id integer not null check (question_id > 0),
  question_type text not null check (question_type in ('signs', 'rules')),
  mastery_level smallint not null default 0 check (mastery_level between 0 and 5),
  consecutive_correct integer not null default 0 check (consecutive_correct >= 0),
  lapses integer not null default 0 check (lapses >= 0),
  last_result boolean,
  last_response_seconds integer check (
    last_response_seconds is null
    or last_response_seconds between 0 and 3600
  ),
  last_reviewed_at timestamptz,
  next_review_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id, question_type)
);

comment on table public.user_question_reviews is
  'Per-user spaced-repetition schedule for each G1 practice question.';

create index if not exists user_question_reviews_due_idx
  on public.user_question_reviews (user_id, next_review_at, mastery_level);

create index if not exists user_question_reviews_mastery_idx
  on public.user_question_reviews (user_id, mastery_level);

alter table public.user_question_reviews enable row level security;

drop policy if exists "Users can read their review schedules"
  on public.user_question_reviews;
create policy "Users can read their review schedules"
on public.user_question_reviews
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their review schedules"
  on public.user_question_reviews;
create policy "Users can create their review schedules"
on public.user_question_reviews
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their review schedules"
  on public.user_question_reviews;
create policy "Users can update their review schedules"
on public.user_question_reviews
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

revoke all on table public.user_question_reviews from anon;
revoke all on table public.user_question_reviews from authenticated;
grant select, insert, update on table public.user_question_reviews to authenticated;

commit;
