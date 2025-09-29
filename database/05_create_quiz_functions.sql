-- Create database functions for quiz functionality
-- These functions support the quiz system with optimized question fetching and user tracking

-- Function to get random questions for standard/timed quizzes
CREATE OR REPLACE FUNCTION public.get_random_questions(question_limit INTEGER DEFAULT 20)
RETURNS TABLE (
  id INTEGER,
  question_text TEXT,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_option CHAR(1)
)
LANGUAGE SQL STABLE
SECURITY DEFINER
AS $$
  SELECT q.id, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option
  FROM public.questions q
  ORDER BY RANDOM()
  LIMIT question_limit;
$$;

-- Function to get incorrect questions for targeted practice
CREATE OR REPLACE FUNCTION public.get_incorrect_questions(
  user_id_param UUID,
  question_type TEXT DEFAULT 'all'
)
RETURNS TABLE (
  id INTEGER,
  question_text TEXT,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_option CHAR(1)
)
LANGUAGE SQL STABLE
SECURITY DEFINER
AS $$
  SELECT q.id, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option
  FROM public.questions q
  INNER JOIN public.user_incorrect_questions uiq ON q.id = uiq.question_id
  WHERE uiq.user_id = user_id_param
    AND (question_type = 'all' OR q.question_type = question_type)
  ORDER BY uiq.created_at DESC;
$$;

-- Function to get random practice questions (avoiding recently seen)
CREATE OR REPLACE FUNCTION public.get_random_practice_questions(
  user_id_param UUID DEFAULT NULL,
  question_limit INTEGER DEFAULT 10,
  incorrect_only BOOLEAN DEFAULT FALSE
)
RETURNS TABLE (
  id INTEGER,
  question_text TEXT,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_option CHAR(1)
)
LANGUAGE SQL STABLE
SECURITY DEFINER
AS $$
  SELECT q.id, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option
  FROM public.questions q
  WHERE (
    incorrect_only = FALSE OR
    q.id IN (
      SELECT question_id
      FROM public.user_incorrect_questions
      WHERE user_id = user_id_param
    )
  )
  ORDER BY RANDOM()
  LIMIT question_limit;
$$;

-- Function to increment quiz attempt counters
CREATE OR REPLACE FUNCTION public.increment_user_quiz_mode_attempts(
  p_user_id UUID,
  p_quiz_mode VARCHAR(20)
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  INSERT INTO public.user_freemium_quiz_counts (user_id, mode, count, last_attempted)
  VALUES (p_user_id, p_quiz_mode, 1, NOW())
  ON CONFLICT (user_id, mode)
  DO UPDATE SET
    count = public.user_freemium_quiz_counts.count + 1,
    last_attempted = NOW(),
    updated_at = NOW();
$$;

-- Function to get user's quiz attempt count for a specific mode
CREATE OR REPLACE FUNCTION public.get_user_quiz_attempt_count(
  p_user_id UUID,
  p_quiz_mode VARCHAR(20)
)
RETURNS INTEGER
LANGUAGE SQL STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE(count, 0)
  FROM public.user_freemium_quiz_counts
  WHERE user_id = p_user_id AND mode = p_quiz_mode;
$$;

-- Function to reset user's quiz attempt count for a specific mode (for admin use)
CREATE OR REPLACE FUNCTION public.reset_user_quiz_attempt_count(
  p_user_id UUID,
  p_quiz_mode VARCHAR(20)
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  UPDATE public.user_freemium_quiz_counts
  SET count = 0, updated_at = NOW()
  WHERE user_id = p_user_id AND mode = p_quiz_mode;
$$;

-- Function to get user's quiz statistics
CREATE OR REPLACE FUNCTION public.get_user_quiz_statistics(p_user_id UUID)
RETURNS TABLE (
  total_attempts INTEGER,
  avg_score DECIMAL(5,2),
  best_score INTEGER,
  total_practice_attempts INTEGER,
  total_standard_attempts INTEGER,
  total_timed_attempts INTEGER,
  incorrect_questions_count INTEGER
)
LANGUAGE SQL STABLE
SECURITY DEFINER
AS $$
  SELECT 
    (SELECT COUNT(*)::INTEGER FROM public.quiz_attempts WHERE user_id = p_user_id),
    (SELECT ROUND(AVG(score), 2) FROM public.quiz_attempts WHERE user_id = p_user_id AND score IS NOT NULL),
    (SELECT MAX(score) FROM public.quiz_attempts WHERE user_id = p_user_id AND score IS NOT NULL),
    (SELECT COALESCE(SUM(count), 0)::INTEGER FROM public.user_freemium_quiz_counts WHERE user_id = p_user_id AND mode = 'practice'),
    (SELECT COALESCE(SUM(count), 0)::INTEGER FROM public.user_freemium_quiz_counts WHERE user_id = p_user_id AND mode = 'standard'),
    (SELECT COALESCE(SUM(count), 0)::INTEGER FROM public.user_freemium_quiz_counts WHERE user_id = p_user_id AND mode = 'timed'),
    (SELECT COUNT(*)::INTEGER FROM public.user_incorrect_questions WHERE user_id = p_user_id);
$$;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION public.get_random_questions(INTEGER) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.get_incorrect_questions(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_random_practice_questions(UUID, INTEGER, BOOLEAN) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.increment_user_quiz_mode_attempts(UUID, VARCHAR) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_quiz_attempt_count(UUID, VARCHAR) TO authenticated;
GRANT EXECUTE ON FUNCTION public.reset_user_quiz_attempt_count(UUID, VARCHAR) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_user_quiz_statistics(UUID) TO authenticated;
