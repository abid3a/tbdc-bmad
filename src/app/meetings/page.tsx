'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { dataService } from '@/lib/dataService'
import { useState, useEffect } from 'react'
import { MockMeeting } from '@/lib/mockData'

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<MockMeeting[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const { data, error } = await dataService.getMeetings()
        if (error) {
          console.error('Error loading meetings:', error)
        } else {
          setMeetings(data)
        }
      } catch (error) {
        console.error('Error loading meetings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMeetings()
  }, [])

  const statuses = ['all', ...Array.from(new Set(meetings.map(meeting => meeting.status)))]

  const filteredMeetings = selectedStatus === 'all' 
    ? meetings 
    : meetings.filter(meeting => meeting.status === selectedStatus)

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
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '📅'
      case 'completed':
        return '✅'
      case 'cancelled':
        return '❌'
      case 'in-progress':
        return '🔄'
      default:
        return '📋'
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meetings</h1>
          <p className="text-xl text-gray-600">
            Schedule and manage your meetings with other users.
          </p>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Meetings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))
          ) : filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting) => (
              <div key={meeting.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {meeting.title}
                    </h3>
                    {meeting.notes && (
                      <p className="text-sm text-gray-600 mb-3">{meeting.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getStatusIcon(meeting.status)}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                      {meeting.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Date & Time:</span>
                    <span className="ml-2">{formatDate(meeting.start_time)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Duration:</span>
                    <span className="ml-2">
                      {Math.round((new Date(meeting.end_time).getTime() - new Date(meeting.start_time).getTime()) / (1000 * 60))} minutes
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Participants:</span>
                    <span className="ml-2">{meeting.participant_names.join(', ')}</span>
                  </div>
                  {meeting.meeting_url && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Meeting URL:</span>
                      <a 
                        href={meeting.meeting_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:text-blue-800 underline"
                      >
                        Join Meeting
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  {meeting.meeting_url && meeting.status === 'scheduled' && (
                    <a 
                      href={meeting.meeting_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary text-sm text-center"
                    >
                      Join Meeting
                    </a>
                  )}
                  <button className="flex-1 btn-secondary text-sm">
                    View Details
                  </button>
                  {meeting.status === 'scheduled' && (
                    <button className="flex-1 btn-ghost text-sm text-red-600 hover:text-red-800">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
                <p className="text-gray-600">
                  {selectedStatus === 'all' 
                    ? 'You don\'t have any meetings scheduled.'
                    : `No meetings found with status "${selectedStatus}".`
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Meeting Stats */}
        {!loading && meetings.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meeting Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{meetings.length}</p>
                <p className="text-sm text-gray-600">Total Meetings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {meetings.filter(m => m.status === 'scheduled').length}
                </p>
                <p className="text-sm text-gray-600">Scheduled</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {meetings.filter(m => m.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {meetings.filter(m => m.status === 'cancelled').length}
                </p>
                <p className="text-sm text-gray-600">Cancelled</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">
              Schedule New Meeting
            </button>
            <button className="btn-secondary">
              Import Calendar
            </button>
            <button className="btn-ghost">
              View Past Meetings
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 