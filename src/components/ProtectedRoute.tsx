'use client'

import React from 'react'
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

  if (loading) {
    return <>{loadingFallback}</>
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    )
  }

  if (requiredRoles && !requireAuth(user, requiredRoles)) {
    return <>{fallback}</>
  }

  return <>{children}</>
} 