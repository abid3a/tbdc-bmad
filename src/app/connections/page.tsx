'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function ConnectionsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Connections</h1>
          <p className="text-gray-600">
            Manage your professional connections and network.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Connections</h2>
          <p className="text-gray-600 text-sm">No connections to display.</p>
        </div>
      </div>
    </ProtectedRoute>
  )
} 