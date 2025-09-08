# Comprehensive Authentication & Authorization System

A complete implementation guide for building a robust authentication and authorization system using **Next.js 14 App Router**, **Supabase**, **Zustand**, and **TypeScript**.

## Table of Contents

- [System Overview](#system-overview)
- [Core Technologies Stack](#core-technologies-stack)
- [Authentication Features](#1-authentication-features)
- [State Management with Zustand](#2-state-management-with-zustand)
- [Authorization System](#3-authorization-system)
- [UI Components](#4-ui-components)
- [Route Protection Patterns](#5-route-protection-patterns)
- [Integration Setup](#6-integration-setup)
- [Key Implementation Principles](#7-key-implementation-principles)

## System Overview

This system provides a full-featured authentication and authorization solution with the following features:

### Core Technologies Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Supabase (Auth, Database, Real-time)
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS + Shadcn UI
- **Payments**: Stripe integration (optional)

## 1. Authentication Features

### Authentication Methods

- **Email/Password authentication**
- **Google OAuth integration**
- **Password reset functionality**
- **Email verification**
- **Session management**

### Auth Pages & Components Structure

```text
app/
├── auth/
│   ├── page.tsx                    # Sign in page
│   ├── callback/
│   │   └── route.ts               # OAuth callback handler
│   └── reset-password/
│       └── page.tsx               # Password reset page
├── signup/
│   └── page.tsx                   # Sign up page
└── actions/
    └── check-auth-access.ts       # Server action for access control

components/
├── auth-form.tsx                  # Sign in form component
├── signup-form.tsx               # Sign up form component
├── auth/
│   ├── AuthBlock.tsx             # Conditional auth display
│   ├── AuthDesktop.tsx           # Desktop auth menu
│   ├── AuthMobile.tsx            # Mobile auth menu
│   ├── GuestBlock.tsx            # Non-authenticated user display
│   ├── NavButton.tsx             # Navigation button component
│   ├── NavItems.tsx              # Navigation items with auth guards
│   └── UserNav.tsx               # Main navigation component
└── providers/
    └── auth-provider.tsx         # Auth context provider
```

### Supabase Configuration

#### Client-Side Configuration

```typescript
// lib/supabase-client.ts
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey);
export default supabase;
```

#### Server-Side Configuration

```typescript
// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type Database } from "@/types/supabase";

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => {
          const store = await cookieStore;
          return store.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll: async (cookiesToSet) => {
          try {
            const store = await cookieStore;
            cookiesToSet.forEach((cookie) => {
              (store as any).set(cookie.name, cookie.value, cookie.options);
            });
          } catch (error) {
            // Expected behavior in server components
          }
        },
      },
    }
  );
}
```

## 2. State Management with Zustand

### Auth Store Structure

#### Types Definition

```typescript
// stores/auth/types.ts
import { User } from "@supabase/supabase-js";

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  subscription: {
    status: "active" | "trialing" | "canceled" | "expired" | null;
    cancelAtPeriodEnd: boolean;
  };
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setSubscription: (subscription: AuthState["subscription"]) => void;
  signOut: () => Promise<void>;
  clearError: () => void;
  initialize: () => Promise<(() => void) | undefined>;
}
```

#### Store Implementation

```typescript
// stores/auth/authStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import supabaseClient from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: true,
        error: null,
        subscription: { status: null, cancelAtPeriodEnd: false },

        setUser: (user) => set({ user }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        setSubscription: (subscription) => set({ subscription }),

        signOut: async () => {
          try {
            set({ isLoading: true });
            await supabaseClient.auth.signOut();
            set({
              user: null,
              subscription: { status: null, cancelAtPeriodEnd: false },
            });
          } catch (error) {
            console.error("Sign out error:", error);
          } finally {
            set({ isLoading: false });
          }
        },

        initialize: async () => {
          try {
            set({ isLoading: true });

            const {
              data: { session },
            } = await supabaseClient.auth.getSession();
            set({ user: session?.user ?? null });

            const {
              data: { subscription },
            } = supabaseClient.auth.onAuthStateChange((_event, session) => {
              set({ user: session?.user ?? null });
            });

            return () => {
              subscription.unsubscribe();
            };
          } catch (error) {
            console.error("Auth initialization error:", error);
          } finally {
            set({ isLoading: false });
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          subscription: state.subscription,
        }),
      }
    ),
    { name: "Auth Store" }
  )
);
```

#### Selectors

```typescript
// stores/auth/selectors.ts
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.user !== null;
export const selectAuthLoading = (state: AuthState) => state.isLoading;
export const selectIsSubscribed = (state: AuthState) =>
  state.subscription.status === "active" ||
  state.subscription.status === "trialing";
```

## 3. Authorization System

### Database Schema (Supabase)

```sql
-- Profiles table for user data and subscription info
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  access_level text DEFAULT 'free',
  stripe_customer_id text,
  stripe_subscription_status text,
  subscription_current_period_end timestamp with time zone,
  cancel_at_period_end boolean DEFAULT false,
  active_monthly_plan_price_id text,
  purchased_lifetime_price_id text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Usage tracking table (for freemium limits)
CREATE TABLE user_freemium_feature_counts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  feature text NOT NULL,
  count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, feature)
);

-- Row Level Security policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_freemium_feature_counts ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### Access Control Constants & Types

```typescript
// lib/authorization/constants.ts
export type AccessLevel = "free" | "subscribed_monthly" | "lifetime";
export type FeatureMode =
  | "basic_feature"
  | "premium_feature"
  | "advanced_feature";

export interface FeatureLimits {
  basic_feature: number;
  premium_feature: number;
  advanced_feature: number;
}

export const FREE_TIER_LIMITS: Readonly<FeatureLimits> = {
  basic_feature: 3,
  premium_feature: 1,
  advanced_feature: 0,
};

export const PAID_ACCESS_LEVELS = ["lifetime", "subscribed_monthly"];
```

```typescript
// lib/authorization/types.ts
export type AccessCheckResult =
  | { canAccess: true; message?: never }
  | { canAccess: false; message: string; isLoggedIn: boolean };

export interface UserProfile {
  access_level?: string | null;
  subscription_current_period_end?: string | null;
  cancel_at_period_end?: boolean | null;
}
```

```typescript
// lib/authorization/helpers.ts
export function isPaidUser(profile: UserProfile | null): boolean {
  return !!(
    profile?.access_level && PAID_ACCESS_LEVELS.includes(profile.access_level)
  );
}

export async function checkFeatureAccess(
  featureMode: FeatureMode
): Promise<AccessCheckResult> {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      canAccess: false,
      message: "You must be logged in to access this feature.",
      isLoggedIn: false,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("access_level")
    .eq("id", user.id)
    .single();

  if (isPaidUser(profile)) {
    return { canAccess: true };
  }

  // Check usage limits for free users
  const limit = FREE_TIER_LIMITS[featureMode];

  const { data: usageData } = await supabase
    .from("user_freemium_feature_counts")
    .select("count")
    .eq("user_id", user.id)
    .eq("feature", featureMode)
    .single();

  const currentUsage = usageData?.count ?? 0;

  if (currentUsage < limit) {
    return { canAccess: true };
  }

  return {
    canAccess: false,
    message: `You've reached your limit of ${limit} ${featureMode} uses. Upgrade for unlimited access!`,
    isLoggedIn: true,
  };
}
```

### Server Actions for Access Control

```typescript
// app/actions/check-feature-access.ts
"use server";

import { checkFeatureAccess } from "@/lib/authorization/helpers";
import { FeatureMode } from "@/lib/authorization/constants";

export async function checkUserAccess(featureMode: FeatureMode) {
  return await checkFeatureAccess(featureMode);
}
```

## 4. UI Components

### Auth Forms

#### Sign-in Form Features

```typescript
// components/auth-form.tsx
// Comprehensive sign-in form with:
// - Email/password authentication
// - Google OAuth integration
// - Password reset functionality
// - Error handling and loading states
// - Form validation
```

#### Sign-up Form Features

```typescript
// components/signup-form.tsx
// Registration form with:
// - User registration with email verification
// - Google OAuth sign-up
// - Form validation (password confirmation, length requirements)
// - Success/error messaging
```

**Key features for both forms:**

- Loading indicators during auth operations
- Error alerts with proper styling
- Responsive design with Tailwind CSS
- Accessibility features (proper labels, ARIA attributes)

### Navigation & Access Control

#### Main Navigation Component

```typescript
// components/auth/UserNav.tsx
// Main navigation with:
// - Responsive mobile/desktop layouts
// - Authenticated vs. guest state management
// - User dropdown menu with profile options
// - Sign out functionality
```

#### Conditional Auth Components

```typescript
// components/auth/AuthBlock.tsx - Conditional rendering based on auth state
// components/auth/NavItems.tsx - Navigation items with route protection
```

**Key patterns:**

- Use Zustand selectors to access auth state
- Conditional rendering based on authentication status
- Loading placeholders during auth initialization
- Modal confirmations for protected features

## 5. Route Protection Patterns

### Component-Level Protection

```typescript
// Pattern 1: Component-level access gating
export function ProtectedFeature() {
  const user = useAuthStore((s) => s.user);
  const [canAccess, setCanAccess] = useState<boolean | null>(null);

  useEffect(() => {
    checkUserAccess("premium_feature").then((result) => {
      setCanAccess(result.canAccess);
    });
  }, [user]);

  if (canAccess === null) return <LoadingSpinner />;

  if (!canAccess) {
    return (
      <AccessDeniedModal
        message="Upgrade to access this feature"
        onUpgrade={() => router.push("/pricing")}
      />
    );
  }

  return <PremiumFeatureContent />;
}

// Pattern 2: Navigation guards
export async function handleProtectedNavigation(
  featureMode: FeatureMode,
  targetPath: string,
  options: { router: AppRouterInstance; user: User | null }
) {
  const { router, user } = options;

  const result = user
    ? await checkUserAccess(featureMode)
    : { canAccess: false, message: "Please sign in", isLoggedIn: false };

  if (result.canAccess) {
    router.push(targetPath);
  } else {
    // Show upgrade modal or redirect to auth
    const redirectPath = result.isLoggedIn ? "/pricing" : "/auth";
    router.push(redirectPath);
  }
}
```

### Server-Side Protection

```typescript
// app/protected-page/page.tsx
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Additional access level checks can be added here
  const { data: profile } = await supabase
    .from("profiles")
    .select("access_level")
    .eq("id", user.id)
    .single();

  if (!isPaidUser(profile)) {
    redirect("/pricing");
  }

  return <PremiumPageContent />;
}
```

## 6. Integration Setup

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Stripe for payments
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### App Layout Integration

```typescript
// app/layout.tsx
import { AuthProvider } from "@/components/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import UserNav from "@/components/auth/UserNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <UserNav />
            <main>{children}</main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

```typescript
// components/providers/auth-provider.tsx
"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/stores";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const cleanup = initialize();
    return () => {
      cleanup.then((unsubscribe) => unsubscribe?.());
    };
  }, [initialize]);

  return <>{children}</>;
}
```

### Package Dependencies

```json
{
  "dependencies": {
    "@supabase/ssr": "^0.0.10",
    "@supabase/supabase-js": "^2.38.4",
    "zustand": "^4.4.7",
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.2.2"
  }
}
```

## 7. Key Implementation Principles

### Security Best Practices

- **Server-side validation**: Always validate permissions on the server
- **Row Level Security**: Use Supabase RLS policies
- **Session management**: Automatic session refresh and cleanup
- **Input validation**: Sanitize and validate all user inputs
- **CSRF protection**: Built-in with Next.js App Router
- **Secure headers**: Configure appropriate security headers

### User Experience Patterns

- **Loading states**: Show spinners during auth operations
- **Error handling**: Clear, actionable error messages
- **Graceful degradation**: Fallback behaviors for failed operations
- **Responsive design**: Works on all device sizes
- **Accessibility**: WCAG compliant components and interactions

### Scalability Considerations

- **Zustand persistence**: Maintain auth state across refreshes
- **Server components**: Use RSC where possible for better performance
- **Optimistic updates**: Update UI immediately, sync with server
- **Error boundaries**: Catch and handle authentication errors gracefully
- **Code splitting**: Lazy load authentication components
- **Caching strategies**: Implement appropriate cache headers

### Performance Optimizations

- **Minimize client-side JavaScript**: Use server components when possible
- **Efficient state updates**: Only update necessary parts of the auth state
- **Connection pooling**: Utilize Supabase connection pooling
- **Image optimization**: Optimize auth-related images and icons

## Getting Started

1. **Set up Supabase project** with authentication enabled
2. **Configure environment variables** in your Next.js app
3. **Install required dependencies** using npm or yarn
4. **Set up database schema** using the provided SQL
5. **Implement auth store** using Zustand with persistence
6. **Create auth components** following the provided patterns
7. **Add route protection** using server actions and client-side guards
8. **Test authentication flows** including sign-up, sign-in, and access control

This system provides a robust, scalable authentication and authorization foundation that can be adapted to various application types while maintaining security, usability, and maintainability.

## Contributing

When implementing this system:

- Follow TypeScript best practices
- Implement comprehensive error handling
- Add unit tests for critical auth flows
- Document any customizations or extensions
- Keep security considerations as the top priority

## License

This implementation guide is based on modern web development best practices and can be freely adapted for your projects.
