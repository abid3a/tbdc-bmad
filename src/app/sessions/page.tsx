'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { dataService } from '@/lib/dataService'
import { useState, useEffect } from 'react'
import { MockSession } from '@/lib/mockData'

export default function SessionsPage() {
  const [sessions, setSessions] = useState<MockSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const { data, error } = await dataService.getSessions()
        if (error) {
          console.error('Error loading sessions:', error)
        } else {
          setSessions(data)
        }
      } catch (error) {
        console.error('Error loading sessions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sessions</h1>
          <p className="text-xl text-gray-600">
            Manage your scheduled sessions and view upcoming meetings.
          </p>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
                <p className="text-gray-600 mt-1">Your scheduled sessions and meetings</p>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading sessions...</p>
                  </div>
                ) : sessions.length > 0 ? (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              {session.title}
                            </h3>
                            {session.description && (
                              <p className="text-gray-600 mb-3">{session.description}</p>
                            )}
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>📅 {formatDate(session.start_time)}</span>
                              <span>⏰ {new Date(session.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {new Date(session.end_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                              {session.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="btn-primary text-sm">
                            Join Session
                          </button>
                          <button className="btn-secondary text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-2xl">📅</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming sessions</h3>
                    <p className="text-gray-600">You don't have any scheduled sessions at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  <button className="w-full btn-primary">
                    Schedule New Session
                  </button>
                  <button className="w-full btn-secondary">
                    Join Meeting
                  </button>
                  <button className="w-full btn-ghost">
                    View Past Sessions
                  </button>
                </div>
              </div>
            </div>

            {/* Session Stats */}
            <div className="card mt-6">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Session Stats</h3>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Sessions:</span>
                    <span className="text-sm font-medium">{sessions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Scheduled:</span>
                    <span className="text-sm font-medium">{sessions.filter(s => s.status === 'scheduled').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completed:</span>
                    <span className="text-sm font-medium">{sessions.filter(s => s.status === 'completed').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 