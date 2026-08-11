# Environment setup

Copy `.env.example` to `.env.local` for local development, then replace every
placeholder with the matching Supabase, OpenAI, Stripe, and application value.
Do not commit `.env.local` or expose server-only keys with a `NEXT_PUBLIC_` prefix.

The complete variable list and launch steps are maintained in
[`../PRODUCTION_CHECKLIST.md`](../PRODUCTION_CHECKLIST.md).

## AI document ingestion

After the Supabase service-role and OpenAI keys are configured, ingest the MTO
documents explicitly in one of these modes:

```sh
# Replace the existing document chunks from public/MTO_section_content
npm run ingest:mto -- --replace

# Preserve existing chunks and append that directory's documents
npm run ingest:mto -- --append
```

The script intentionally refuses to run without `--replace` or `--append` so an
accidental invocation cannot clear the production knowledge base.
