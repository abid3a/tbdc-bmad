'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function SurgePage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Surge Marketplace</h1>
          <p className="text-gray-600">
            Browse and book on-demand sessions and services.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h2>
          <p className="text-gray-600 text-sm">No services currently available.</p>
        </div>
      </div>
    </ProtectedRoute>
  )
} 