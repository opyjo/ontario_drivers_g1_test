import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type Database } from "@/types/supabase";
import { getPublicSupabaseConfig } from "./config";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = getPublicSupabaseConfig();

  return createServerClient<Database>(
    url,
    publishableKey,
    {
      cookies: {
        getAll: () =>
          cookieStore.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          })),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach((cookie) => {
              cookieStore.set(cookie.name, cookie.value, cookie.options);
            });
          } catch {
            // Server Components cannot write cookies. Middleware/Route Handlers
            // handle refresh writes when a response is available.
          }
        },
      },
    }
  );
}
