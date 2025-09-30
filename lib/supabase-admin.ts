import { createClient } from "@supabase/supabase-js";

export const createAdminClient = () => {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase admin environment variables");
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
};
