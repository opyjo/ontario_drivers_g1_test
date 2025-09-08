"use client";

import { useEffect } from "react";
import { useAuthStore, hydrateAuthStore } from "@/stores";
import { useHydration } from "@/hooks/use-hydration";
import { AuthBlock } from "./AuthBlock";
import { GuestBlock } from "./GuestBlock";

const UserNavContent = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200" />;
  }

  return user ? <AuthBlock /> : <GuestBlock />;
};

export default function UserNav() {
  const isHydrated = useHydration();

  useEffect(() => {
    if (isHydrated) {
      hydrateAuthStore();
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200" />;
  }

  return <UserNavContent />;
}
