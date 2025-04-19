
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          password_hash: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          created_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          location: string
          price: string
          price_numeric: number
          bedrooms: number
          bathrooms: number
          area: number | null
          type: string | null
          category: string
          description: string | null
          featured: boolean
          power_supply: string | null
          style: string | null
          video_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          location: string
          price: string
          price_numeric: number
          bedrooms: number
          bathrooms: number
          area?: number | null
          type?: string | null
          category: string
          description?: string | null
          featured?: boolean
          power_supply?: string | null
          style?: string | null
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          location?: string
          price?: string
          price_numeric?: number
          bedrooms?: number
          bathrooms?: number
          area?: number | null
          type?: string | null
          category?: string
          description?: string | null
          featured?: boolean
          power_supply?: string | null
          style?: string | null
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          image_url: string
          is_primary: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          image_url: string
          is_primary?: boolean
          display_order: number
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          image_url?: string
          is_primary?: boolean
          display_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      property_features: {
        Row: {
          id: string
          property_id: string
          feature_name: string
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          feature_name: string
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          feature_name?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_features_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      property_services: {
        Row: {
          id: string
          property_id: string
          service_name: string
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          service_name: string
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          service_name?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_services_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      property_highlights: {
        Row: {
          id: string
          property_id: string
          highlight_text: string
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          highlight_text: string
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          highlight_text?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_highlights_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image: string | null
          published: boolean
          author: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          published?: boolean
          author?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          published?: boolean
          author?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
