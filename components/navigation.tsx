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
        },
        {
          name: "Rules Practice",
          href: "/quiz/rules/setup",
          description: "Practice rules of the road",
        },
        {
          name: "G1 Simulation",
          href: "/quiz/simulation",
          description: "20 signs + 20 rules (untimed)",
        },
        {
          name: "Review Incorrect",
          href: "/quiz/review?questionType=all",
          description: "Review your missed questions",
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
                      className={`absolute top-full left-0 mt-3 w-72 bg-background border border-border/50 rounded-2xl shadow-2xl shadow-primary/5 z-50 transition-all duration-300 transform origin-top overflow-hidden ${
                        isQuizzesOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
                      }`}
                      onMouseLeave={() => setIsQuizzesOpen(false)}
                    >
                      <div className="py-3 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="group relative block px-5 py-4 text-sm hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-200 border-l-3 border-transparent hover:border-primary cursor-pointer rounded-r-xl mx-2 hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                            onClick={() => setIsQuizzesOpen(false)}
                            style={{ animationDelay: `${index * 75}ms` }}
                          >
                            <div className="flex items-start justify-between relative z-10">
                              <div className="flex-1">
                                <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 flex items-center gap-2">
                                  <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                  {dropdownItem.name}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1.5 group-hover:text-muted-foreground/80 transition-colors duration-200">
                                  {dropdownItem.description}
                                </div>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-r-xl"></div>
                          </Link>
                        ))}
                      </div>
                      <div className="absolute -top-1.5 left-6 w-3 h-3 bg-background border-l border-t border-border/50 transform rotate-45"></div>
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
                            ? "max-h-56 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-14 space-y-2 py-3">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-xl transition-all duration-200 cursor-pointer group border border-transparent hover:border-primary/20 hover:shadow-md hover:shadow-primary/10"
                              onClick={() => {
                                setIsOpen(false);
                                setIsQuizzesOpen(false);
                              }}
                            >
                              <div className="font-semibold group-hover:text-primary transition-colors duration-200">
                                {dropdownItem.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1.5 opacity-70 group-hover:opacity-90 transition-opacity duration-200">
                                {dropdownItem.description}
                              </div>
                            </Link>
                          ))}
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
