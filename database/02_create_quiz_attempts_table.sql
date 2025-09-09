-- Create quiz_attempts table
-- Records all quiz attempts made by users, including both practice and actual quiz attempts
-- with timing information and user responses

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id bigserial PRIMARY KEY,
    created_at timestamptz DEFAULT now() NOT NULL,
    user_id uuid NOT NULL,
    user_answers jsonb,
    question_ids integer[],
    is_timed boolean DEFAULT false,
    time_taken_seconds integer,
    is_practice boolean DEFAULT false,
    practice_type text,
    quiz_type text,
    score integer,
    total_questions_in_attempt integer,
    CONSTRAINT quiz_attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS quiz_attempts_user_id_idx ON public.quiz_attempts USING btree (user_id);
CREATE INDEX IF NOT EXISTS quiz_attempts_created_at_idx ON public.quiz_attempts USING btree (created_at);
CREATE INDEX IF NOT EXISTS quiz_attempts_quiz_type_idx ON public.quiz_attempts USING btree (quiz_type);
CREATE INDEX IF NOT EXISTS quiz_attempts_is_practice_idx ON public.quiz_attempts USING btree (is_practice);
CREATE INDEX IF NOT EXISTS quiz_attempts_is_timed_idx ON public.quiz_attempts USING btree (is_timed);

-- Enable Row Level Security
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only view their own quiz attempts
CREATE POLICY "Users can view their own quiz attempts"
ON public.quiz_attempts
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own quiz attempts
CREATE POLICY "Users can insert their own quiz attempts"
ON public.quiz_attempts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own quiz attempts (for ongoing quizzes)
CREATE POLICY "Users can update their own quiz attempts"
ON public.quiz_attempts
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Service role can do everything
CREATE POLICY "Service role can do everything on quiz_attempts"
ON public.quiz_attempts
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_attempts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_attempts TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.quiz_attempts_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.quiz_attempts_id_seq TO service_role;
