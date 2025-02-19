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
      businesses: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          address: string
          city: string
          state: string
          country: string
          postal_code: string
          latitude: number
          longitude: number
          phone: string
          email: string
          website: string
          created_at: string
          updated_at: string
          owner_id: string
          status: 'active' | 'inactive' | 'pending'
          rating: number
          review_count: number
          verified: boolean
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          address: string
          city: string
          state: string
          country: string
          postal_code: string
          latitude: number
          longitude: number
          phone: string
          email: string
          website?: string
          created_at?: string
          updated_at?: string
          owner_id: string
          status?: 'active' | 'inactive' | 'pending'
          rating?: number
          review_count?: number
          verified?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          address?: string
          city?: string
          state?: string
          country?: string
          postal_code?: string
          latitude?: number
          longitude?: number
          phone?: string
          email?: string
          website?: string
          updated_at?: string
          owner_id?: string
          status?: 'active' | 'inactive' | 'pending'
          rating?: number
          review_count?: number
          verified?: boolean
        }
      }
      appointments: {
        Row: {
          id: string
          business_id: string
          user_id: string
          service_id: string
          start_time: string
          end_time: string
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          user_id: string
          service_id: string
          start_time: string
          end_time: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          user_id?: string
          service_id?: string
          start_time?: string
          end_time?: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string | null
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          business_id: string
          user_id: string
          rating: number
          comment: string
          created_at: string
          updated_at: string
          status: 'pending' | 'approved' | 'rejected'
        }
        Insert: {
          id?: string
          business_id: string
          user_id: string
          rating: number
          comment: string
          created_at?: string
          updated_at?: string
          status?: 'pending' | 'approved' | 'rejected'
        }
        Update: {
          id?: string
          business_id?: string
          user_id?: string
          rating?: number
          comment?: string
          updated_at?: string
          status?: 'pending' | 'approved' | 'rejected'
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          attachment_url: string | null
          created_at: string
          updated_at: string
          status: 'sent' | 'delivered' | 'read'
          thread_id: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          attachment_url?: string | null
          created_at?: string
          updated_at?: string
          status?: 'sent' | 'delivered' | 'read'
          thread_id: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          attachment_url?: string | null
          updated_at?: string
          status?: 'sent' | 'delivered' | 'read'
          thread_id?: string
        }
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
  }
}