import type { ReactNode } from "react";
import { privateMetadata } from "@/lib/seo";
import { PrivateRoute } from "@/components/seo/private-route";
import { QueryProvider } from "@/components/providers/query-provider";

export const metadata = privateMetadata;

export default function QuizLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <PrivateRoute>
      <QueryProvider>{children}</QueryProvider>
    </PrivateRoute>
  );
}
