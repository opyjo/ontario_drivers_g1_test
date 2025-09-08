import { AuthState } from "./types";

export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.user !== null;
export const selectAuthLoading = (state: AuthState) => state.isLoading;
export const selectIsSubscribed = (state: AuthState) =>
  state.subscription.status === "active" ||
  state.subscription.status === "trialing";
