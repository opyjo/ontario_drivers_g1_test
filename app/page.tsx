import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  ListChecks,
  Users,
  Smartphone,
  Shield,
  Clock,
  CheckCircle,
  Trophy,
  BarChart3,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CTA";
import { PageLayout } from "@/components/layouts/PageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "G1 Practice Tests, Study Guide & Simulation | DriveTest Pro",
  description:
    "Prepare for your G1/G2 with free practice questions, study guides, and realistic simulations. Learn road rules and signs with instant feedback.",
  keywords: [
    "G1 practice test",
    "Ontario driving test",
    "driving test practice",
    "road signs quiz",
    "G1 simulation",
    "study guide",
  ],
  alternates: {
    canonical: "https://drivetest.pro/",
  },
  openGraph: {
    title: "DriveTest Pro — Pass Your G1 with Confidence",
    description:
      "Master your driving test with practice questions, study materials, and realistic simulations.",
    url: "https://drivetest.pro/",
    siteName: "DriveTest Pro",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "DriveTest Pro preview",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DriveTest Pro — Pass Your G1 with Confidence",
    description:
      "Master your driving test with practice questions, study materials, and realistic simulations.",
    images: ["/placeholder.jpg"],
  },
};

export default function HomePage() {
  const stats = [
    { number: "50,000+", label: "Practice Questions", icon: ListChecks },
    { number: "95%", label: "Pass Rate", icon: Trophy },
    { number: "24/7", label: "Available", icon: Clock },
    { number: "100K+", label: "Students Helped", icon: Users },
  ];

  const features = [
    {
      title: "Comprehensive Question Bank",
      description:
        "Access thousands of practice questions covering all aspects of driving theory and road rules.",
      icon: BookOpen,
    },
    {
      title: "G1 Test Simulation",
      description:
        "Experience realistic G1 simulations: 20 signs + 20 rules, untimed.",
      icon: Clock,
    },
    {
      title: "Instant Feedback",
      description:
        "Get immediate explanations for every answer to understand road rules and improve your knowledge.",
      icon: CheckCircle,
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your improvement with detailed analytics and identify areas that need more practice.",
      icon: BarChart3,
    },
    {
      title: "Mobile Friendly",
      description:
        "Study anywhere, anytime with our responsive design that works perfectly on all devices.",
      icon: Smartphone,
    },
    {
      title: "Expert Content",
      description:
        "All questions are created by driving instructors and updated to reflect current road rules.",
      icon: Shield,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "Toronto, ON",
      text: "Passed my G1 test on the first try! The practice questions were exactly like the real exam.",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      location: "Vancouver, BC",
      text: "The explanations helped me understand road rules I was confused about. Highly recommend!",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      location: "Calgary, AB",
      text: "Great app for studying on the go. The mobile interface is clean and easy to use.",
      rating: 5,
    },
  ];

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "DriveTest Pro",
            url: "https://drivetest.pro/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://drivetest.pro/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <Hero stats={stats} />

      <Features />

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Why Choose DriveTest Pro?
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Comprehensive and trusted resource used by thousands of drivers
                preparing for their license exam
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className="group relative bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg lg:text-xl font-semibold">
                          {feature.title}
                        </CardTitle>
                      </div>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      {/* Driving Test Process Section */}
      <section className="py-16 lg:py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Your Path to Getting Licensed
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Understanding the steps to get your driver's license
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group relative bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-3">
                    Study Road Rules
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Learn traffic laws, road signs, and safe driving practices
                  </p>
                </div>
              </Card>

              <Card className="group relative bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-3">
                    Practice Tests
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Take unlimited practice tests to build confidence
                  </p>
                </div>
              </Card>

              <Card className="group relative bg-card border border-border hover:border-accent/50 transition-all duration-500 overflow-hidden cursor-pointer text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6">
                  <div className="w-14 h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-3">
                    Pass Written Test
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Take and pass your official written driving test
                  </p>
                </div>
              </Card>

              <Card className="group relative bg-card border border-border hover:border-green-500/50 transition-all duration-500 overflow-hidden cursor-pointer text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6">
                  <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-3">
                    Get Your License
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Complete road test and receive your driver's license
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />

      {/* About Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
              About DriveTest Pro
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p>
                DriveTest Pro is your comprehensive resource for preparing for
                driving license exams. Our platform covers all essential topics
                including traffic laws, road signs, safe driving practices, and
                vehicle operation to help you succeed on your test.
              </p>
              <p>
                Whether you're preparing for your G1, G2, or full license exam,
                our study materials and practice tests are designed to build
                your confidence and knowledge. Our realistic test simulations
                mirror the actual exam format to ensure you're fully prepared.
              </p>
              <p>
                We believe that safe, knowledgeable drivers make our roads safer
                for everyone. Our free study resources help ensure you're
                well-prepared for your driving test and ready to be a
                responsible driver.
              </p>
            </div>
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> This is an independent study
                resource and is not affiliated with or endorsed by any
                government driving test authority. Please refer to your local
                driving authority for the most current information about
                licensing requirements and procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section for AI Assistant */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Need Instant Answers?
            </h2>
            <p className="text-base lg:text-lg mb-8 text-blue-100 leading-relaxed">
              Ask our AI driving instructor powered by official MTO documents
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 text-base font-semibold shadow-lg"
            >
              <Link href="/ask-ai">Ask AI Assistant →</Link>
            </Button>
          </div>
        </div>
      </section>

      <CallToAction />
    </PageLayout>
  );
}
