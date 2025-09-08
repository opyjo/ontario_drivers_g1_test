"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores";
import { useHydration } from "@/hooks/use-hydration";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isHydrated = useHydration();
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    if (!isHydrated) return;

    // Rehydrate the persisted state
    useAuthStore.persist.rehydrate();

    let cleanup: (() => void) | undefined;

    const setupAuth = async () => {
      try {
        cleanup = await initialize();
      } catch (error) {
        console.error("Auth initialization error:", error);
      }
    };

    setupAuth();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [initialize, isHydrated]);

  return <>{children}</>;
}
