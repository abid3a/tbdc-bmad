'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthProvider'
import { AuthUser, requireAuth } from '@/lib/auth'
import { LoadingPage } from './LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: AuthUser['role'][]
  fallback?: React.ReactNode
  loadingFallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to view this page.</p>
      </div>
    </div>
  ),
  loadingFallback = <LoadingPage />
}) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user, redirect to login page
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <>{loadingFallback}</>
  }

  if (!user) {
    // Return null while redirecting to login
    return null
  }

  if (requiredRoles && !requireAuth(user, requiredRoles)) {
    return <>{fallback}</>
  }

  return <>{children}</>
} 