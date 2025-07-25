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

export interface MockSurgeService {
  id: string
  title: string
  description: string | null
  provider_id: string
  provider_name: string
  price: number
  availability: Record<string, unknown> | null
  status: string
  category: string
  created_at: string
  updated_at: string
}

export interface MockMeeting {
  id: string
  session_id: string | null
  title: string
  participant_ids: string[]
  participant_names: string[]
  meeting_url: string | null
  notes: string | null
  status: string
  start_time: string
  end_time: string
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
  private surgeServices: MockSurgeService[] = []
  private meetings: MockMeeting[] = []
  private currentUser: AuthUser | null = null
  private initialized = false

  constructor() {
    // Don't initialize immediately - wait for client-side
  }

  private ensureInitialized() {
    if (!this.initialized && typeof window !== 'undefined') {
      this.initializeMockData()
      this.loadFromLocalStorage()
      this.initialized = true
    }
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

      const defaultSurgeServices: MockSurgeService[] = [
        {
          id: '1',
          title: 'Business Strategy Consultation',
          description: 'Get expert advice on business strategy and growth planning',
          provider_id: 'provider1',
          provider_name: 'Dr. Sarah Johnson',
          price: 150.00,
          availability: { timezone: 'EST', available_hours: ['9:00-17:00'] },
          status: 'active',
          category: 'Strategy',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Financial Planning Workshop',
          description: 'Learn about financial planning and investment strategies',
          provider_id: 'provider2',
          provider_name: 'Michael Chen',
          price: 200.00,
          availability: { timezone: 'PST', available_hours: ['10:00-18:00'] },
          status: 'active',
          category: 'Finance',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Marketing Strategy Session',
          description: 'Develop effective marketing strategies for your business',
          provider_id: 'provider3',
          provider_name: 'Lisa Rodriguez',
          price: 125.00,
          availability: { timezone: 'CST', available_hours: ['8:00-16:00'] },
          status: 'active',
          category: 'Marketing',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Technology Implementation Guide',
          description: 'Expert guidance on implementing new technologies',
          provider_id: 'provider4',
          provider_name: 'David Kim',
          price: 175.00,
          availability: { timezone: 'EST', available_hours: ['9:00-17:00'] },
          status: 'active',
          category: 'Technology',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          title: 'HR and Team Building',
          description: 'Build effective teams and HR processes',
          provider_id: 'provider5',
          provider_name: 'Jennifer Smith',
          price: 140.00,
          availability: { timezone: 'PST', available_hours: ['9:00-17:00'] },
          status: 'active',
          category: 'HR',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '6',
          title: 'Sales Strategy Development',
          description: 'Create winning sales strategies and processes',
          provider_id: 'provider6',
          provider_name: 'Robert Wilson',
          price: 160.00,
          availability: { timezone: 'EST', available_hours: ['8:00-16:00'] },
          status: 'active',
          category: 'Sales',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '7',
          title: 'Product Development Roadmap',
          description: 'Plan and execute product development strategies',
          provider_id: 'provider7',
          provider_name: 'Amanda Lee',
          price: 180.00,
          availability: { timezone: 'CST', available_hours: ['9:00-17:00'] },
          status: 'active',
          category: 'Product',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '8',
          title: 'Legal Compliance Review',
          description: 'Ensure your business meets legal requirements',
          provider_id: 'provider8',
          provider_name: 'Thomas Brown',
          price: 220.00,
          availability: { timezone: 'EST', available_hours: ['10:00-18:00'] },
          status: 'active',
          category: 'Legal',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '9',
          title: 'Operations Optimization',
          description: 'Streamline your business operations for efficiency',
          provider_id: 'provider9',
          provider_name: 'Maria Garcia',
          price: 155.00,
          availability: { timezone: 'PST', available_hours: ['9:00-17:00'] },
          status: 'active',
          category: 'Operations',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '10',
          title: 'Customer Experience Design',
          description: 'Design exceptional customer experiences',
          provider_id: 'provider10',
          provider_name: 'Alex Thompson',
          price: 135.00,
          availability: { timezone: 'EST', available_hours: ['9:00-17:00'] },
          status: 'active',
          category: 'Customer Experience',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '11',
          title: 'Data Analytics Strategy',
          description: 'Develop data-driven decision making processes',
          provider_id: 'provider11',
          provider_name: 'Rachel Green',
          price: 190.00,
          availability: { timezone: 'CST', available_hours: ['8:00-16:00'] },
          status: 'active',
          category: 'Analytics',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '12',
          title: 'International Expansion Planning',
          description: 'Plan and execute international business expansion',
          provider_id: 'provider12',
          provider_name: 'Carlos Mendez',
          price: 250.00,
          availability: { timezone: 'PST', available_hours: ['9:00-17:00'] },
          status: 'active',
          category: 'International',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
                 }
       ]

       const defaultMeetings: MockMeeting[] = [
         {
           id: '1',
           session_id: '1',
           title: 'Introduction to Horizon Platform',
           participant_ids: ['1', '2', '3'],
           participant_names: ['Admin User', 'Company User', 'Regular User'],
           meeting_url: 'https://meet.google.com/abc-defg-hij',
           notes: 'Initial platform introduction and feature overview',
           status: 'scheduled',
           start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
           end_time: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
           created_at: new Date().toISOString(),
           updated_at: new Date().toISOString()
         },
         {
           id: '2',
           session_id: null,
           title: 'Weekly Team Standup',
           participant_ids: ['2', '3'],
           participant_names: ['Company User', 'Regular User'],
           meeting_url: 'https://zoom.us/j/123456789',
           notes: 'Weekly progress updates and planning',
           status: 'completed',
           start_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
           end_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 2 days ago + 30 min
           created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
           updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
         },
         {
           id: '3',
           session_id: null,
           title: 'Project Planning Session',
           participant_ids: ['1', '2'],
           participant_names: ['Admin User', 'Company User'],
           meeting_url: 'https://teams.microsoft.com/l/meetup-join/123',
           notes: 'Q1 project planning and resource allocation',
           status: 'scheduled',
           start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
           end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // 3 days from now + 1.5 hours
           created_at: new Date().toISOString(),
           updated_at: new Date().toISOString()
         },
         {
           id: '4',
           session_id: null,
           title: 'Client Presentation',
           participant_ids: ['2', '3'],
           participant_names: ['Company User', 'Regular User'],
           meeting_url: 'https://meet.google.com/xyz-uvw-rst',
           notes: 'Present quarterly results to client',
           status: 'cancelled',
           start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
           end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(), // 5 days from now + 45 min
           created_at: new Date().toISOString(),
           updated_at: new Date().toISOString()
         },
         {
           id: '5',
           session_id: null,
           title: 'Training Workshop',
           participant_ids: ['1', '2', '3'],
           participant_names: ['Admin User', 'Company User', 'Regular User'],
           meeting_url: 'https://zoom.us/j/987654321',
           notes: 'New feature training for all team members',
           status: 'scheduled',
           start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
           end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000).toISOString(), // 1 week from now + 2 hours
           created_at: new Date().toISOString(),
           updated_at: new Date().toISOString()
         }
       ]

