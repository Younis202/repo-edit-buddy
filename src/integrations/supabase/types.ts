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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      asset_assignments: {
        Row: {
          asset_id: string
          assigned_date: string
          created_at: string
          employee_id: string
          id: string
          notes: string | null
          returned_date: string | null
        }
        Insert: {
          asset_id: string
          assigned_date?: string
          created_at?: string
          employee_id: string
          id?: string
          notes?: string | null
          returned_date?: string | null
        }
        Update: {
          asset_id?: string
          assigned_date?: string
          created_at?: string
          employee_id?: string
          id?: string
          notes?: string | null
          returned_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_assignments_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_categories: {
        Row: {
          created_at: string
          default_useful_life_years: number
          id: string
          name: string
          residual_value_percent: number
        }
        Insert: {
          created_at?: string
          default_useful_life_years?: number
          id?: string
          name: string
          residual_value_percent?: number
        }
        Update: {
          created_at?: string
          default_useful_life_years?: number
          id?: string
          name?: string
          residual_value_percent?: number
        }
        Relationships: []
      }
      assets: {
        Row: {
          category_id: string | null
          condition: Database["public"]["Enums"]["asset_condition"]
          created_at: string
          created_by: string | null
          id: string
          is_archived: boolean
          location: string | null
          name: string
          notes: string | null
          purchase_cost: number
          purchase_date: string
          residual_value_percent: number
          serial_number: string | null
          updated_at: string
          useful_life_years: number
        }
        Insert: {
          category_id?: string | null
          condition?: Database["public"]["Enums"]["asset_condition"]
          created_at?: string
          created_by?: string | null
          id?: string
          is_archived?: boolean
          location?: string | null
          name: string
          notes?: string | null
          purchase_cost?: number
          purchase_date: string
          residual_value_percent?: number
          serial_number?: string | null
          updated_at?: string
          useful_life_years?: number
        }
        Update: {
          category_id?: string | null
          condition?: Database["public"]["Enums"]["asset_condition"]
          created_at?: string
          created_by?: string | null
          id?: string
          is_archived?: boolean
          location?: string | null
          name?: string
          notes?: string | null
          purchase_cost?: number
          purchase_date?: string
          residual_value_percent?: number
          serial_number?: string | null
          updated_at?: string
          useful_life_years?: number
        }
        Relationships: [
          {
            foreignKeyName: "assets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "asset_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          description: string | null
          discount_type: Database["public"]["Enums"]["discount_type"]
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number
          min_order_amount: number
          updated_at: string
          used_count: number
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          discount_type?: Database["public"]["Enums"]["discount_type"]
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number
          min_order_amount?: number
          updated_at?: string
          used_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          discount_type?: Database["public"]["Enums"]["discount_type"]
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number
          min_order_amount?: number
          updated_at?: string
          used_count?: number
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          department: string | null
          email: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          color: string | null
          created_at: string
          id: string
          line_total: number
          meta: Json | null
          order_id: string
          product_id: string | null
          product_image: string | null
          product_name: string
          product_slug: string | null
          quantity: number
          size: string | null
          unit_price: number
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          line_total?: number
          meta?: Json | null
          order_id: string
          product_id?: string | null
          product_image?: string | null
          product_name: string
          product_slug?: string | null
          quantity?: number
          size?: string | null
          unit_price?: number
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          line_total?: number
          meta?: Json | null
          order_id?: string
          product_id?: string | null
          product_image?: string | null
          product_name?: string
          product_slug?: string | null
          quantity?: number
          size?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          admin_notes: string | null
          coupon_code: string | null
          created_at: string
          discount: number
          guest_email: string | null
          id: string
          order_number: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          shipping_address: string
          shipping_city: string | null
          shipping_cost: number
          shipping_full_name: string
          shipping_governorate: string | null
          shipping_notes: string | null
          shipping_phone: string
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total: number
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          coupon_code?: string | null
          created_at?: string
          discount?: number
          guest_email?: string | null
          id?: string
          order_number?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          shipping_address: string
          shipping_city?: string | null
          shipping_cost?: number
          shipping_full_name: string
          shipping_governorate?: string | null
          shipping_notes?: string | null
          shipping_phone: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          coupon_code?: string | null
          created_at?: string
          discount?: number
          guest_email?: string | null
          id?: string
          order_number?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          shipping_address?: string
          shipping_city?: string | null
          shipping_cost?: number
          shipping_full_name?: string
          shipping_governorate?: string | null
          shipping_notes?: string | null
          shipping_phone?: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          accordion: Json
          category: string | null
          colors: Json
          created_at: string
          display_order: number
          gender: Database["public"]["Enums"]["product_gender"]
          id: string
          images: Json
          in_stock: boolean
          is_published: boolean
          low_stock_threshold: number
          material: string | null
          name: string
          name_italic: string | null
          original_price_display: string | null
          price_display: string
          price_numeric: number
          season: string | null
          short_description: string | null
          sizes: Json
          slug: string
          stock_count: number
          tag: string | null
          updated_at: string
        }
        Insert: {
          accordion?: Json
          category?: string | null
          colors?: Json
          created_at?: string
          display_order?: number
          gender?: Database["public"]["Enums"]["product_gender"]
          id?: string
          images?: Json
          in_stock?: boolean
          is_published?: boolean
          low_stock_threshold?: number
          material?: string | null
          name: string
          name_italic?: string | null
          original_price_display?: string | null
          price_display: string
          price_numeric?: number
          season?: string | null
          short_description?: string | null
          sizes?: Json
          slug: string
          stock_count?: number
          tag?: string | null
          updated_at?: string
        }
        Update: {
          accordion?: Json
          category?: string | null
          colors?: Json
          created_at?: string
          display_order?: number
          gender?: Database["public"]["Enums"]["product_gender"]
          id?: string
          images?: Json
          in_stock?: boolean
          is_published?: boolean
          low_stock_threshold?: number
          material?: string | null
          name?: string
          name_italic?: string | null
          original_price_display?: string | null
          price_display?: string
          price_numeric?: number
          season?: string | null
          short_description?: string | null
          sizes?: Json
          slug?: string
          stock_count?: number
          tag?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_name: string | null
          comment: string | null
          created_at: string
          id: string
          is_approved: boolean
          product_id: string
          rating: number
          title: string | null
          user_id: string | null
        }
        Insert: {
          author_name?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean
          product_id: string
          rating: number
          title?: string | null
          user_id?: string | null
        }
        Update: {
          author_name?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean
          product_id?: string
          rating?: number
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_list_users: {
        Args: never
        Returns: {
          created_at: string
          email: string
          first_name: string
          is_admin: boolean
          last_name: string
          last_sign_in_at: string
          phone: string
          user_id: string
        }[]
      }
      generate_order_number: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      asset_condition: "excellent" | "good" | "fair" | "poor" | "retired"
      discount_type: "fixed" | "percent"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded"
      payment_method: "cod" | "card" | "wallet" | "transfer"
      product_gender: "men" | "women" | "unisex"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
      asset_condition: ["excellent", "good", "fair", "poor", "retired"],
      discount_type: ["fixed", "percent"],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      payment_method: ["cod", "card", "wallet", "transfer"],
      product_gender: ["men", "women", "unisex"],
    },
  },
} as const
