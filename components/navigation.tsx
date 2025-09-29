"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Target,
  HelpCircle,
  DollarSign,
  MessageSquare,
  ChevronDown,
  BarChart3,
  Sparkles,
  AlertTriangle,
  BookCheck,
  Timer,
  RotateCcw,
} from "lucide-react";
import UserNav from "@/components/auth/UserNav";
import { useAuthStore, selectIsAuthenticated } from "@/stores";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuizzesOpen, setIsQuizzesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsQuizzesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    ...(isAuthenticated
      ? [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: BarChart3,
          },
        ]
      : []),
    {
      name: "Quizzes",
      href: "#",
      icon: Target,
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Signs Practice",
          href: "/quiz/signs/setup",
          description: "Practice traffic signs",
          icon: AlertTriangle,
          color: "text-red-500",
          bgColor: "bg-red-50 hover:bg-red-100",
          darkBgColor: "dark:bg-red-950/50 dark:hover:bg-red-900/50",
        },
        {
          name: "Rules Practice",
          href: "/quiz/rules/setup",
          description: "Practice rules of the road",
          icon: BookCheck,
          color: "text-blue-500",
          bgColor: "bg-blue-50 hover:bg-blue-100",
          darkBgColor: "dark:bg-blue-950/50 dark:hover:bg-blue-900/50",
        },
        {
          name: "G1 Simulation",
          href: "/quiz/simulation",
          description: "20 signs + 20 rules (untimed)",
          icon: Timer,
          color: "text-purple-500",
          bgColor: "bg-purple-50 hover:bg-purple-100",
          darkBgColor: "dark:bg-purple-950/50 dark:hover:bg-purple-900/50",
        },
        {
          name: "Review Incorrect",
          href: "/quiz/review?questionType=all",
          description: "Review your missed questions",
          icon: RotateCcw,
          color: "text-amber-500",
          bgColor: "bg-amber-50 hover:bg-amber-100",
          darkBgColor: "dark:bg-amber-950/50 dark:hover:bg-amber-900/50",
        },
      ],
    },
    {
      name: "Study Guide",
      href: "/study-guide",
      icon: BookOpen,
    },
    {
      name: "Ask AI",
      href: "/ask-ai",
      icon: MessageSquare,
    },
    {
      name: "FAQ",
      href: "/faq",
      icon: HelpCircle,
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: DollarSign,
    },
  ];

  return (
    <nav className="nav-modern sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link
            href="/"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110">
                <span className="text-primary-foreground font-bold text-base group-hover:animate-pulse">
                  🚗
                </span>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/50 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative">
              <span className="font-bold text-xl bg-gradient-to-r from-foreground via-primary to-primary/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/60 transition-all duration-300">
                DriveTest Pro
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 group-hover:w-full transition-all duration-300"></div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              if (item.hasDropdown) {
                return (
                  <div key={item.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsQuizzesOpen(!isQuizzesOpen)}
                      onMouseEnter={() => setIsQuizzesOpen(true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setIsQuizzesOpen(!isQuizzesOpen);
                        }
                      }}
                      aria-expanded={isQuizzesOpen}
                      aria-haspopup="menu"
                      className="relative flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 group cursor-pointer border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <Icon className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-all duration-300 group-hover:scale-110 ${
                          isQuizzesOpen ? "rotate-180" : ""
                        }`}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <div
                      role="menu"
                      tabIndex={-1}
                      className={`absolute top-full left-0 mt-3 w-80 backdrop-blur-xl bg-background/95 border border-border/30 rounded-2xl shadow-2xl shadow-primary/10 z-50 transition-all duration-300 transform origin-top overflow-hidden ${
                        isQuizzesOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
                      }`}
                      onMouseLeave={() => setIsQuizzesOpen(false)}
                      style={{
                        background: `linear-gradient(135deg, 
                          hsl(var(--background) / 0.95) 0%, 
                          hsl(var(--background) / 0.98) 25%,
                          hsl(var(--primary) / 0.03) 50%,
                          hsl(var(--background) / 0.98) 75%,
                          hsl(var(--background) / 0.95) 100%)`,
                        boxShadow: `
                          0 20px 40px rgba(0, 0, 0, 0.1),
                          0 8px 20px rgba(0, 0, 0, 0.06),
                          inset 0 1px 0 rgba(255, 255, 255, 0.1),
                          inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                        `,
                      }}
                    >
                      <div className="py-2 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-50"></div>
                        {item.dropdownItems?.map((dropdownItem, index) => {
                          const IconComponent = dropdownItem.icon;
                          return (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className={`group relative block mx-2 mb-1 px-4 py-3.5 text-sm transition-all duration-300 cursor-pointer rounded-xl border border-transparent animate-fade-in ${dropdownItem.bgColor} ${dropdownItem.darkBgColor} hover:border-border/30 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.02]`}
                              onClick={() => setIsQuizzesOpen(false)}
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="flex items-center gap-4 relative z-10">
                                <div
                                  className={`w-10 h-10 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-white/60 dark:border-gray-700/60 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 ${dropdownItem.color}`}
                                >
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div
                                    className={`font-semibold text-foreground transition-colors duration-200 flex items-center gap-2 group-hover:${dropdownItem.color}`}
                                  >
                                    {dropdownItem.name}
                                    <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12" />
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/90 transition-colors duration-200">
                                    {dropdownItem.description}
                                  </div>
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                              <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Enhanced caret */}
                      <div
                        className="absolute -top-2 left-8 w-4 h-4 transform rotate-45"
                        style={{
                          background: `linear-gradient(135deg, hsl(var(--background) / 0.95), hsl(var(--primary) / 0.05))`,
                          border: "1px solid hsl(var(--border) / 0.3)",
                          borderRight: "none",
                          borderBottom: "none",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 px-4 py-2.5 text-sm font-medium cursor-pointer rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 group border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                >
                  <Icon className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
                  <span>{item.name}</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <UserNav />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group border border-transparent hover:border-primary/20"
            >
              {isOpen ? (
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              ) : (
                <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              )}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-6 animate-in slide-in-from-top-3 duration-300 bg-gradient-to-b from-background/50 to-background backdrop-blur-sm">
            <div className="space-y-2 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                if (item.hasDropdown) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setIsQuizzesOpen(!isQuizzesOpen)}
                        className="flex items-center justify-between w-full px-5 py-4 text-muted-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary transition-all duration-300 cursor-pointer rounded-2xl group border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                      >
                        <div className="flex items-center space-x-4">
                          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                          <span className="font-semibold">{item.name}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                            isQuizzesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isQuizzesOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-6 space-y-1 py-3">
                          {item.dropdownItems?.map((dropdownItem) => {
                            const IconComponent = dropdownItem.icon;
                            return (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className={`group relative flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 cursor-pointer rounded-xl border border-transparent hover:shadow-md hover:shadow-primary/10 ${dropdownItem.bgColor} ${dropdownItem.darkBgColor}`}
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsQuizzesOpen(false);
                                }}
                              >
                                <div
                                  className={`w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-white/60 dark:border-gray-700/60 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 ${dropdownItem.color}`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-foreground transition-colors duration-200 flex items-center gap-2">
                                    {dropdownItem.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                                    {dropdownItem.description}
                                  </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-4 px-5 py-4 text-muted-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary transition-all duration-300 cursor-pointer rounded-2xl group border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                );
              })}
              <div className="border-t border-border/50 pt-6 mt-6 flex justify-center bg-gradient-to-t from-background/80 to-transparent rounded-b-2xl">
                <UserNav />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
