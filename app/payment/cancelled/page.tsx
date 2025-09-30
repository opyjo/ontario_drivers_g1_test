"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle, ArrowLeft, CreditCard } from "lucide-react";

export default function PaymentCancelledPage() {
  const router = useRouter();

  const handleReturnToPricing = () => {
    router.push("/pricing");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-lg w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-orange-100 p-3">
              <XCircle className="h-12 w-12 text-orange-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            Payment Cancelled
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Your payment was not processed. No charges were made to your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              If you experienced any issues during checkout or have questions
              about our pricing plans, please don&apos;t hesitate to contact our
              support team.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            You can try again anytime you&apos;re ready.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={handleReturnToPricing} className="w-full" size="lg">
            <CreditCard className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" onClick={handleGoHome} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
