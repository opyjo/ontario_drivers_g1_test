begin;

alter table public.signs_questions
  add column if not exists learning_topic text,
  add column if not exists handbook_section text,
  add column if not exists handbook_url text;

alter table public.rules_questions
  add column if not exists learning_topic text,
  add column if not exists handbook_section text,
  add column if not exists handbook_url text;

update public.signs_questions
set
  learning_topic = 'Road signs',
  handbook_section = 'Traffic signs and lights',
  handbook_url = 'https://www.ontario.ca/document/official-mto-drivers-handbook/traffic-signs-and-lights'
where learning_topic is null
   or handbook_section is null
   or handbook_url is null;

update public.rules_questions
set
  learning_topic = case
    when category ~* '(licen[cs]|demerit|suspension|address|insurance|alcohol|breathalyzer|dui|disqualified|required documents|emissions|vision)' then 'Licensing and responsibilities'
    when category ~* '(accident|collision|emergency|brake failure|tire puncture|breakdown|loss of vehicle control)' then 'Emergencies and collisions'
    when category ~* '(weather|night|fog|snow|winter|hydroplan|slip|headlight|lighting)' then 'Weather and night driving'
    when category ~* '(pedestrian|cyclist|bicycle|motorcycle|school bus|public transit|large vehicle|animal|sharing)' then 'Sharing the road'
    when category ~* '(intersection|right.of.way|traffic light|flashing|yellow light|stop sign|yield sign|road sign|road line|lane marking|white line|traffic light combination)' then 'Intersections, signs and signals'
    when category ~* '(parking|backing|lane change|lane usage|merging|passing|turn|curve|freeway|highway entry|highway exit|leaving parking)' then 'Road position and manoeuvres'
    else 'Safe and responsible driving'
  end,
  handbook_section = case
    when category ~* '(licen[cs]|demerit|suspension|address|insurance|alcohol|breathalyzer|dui|disqualified|required documents|emissions|vision)' then 'Getting your driver''s licence'
    when category ~* '(accident|collision|emergency|brake failure|tire puncture|breakdown|loss of vehicle control)' then 'Dealing with emergencies'
    when category ~* '(pedestrian|cyclist|bicycle|motorcycle|school bus|public transit|large vehicle|animal|sharing)' then 'Sharing the road with other road users'
    when category ~* '(intersection|right.of.way)' then 'Driving through intersections'
    when category ~* '(traffic light|flashing|yellow light|stop sign|yield sign|road sign|road line|lane marking|white line|traffic light combination)' then 'Traffic signs and lights'
    when category ~* '(parking|backing|lane change|lane usage|merging|passing|turn|curve|freeway|highway entry|highway exit|leaving parking)' then 'Changing directions'
    else 'Safe and responsible driving'
  end,
  handbook_url = case
    when category ~* '(licen[cs]|demerit|suspension|address|insurance|alcohol|breathalyzer|dui|disqualified|required documents|emissions|vision)' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/getting-your-drivers-licence'
    when category ~* '(accident|collision|emergency|brake failure|tire puncture|breakdown|loss of vehicle control)' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-emergencies'
    when category ~* '(pedestrian|cyclist|bicycle|motorcycle|school bus|public transit|large vehicle|animal|sharing)' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/sharing-road-other-road-users'
    when category ~* '(intersection|right.of.way)' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-through-intersections'
    when category ~* '(traffic light|flashing|yellow light|stop sign|yield sign|road sign|road line|lane marking|white line|traffic light combination)' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/traffic-signs-and-lights'
    when category ~* '(parking|backing|lane change|lane usage|merging|passing|turn|curve|freeway|highway entry|highway exit|leaving parking)' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/changing-directions'
    else 'https://www.ontario.ca/document/official-mto-drivers-handbook/safe-and-responsible-driving'
  end
where learning_topic is null
   or handbook_section is null
   or handbook_url is null;

alter table public.signs_questions
  alter column learning_topic set not null,
  alter column handbook_section set not null,
  alter column handbook_url set not null;

alter table public.rules_questions
  alter column learning_topic set not null,
  alter column handbook_section set not null,
  alter column handbook_url set not null;

create table if not exists public.user_flagged_questions (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id integer not null check (question_id > 0),
  question_type text not null check (question_type in ('signs', 'rules')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id, question_type)
);

create index if not exists user_flagged_questions_user_updated_idx
  on public.user_flagged_questions (user_id, updated_at desc);

alter table public.user_flagged_questions enable row level security;

drop policy if exists "Users can read their flagged questions" on public.user_flagged_questions;
create policy "Users can read their flagged questions"
on public.user_flagged_questions
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can flag their own questions" on public.user_flagged_questions;
create policy "Users can flag their own questions"
on public.user_flagged_questions
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can refresh their own flags" on public.user_flagged_questions;
create policy "Users can refresh their own flags"
on public.user_flagged_questions
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can remove their own flags" on public.user_flagged_questions;
create policy "Users can remove their own flags"
on public.user_flagged_questions
for delete
to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.user_flagged_questions from anon;
revoke all on table public.user_flagged_questions from authenticated;
grant select, insert, update, delete on table public.user_flagged_questions to authenticated;

commit;
