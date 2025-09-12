"use client";

import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { g1FaqCategories } from "@/lib/quiz/faq";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // flatten all FAQs when searching
  const allFaqs = g1FaqCategories.flatMap((cat) =>
    cat.faqs.map((faq) => ({ ...faq, category: cat }))
  );

  const filteredFaqs = searchTerm
    ? allFaqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : activeCategory
    ? g1FaqCategories.find((c) => c.id === activeCategory)?.faqs || []
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-foreground">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 py-12 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">FAQs</h1>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about your G1 test & DriveTest process.
        </p>

        {/* Search */}
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveCategory(null);
            }}
            className="pl-10 h-12 text-base rounded-xl shadow-sm border"
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {/* Default state: show categories */}
        {!searchTerm && !activeCategory && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {g1FaqCategories.map((cat) => (
              <Card
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="cursor-pointer group p-6 rounded-xl border hover:shadow-md bg-white transition"
              >
                <h3 className="font-semibold text-lg">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {cat.faqs.length} common questions
                </p>
                <div className="mt-4 text-sm text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  View questions <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Results (search or category) */}
        {(searchTerm || activeCategory) && (
          <div className="space-y-8">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">
                  No results found for "{searchTerm}"
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory(null);
                  }}
                  className="text-primary underline"
                >
                  Reset
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {searchTerm
                      ? `Results for "${searchTerm}"`
                      : g1FaqCategories.find((c) => c.id === activeCategory)
                          ?.title}
                  </h2>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory(null);
                    }}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    ← Back
                  </button>
                </div>

                <div className="space-y-6">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className={cn(
                        "p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                      )}
                    >
                      <h3 className="font-medium text-lg mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="bg-muted/40 py-12 mt-16">
        <div className="max-w-3xl mx-auto text-center space-y-4 px-6">
          <h2 className="text-xl font-semibold">Still stuck?</h2>
          <p className="text-muted-foreground">
            Try our AI assistant or contact support for personalized help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ask-ai"
              className="px-5 py-3 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Ask AI Assistant
            </a>
            <a
              href="mailto:support@drivetestpro.ca"
              className="px-5 py-3 border rounded-md hover:bg-muted"
            >
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
