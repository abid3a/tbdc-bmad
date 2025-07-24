'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { mockDataStore } from '@/lib/mockData'
import { AuthContextType, AuthUser, signIn, signOut, signUp, transformUser, MockSession } from '@/lib/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<MockSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await mockDataStore.getSession()
        setSession(session)
        setUser(session?.user || null)
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()
  }, [])

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn(email, password)
    if (!result.error) {
      // Update the user state after successful sign in
      const { data: { session } } = await mockDataStore.getSession()
      setSession(session)
      setUser(session?.user || null)
    }
    return result
  }

  const handleSignUp = async (email: string, password: string, userData: Partial<AuthUser>) => {
    return await signUp(email, password, userData)
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
      // Clear the user and session state
      setUser(null)
      setSession(null)
    }
    return { error }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn: handleSignIn,
    signOut: handleSignOut,
    signUp: handleSignUp,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 