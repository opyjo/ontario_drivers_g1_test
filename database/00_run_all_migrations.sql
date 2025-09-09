-- Master migration script for Quiz System Database Schema
-- This script creates all tables and functions required for the quiz system
-- Run this script in your Supabase SQL editor or via the Supabase CLI

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Run all migrations in order
\i 01_create_profiles_table.sql
\i 02_create_quiz_attempts_table.sql
\i 03_create_user_incorrect_questions_table.sql
\i 04_create_user_freemium_quiz_counts_table.sql
\i 05_create_quiz_functions.sql

-- Create a migration tracking table to keep track of applied migrations
CREATE TABLE IF NOT EXISTS public._migrations (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL UNIQUE,
    applied_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Record the migrations as applied
INSERT INTO public._migrations (filename) VALUES
    ('01_create_profiles_table.sql'),
    ('02_create_quiz_attempts_table.sql'),
    ('03_create_user_incorrect_questions_table.sql'),
    ('04_create_user_freemium_quiz_counts_table.sql'),
    ('05_create_quiz_functions.sql')
ON CONFLICT (filename) DO NOTHING;

-- Display completion message
DO $$
BEGIN
    RAISE NOTICE 'Quiz system database schema created successfully!';
    RAISE NOTICE 'Tables created: profiles, quiz_attempts, user_incorrect_questions, user_freemium_quiz_counts';
    RAISE NOTICE 'Functions created: get_random_questions, get_incorrect_questions, get_random_practice_questions, increment_user_quiz_mode_attempts, get_user_quiz_attempt_count, reset_user_quiz_attempt_count, get_user_quiz_statistics';
    RAISE NOTICE 'All RLS policies have been enabled for security.';
END $$;
