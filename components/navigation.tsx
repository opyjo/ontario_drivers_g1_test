"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Home,
  BookOpen,
  Target,
  HelpCircle,
  DollarSign,
  MessageSquare,
  ChevronDown,
  BarChart3,
  AlertTriangle,
  BookCheck,
  Timer,
  RotateCcw,
  Car,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import UserNav from "@/components/auth/UserNav";
import { useAuthStore, selectIsAuthenticated } from "@/stores";
import { cn } from "@/lib/utils";

interface QuizOption {
  name: string;
  href: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  iconColor: string;
  iconBg: string;
}

const QUIZ_OPTIONS: QuizOption[] = [
  {
    name: "Daily Spaced Review",
    href: "/quiz/daily-review",
    description: "A personalized 10-question set that changes each day",
    icon: Sparkles,
    badge: "For you",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    name: "Signs Practice",
    href: "/ontario-road-signs-practice-test",
    description: "Identify regulatory, warning & informational signs",
    icon: AlertTriangle,
    badge: "Popular",
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    name: "Rules Practice",
    href: "/g1-rules-of-the-road-practice",
    description: "Master Ontario right-of-way, demerit points & laws",
    icon: BookCheck,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "G1 Exam Simulation",
    href: "/g1-test-simulation",
    description: "Full 40-question untimed mock driving exam",
    icon: Timer,
    badge: "Simulated",
    iconColor: "text-purple-500 dark:text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    name: "Review Incorrect",
    href: "/quiz/review?questionType=all",
    description: "Re-take questions you previously missed",
    icon: RotateCcw,
    iconColor: "text-rose-500 dark:text-rose-400",
    iconBg: "bg-rose-500/10 border-rose-500/20",
  },
];

const PRACTICE_PATHS = [
  "/quiz",
  "/g1-practice-test",
  "/ontario-road-signs-practice-test",
  "/g1-rules-of-the-road-practice",
  "/g1-test-simulation",
] as const;

