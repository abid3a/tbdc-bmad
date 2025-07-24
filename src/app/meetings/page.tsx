'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function MeetingsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Meetings</h1>
          <p className="text-gray-600">
            Schedule and manage your meetings with other users.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Meetings</h2>
          <p className="text-gray-600 text-sm">No scheduled meetings to display.</p>
        </div>
      </div>
    </ProtectedRoute>
  )
} 