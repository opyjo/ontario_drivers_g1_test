"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Car,
  BookOpen,
  ListChecks,
  Users,
  Smartphone,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  Trophy,
  Target,
  Zap,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AIAssistantButton } from "@/components/ai-assistant-button";

export default function HomePage() {
  const router = useRouter();

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
    <>
      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-cyan-50 via-white to-orange-50 py-12 lg:py-20"
        aria-labelledby="hero-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary border-primary/20"
            >
              <Car className="w-4 h-4 mr-2" />
              Driving Test Preparation
            </Badge>
            <h1
              id="hero-heading"
              className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Master Your Driving Test with{" "}
              <span className="text-primary">Confidence</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Prepare for your G1, G2, or full license exam with our
              comprehensive practice system: <strong>Study road rules</strong>,{" "}
              <strong>practice unlimited questions</strong>, and{" "}
              <strong>take realistic test simulations</strong>. Everything you
              need to pass your driving test.
            </p>

            {/* Key Feature Banner */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 border border-orange-200 rounded-full px-6 py-3 text-sm text-orange-700">
                <Target className="w-5 h-5" />
                <span className="font-medium">
                  <strong>Smart Learning:</strong> Focus on questions you got
                  wrong until you master them!
                </span>
                <Button
                  asChild
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-1 text-xs ml-2"
                >
                  <Link href="/quiz/review?questionType=all">Try Now</Link>
                </Button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col gap-6 mb-12">
              {/* Main Learning Actions */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  asChild
                >
                  <Link href="/study-guide">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Start Studying Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 bg-transparent"
                  asChild
                >
                  <Link href="/quiz/signs?limit=20">
                    <Target className="mr-2 h-5 w-5" />
                    Signs Practice
                  </Link>
                </Button>
              </div>

              {/* Quiz Options */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <span className="text-muted-foreground font-medium text-sm">
                  Ready to test? →
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 bg-transparent"
                    asChild
                  >
                    <Link href="/quiz/rules?limit=20">
                      <ListChecks className="mr-2 h-4 w-4" />
                      Rules Practice
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 bg-transparent"
                    asChild
                  >
                    <Link href="/quiz/simulation">
                      <Target className="mr-2 h-4 w-4" />
                      G1 Simulation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <section
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              aria-labelledby="stats-heading"
            >
              <h2 id="stats-heading" className="sr-only">
                DriveTest Pro Statistics
              </h2>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <IconComponent
                        className="w-8 h-8 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className="text-3xl font-bold text-foreground"
                      aria-label={`${stat.number} ${stat.label}`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      </section>

      {/* Core Learning Features Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2"
              >
                <Zap className="w-5 h-5 mr-2" />
                Core Learning Features
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Master Your Driving Knowledge
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Three powerful ways to prepare: comprehensive study materials,
                unlimited practice questions, and realistic test simulations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Study Guide Feature */}
              <Card className="bg-card/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary rounded-full shadow-lg">
                      <BookOpen
                        className="h-8 w-8 text-primary-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <Badge
                        variant="secondary"
                        className="mb-1 bg-primary/10 text-primary text-xs"
                      >
                        📖 Step 1
                      </Badge>
                      <h3 className="text-2xl font-bold text-primary">
                        Study Guide
                      </h3>
                    </div>
                  </div>

                  <p className="text-card-foreground mb-6 leading-relaxed">
                    Complete curriculum covering traffic laws, road signs, safe
                    driving practices, and vehicle operation.
                  </p>

                  <div className="grid grid-cols-1 gap-3 mb-6">
                    <div className="text-center p-3 bg-white/70 rounded-lg">
                      <div className="text-2xl font-bold text-primary">12+</div>
                      <div className="text-xs text-card-foreground">
                        Chapters
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white/70 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        100%
                      </div>
                      <div className="text-xs text-green-700">Coverage</div>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/study-guide">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Start Studying
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Practice Questions Feature */}
              <Card className="bg-card/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <div className="bg-gradient-to-br from-accent/10 to-accent/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-accent rounded-full shadow-lg">
                      <Target
                        className="h-8 w-8 text-accent-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <Badge
                        variant="secondary"
                        className="mb-1 bg-accent/10 text-accent text-xs"
                      >
                        🎯 Step 2
                      </Badge>
                      <h3 className="text-2xl font-bold text-accent">
                        Practice Questions
                      </h3>
                    </div>
                  </div>

                  <p className="text-card-foreground mb-6 leading-relaxed">
                    Practice signs and rules questions in a pressure-free
                    environment to build confidence and knowledge.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="text-center p-3 bg-white/70 rounded-lg">
                      <div className="text-2xl font-bold text-accent">∞</div>
                      <div className="text-xs text-card-foreground">
                        Questions
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white/70 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-xs text-green-700">Pressure</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      asChild
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Link href="/quiz/signs?limit=20">
                        <Target className="mr-2 h-5 w-5" />
                        Start Signs Practice
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-accent text-accent hover:bg-accent/10 py-3 bg-transparent"
                    >
                      <Link href="/quiz/rules?limit=20">
                        <ListChecks className="mr-2 h-4 w-4" />
                        Start Rules Practice
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Test Simulations Feature */}
              <Card className="bg-card/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-600 rounded-full shadow-lg">
                      <TrendingUp
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <Badge
                        variant="secondary"
                        className="mb-1 bg-green-100 text-green-800 text-xs"
                      >
                        ⚡ Step 3
                      </Badge>
                      <h3 className="text-2xl font-bold text-green-900">
                        Test Simulations
                      </h3>
                    </div>
                  </div>

                  <p className="text-green-800 mb-6 leading-relaxed">
                    Test your knowledge with realistic driving test simulations
                    and timed challenges.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="text-center p-3 bg-white/70 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        40
                      </div>
                      <div className="text-xs text-green-700">Questions</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      asChild
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Link href="/quiz/simulation">
                        <Target className="mr-2 h-4 w-4" />
                        G1 Simulation
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose DriveTest Pro?
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive and trusted resource used by thousands of drivers
              preparing for their license exam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands who have successfully passed their driving test
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-card">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Driving Test Process Section */}
      <section className="py-16 lg:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Your Path to Getting Licensed
            </h2>
            <p className="text-xl text-muted-foreground">
              Understanding the steps to get your driver's license
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Road Rules</h3>
              <p className="text-muted-foreground">
                Learn traffic laws, road signs, and safe driving practices
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice Tests</h3>
              <p className="text-muted-foreground">
                Take unlimited practice tests to build confidence
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Pass Written Test</h3>
              <p className="text-muted-foreground">
                Take and pass your official written driving test
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your License</h3>
              <p className="text-muted-foreground">
                Complete road test and receive your driver's license
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Pass Your Driving Test?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your journey today with our comprehensive study guide and
              practice with our realistic test simulations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
                asChild
              >
                <Link href="/study-guide">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Studying Now
                </Link>
              </Button>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 border-white"
                  asChild
                >
                  <Link href="/quiz/simulation">
                    <Target className="mr-2 h-5 w-5" />
                    G1 Simulation
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 border-white"
                  asChild
                >
                  <Link href="/quiz/review?questionType=all">
                    <ListChecks className="mr-2 h-5 w-5" />
                    Review Incorrect
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
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
            <h2 className="text-3xl font-bold mb-4">Need Instant Answers?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Ask our AI driving instructor powered by official MTO documents
            </p>
            <Button
              onClick={() => router.push("/ask-ai")}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Ask AI Assistant →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
