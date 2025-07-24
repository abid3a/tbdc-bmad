// Mock data service to replace Supabase functionality
import { AuthUser } from './auth'

// Mock data types
export interface MockSession {
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

export interface MockCompany {
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

export interface MockUser {
  id: string
  email: string
  password: string // In real app, this would be hashed
  role: 'admin' | 'company' | 'user'
  company_id?: string
  created_at: string
}

// Mock data storage
class MockDataStore {
  private users: MockUser[] = []
  private sessions: MockSession[] = []
  private companies: MockCompany[] = []
  private currentUser: AuthUser | null = null

  constructor() {
    this.initializeMockData()
    this.loadFromLocalStorage()
  }

  private initializeMockData() {
    // Initialize with default mock data if localStorage is empty
    if (typeof window !== 'undefined' && !localStorage.getItem('mock_users')) {
      const defaultUsers: MockUser[] = [
        {
          id: '1',
          email: 'admin@horizon.com',
          password: 'admin123',
          role: 'admin',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          email: 'company@test.com',
          password: 'company123',
          role: 'company',
          company_id: '1',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          email: 'user@test.com',
          password: 'user123',
          role: 'user',
          created_at: new Date().toISOString()
        }
      ]

      const defaultCompanies: MockCompany[] = [
        {
          uid: '1',
          name: 'Test Company',
          industry: 'Technology',
          contact_info: { phone: '+1-555-0123', address: '123 Test St' },
          team_members: ['user1', 'user2'],
          credit_balance: 1000,
          cohort: '2024-Q1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]

      const defaultSessions: MockSession[] = [
        {
          id: '1',
          title: 'Introduction to Horizon Platform',
          description: 'Learn about the Horizon Web Platform features',
          start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
          end_time: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
          company_id: '1',
          cohort: '2024-Q1',
          status: 'scheduled',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]

      this.users = defaultUsers
      this.companies = defaultCompanies
      this.sessions = defaultSessions
      this.saveToLocalStorage()
    }
  }

  private loadFromLocalStorage() {
    if (typeof window === 'undefined') return

    try {
      const usersData = localStorage.getItem('mock_users')
      const companiesData = localStorage.getItem('mock_companies')
      const sessionsData = localStorage.getItem('mock_sessions')
      const currentUserData = localStorage.getItem('mock_current_user')

      if (usersData) this.users = JSON.parse(usersData)
      if (companiesData) this.companies = JSON.parse(companiesData)
      if (sessionsData) this.sessions = JSON.parse(sessionsData)
      if (currentUserData) this.currentUser = JSON.parse(currentUserData)
    } catch (error) {
      console.error('Error loading mock data from localStorage:', error)
    }
  }

  private saveToLocalStorage() {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('mock_users', JSON.stringify(this.users))
      localStorage.setItem('mock_companies', JSON.stringify(this.companies))
      localStorage.setItem('mock_sessions', JSON.stringify(this.sessions))
      if (this.currentUser) {
        localStorage.setItem('mock_current_user', JSON.stringify(this.currentUser))
      } else {
        localStorage.removeItem('mock_current_user')
      }
    } catch (error) {
      console.error('Error saving mock data to localStorage:', error)
    }
  }

  // Authentication methods
  async signInWithPassword(email: string, password: string) {
    const user = this.users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return {
        data: { user: null, session: null },
        error: { message: 'Invalid email or password', name: 'InvalidCredentials' }
      }
    }

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      company_id: user.company_id
    }

    this.currentUser = authUser
    this.saveToLocalStorage()

    return {
      data: { 
        user: authUser, 
        session: { 
          access_token: 'mock_token_' + Date.now(),
          refresh_token: 'mock_refresh_token',
          expires_in: 3600,
          token_type: 'bearer',
          user: authUser
        }
      },
      error: null
    }
  }

  async signUp(email: string, password: string, userData: Partial<AuthUser>) {
    // Check if user already exists
    if (this.users.find(u => u.email === email)) {
      return {
        data: { user: null, session: null },
        error: { message: 'User already exists', name: 'UserExists' }
      }
    }

    const newUser: MockUser = {
      id: Date.now().toString(),
      email,
      password,
      role: userData.role || 'user',
      company_id: userData.company_id,
      created_at: new Date().toISOString()
    }

    this.users.push(newUser)
    this.saveToLocalStorage()

    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      company_id: newUser.company_id
    }

    return {
      data: { user: authUser, session: null },
      error: null
    }
  }

  async signOut() {
    this.currentUser = null
    this.saveToLocalStorage()
    return { error: null }
  }

  async getSession() {
    if (!this.currentUser) {
      return { data: { session: null }, error: null }
    }

    return {
      data: {
        session: {
          access_token: 'mock_token_' + Date.now(),
          refresh_token: 'mock_refresh_token',
          expires_in: 3600,
          token_type: 'bearer',
          user: this.currentUser
        }
      },
      error: null
    }
  }

  async getUser() {
    if (!this.currentUser) {
      return { data: { user: null }, error: null }
    }

    return { data: { user: this.currentUser }, error: null }
  }

  // Data methods
  async getSessions(cohort?: string) {
    let filteredSessions = this.sessions

    if (cohort) {
      filteredSessions = filteredSessions.filter(session => session.cohort === cohort)
    }

    return { data: filteredSessions, error: null }
  }

  async getCompanies() {
    return { data: this.companies, error: null }
  }

  async createSession(sessionData: Omit<MockSession, 'id' | 'created_at' | 'updated_at'>) {
    const newSession: MockSession = {
      ...sessionData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    this.sessions.push(newSession)
    this.saveToLocalStorage()

    return { data: newSession, error: null }
  }

  async updateSession(id: string, updates: Partial<MockSession>) {
    const sessionIndex = this.sessions.findIndex(s => s.id === id)
    if (sessionIndex === -1) {
      return { data: null, error: { message: 'Session not found', name: 'NotFound' } }
    }

    this.sessions[sessionIndex] = {
      ...this.sessions[sessionIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }

    this.saveToLocalStorage()
    return { data: this.sessions[sessionIndex], error: null }
  }

  async deleteSession(id: string) {
    const sessionIndex = this.sessions.findIndex(s => s.id === id)
    if (sessionIndex === -1) {
      return { error: { message: 'Session not found', name: 'NotFound' } }
    }

    this.sessions.splice(sessionIndex, 1)
    this.saveToLocalStorage()
    return { error: null }
  }
}

// Create singleton instance
export const mockDataStore = new MockDataStore()

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