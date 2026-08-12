import Link from "next/link";
import { BookOpen, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[calc(100vh-60px)] max-w-2xl items-center px-4 py-12"
    >
      <section className="w-full rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-10">
        <WifiOff className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-bold">You are offline</h1>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-muted-foreground">
          Handbook and guide pages you have already visited may still be available.
          Practice-test starts and account features need an internet connection.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/study-guide">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Open study guide
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Try the home page</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
