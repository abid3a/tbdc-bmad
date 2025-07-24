import { mockDataStore } from './mockData'

export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'company' | 'user'
  company_id?: string
}

// Mock session type to replace Supabase Session
export interface MockSession {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: AuthUser
}

// Mock error type to replace Supabase AuthError
export interface AuthError {
  message: string
  name: string
}

// Authentication context types
export interface AuthContextType {
  user: AuthUser | null
  session: MockSession | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, userData: Partial<AuthUser>) => Promise<{ error: AuthError | null }>
}

// Enhanced error handling wrapper
const handleAuthError = (error: AuthError | null): { error: AuthError | null } => {
  if (error) {
    console.error('Authentication error:', error.message)
  }
  return { error }
}

// Sign in function with better error handling
export const signIn = async (email: string, password: string): Promise<{ error: AuthError | null }> => {
  try {
    const { data, error } = await mockDataStore.signInWithPassword(email, password)
    return handleAuthError(error)
  } catch (error) {
    console.error('Unexpected error during sign in:', error)
    return { error: { message: 'An unexpected error occurred', name: 'UnexpectedError' } as AuthError }
  }
}

// Sign up function with validation
export const signUp = async (email: string, password: string, userData: Partial<AuthUser>): Promise<{ error: AuthError | null }> => {
  try {
    // Basic validation
    if (!email || !password) {
      return { error: { message: 'Email and password are required', name: 'ValidationError' } as AuthError }
    }

    if (password.length < 6) {
      return { error: { message: 'Password must be at least 6 characters', name: 'ValidationError' } as AuthError }
    }

    const { data, error } = await mockDataStore.signUp(email, password, userData)
    return handleAuthError(error)
  } catch (error) {
    console.error('Unexpected error during sign up:', error)
    return { error: { message: 'An unexpected error occurred', name: 'UnexpectedError' } as AuthError }
  }
}

// Sign out function
export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await mockDataStore.signOut()
    return handleAuthError(error)
  } catch (error) {
    console.error('Unexpected error during sign out:', error)
    return { error: { message: 'An unexpected error occurred', name: 'UnexpectedError' } as AuthError }
  }
}

// Get current session with error handling
export const getSession = async (): Promise<{ session: MockSession | null; error: AuthError | null }> => {
  try {
    const { data: { session }, error } = await mockDataStore.getSession()
    return { session, error }
  } catch (error) {
    console.error('Unexpected error getting session:', error)
    return { 
      session: null, 
      error: { message: 'An unexpected error occurred', name: 'UnexpectedError' } as AuthError 
    }
  }
}

// Get current user with error handling
export const getCurrentUser = async (): Promise<{ user: AuthUser | null; error: AuthError | null }> => {
  try {
    const { data: { user }, error } = await mockDataStore.getUser()
    if (error) return { user: null, error }
    
    if (!user) return { user: null, error: null }
    
    return { user, error: null }
  } catch (error) {
    console.error('Unexpected error getting user:', error)
    return { 
      user: null, 
      error: { message: 'An unexpected error occurred', name: 'UnexpectedError' } as AuthError 
    }
  }
}

// Listen to auth changes (mock implementation)
export const onAuthStateChange = (callback: (event: string, session: MockSession | null) => void) => {
  // Mock implementation - in a real app, this would listen to auth state changes
  // For now, we'll just return a mock subscription
  return {
    data: {
      subscription: {
        unsubscribe: () => {}
      }
    }
  }
}

// Enhanced role-based access control helper
export const hasRole = (user: AuthUser | null, requiredRole: AuthUser['role']): boolean => {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.role === requiredRole
}

// Enhanced protected route helper with multiple role support
export const requireAuth = (user: AuthUser | null, requiredRoles?: AuthUser['role'][]): boolean => {
  if (!user) return false
  if (!requiredRoles || requiredRoles.length === 0) return true
  
  return requiredRoles.some(role => hasRole(user, role))
}

// Utility function to transform mock user to AuthUser
export const transformUser = (mockUser: any): AuthUser => {
  return {
    id: mockUser.id,
    email: mockUser.email || '',
    role: mockUser.role || 'user',
    company_id: mockUser.company_id,
  }
} 