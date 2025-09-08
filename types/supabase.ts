export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          access_level: string | null;
          stripe_customer_id: string | null;
          stripe_subscription_status: string | null;
          subscription_current_period_end: string | null;
          cancel_at_period_end: boolean | null;
          active_monthly_plan_price_id: string | null;
          purchased_lifetime_price_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          access_level?: string | null;
          stripe_customer_id?: string | null;
          stripe_subscription_status?: string | null;
          subscription_current_period_end?: string | null;
          cancel_at_period_end?: boolean | null;
          active_monthly_plan_price_id?: string | null;
          purchased_lifetime_price_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          access_level?: string | null;
          stripe_customer_id?: string | null;
          stripe_subscription_status?: string | null;
          subscription_current_period_end?: string | null;
          cancel_at_period_end?: boolean | null;
          active_monthly_plan_price_id?: string | null;
          purchased_lifetime_price_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_freemium_feature_counts: {
        Row: {
          id: string;
          user_id: string | null;
          feature: string;
          count: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          feature: string;
          count?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          feature?: string;
          count?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_freemium_feature_counts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
