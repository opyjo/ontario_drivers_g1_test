-- Create profiles table
-- Links to auth.users.id with ON DELETE CASCADE to ensure profile is removed if user is deleted
-- Stores user profile information, including Stripe payment and subscription details

CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid NOT NULL,
    stripe_customer_id text UNIQUE,
    access_level text DEFAULT 'free'::text,
    active_stripe_subscription_id text,
    subscription_current_period_end timestamptz,
    purchased_lifetime_price_id text,
    active_monthly_plan_price_id text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    stripe_subscription_status text,
    cancel_at_period_end boolean DEFAULT false,
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_stripe_customer_id_idx ON public.profiles USING btree (stripe_customer_id);
CREATE INDEX IF NOT EXISTS profiles_access_level_idx ON public.profiles USING btree (access_level);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON public.profiles USING btree (created_at);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only view and update their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Service role can do everything (for Stripe webhooks, etc.)
CREATE POLICY "Service role can do everything on profiles"
ON public.profiles
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at column
CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, created_at, updated_at)
    VALUES (NEW.id, now(), now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO service_role;
