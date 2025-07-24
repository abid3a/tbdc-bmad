// Data service for accessing mock data throughout the application
import { mockDataStore, MockSession, MockCompany } from './mockData'

export interface DataService {
  // Session methods
  getSessions: (cohort?: string) => Promise<{ data: MockSession[]; error: any }>
  getSession: (id: string) => Promise<{ data: MockSession | null; error: any }>
  createSession: (sessionData: Omit<MockSession, 'id' | 'created_at' | 'updated_at'>) => Promise<{ data: MockSession | null; error: any }>
  updateSession: (id: string, updates: Partial<MockSession>) => Promise<{ data: MockSession | null; error: any }>
  deleteSession: (id: string) => Promise<{ error: any }>

  // Company methods
  getCompanies: () => Promise<{ data: MockCompany[]; error: any }>
  getCompany: (id: string) => Promise<{ data: MockCompany | null; error: any }>

  // Utility methods
  clearAllData: () => void
  resetToDefaults: () => void
}

class MockDataService implements DataService {
  // Session methods
  async getSessions(cohort?: string) {
    return await mockDataStore.getSessions(cohort)
  }

  async getSession(id: string) {
    const { data: sessions } = await mockDataStore.getSessions()
    const session = sessions.find(s => s.id === id)
    return { 
      data: session || null, 
      error: session ? null : { message: 'Session not found', name: 'NotFound' } 
    }
  }

  async createSession(sessionData: Omit<MockSession, 'id' | 'created_at' | 'updated_at'>) {
    return await mockDataStore.createSession(sessionData)
  }

  async updateSession(id: string, updates: Partial<MockSession>) {
    return await mockDataStore.updateSession(id, updates)
  }

  async deleteSession(id: string) {
    return await mockDataStore.deleteSession(id)
  }

  // Company methods
  async getCompanies() {
    return await mockDataStore.getCompanies()
  }

  async getCompany(id: string) {
    const { data: companies } = await mockDataStore.getCompanies()
    const company = companies.find(c => c.uid === id)
    return { 
      data: company || null, 
      error: company ? null : { message: 'Company not found', name: 'NotFound' } 
    }
  }

  // Utility methods
  clearAllData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock_users')
      localStorage.removeItem('mock_companies')
      localStorage.removeItem('mock_sessions')
      localStorage.removeItem('mock_current_user')
      // Reload the page to reinitialize with default data
      window.location.reload()
    }
  }

  resetToDefaults() {
    this.clearAllData()
  }
}

// Create singleton instance
export const dataService = new MockDataService()

// Export types for use in components
export type { MockSession, MockCompany } 