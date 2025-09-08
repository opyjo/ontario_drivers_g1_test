import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import supabaseClient from "@/lib/supabase-client";
import { AuthStore, AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
  subscription: { status: null, cancelAtPeriodEnd: false },
};

// Create the store with proper SSR handling
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setUser: (user) => set({ user }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        setSubscription: (subscription) => set({ subscription }),
        clearError: () => set({ error: null }),

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
            set({ error: "Failed to sign out" });
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
            set({ error: "Failed to initialize authentication" });
          } finally {
            set({ isLoading: false });
          }
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => {
          // Only use localStorage on client side
          if (typeof window !== "undefined") {
            return localStorage;
          }
          // Return a no-op storage for server side
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }),
        partialize: (state) => ({
          user: state.user,
          subscription: state.subscription,
        }),
        // Important: This prevents hydration during server-side rendering
        skipHydration: true,
      }
    ),
    { name: "Auth Store" }
  )
);

// Helper to manually hydrate the store on the client side
export const hydrateAuthStore = () => {
  if (typeof window !== "undefined") {
    useAuthStore.persist.rehydrate();
  }
};
