import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type Database } from "@/types/supabase";

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => {
          const store = await cookieStore;
          return store.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll: async (cookiesToSet) => {
          try {
            const store = await cookieStore;
            cookiesToSet.forEach((cookie) => {
              (store as any).set(cookie.name, cookie.value, cookie.options);
            });
          } catch (error) {
            // Expected behavior in server components
          }
        },
      },
    }
  );
}
