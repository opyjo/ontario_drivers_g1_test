-- Moonshot provides chat completions but no embedding endpoint. Keep handbook
-- retrieval provider-independent with PostgreSQL full-text search.
set local maintenance_work_mem = '96MB';

alter table public.documents
add column if not exists search_vector tsvector
generated always as (
  setweight(
    to_tsvector('english'::regconfig, coalesce(metadata ->> 'document_title', '')),
    'A'
  ) ||
  setweight(
    to_tsvector('english'::regconfig, coalesce(metadata ->> 'topic', '')),
    'A'
  ) ||
  setweight(
    to_tsvector('english'::regconfig, coalesce(metadata ->> 'category', '')),
    'B'
  ) ||
  setweight(to_tsvector('english'::regconfig, content), 'C')
) stored;

create index if not exists documents_search_vector_idx
on public.documents using gin (search_vector);

create or replace function public.search_documents(
  query_text text,
  match_count integer default 4
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
  with terms as (
    select string_agg(distinct term, ' or ') as query_terms
    from regexp_split_to_table(
      lower(coalesce(query_text, '')),
      '[^[:alnum:]]+'
    ) as term
    where length(term) >= 3
      and term not in (
        'the', 'and', 'for', 'you', 'your', 'are', 'can', 'does', 'how',
        'what', 'when', 'where', 'which', 'who', 'why', 'would', 'could',
        'should', 'about', 'ontario', 'driver', 'driving', 'test'
      )
  ), search_query as (
    select websearch_to_tsquery(
      'english'::regconfig,
      coalesce(nullif(query_terms, ''), coalesce(query_text, ''))
    ) as value
    from terms
  )
  select
    documents.id,
    documents.content,
    documents.metadata,
    ts_rank_cd(documents.search_vector, search_query.value)::double precision
      as similarity
  from public.documents as documents
  cross join search_query
  where documents.search_vector @@ search_query.value
  order by similarity desc, documents.id
  limit greatest(1, least(coalesce(match_count, 4), 20));
$$;

revoke execute on function public.search_documents(text, integer)
from public, anon, authenticated;
grant execute on function public.search_documents(text, integer)
to service_role;

comment on function public.search_documents(text, integer) is
  'Searches MTO handbook chunks without exposing document rows or embeddings.';