export function Navigation() {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isQuizActive = PRACTICE_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  // Desktop nav items — text only, no icons
  const navLinks = [
    ...(isAuthenticated ? [{ name: "Dashboard", href: "/dashboard" }] : []),
    { name: "Study Guide", href: "/study-guide" },
    { name: "Guides", href: "/guides" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b backdrop-blur-xl",
        isScrolled
          ? "bg-background/90 border-border/60 shadow-sm"
          : "bg-background/60 border-transparent"
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-400 flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300">
              <Car className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="font-bold text-[17px] tracking-tight text-foreground">
              DriveTest Pro
            </span>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[10px] px-1.5 py-0 h-[18px] rounded-md border-primary/30 text-primary font-semibold bg-primary/5"
            >
              G1
            </Badge>
          </Link>

          {/* ── Desktop Links (text-only, centered) ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive(link.href) && !(link.href === "/" && isQuizActive)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Practice tests dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 cursor-pointer hover:bg-primary/90 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isQuizActive
                      ? "ring-2 ring-primary/25 ring-offset-2"
                      : ""
                  )}
                >
                  <Target className="w-4 h-4" aria-hidden="true" />
                  Practice Tests
                  <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={10}
                className="w-80 p-1.5 rounded-xl border-border/50 shadow-xl shadow-black/8 dark:shadow-black/30 bg-background/95 backdrop-blur-2xl"
              >
                <div className="px-3 py-2 mb-1 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Compass className="w-3 h-3 text-primary" />
                    Practice Modules
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-5 border-primary/25 bg-primary/5 text-primary"
                  >
                    700 questions
                  </Badge>
                </div>

                {QUIZ_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 px-2.5 py-2.5 rounded-lg cursor-pointer group transition-colors hover:bg-muted/70 focus:bg-muted/70"
                      >
                        <div
                          className={cn(
                            "mt-0.5 p-2 rounded-lg border shrink-0 transition-transform group-hover:scale-105",
                            item.iconBg,
                            item.iconColor
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </span>
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0 h-4 bg-primary/8 text-primary border-transparent"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Ask AI with live dot */}
            <Link
              href="/ask-ai"
              className={cn(
                "relative inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                isActive("/ask-ai")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Ask AI
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
              </span>
            </Link>
          </nav>

          {/* ── Desktop Auth ── */}
          <div className="hidden lg:flex items-center gap-2">
            <UserNav />
          </div>

          {/* ── Mobile Hamburger + Sheet ── */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 sm:w-96 p-0 flex flex-col"
              >
                <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/40 text-left">
                  <SheetTitle className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-indigo-400 flex items-center justify-center shadow-sm">
                      <Car className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-base">DriveTest Pro</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                  {/* Navigation section */}
                  <div className="space-y-0.5">
                    <p className="px-3 pb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Navigate
                    </p>
                    <MobileLink
                      href="/"
                      icon={Home}
                      active={isActive("/") && !isQuizActive}
                      onClick={() => setMobileOpen(false)}
                    >
                      Home
                    </MobileLink>
                    {isAuthenticated && (
                      <MobileLink
                        href="/dashboard"
                        icon={BarChart3}
                        active={isActive("/dashboard")}
                        onClick={() => setMobileOpen(false)}
                      >
                        Dashboard
                      </MobileLink>
                    )}
                  </div>

                  {/* Practice section */}
                  <div className="space-y-0.5 rounded-xl border border-primary/20 bg-primary/[0.03] p-2">
                    <div className="flex items-center justify-between px-3 pb-1.5">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Practice Tests
                      </p>
                      <Badge
                        variant="outline"
                        className="text-[9px] px-1.5 py-0 h-4 border-primary/25 bg-primary/5 text-primary"
                      >
                        700 Qs
                      </Badge>
                    </div>
                    {QUIZ_OPTIONS.map((item) => (
                      <MobileLink
                        key={item.name}
                        href={item.href}
                        icon={item.icon}
                        active={pathname === item.href}
                        onClick={() => setMobileOpen(false)}
                        iconClassName={cn(item.iconColor)}
                      >
                        {item.name}
                      </MobileLink>
                    ))}
                  </div>

                  {/* Resources section */}
                  <div className="space-y-0.5">
                    <p className="px-3 pb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Resources
                    </p>
                    <MobileLink
                      href="/study-guide"
                      icon={BookOpen}
                      active={isActive("/study-guide")}
                      onClick={() => setMobileOpen(false)}
                    >
                      Study Guide
                    </MobileLink>
                    <MobileLink
                      href="/guides"
                      icon={BookCheck}
                      active={isActive("/guides")}
                      onClick={() => setMobileOpen(false)}
                    >
                      G1 Guides
                    </MobileLink>
                    <MobileLink
                      href="/ask-ai"
                      icon={MessageSquare}
                      active={isActive("/ask-ai")}
                      onClick={() => setMobileOpen(false)}
                      trailing={
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 bg-sky-500/10 text-sky-600 dark:text-sky-400 border-transparent"
                        >
                          AI
                        </Badge>
                      }
                    >
                      Ask AI Assistant
                    </MobileLink>
                    <MobileLink
                      href="/faq"
                      icon={HelpCircle}
                      active={isActive("/faq")}
                      onClick={() => setMobileOpen(false)}
                    >
                      FAQ
                    </MobileLink>
                    <MobileLink
                      href="/pricing"
                      icon={DollarSign}
                      active={isActive("/pricing")}
                      onClick={() => setMobileOpen(false)}
                    >
                      Pricing
                    </MobileLink>
                  </div>
                </div>

                {/* Footer auth */}
                <div className="p-4 border-t border-border/40 bg-muted/20">
                  <UserNav />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Mobile link helper ── */
function MobileLink({
  href,
  icon: Icon,
  active,
  onClick,
  children,
  trailing,
  iconClassName,
}: {
  href: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  trailing?: React.ReactNode;
  iconClassName?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex min-h-11 items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted/60"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("w-4 h-4", iconClassName)} />
        <span>{children}</span>
      </div>
      {trailing ?? (
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
      )}
    </Link>
  );
}
