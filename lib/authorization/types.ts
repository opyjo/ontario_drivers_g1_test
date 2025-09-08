export type AccessCheckResult =
  | { canAccess: true; message?: never }
  | { canAccess: false; message: string; isLoggedIn: boolean };

export interface UserProfile {
  access_level?: string | null;
  subscription_current_period_end?: string | null;
  cancel_at_period_end?: boolean | null;
}
