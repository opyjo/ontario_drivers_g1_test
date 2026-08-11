import type { ReactNode } from "react";

export function PrivateRoute({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
