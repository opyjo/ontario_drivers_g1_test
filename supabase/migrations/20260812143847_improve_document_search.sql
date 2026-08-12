create or replace function public.search_documents(
  query_text text,
  match_count integer default 8
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity double precision
)
language sql
stable
security invoker
set search_path = ''
as $$
  with term_sets as (
    select
      string_agg(term, ' ' order by ordinal) filter (
        where length(term) >= 3
          and term not in (
            'the', 'and', 'for', 'you', 'your', 'are', 'can', 'does',
            'how', 'what', 'when', 'where', 'which', 'who', 'why',
            'would', 'could', 'should', 'about', 'ontario', 'driver',
            'driving', 'test', 'tell'
          )
      ) as strict_terms,
      string_agg(term, ' or ' order by ordinal) filter (
        where length(term) >= 3
          and term not in (
            'the', 'and', 'for', 'you', 'your', 'are', 'can', 'does',
            'how', 'what', 'when', 'where', 'which', 'who', 'why',
            'would', 'could', 'should', 'about', 'ontario', 'driver',
            'driving', 'test', 'tell'
          )
      ) as broad_terms
    from regexp_split_to_table(
      lower(coalesce(query_text, '')),
      '[^[:alnum:]]+'
    ) with ordinality as tokens(term, ordinal)
  ), search_queries as (
    select
      websearch_to_tsquery(
        'english'::regconfig,
        coalesce(nullif(strict_terms, ''), coalesce(query_text, ''))
      ) as strict_query,
      websearch_to_tsquery(
        'english'::regconfig,
        coalesce(nullif(broad_terms, ''), coalesce(query_text, ''))
      ) as broad_query,
      phraseto_tsquery(
        'english'::regconfig,
        coalesce(nullif(strict_terms, ''), coalesce(query_text, ''))
      ) as phrase_query
    from term_sets
  ), ranked_anchors as (
    select
      documents.id,
      documents.content,
      documents.metadata,
      (
        ts_rank_cd(
          documents.search_vector,
          search_queries.broad_query,
          32
        ) +
        ts_rank_cd(
          to_tsvector(
            'english'::regconfig,
            coalesce(documents.metadata ->> 'document_title', '') || ' ' ||
            coalesce(documents.metadata ->> 'topic', '') || ' ' ||
            coalesce(documents.metadata ->> 'category', '')
          ),
          search_queries.broad_query
        ) +
        case
          when to_tsvector('english'::regconfig, documents.content)
            @@ search_queries.phrase_query then 0.75
          else 0.0
        end +
        case
          when to_tsvector('english'::regconfig, documents.content)
            @@ search_queries.strict_query then 0.5
          else 0.0
        end
      )::double precision as score
    from public.documents as documents
    cross join search_queries
    where documents.search_vector @@ search_queries.broad_query
    order by score desc, documents.id
    limit least(greatest(coalesce(match_count, 8), 1), 5)
  ), expanded as (
    select
      documents.id,
      documents.content,
      documents.metadata,
      greatest(
        anchors.score -
          0.08 * abs(
            case
              when documents.metadata ->> 'chunk_index' ~ '^[0-9]+$'
                then (documents.metadata ->> 'chunk_index')::integer
              else 0
            end -
            case
              when anchors.metadata ->> 'chunk_index' ~ '^[0-9]+$'
                then (anchors.metadata ->> 'chunk_index')::integer
              else 0
            end
          ),
        0
      )::double precision as score,
      documents.id = anchors.id as direct_match
    from ranked_anchors as anchors
    join public.documents as documents
      on documents.metadata ->> 'topic' = anchors.metadata ->> 'topic'
      and (
        documents.id = anchors.id
        or (
          documents.metadata ->> 'chunk_index' ~ '^[0-9]+$'
          and anchors.metadata ->> 'chunk_index' ~ '^[0-9]+$'
          and abs(
            (documents.metadata ->> 'chunk_index')::integer -
            (anchors.metadata ->> 'chunk_index')::integer
          ) <= 1
        )
      )
  ), deduplicated as (
    select
      expanded.id,
      expanded.content,
      expanded.metadata,
      max(expanded.score) as similarity,
      bool_or(expanded.direct_match) as direct_match
    from expanded
    group by expanded.id, expanded.content, expanded.metadata
  )
  select
    deduplicated.id,
    deduplicated.content,
    deduplicated.metadata,
    deduplicated.similarity
  from deduplicated
  order by deduplicated.direct_match desc, deduplicated.similarity desc,
    deduplicated.id
  limit greatest(1, least(coalesce(match_count, 8), 12));
$$;

revoke execute on function public.search_documents(text, integer)
from public, anon, authenticated;
grant execute on function public.search_documents(text, integer)
to service_role;

comment on function public.search_documents(text, integer) is
  'Ranks strict and broad handbook matches, then adds adjacent context chunks.';
