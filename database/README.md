# Database Schema for Quiz System

This directory contains the SQL migration scripts to create the database schema for the Canadian Citizenship Test quiz system.

## Overview

The quiz system uses 4 main tables and several supporting functions to provide a comprehensive learning platform with multiple quiz modes, progress tracking, and freemium access controls.

## Tables Created

1. **`profiles`** - User profile information with Stripe integration
2. **`quiz_attempts`** - Records of all quiz attempts with scoring and timing
3. **`user_incorrect_questions`** - Tracks incorrect answers for personalized learning
4. **`user_freemium_quiz_counts`** - Usage tracking for freemium limits

## Functions Created

- `get_random_questions(question_limit)` - Fetches random questions for quizzes
- `get_incorrect_questions(user_id)` - Gets user's previously incorrect questions
- `get_random_practice_questions(user_id, question_limit, incorrect_only)` - Smart practice question selection
- `increment_user_quiz_mode_attempts(user_id, quiz_mode)` - Tracks usage for freemium limits
- `get_user_quiz_attempt_count(user_id, quiz_mode)` - Returns current usage count
- `reset_user_quiz_attempt_count(user_id, quiz_mode)` - Admin function to reset counts
- `get_user_quiz_statistics(user_id)` - Comprehensive user statistics

## How to Apply Migrations

### Option 1: All at Once (Recommended for initial setup)

1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `00_run_all_migrations.sql`
4. Run the script

### Option 2: Individual Migrations (For existing projects)

Run each migration file in order:

1. `01_create_profiles_table.sql`
2. `02_create_quiz_attempts_table.sql`
3. `03_create_user_incorrect_questions_table.sql`
4. `04_create_user_freemium_quiz_counts_table.sql`
5. `05_create_quiz_functions.sql`

### Option 3: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Navigate to project root
cd /path/to/your/project

# Apply all migrations
supabase db push

# Or apply individual migration
supabase db push --file database/01_create_profiles_table.sql
```

## Prerequisites

- The `questions` table must already exist in your database
- Supabase Auth must be enabled
- The following extensions should be available:
  - `uuid-ossp` (automatically enabled in the migration)

## Security Features

All tables have Row Level Security (RLS) enabled with appropriate policies:

- Users can only access their own data
- Service role has full access for background operations
- Anonymous users can access quiz questions but cannot save attempts

## Post-Migration Steps

After applying the migrations:

1. Verify all tables were created successfully
2. Test the RLS policies by creating a test user
3. Populate the `questions` table with your quiz questions
4. Configure your application's environment variables

## Rollback

To rollback the migrations (⚠️ **This will delete all data**):

```sql
-- Drop tables in reverse order
DROP TABLE IF EXISTS public.user_freemium_quiz_counts CASCADE;
DROP TABLE IF EXISTS public.user_incorrect_questions CASCADE;
DROP TABLE IF EXISTS public.quiz_attempts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.get_random_questions(INTEGER);
DROP FUNCTION IF EXISTS public.get_incorrect_questions(UUID);
DROP FUNCTION IF EXISTS public.get_random_practice_questions(UUID, INTEGER, BOOLEAN);
DROP FUNCTION IF EXISTS public.increment_user_quiz_mode_attempts(UUID, VARCHAR);
DROP FUNCTION IF EXISTS public.get_user_quiz_attempt_count(UUID, VARCHAR);
DROP FUNCTION IF EXISTS public.reset_user_quiz_attempt_count(UUID, VARCHAR);
DROP FUNCTION IF EXISTS public.get_user_quiz_statistics(UUID);
DROP FUNCTION IF EXISTS public.handle_updated_at();
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop migration tracking
DROP TABLE IF EXISTS public._migrations;
```

## Troubleshooting

### Common Issues

1. **Foreign key constraint errors**: Ensure the `auth.users` table exists and has the expected structure
2. **RLS policy errors**: Verify you're running as the correct role (service_role for admin operations)
3. **Function permission errors**: Check that the necessary GRANT statements were executed

### Verification Queries

```sql
-- Check all tables were created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('profiles', 'quiz_attempts', 'user_incorrect_questions', 'user_freemium_quiz_counts');

-- Check all functions were created
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name LIKE '%quiz%' OR routine_name LIKE '%question%';

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'quiz_attempts', 'user_incorrect_questions', 'user_freemium_quiz_counts');
```

## Support

If you encounter issues with the database migrations, check:

1. Supabase project logs for detailed error messages
2. Database connection and permissions
3. Required extensions are installed
4. Auth configuration is correct

For application-specific issues, refer to the main project documentation.
