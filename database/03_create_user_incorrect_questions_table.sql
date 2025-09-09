-- Create user_incorrect_questions table
-- Tracks questions that users have answered incorrectly
-- This table helps in identifying patterns of user mistakes and can be used for personalized study recommendations

CREATE TABLE IF NOT EXISTS public.user_incorrect_questions (
    user_id uuid NOT NULL,
    question_id integer NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT user_incorrect_questions_pkey PRIMARY KEY (user_id, question_id),
    CONSTRAINT user_incorrect_questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT user_incorrect_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS user_incorrect_questions_user_id_idx ON public.user_incorrect_questions USING btree (user_id);
CREATE INDEX IF NOT EXISTS user_incorrect_questions_question_id_idx ON public.user_incorrect_questions USING btree (question_id);
CREATE INDEX IF NOT EXISTS user_incorrect_questions_created_at_idx ON public.user_incorrect_questions USING btree (created_at);

-- Enable Row Level Security
ALTER TABLE public.user_incorrect_questions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only view their own incorrect questions
CREATE POLICY "Users can view their own incorrect questions"
ON public.user_incorrect_questions
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own incorrect questions
CREATE POLICY "Users can insert their own incorrect questions"
ON public.user_incorrect_questions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own incorrect questions (for timestamp updates)
CREATE POLICY "Users can update their own incorrect questions"
ON public.user_incorrect_questions
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own incorrect questions (when they get them right)
CREATE POLICY "Users can delete their own incorrect questions"
ON public.user_incorrect_questions
FOR DELETE
USING (auth.uid() = user_id);

-- Service role can do everything
CREATE POLICY "Service role can do everything on user_incorrect_questions"
ON public.user_incorrect_questions
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Trigger to update updated_at column
CREATE TRIGGER user_incorrect_questions_updated_at
    BEFORE UPDATE ON public.user_incorrect_questions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_incorrect_questions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_incorrect_questions TO service_role;
