import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-semibold text-primary">404</p>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page may have moved, or the address may be incorrect.
      </p>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </main>
  );
}
