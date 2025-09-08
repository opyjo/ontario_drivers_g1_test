"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";
import { checkUserAccess } from "@/app/actions/check-feature-access";
import { FeatureMode } from "@/lib/authorization/constants";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, CreditCard } from "lucide-react";

interface ProtectedFeatureProps {
  featureMode: FeatureMode;
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export const ProtectedFeature = ({
  featureMode,
  children,
  fallbackTitle = "Upgrade Required",
  fallbackDescription = "This feature requires a premium subscription.",
}: ProtectedFeatureProps) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [canAccess, setCanAccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const result = await checkUserAccess(featureMode);
        setCanAccess(result.canAccess);
        if (!result.canAccess) {
          setErrorMessage(result.message);
        }
      } catch (error) {
        console.error("Access check error:", error);
        setCanAccess(false);
        setErrorMessage("Unable to verify access. Please try again.");
      }
    };

    checkAccess();
  }, [user, featureMode]);

  // Loading state
  if (canAccess === null) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // Access denied
  if (!canAccess) {
    const isLoggedIn = !!user;

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <Lock className="w-8 h-8 text-gray-400" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {fallbackTitle}
          </h3>
          <p className="text-gray-600 max-w-md">
            {errorMessage || fallbackDescription}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => router.push("/auth")}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <span>Sign In</span>
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                className="flex items-center space-x-2"
              >
                <span>Get Started</span>
              </Button>
            </>
          ) : (
            <Button
              onClick={() => router.push("/pricing")}
              className="flex items-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Upgrade Now</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Access granted
  return <>{children}</>;
};

// Example usage components
export const PremiumContentExample = () => {
  return (
    <ProtectedFeature
      featureMode="premium_feature"
      fallbackTitle="Premium Feature"
      fallbackDescription="Unlock advanced study materials and personalized learning paths with a premium subscription."
    >
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Premium Content Unlocked! 🎉
        </h2>
        <p className="text-blue-800 mb-4">
          This is premium content that only authenticated users with the right
          access level can see.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900">Advanced Analytics</h3>
            <p className="text-sm text-gray-600">
              Track your detailed progress
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900">AI-Powered Insights</h3>
            <p className="text-sm text-gray-600">
              Get personalized recommendations
            </p>
          </div>
        </div>
      </div>
    </ProtectedFeature>
  );
};
