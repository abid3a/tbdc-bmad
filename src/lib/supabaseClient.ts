// Mock Supabase client - using mock data instead of real Supabase
import { mockClient } from './mockClient'

// Export the mock client as 'supabase' to maintain compatibility
export const supabase = mockClient

// Enhanced Database types with better structure
export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          uid: string
          name: string
          industry: string | null
          contact_info: Record<string, unknown> | null
          team_members: string[] | null
          credit_balance: number
          cohort: string
          created_at: string
          updated_at: string
        }
        Insert: {
          uid?: string
          name: string
          industry?: string | null
          contact_info?: Record<string, unknown> | null
          team_members?: string[] | null
          credit_balance?: number
          cohort: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          uid?: string
          name?: string
          industry?: string | null
          contact_info?: Record<string, unknown> | null
          team_members?: string[] | null
          credit_balance?: number
          cohort?: string
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          title: string
          description: string | null
          start_time: string
          end_time: string
          company_id: string | null
          cohort: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_time: string
          end_time: string
          company_id?: string | null
          cohort: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          company_id?: string | null
          cohort?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Add more tables as needed
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