# Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration (Required for AI Assistant)
OPENAI_API_KEY=your_openai_api_key

# Optional: Stripe for payments (if implementing premium features)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## Setup Instructions

### Supabase Configuration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select existing project
3. Go to Settings > API to find your project URL and anon key
4. Copy the values and replace them in your `.env.local` file

### OpenAI Configuration (Required for AI Assistant)

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account if you don't have one
3. Generate a new API key
4. Copy the key and add it to your `.env.local` file
5. Note: You'll need billing set up on OpenAI (usually costs ~$0.10-1.00 per 1000 questions)

### Final Steps

1. Restart your development server after creating the `.env.local` file
2. Run the document ingestion script: `node scripts/ingest-mto-documents.mjs`
3. Your AI assistant will be ready to answer MTO-related questions!
