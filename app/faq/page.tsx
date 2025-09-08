"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircleQuestion,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  FAQItem,
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
            ? "bg-yellow-200 font-medium"
            : ""
        }
      >
        {part}
      </span>
    ));
  };

  const renderFAQItem = (faq: FAQItem, highlighted = false) => (
    <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50">
        <div className="flex items-start gap-3">
          <MessageCircleQuestion className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground leading-relaxed">
              {highlighted
                ? highlightText(faq.question, searchTerm)
                : faq.question}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {faqCategories.find((cat) => cat.id === faq.category)?.title}
              </Badge>
              {faq.tags && faq.tags.length > 0 && (
                <div className="flex gap-1">
                  {faq.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {faq.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{faq.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="pl-8 text-muted-foreground leading-relaxed">
          {highlighted ? highlightText(faq.answer, searchTerm) : faq.answer}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/90">
              Find answers to common questions about using DriveTest Pro for
              your Ontario driving test preparation
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search FAQ (e.g., 'G1 requirements', 'practice tests', 'traffic signs')"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-4 text-lg bg-white border-0 shadow-lg text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Search Results Counter */}
            {searchTerm && (
              <div className="mt-4 text-primary-foreground/80">
                Found {filteredFAQs.length} result
                {filteredFAQs.length !== 1 ? "s" : ""} for "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Featured Questions */}
          {!searchTerm && (
            <section className="mb-12">
              <div className="text-center mb-8">
                <Badge
                  variant="secondary"
                  className="mb-4 bg-accent/10 text-accent border-accent/20"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Most Popular Questions
                </Badge>
                <h2 className="text-2xl font-bold mb-2">Quick Answers</h2>
                <p className="text-muted-foreground">
                  Start here - these are the questions most users ask
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredFAQs.slice(0, 6).map((faq) => {
                  const category = faqCategories.find(
                    (cat) => cat.id === faq.category
                  );
                  return (
                    <Card
                      key={faq.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md"
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
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{category?.icon}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category?.title}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg leading-tight">
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {faq.answer.substring(0, 120)}...
                        </p>
                        <Button
                          variant="ghost"
                          className="mt-3 p-0 h-auto text-primary"
                        >
                          Read full answer →
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {/* Main FAQ Section */}
          <section>
            {!searchTerm ? (
              // Category-based view
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Browse by Category
                  </h2>
                  <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-muted/30">
                    <TabsTrigger value="all" className="text-sm py-3">
                      All
                    </TabsTrigger>
                    {faqCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="text-sm py-3 flex flex-col gap-1"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="hidden sm:inline">
                          {category.title}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <TabsContent value="all">
                  {faqCategories.map((category) => {
                    const categoryFAQs = getFAQsByCategory(category.id);
                    return (
                      <div key={category.id} className="mb-12">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{category.icon}</span>
                            <h3 className="text-2xl font-bold">
                              {category.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground">
                            {category.description}
                          </p>
                        </div>

                        <Accordion
                          type="multiple"
                          value={expandedItems}
                          onValueChange={setExpandedItems}
                        >
                          <div className="space-y-4">
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
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{category.icon}</span>
                        <h3 className="text-2xl font-bold">{category.title}</h3>
                      </div>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </div>

                    <Accordion
                      type="multiple"
                      value={expandedItems}
                      onValueChange={setExpandedItems}
                    >
                      <div className="space-y-4">
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
                <h2 className="text-2xl font-bold mb-6">Search Results</h2>
                {filteredFAQs.length > 0 ? (
                  <Accordion
                    type="multiple"
                    value={expandedItems}
                    onValueChange={setExpandedItems}
                  >
                    <div className="space-y-4">
                      {filteredFAQs.map((faq) => (
                        <div key={faq.id} id={`faq-${faq.id}`}>
                          {renderFAQItem(faq, true)}
                        </div>
                      ))}
                    </div>
                  </Accordion>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        No results found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try searching with different keywords or browse our
                        categories
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                        }}
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

      {/* Still Have Questions Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Can't find what you're looking for? Try our AI assistant for
              personalized help or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/ask-ai">Ask AI Assistant</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:support@drivetestpro.ca">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
