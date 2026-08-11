export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      documents: {
        Row: {
          content: string
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content: string
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          access_level: string | null
          active_monthly_plan_price_id: string | null
          active_stripe_subscription_id: string | null
          cancel_at_period_end: boolean | null
          created_at: string
          id: string
          purchased_lifetime_price_id: string | null
          stripe_customer_id: string | null
          stripe_subscription_status: string | null
          subscription_current_period_end: string | null
          updated_at: string
        }
        Insert: {
          access_level?: string | null
          active_monthly_plan_price_id?: string | null
          active_stripe_subscription_id?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string
          id: string
          purchased_lifetime_price_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_status?: string | null
          subscription_current_period_end?: string | null
          updated_at?: string
        }
        Update: {
          access_level?: string | null
          active_monthly_plan_price_id?: string | null
          active_stripe_subscription_id?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string
          id?: string
          purchased_lifetime_price_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_status?: string | null
          subscription_current_period_end?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          created_at: string
          id: number
          is_practice: boolean | null
          is_timed: boolean | null
          practice_type: string | null
          question_ids: number[] | null
          quiz_type: string | null
          score: number | null
          time_taken_seconds: number | null
          total_questions_in_attempt: number | null
          user_answers: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_practice?: boolean | null
          is_timed?: boolean | null
          practice_type?: string | null
          question_ids?: number[] | null
          quiz_type?: string | null
          score?: number | null
          time_taken_seconds?: number | null
          total_questions_in_attempt?: number | null
          user_answers?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_practice?: boolean | null
          is_timed?: boolean | null
          practice_type?: string | null
          question_ids?: number[] | null
          quiz_type?: string | null
          score?: number | null
          time_taken_seconds?: number | null
          total_questions_in_attempt?: number | null
          user_answers?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rules_questions: {
        Row: {
          category: string
          correct_option: string
          created_at: string | null
          difficulty_level: string | null
          explanation: string | null
          id: number
          is_active: boolean | null
          is_frequently_tested: boolean | null
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          subcategory: string | null
        }
        Insert: {
          category: string
          correct_option: string
          created_at?: string | null
          difficulty_level?: string | null
          explanation?: string | null
          id?: number
          is_active?: boolean | null
          is_frequently_tested?: boolean | null
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          subcategory?: string | null
        }
        Update: {
          category?: string
          correct_option?: string
          created_at?: string | null
          difficulty_level?: string | null
          explanation?: string | null
          id?: number
          is_active?: boolean | null
          is_frequently_tested?: boolean | null
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_text?: string
          subcategory?: string | null
        }
        Relationships: []
      }
      signs_questions: {
        Row: {
          category: string | null
          correct_option: string
          created_at: string | null
          difficulty_level: string | null
          explanation: string | null
          id: number
          image_description: string | null
          image_url: string | null
          is_active: boolean | null
          is_frequently_tested: boolean | null
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          subcategory: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          correct_option: string
          created_at?: string | null
          difficulty_level?: string | null
          explanation?: string | null
          id?: number
          image_description?: string | null
          image_url?: string | null
          is_active?: boolean | null
          is_frequently_tested?: boolean | null
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          subcategory?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          correct_option?: string
          created_at?: string | null
          difficulty_level?: string | null
          explanation?: string | null
          id?: number
          image_description?: string | null
          image_url?: string | null
          is_active?: boolean | null
          is_frequently_tested?: boolean | null
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_text?: string
          subcategory?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_freemium_quiz_counts: {
        Row: {
          count: number
          created_at: string
          last_attempted: string | null
          mode: string
          updated_at: string
          user_id: string
        }
        Insert: {
          count?: number
          created_at?: string
          last_attempted?: string | null
          mode: string
          updated_at?: string
          user_id: string
        }
        Update: {
          count?: number
          created_at?: string
          last_attempted?: string | null
          mode?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_freemium_quiz_counts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_incorrect_questions: {
        Row: {
          created_at: string
          question_id: number
          question_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          question_id: number
          question_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          question_id?: number
          question_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consume_ai_rate_limit: { Args: { p_user_id: string }; Returns: boolean }
      get_g1_questions_by_category: {
        Args: {
          category_filter: string
          difficulty_filter?: string
          question_limit?: number
          question_type_filter?: string
        }
        Returns: {
          category: string
          correct_option: string
          explanation: string
          id: number
          image_description: string
          image_url: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          question_type: string
        }[]
      }
      get_g1_simulation_questions: {
        Args: never
        Returns: {
          category: string
          correct_option: string
          explanation: string
          id: number
          image_description: string
          image_url: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          question_type: string
        }[]
      }
      get_incorrect_questions:
        | {
            Args: { user_id_param: string }
            Returns: {
              correct_option: string
              id: number
              option_a: string
              option_b: string
              option_c: string
              option_d: string
              question_text: string
              question_type: string
            }[]
          }
        | {
            Args: { question_type: string; user_id_param: string }
            Returns: {
              category: string
              correct_option: string
              explanation: string
              id: number
              image_description: string
              image_url: string
              option_a: string
              option_b: string
              option_c: string
              option_d: string
              question_text: string
              question_type: string
            }[]
          }
      get_random_g1_questions: {
        Args: {
          difficulty_filter?: string
          exclude_recent_ids?: Json
          question_limit?: number
          rules_limit?: number
          signs_limit?: number
        }
        Returns: {
          category: string
          correct_option: string
          explanation: string
          id: number
          image_description: string
          image_url: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          question_type: string
        }[]
      }
      get_random_practice_questions: {
        Args: {
          incorrect_only?: boolean
          question_limit?: number
          user_id_param?: string
        }
        Returns: {
          correct_option: string
          id: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
        }[]
      }
      get_random_questions: {
        Args: { question_limit?: number }
        Returns: {
          correct_option: string
          id: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
        }[]
      }
      get_rules_practice_questions: {
        Args: { question_limit?: number }
        Returns: {
          category: string
          correct_option: string
          explanation: string
          id: number
          image_description: string
          image_url: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          question_type: string
        }[]
      }
      get_signs_practice_questions: {
        Args: { question_limit?: number }
        Returns: {
          category: string
          correct_option: string
          explanation: string
          id: number
          image_description: string
          image_url: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          question_type: string
        }[]
      }
      get_user_quiz_attempt_count: {
        Args: { p_quiz_mode: string; p_user_id: string }
        Returns: number
      }
      get_user_quiz_statistics: {
        Args: { p_user_id: string }
        Returns: {
          avg_score: number
          best_score: number
          incorrect_questions_count: number
          total_attempts: number
          total_practice_attempts: number
          total_standard_attempts: number
          total_timed_attempts: number
        }[]
      }
      increment_user_quiz_mode_attempts: {
        Args: { p_quiz_mode: string; p_user_id: string }
        Returns: undefined
      }
      match_documents: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      reset_user_quiz_attempt_count: {
        Args: { p_quiz_mode: string; p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
