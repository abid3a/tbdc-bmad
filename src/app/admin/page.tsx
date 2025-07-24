'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRoles={['admin']}>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Console</h1>
          <p className="text-gray-600">
            Manage system settings, users, and platform configuration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600 text-sm">Manage user accounts and permissions.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h2>
            <p className="text-gray-600 text-sm">Configure platform settings and features.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600 text-sm">View platform usage and performance metrics.</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 