       this.users = defaultUsers
       this.companies = defaultCompanies
       this.sessions = defaultSessions
       this.surgeServices = defaultSurgeServices
       this.meetings = defaultMeetings
       this.saveToLocalStorage()
    }
  }

  private loadFromLocalStorage() {
    if (typeof window === 'undefined') return

    try {
      const usersData = localStorage.getItem('mock_users')
      const companiesData = localStorage.getItem('mock_companies')
      const sessionsData = localStorage.getItem('mock_sessions')
      const surgeServicesData = localStorage.getItem('mock_surge_services')
      const meetingsData = localStorage.getItem('mock_meetings')
      const currentUserData = localStorage.getItem('mock_current_user')

      if (usersData) this.users = JSON.parse(usersData)
      if (companiesData) this.companies = JSON.parse(companiesData)
      if (sessionsData) this.sessions = JSON.parse(sessionsData)
      if (surgeServicesData) this.surgeServices = JSON.parse(surgeServicesData)
      if (meetingsData) this.meetings = JSON.parse(meetingsData)
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
      localStorage.setItem('mock_surge_services', JSON.stringify(this.surgeServices))
      localStorage.setItem('mock_meetings', JSON.stringify(this.meetings))
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
    this.ensureInitialized()
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
    this.ensureInitialized()
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
    this.ensureInitialized()
    this.currentUser = null
    this.saveToLocalStorage()
    return { error: null }
  }

  async getSession() {
    this.ensureInitialized()
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
    this.ensureInitialized()
    if (!this.currentUser) {
      return { data: { user: null }, error: null }
    }

    return { data: { user: this.currentUser }, error: null }
  }

  // Data methods
  async getSessions(cohort?: string) {
    this.ensureInitialized()
    let filteredSessions = this.sessions

    if (cohort) {
      filteredSessions = filteredSessions.filter(session => session.cohort === cohort)
    }

    return { data: filteredSessions, error: null }
  }

  async getCompanies() {
    this.ensureInitialized()
    return { data: this.companies, error: null }
  }

  async createSession(sessionData: Omit<MockSession, 'id' | 'created_at' | 'updated_at'>) {
    this.ensureInitialized()
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
    this.ensureInitialized()
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
    this.ensureInitialized()
    const sessionIndex = this.sessions.findIndex(s => s.id === id)
    if (sessionIndex === -1) {
      return { error: { message: 'Session not found', name: 'NotFound' } }
    }

    this.sessions.splice(sessionIndex, 1)
    this.saveToLocalStorage()
    return { error: null }
  }

  // Surge Services methods
  async getSurgeServices(category?: string) {
    this.ensureInitialized()
    let filteredServices = this.surgeServices

    if (category) {
      filteredServices = filteredServices.filter(service => service.category === category)
    }

    return { data: filteredServices, error: null }
  }

  async getSurgeService(id: string) {
    this.ensureInitialized()
    const service = this.surgeServices.find(s => s.id === id)
    return { 
      data: service || null, 
      error: service ? null : { message: 'Surge service not found', name: 'NotFound' } 
    }
  }

  async createSurgeService(serviceData: Omit<MockSurgeService, 'id' | 'created_at' | 'updated_at'>) {
    this.ensureInitialized()
    const newService: MockSurgeService = {
      ...serviceData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    this.surgeServices.push(newService)
    this.saveToLocalStorage()

    return { data: newService, error: null }
  }

  async updateSurgeService(id: string, updates: Partial<MockSurgeService>) {
    this.ensureInitialized()
    const serviceIndex = this.surgeServices.findIndex(s => s.id === id)
    if (serviceIndex === -1) {
      return { data: null, error: { message: 'Surge service not found', name: 'NotFound' } }
    }

    this.surgeServices[serviceIndex] = {
      ...this.surgeServices[serviceIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }

    this.saveToLocalStorage()
    return { data: this.surgeServices[serviceIndex], error: null }
  }

  async deleteSurgeService(id: string) {
    this.ensureInitialized()
    const serviceIndex = this.surgeServices.findIndex(s => s.id === id)
    if (serviceIndex === -1) {
      return { error: { message: 'Surge service not found', name: 'NotFound' } }
    }

    this.surgeServices.splice(serviceIndex, 1)
    this.saveToLocalStorage()
    return { error: null }
  }

  // Meeting methods
  async getMeetings(status?: string) {
    this.ensureInitialized()
    let filteredMeetings = this.meetings

    if (status) {
      filteredMeetings = filteredMeetings.filter(meeting => meeting.status === status)
    }

    return { data: filteredMeetings, error: null }
  }

  async getMeeting(id: string) {
    this.ensureInitialized()
    const meeting = this.meetings.find(m => m.id === id)
    return { 
      data: meeting || null, 
      error: meeting ? null : { message: 'Meeting not found', name: 'NotFound' } 
    }
  }

  async createMeeting(meetingData: Omit<MockMeeting, 'id' | 'created_at' | 'updated_at'>) {
    this.ensureInitialized()
    const newMeeting: MockMeeting = {
      ...meetingData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    this.meetings.push(newMeeting)
    this.saveToLocalStorage()

    return { data: newMeeting, error: null }
  }

  async updateMeeting(id: string, updates: Partial<MockMeeting>) {
    this.ensureInitialized()
    const meetingIndex = this.meetings.findIndex(m => m.id === id)
    if (meetingIndex === -1) {
      return { data: null, error: { message: 'Meeting not found', name: 'NotFound' } }
    }

    this.meetings[meetingIndex] = {
      ...this.meetings[meetingIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }

    this.saveToLocalStorage()
    return { data: this.meetings[meetingIndex], error: null }
  }

  async deleteMeeting(id: string) {
    this.ensureInitialized()
    const meetingIndex = this.meetings.findIndex(m => m.id === id)
    if (meetingIndex === -1) {
      return { error: { message: 'Meeting not found', name: 'NotFound' } }
    }

    this.meetings.splice(meetingIndex, 1)
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