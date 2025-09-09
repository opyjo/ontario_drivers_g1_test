-- Create user_freemium_quiz_counts table
-- Tracks the number of quiz attempts for freemium users across different quiz modes
-- Used to enforce limits on free tier usage

CREATE TABLE IF NOT EXISTS public.user_freemium_quiz_counts (
    user_id uuid NOT NULL,
    mode text NOT NULL,
    count integer DEFAULT 0 NOT NULL,
    last_attempted timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT user_freemium_quiz_counts_pkey PRIMARY KEY (user_id, mode),
    CONSTRAINT user_freemium_quiz_counts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT user_freemium_quiz_counts_mode_check CHECK (mode IN ('practice', 'standard', 'timed'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS user_freemium_quiz_counts_user_id_idx ON public.user_freemium_quiz_counts USING btree (user_id);
CREATE INDEX IF NOT EXISTS user_freemium_quiz_counts_mode_idx ON public.user_freemium_quiz_counts USING btree (mode);
CREATE INDEX IF NOT EXISTS user_freemium_quiz_counts_last_attempted_idx ON public.user_freemium_quiz_counts USING btree (last_attempted);

-- Enable Row Level Security
ALTER TABLE public.user_freemium_quiz_counts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only view their own quiz counts
CREATE POLICY "Users can view their own quiz counts"
ON public.user_freemium_quiz_counts
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own quiz counts
CREATE POLICY "Users can insert their own quiz counts"
ON public.user_freemium_quiz_counts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own quiz counts
CREATE POLICY "Users can update their own quiz counts"
ON public.user_freemium_quiz_counts
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Service role can do everything
CREATE POLICY "Service role can do everything on user_freemium_quiz_counts"
ON public.user_freemium_quiz_counts
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Trigger to update updated_at column
CREATE TRIGGER user_freemium_quiz_counts_updated_at
    BEFORE UPDATE ON public.user_freemium_quiz_counts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_freemium_quiz_counts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_freemium_quiz_counts TO service_role;
