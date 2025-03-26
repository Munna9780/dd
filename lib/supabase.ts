import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          stock: number
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          stock: number
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          category?: string
          stock?: number
          updated_at?: string
        }
      }
    }
  }
}

// Types for our products
export type Product = {
  id: string
  created_at: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  artist?: string
  affiliateLink?: string
}
