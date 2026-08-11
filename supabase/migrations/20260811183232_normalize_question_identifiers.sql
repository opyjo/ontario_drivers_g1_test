-- Rules and signs use overlapping primary keys. Public quiz APIs reserve IDs
-- above 10,000 for rules so mixed quizzes can safely key answers by question ID.

begin;

create or replace function public.get_random_g1_questions(
  question_limit integer default 40,
  rules_limit integer default 20,
  signs_limit integer default 20,
  difficulty_filter character varying default null,
  exclude_recent_ids jsonb default '{}'::jsonb
)
returns table (
  id integer,
  question_text text,
  question_type character varying,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  correct_option text,
  image_url text,
  image_description text,
  category text,
  explanation text
)
language plpgsql
volatile
security invoker
set search_path = 'public'
as $$
begin
  return query
  with rules as (
    select
      r.id + 10000,
      r.question_text,
      'rules'::character varying(10),
      r.option_a,
      r.option_b,
      r.option_c,
      r.option_d,
      r.correct_option::text,
      null::text,
      null::text,
      r.category::text,
      r.explanation
    from public.rules_questions as r
    where coalesce(r.is_active, true)
      and (difficulty_filter is null or r.difficulty_level = difficulty_filter)
      and (
        exclude_recent_ids is null
        or exclude_recent_ids = '{}'::jsonb
        or not (exclude_recent_ids ? (r.id + 10000)::text)
      )
    order by random()
    limit least(greatest(coalesce(rules_limit, 20), 0), 50)
  ),
  signs as (
    select
      s.id,
      s.question_text,
      'signs'::character varying(10),
      s.option_a,
      s.option_b,
      s.option_c,
      s.option_d,
      s.correct_option::text,
      s.image_url,
      s.image_description,
      coalesce(s.category, 'General Signs')::text,
      s.explanation
    from public.signs_questions as s
    where coalesce(s.is_active, true)
      and (difficulty_filter is null or s.difficulty_level = difficulty_filter)
      and (
        exclude_recent_ids is null
        or exclude_recent_ids = '{}'::jsonb
        or not (exclude_recent_ids ? s.id::text)
      )
    order by random()
    limit least(greatest(coalesce(signs_limit, 20), 0), 50)
  )
  select * from (
    select * from rules
    union all
    select * from signs
  ) as combined
  order by random()
  limit least(greatest(coalesce(question_limit, 40), 1), 100);
end;
$$;

create or replace function public.get_g1_questions_by_category(
  category_filter character varying,
  question_type_filter character varying default null,
  question_limit integer default 20,
  difficulty_filter character varying default null
)
returns table (
  id integer,
  question_text text,
  question_type character varying,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  correct_option text,
  image_url text,
  image_description text,
  category character varying,
  explanation text
)
language plpgsql
volatile
security invoker
set search_path = 'public'
as $$
begin
  return query
  select * from (
    select
      r.id + 10000,
      r.question_text,
      'rules'::character varying(10),
      r.option_a,
      r.option_b,
      r.option_c,
      r.option_d,
      r.correct_option,
      null::text,
      null::text,
      r.category::character varying,
      r.explanation
    from public.rules_questions as r
    where coalesce(r.is_active, true)
      and (category_filter = 'all' or r.category = category_filter)
      and (question_type_filter is null or question_type_filter = 'rules')
      and (difficulty_filter is null or r.difficulty_level = difficulty_filter)

    union all

    select
      s.id,
      s.question_text,
      'signs'::character varying(10),
      s.option_a,
      s.option_b,
      s.option_c,
      s.option_d,
      s.correct_option,
      s.image_url,
      s.image_description,
      s.category,
      s.explanation
    from public.signs_questions as s
    where coalesce(s.is_active, true)
      and (category_filter = 'all' or s.category = category_filter)
      and (question_type_filter is null or question_type_filter = 'signs')
      and (difficulty_filter is null or s.difficulty_level = difficulty_filter)
  ) as combined
  order by random()
  limit least(greatest(coalesce(question_limit, 20), 1), 100);
end;
$$;

create or replace function public.get_incorrect_questions(
  user_id_param uuid,
  question_type text
)
returns table (
  id integer,
  question_text text,
  question_type character varying,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  correct_option text,
  image_url text,
  image_description text,
  category text,
  explanation text
)
language sql
stable
security invoker
set search_path = 'public'
as $$
  select
    sq.id,
    sq.question_text,
    'signs'::character varying(10),
    sq.option_a,
    sq.option_b,
    sq.option_c,
    sq.option_d,
    sq.correct_option,
    sq.image_url,
    sq.image_description,
    coalesce(sq.category, 'General Signs')::text,
    sq.explanation
  from public.user_incorrect_questions as uiq
  join public.signs_questions as sq on uiq.question_id = sq.id
  where uiq.user_id = user_id_param
    and uiq.question_type = 'signs'
    and sq.is_active = true
    and (question_type = 'signs' or question_type = 'all')

  union all

  select
    rq.id + 10000,
    rq.question_text,
    'rules'::character varying(10),
    rq.option_a,
    rq.option_b,
    rq.option_c,
    rq.option_d,
    rq.correct_option,
    null::text,
    null::text,
    rq.category,
    rq.explanation
  from public.user_incorrect_questions as uiq
  join public.rules_questions as rq on uiq.question_id = rq.id
  where uiq.user_id = user_id_param
    and uiq.question_type = 'rules'
    and rq.is_active = true
    and (question_type = 'rules' or question_type = 'all')
  order by 3, 1;
$$;

commit;
