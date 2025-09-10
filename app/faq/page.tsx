"use client";

import type React from "react";
import { useState, useMemo } from "react";
import {
  Search,
  MessageCircleQuestion,
  Zap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  faqData,
  faqCategories,
  getFAQsByCategory,
  searchFAQs,
  getFeaturedFAQs,
  type FAQItem,
} from "@/data/faq-data";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Get filtered FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let faqs = faqData;

    // Apply search filter
    if (searchTerm.trim()) {
      faqs = searchFAQs(searchTerm);
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      faqs = faqs.filter((faq) => faq.category === selectedCategory);
    }

    return faqs;
  }, [searchTerm, selectedCategory]);

  const featuredFAQs = getFeaturedFAQs();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Reset category when searching
    if (e.target.value.trim()) {
      setSelectedCategory("all");
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) => (
      <span
        key={index}
        className={
          part.toLowerCase() === highlight.toLowerCase()
            ? "bg-primary/20 text-primary font-medium px-1 rounded"
            : ""
        }
      >
        {part}
      </span>
    ));
  };

  const renderFAQItem = (faq: FAQItem, highlighted = false) => (
    <AccordionItem
      key={faq.id}
      value={faq.id}
      className="group border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-border transition-all duration-300 hover:shadow-lg"
    >
      <AccordionTrigger className="px-8 py-6 text-left hover:no-underline [&[data-state=open]]:pb-4">
        <div className="flex items-start gap-4 w-full">
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <MessageCircleQuestion className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground leading-relaxed text-lg mb-3 text-balance">
              {highlighted
                ? highlightText(faq.question, searchTerm)
                : faq.question}
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge
                variant="secondary"
                className="text-xs font-medium bg-muted/60"
              >
                {faqCategories.find((cat) => cat.id === faq.category)?.title}
              </Badge>
              {faq.tags && faq.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {faq.tags.slice(0, 2).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs text-muted-foreground border-muted-foreground/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {faq.tags.length > 2 && (
                    <Badge
                      variant="outline"
                      className="text-xs border-muted-foreground/30"
                    >
                      +{faq.tags.length - 2} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-8 pb-8">
        <div className="pl-12 text-muted-foreground leading-relaxed text-[15px]">
          {highlighted ? highlightText(faq.answer, searchTerm) : faq.answer}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                Get instant answers
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white text-balance">
              Frequently Asked
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 text-white/90 max-w-3xl mx-auto text-pretty">
              Find answers to common questions about using DriveTest Pro for
              your Ontario driving test preparation
            </p>

            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search FAQ (e.g., 'G1 requirements', 'practice tests', 'traffic signs')"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-16 pr-6 py-6 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl text-foreground placeholder:text-muted-foreground rounded-2xl focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Search Results Counter */}
            {searchTerm && (
              <div className="mt-6 text-white/80 text-lg">
                Found{" "}
                <span className="font-semibold">{filteredFAQs.length}</span>{" "}
                result
                {filteredFAQs.length !== 1 ? "s" : ""} for "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {!searchTerm && (
            <section className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-6 py-3 mb-6">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">
                    Most Popular Questions
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">
                  Quick Answers
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                  Start here - these are the questions most users ask
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {featuredFAQs.slice(0, 6).map((faq) => {
                  const category = faqCategories.find(
                    (cat) => cat.id === faq.category
                  );
                  return (
                    <Card
                      key={faq.id}
                      className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:-translate-y-2"
                      onClick={() => {
                        setExpandedItems([faq.id]);
                        document
                          .getElementById(`faq-${faq.id}`)
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                      }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-2xl group-hover:scale-110 transition-transform duration-300">
                            {category?.icon}
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs font-medium bg-muted/60"
                          >
                            {category?.title}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl leading-tight text-balance group-hover:text-primary transition-colors">
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground line-clamp-3 mb-4 text-pretty">
                          {faq.answer.substring(0, 120)}...
                        </p>
                        <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                          <span>Read full answer</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          <section>
            {!searchTerm ? (
              // Category-based view
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <div className="mb-12">
                  <h2 className="text-4xl font-bold mb-8 text-center lg:text-left">
                    Browse by Category
                  </h2>
                  <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-2 bg-muted/50 backdrop-blur-sm rounded-2xl">
                    <TabsTrigger
                      value="all"
                      className="text-sm py-4 rounded-xl font-medium"
                    >
                      All
                    </TabsTrigger>
                    {faqCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="text-sm py-4 flex flex-col gap-2 rounded-xl font-medium"
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span className="hidden sm:inline text-xs">
                          {category.title}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <TabsContent value="all" className="space-y-16">
                  {faqCategories.map((category) => {
                    const categoryFAQs = getFAQsByCategory(category.id);
                    return (
                      <div key={category.id}>
                        <div className="mb-8">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-4xl">
                              {category.icon}
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-balance">
                                {category.title}
                              </h3>
                              <p className="text-muted-foreground text-lg text-pretty">
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Accordion
                          type="multiple"
                          value={expandedItems}
                          onValueChange={setExpandedItems}
                        >
                          <div className="space-y-6">
                            {categoryFAQs.map((faq) => (
                              <div key={faq.id} id={`faq-${faq.id}`}>
                                {renderFAQItem(faq)}
                              </div>
                            ))}
                          </div>
                        </Accordion>
                      </div>
                    );
                  })}
                </TabsContent>

                {faqCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-4xl">
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold">
                            {category.title}
                          </h3>
                          <p className="text-muted-foreground text-lg">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Accordion
                      type="multiple"
                      value={expandedItems}
                      onValueChange={setExpandedItems}
                    >
                      <div className="space-y-6">
                        {getFAQsByCategory(category.id).map((faq) => (
                          <div key={faq.id} id={`faq-${faq.id}`}>
                            {renderFAQItem(faq)}
                          </div>
                        ))}
                      </div>
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              // Search results view
              <div>
                <h2 className="text-3xl font-bold mb-8">Search Results</h2>
                {filteredFAQs.length > 0 ? (
                  <Accordion
                    type="multiple"
                    value={expandedItems}
                    onValueChange={setExpandedItems}
                  >
                    <div className="space-y-6">
                      {filteredFAQs.map((faq) => (
                        <div key={faq.id} id={`faq-${faq.id}`}>
                          {renderFAQItem(faq, true)}
                        </div>
                      ))}
                    </div>
                  </Accordion>
                ) : (
                  <Card className="text-center py-16 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardContent>
                      <div className="p-4 rounded-2xl bg-muted/50 w-fit mx-auto mb-6">
                        <Search className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">
                        No results found
                      </h3>
                      <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
                        Try searching with different keywords or browse our
                        categories
                      </p>
                      <Button
                        size="lg"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                        }}
                        className="rounded-xl"
                      >
                        Browse All FAQs
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-muted/50 via-muted/30 to-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-foreground/5 bg-[size:20px_20px]" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Still Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
              Can't find what you're looking for? Try our AI assistant for
              personalized help or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a href="/ask-ai" className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Ask AI Assistant
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-muted/50 transition-all duration-300 bg-transparent"
                asChild
              >
                <a href="mailto:support@drivetestpro.ca">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
