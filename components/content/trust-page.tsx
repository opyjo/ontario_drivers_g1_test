import type { ReactNode } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";

export function TrustPage({ title, intro, children }: Readonly<{ title: string; intro: string; children: ReactNode }>) {
  return (
    <PageLayout>
      <article className="container mx-auto max-w-3xl px-4 py-14">
        <header className="border-b pb-8"><h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{intro}</p></header>
        <div className="prose prose-slate mt-10 max-w-none space-y-10 text-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:leading-7 [&_p]:leading-8 [&_p]:text-muted-foreground">{children}</div>
      </article>
    </PageLayout>
  );
}
