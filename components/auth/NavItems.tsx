"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore, selectIsAuthenticated } from "@/stores";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  FileCheck,
  CreditCard,
  User,
  Settings,
  BarChart3,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  premium?: boolean;
}

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BarChart3,
    requiresAuth: true,
  },
  {
    href: "/study-guide",
    label: "Study Guide",
    icon: BookOpen,
  },
  {
    href: "/content-signs-audit",
    label: "Signs Audit",
    icon: FileCheck,
    requiresAuth: true,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
    requiresAuth: true,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    requiresAuth: true,
  },
  {
    href: "/pricing",
    label: "Upgrade",
    icon: CreditCard,
  },
];

export const NavItems = () => {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  return (
    <nav className="flex flex-col space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        const canAccess = !item.requiresAuth || isAuthenticated;

        if (!canAccess) return null;

        return (
          <Button
            key={item.href}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            asChild
            className={cn("w-full justify-start", isActive && "bg-secondary")}
          >
            <Link
              href={item.href}
              className="flex items-center space-x-2"
              tabIndex={0}
              aria-label={item.label}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};
