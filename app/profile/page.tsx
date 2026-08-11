import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?redirect=/profile");

  const { data: profile } = await supabase
    .from("profiles")
    .select("access_level, created_at")
    .eq("id", user.id)
    .single();

  return (
    <main className="mx-auto min-h-[calc(100vh-60px)] max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Your profile</CardTitle>
          <CardDescription>Account and access details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Email</dt>
              <dd className="font-medium">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Access</dt>
              <dd className="mt-1">
                <Badge variant="secondary">
                  {profile?.access_level || "free"}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Member since</dt>
              <dd className="font-medium">
                {new Date(profile?.created_at || user.created_at).toLocaleDateString(
                  "en-CA"
                )}
              </dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">View dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/settings">Account settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
