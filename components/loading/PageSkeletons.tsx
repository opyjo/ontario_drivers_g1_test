import { Skeleton } from "@/components/ui/skeleton";

export function QuizPageSkeleton() {
  return (
    <main id="main-content" className="min-h-[calc(100vh-3.75rem)] bg-muted/30 px-3 py-4 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-6">
        <div className="space-y-3 border-b border-border pb-5">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-8 w-full max-w-md" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="mt-5 space-y-5">
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="space-y-5">
              <Skeleton className="h-44 w-full rounded-xl" />
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 w-full rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-72 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}

export function DashboardPageSkeleton() {
  return (
    <main id="main-content" className="container mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div className="space-y-3">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </main>
  );
}

export function StudyGuidePageSkeleton() {
  return (
    <main id="main-content" className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
        <Skeleton className="mx-auto h-10 w-72 max-w-full" />
        <Skeleton className="mx-auto h-5 w-full max-w-xl" />
      </div>
      <Skeleton className="mb-8 h-52 rounded-xl" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-56 rounded-xl" />
        ))}
      </div>
    </main>
  );
}
