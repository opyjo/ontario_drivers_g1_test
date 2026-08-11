import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { getPublicSupabaseConfig } from "@/lib/supabase/config";

const { url, publishableKey } = getPublicSupabaseConfig();

const supabase = createBrowserClient<Database>(url, publishableKey);
export default supabase;
