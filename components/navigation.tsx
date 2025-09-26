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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">🚗</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">
              DriveTest Pro
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              if (item.hasDropdown) {
                return (
                  <div key={item.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsQuizzesOpen(!isQuizzesOpen)}
                      onMouseEnter={() => setIsQuizzesOpen(true)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-all duration-200 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 group"
                    >
                      <Icon className="w-4 h-4 transition-colors duration-200" />
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                          isQuizzesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-200 transform origin-top ${
                        isQuizzesOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                      onMouseLeave={() => setIsQuizzesOpen(false)}
                    >
                      <div className="py-2">
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="group block px-4 py-3 text-sm hover:bg-red-50 transition-all duration-150 border-l-2 border-transparent hover:border-red-500"
                            onClick={() => setIsQuizzesOpen(false)}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-150">
                                  {dropdownItem.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {dropdownItem.description}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="absolute -top-1 left-6 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 px-3 py-2 text-sm font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <UserNav />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                if (item.hasDropdown) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setIsQuizzesOpen(!isQuizzesOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isQuizzesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          isQuizzesOpen
                            ? "max-h-48 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-12 space-y-1 py-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-150"
                              onClick={() => {
                                setIsOpen(false);
                                setIsQuizzesOpen(false);
                              }}
                            >
                              <div className="font-medium">
                                {dropdownItem.name}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
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
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-center">
                <UserNav />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
