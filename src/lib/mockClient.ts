// Mock client to replace Supabase client functionality
import { mockDataStore, MockSession, MockCompany } from './mockData'
import { AuthUser } from './auth'

// Mock client interface that mimics Supabase client
export const mockClient = {
  auth: {
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      return await mockDataStore.signInWithPassword(credentials.email, credentials.password)
    },

    signUp: async (credentials: { email: string; password: string; options?: { data?: Partial<AuthUser> } }) => {
      return await mockDataStore.signUp(credentials.email, credentials.password, credentials.options?.data || {})
    },

    signOut: async () => {
      return await mockDataStore.signOut()
    },

    getSession: async () => {
      return await mockDataStore.getSession()
    },

    getUser: async () => {
      return await mockDataStore.getUser()
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Mock implementation - return a subscription object
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      }
    }
  },

  from: (table: string) => {
    return {
      select: (columns?: string) => {
        return {
          eq: (column: string, value: any) => {
            return {
              single: async () => {
                if (table === 'sessions') {
                  const { data: sessions } = await mockDataStore.getSessions()
                  const session = sessions.find((s: any) => s[column] === value)
                  return { data: session, error: session ? null : { message: 'Not found', name: 'NotFound' } }
                }
                if (table === 'companies') {
                  const { data: companies } = await mockDataStore.getCompanies()
                  const company = companies.find((c: any) => c[column] === value)
                  return { data: company, error: company ? null : { message: 'Not found', name: 'NotFound' } }
                }
                return { data: null, error: { message: 'Table not found', name: 'TableNotFound' } }
              },
              execute: async () => {
                if (table === 'sessions') {
                  const { data: sessions } = await mockDataStore.getSessions()
                  const filteredSessions = sessions.filter((s: any) => s[column] === value)
                  return { data: filteredSessions, error: null }
                }
                if (table === 'companies') {
                  const { data: companies } = await mockDataStore.getCompanies()
                  const filteredCompanies = companies.filter((c: any) => c[column] === value)
                  return { data: filteredCompanies, error: null }
                }
                return { data: [], error: { message: 'Table not found', name: 'TableNotFound' } }
              }
            }
          },
          execute: async () => {
            if (table === 'sessions') {
              return await mockDataStore.getSessions()
            }
            if (table === 'companies') {
              return await mockDataStore.getCompanies()
            }
            return { data: [], error: { message: 'Table not found', name: 'TableNotFound' } }
          }
        }
      }
    },

  insert: (table: string) => {
    return {
      values: (data: any) => {
        return {
          execute: async () => {
            if (table === 'sessions') {
              return await mockDataStore.createSession(data)
            }
            return { data: null, error: { message: 'Table not found', name: 'TableNotFound' } }
          }
        }
      }
    },

  update: (table: string) => {
    return {
      set: (data: any) => {
        return {
          eq: (column: string, value: any) => {
            return {
              execute: async () => {
                if (table === 'sessions') {
                  return await mockDataStore.updateSession(value, data)
                }
                return { data: null, error: { message: 'Table not found', name: 'TableNotFound' } }
              }
            }
          }
        }
      }
    },

  delete: (table: string) => {
    return {
      eq: (column: string, value: any) => {
        return {
          execute: async () => {
            if (table === 'sessions') {
              return await mockDataStore.deleteSession(value)
            }
            return { error: { message: 'Table not found', name: 'TableNotFound' } }
          }
        }
      }
    }
  }
}

// Export types for compatibility
export interface Database {
  public: {
    Tables: {
      companies: {
        Row: MockCompany
        Insert: Omit<MockCompany, 'uid' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<MockCompany, 'uid' | 'created_at' | 'updated_at'>>
      }
      sessions: {
        Row: MockSession
        Insert: Omit<MockSession, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<MockSession, 'id' | 'created_at' | 'updated_at'>>
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