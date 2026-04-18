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
      admin_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          title: string
          type?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
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
      coupon_redemptions: {
        Row: {
          coupon_id: string
          created_at: string
          discount_applied: number
          id: string
          order_id: string | null
          user_id: string | null
        }
        Insert: {
          coupon_id: string
          created_at?: string
          discount_applied?: number
          id?: string
          order_id?: string | null
          user_id?: string | null
        }
        Update: {
          coupon_id?: string
          created_at?: string
          discount_applied?: number
          id?: string
          order_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupon_redemptions_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_redemptions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          description: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          min_order_amount: number
          uses_count: number
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          discount_type: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          min_order_amount?: number
          uses_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          min_order_amount?: number
          uses_count?: number
        }
        Relationships: []
      }
      crm_branch_stock: {
        Row: {
          branch_id: string
          id: string
          low_threshold: number
          product_id: string
          quantity: number
          updated_at: string
        }
        Insert: {
          branch_id: string
          id?: string
          low_threshold?: number
          product_id: string
          quantity?: number
          updated_at?: string
        }
        Update: {
          branch_id?: string
          id?: string
          low_threshold?: number
          product_id?: string
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_branch_stock_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "crm_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_branch_stock_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_branches: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          google_maps_url: string | null
          governorate: string | null
          id: string
          is_active: boolean
          manager_name: string | null
          name: string
          opening_hours: string | null
          phone: string | null
          slug: string | null
          sort_order: number
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          google_maps_url?: string | null
          governorate?: string | null
          id?: string
          is_active?: boolean
          manager_name?: string | null
          name: string
          opening_hours?: string | null
          phone?: string | null
          slug?: string | null
          sort_order?: number
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          google_maps_url?: string | null
          governorate?: string | null
          id?: string
          is_active?: boolean
          manager_name?: string | null
          name?: string
          opening_hours?: string | null
          phone?: string | null
          slug?: string | null
          sort_order?: number
          whatsapp?: string | null
        }
        Relationships: []
      }
      crm_campaigns: {
        Row: {
          clicked_count: number
          content: string
          conversion_revenue: number
          converted_count: number
          created_at: string
          created_by: string | null
          id: string
          name: string
          opened_count: number
          recipients_count: number
          scheduled_at: string | null
          segment_id: string | null
          sent_count: number
          status: string
          subject: string | null
          type: string
          updated_at: string
        }
        Insert: {
          clicked_count?: number
          content: string
          conversion_revenue?: number
          converted_count?: number
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          opened_count?: number
          recipients_count?: number
          scheduled_at?: string | null
          segment_id?: string | null
          sent_count?: number
          status?: string
          subject?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          clicked_count?: number
          content?: string
          conversion_revenue?: number
          converted_count?: number
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          opened_count?: number
          recipients_count?: number
          scheduled_at?: string | null
          segment_id?: string | null
          sent_count?: number
          status?: string
          subject?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_campaigns_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "crm_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_customers: {
        Row: {
          address: string | null
          assigned_to: string | null
          branch_id: string | null
          city: string | null
          created_at: string
          created_by: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string
          gender: string | null
          governorate: string | null
          id: string
          internal_notes: string | null
          last_purchase_at: string | null
          loyalty_points: number
          marketing_consent: boolean
          phone: string | null
          preferred_concentration: string | null
          preferred_season: string | null
          scent_families: Json
          scent_profile_notes: string | null
          source: string
          status: string
          tier: string
          total_orders: number
          total_spent: number
          updated_at: string
          user_id: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          assigned_to?: string | null
          branch_id?: string | null
          city?: string | null
          created_at?: string
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          gender?: string | null
          governorate?: string | null
          id?: string
          internal_notes?: string | null
          last_purchase_at?: string | null
          loyalty_points?: number
          marketing_consent?: boolean
          phone?: string | null
          preferred_concentration?: string | null
          preferred_season?: string | null
          scent_families?: Json
          scent_profile_notes?: string | null
          source?: string
          status?: string
          tier?: string
          total_orders?: number
          total_spent?: number
          updated_at?: string
          user_id?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          assigned_to?: string | null
          branch_id?: string | null
          city?: string | null
          created_at?: string
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          gender?: string | null
          governorate?: string | null
          id?: string
          internal_notes?: string | null
          last_purchase_at?: string | null
          loyalty_points?: number
          marketing_consent?: boolean
          phone?: string | null
          preferred_concentration?: string | null
          preferred_season?: string | null
          scent_families?: Json
          scent_profile_notes?: string | null
          source?: string
          status?: string
          tier?: string
          total_orders?: number
          total_spent?: number
          updated_at?: string
          user_id?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_customers_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "crm_branches"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_interactions: {
        Row: {
          body: string | null
          channel: string
          content: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          direction: string
          id: string
          lead_id: string | null
          occurred_at: string
          outcome: string | null
          subject: string | null
          type: string
        }
        Insert: {
          body?: string | null
          channel?: string
          content?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          direction?: string
          id?: string
          lead_id?: string | null
          occurred_at?: string
          outcome?: string | null
          subject?: string | null
          type?: string
        }
        Update: {
          body?: string | null
          channel?: string
          content?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          direction?: string
          id?: string
          lead_id?: string | null
          occurred_at?: string
          outcome?: string | null
          subject?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_interactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_inventory_movements: {
        Row: {
          branch_id: string | null
          created_at: string
          created_by: string | null
          from_branch_id: string | null
          id: string
          movement_type: string | null
          notes: string | null
          performed_by: string | null
          product_id: string | null
          quantity: number
          reference: string | null
          to_branch_id: string | null
          type: string | null
        }
        Insert: {
          branch_id?: string | null
          created_at?: string
          created_by?: string | null
          from_branch_id?: string | null
          id?: string
          movement_type?: string | null
          notes?: string | null
          performed_by?: string | null
          product_id?: string | null
          quantity: number
          reference?: string | null
          to_branch_id?: string | null
          type?: string | null
        }
        Update: {
          branch_id?: string | null
          created_at?: string
          created_by?: string | null
          from_branch_id?: string | null
          id?: string
          movement_type?: string | null
          notes?: string | null
          performed_by?: string | null
          product_id?: string | null
          quantity?: number
          reference?: string | null
          to_branch_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_inventory_movements_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "crm_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_inventory_movements_from_branch_id_fkey"
            columns: ["from_branch_id"]
            isOneToOne: false
            referencedRelation: "crm_branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_inventory_movements_to_branch_id_fkey"
            columns: ["to_branch_id"]
            isOneToOne: false
            referencedRelation: "crm_branches"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_leads: {
        Row: {
          assigned_to: string | null
          city: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          email: string | null
          estimated_value: number
          expected_close_date: string | null
          full_name: string
          id: string
          interest: string | null
          last_activity_at: string | null
          notes: string | null
          phone: string | null
          position: number
          source: string
          stage: string
          updated_at: string
          whatsapp: string | null
          win_probability: number
        }
        Insert: {
          assigned_to?: string | null
          city?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          email?: string | null
          estimated_value?: number
          expected_close_date?: string | null
          full_name: string
          id?: string
          interest?: string | null
          last_activity_at?: string | null
          notes?: string | null
          phone?: string | null
          position?: number
          source?: string
          stage?: string
          updated_at?: string
          whatsapp?: string | null
          win_probability?: number
        }
        Update: {
          assigned_to?: string | null
          city?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          email?: string | null
          estimated_value?: number
          expected_close_date?: string | null
          full_name?: string
          id?: string
          interest?: string | null
          last_activity_at?: string | null
          notes?: string | null
          phone?: string | null
          position?: number
          source?: string
          stage?: string
          updated_at?: string
          whatsapp?: string | null
          win_probability?: number
        }
        Relationships: [
          {
            foreignKeyName: "crm_leads_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_loyalty_transactions: {
        Row: {
          created_at: string
          created_by: string | null
          customer_id: string
          id: string
          points: number
          reason: string
          reference: string | null
          type: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          customer_id: string
          id?: string
          points: number
          reason: string
          reference?: string | null
          type?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          customer_id?: string
          id?: string
          points?: number
          reason?: string
          reference?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_loyalty_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_segments: {
        Row: {
          color: string | null
          conditions: Json
          created_at: string
          created_by: string | null
          customer_count: number
          description: string | null
          filter_rules: Json
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          customer_count?: number
          description?: string | null
          filter_rules?: Json
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          conditions?: Json
          created_at?: string
          created_by?: string | null
          customer_count?: number
          description?: string | null
          filter_rules?: Json
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          description: string | null
          due_at: string | null
          id: string
          lead_id: string | null
          priority: string
          status: string
          title: string
          type: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          description?: string | null
          due_at?: string | null
          id?: string
          lead_id?: string | null
          priority?: string
          status?: string
          title: string
          type?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          description?: string | null
          due_at?: string | null
          id?: string
          lead_id?: string | null
          priority?: string
          status?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "crm_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
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
          order_id: string
          product_id: string | null
          product_image: string | null
          product_name: string
          product_slug: string | null
          quantity: number
          size: string | null
          unit_price: number
          unit_price_display: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          line_total?: number
          order_id: string
          product_id?: string | null
          product_image?: string | null
          product_name: string
          product_slug?: string | null
          quantity?: number
          size?: string | null
          unit_price?: number
          unit_price_display?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          line_total?: number
          order_id?: string
          product_id?: string | null
          product_image?: string | null
          product_name?: string
          product_slug?: string | null
          quantity?: number
          size?: string | null
          unit_price?: number
          unit_price_display?: string | null
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
          cancellation_reason: string | null
          coupon_code: string | null
          coupon_discount: number
          created_at: string
          customer_name: string | null
          delivered_at: string | null
          discount: number
          gift_message: string | null
          gift_wrap: boolean
          guest_email: string | null
          guest_phone: string | null
          id: string
          notes: string | null
          order_number: string
          payment_method: string
          shipped_at: string | null
          shipping_city: string
          shipping_cost: number
          shipping_country: string
          shipping_full_name: string
          shipping_governorate: string
          shipping_phone: string
          shipping_postal_code: string | null
          shipping_street: string
          status: string
          subtotal: number
          total: number
          tracking_number: string | null
          tracking_url: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          cancellation_reason?: string | null
          coupon_code?: string | null
          coupon_discount?: number
          created_at?: string
          customer_name?: string | null
          delivered_at?: string | null
          discount?: number
          gift_message?: string | null
          gift_wrap?: boolean
          guest_email?: string | null
          guest_phone?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string
          shipped_at?: string | null
          shipping_city: string
          shipping_cost?: number
          shipping_country?: string
          shipping_full_name: string
          shipping_governorate: string
          shipping_phone: string
          shipping_postal_code?: string | null
          shipping_street: string
          status?: string
          subtotal?: number
          total?: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          cancellation_reason?: string | null
          coupon_code?: string | null
          coupon_discount?: number
          created_at?: string
          customer_name?: string | null
          delivered_at?: string | null
          discount?: number
          gift_message?: string | null
          gift_wrap?: boolean
          guest_email?: string | null
          guest_phone?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string
          shipped_at?: string | null
          shipping_city?: string
          shipping_cost?: number
          shipping_country?: string
          shipping_full_name?: string
          shipping_governorate?: string
          shipping_phone?: string
          shipping_postal_code?: string | null
          shipping_street?: string
          status?: string
          subtotal?: number
          total?: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          accordion: Json
          category: string
          colors: Json
          created_at: string
          display_order: number
          id: string
          images: Json
          in_stock: boolean
          is_published: boolean
          low_stock_threshold: number
          material: string | null
          name: string
          name_italic: string | null
          original_price: number | null
          original_price_display: string | null
          price: number
          price_display: string
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
          category?: string
          colors?: Json
          created_at?: string
          display_order?: number
          id?: string
          images?: Json
          in_stock?: boolean
          is_published?: boolean
          low_stock_threshold?: number
          material?: string | null
          name: string
          name_italic?: string | null
          original_price?: number | null
          original_price_display?: string | null
          price?: number
          price_display?: string
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
          category?: string
          colors?: Json
          created_at?: string
          display_order?: number
          id?: string
          images?: Json
          in_stock?: boolean
          is_published?: boolean
          low_stock_threshold?: number
          material?: string | null
          name?: string
          name_italic?: string | null
          original_price?: number | null
          original_price_display?: string | null
          price?: number
          price_display?: string
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
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          marketing_consent: boolean | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          marketing_consent?: boolean | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          marketing_consent?: boolean | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          is_approved: boolean
          is_verified_purchase: boolean
          product_id: string
          rating: number
          reviewer_name: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean
          is_verified_purchase?: boolean
          product_id: string
          rating: number
          reviewer_name?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean
          is_verified_purchase?: boolean
          product_id?: string
          rating?: number
          reviewer_name?: string | null
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
      wishlist_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
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
      crm_list_team: {
        Args: never
        Returns: {
          email: string
          first_name: string
          last_name: string
          roles: string[]
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      track_order_public: {
        Args: { _order_number: string; _phone: string }
        Returns: {
          created_at: string
          customer_name: string
          delivered_at: string
          id: string
          items: Json
          order_number: string
          shipped_at: string
          shipping_city: string
          shipping_governorate: string
          status: string
          total: number
          tracking_number: string
          tracking_url: string
        }[]
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "moderator"
        | "user"
        | "crm_sales_agent"
        | "branch_manager"
        | "marketing"
      asset_condition: "excellent" | "good" | "fair" | "poor" | "retired"
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
      app_role: [
        "admin",
        "moderator",
        "user",
        "crm_sales_agent",
        "branch_manager",
        "marketing",
      ],
      asset_condition: ["excellent", "good", "fair", "poor", "retired"],
    },
  },
} as const
