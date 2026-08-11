import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSafeRedirectPath } from "@/lib/navigation/safe-redirect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = getSafeRedirectPath(searchParams.get("next"));

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const configuredOrigin = process.env.APP_URL;
      const redirectOrigin = configuredOrigin
        ? new URL(configuredOrigin).origin
        : origin;
      return NextResponse.redirect(new URL(next, redirectOrigin));
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(
    `${origin}/auth?error=${encodeURIComponent("Could not authenticate user")}`
  );
}
