'use client'

import { useAuth } from '@/components/AuthProvider'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { dataService } from '@/lib/dataService'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const { user } = useAuth()
  const [sessionCount, setSessionCount] = useState(0)
  const [companyCount, setCompanyCount] = useState(0)
  const [surgeServicesCount, setSurgeServicesCount] = useState(0)
  const [meetingCount, setMeetingCount] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const { data: sessions } = await dataService.getSessions()
        const { data: companies } = await dataService.getCompanies()
        const { data: surgeServices } = await dataService.getSurgeServices()
        const { data: meetings } = await dataService.getMeetings()
        setSessionCount(sessions.length)
        setCompanyCount(companies.length)
        setSurgeServicesCount(surgeServices.length)
        setMeetingCount(meetings.length)
      }
    }
    loadData()
  }, [user])

  return (
    <ProtectedRoute>
      {user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.email?.split('@')[0]}!
                </h1>
                <p className="text-xl text-gray-600">
                  You're logged in as a <span className="font-semibold capitalize">{user.role}</span>
                </p>
              </div>
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/sessions" className="btn-primary">
                View Sessions
              </Link>
              <Link href="/meetings" className="btn-secondary">
                Join Meeting
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm">📊</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{sessionCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-sm">🏢</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Companies</p>
                  <p className="text-2xl font-bold text-gray-900">{companyCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-sm">🤝</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Meetings</p>
                  <p className="text-2xl font-bold text-gray-900">{meetingCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 text-sm">⚡</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Surge Services</p>
                  <p className="text-2xl font-bold text-gray-900">{surgeServicesCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                <p className="text-gray-600 mt-1">Get started with common tasks</p>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/sessions" className="group p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <span className="text-blue-600">📅</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">View Sessions</h3>
                        <p className="text-sm text-gray-600">Manage your scheduled sessions</p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/meetings" className="group p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <span className="text-green-600">🤝</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">Schedule Meeting</h3>
                        <p className="text-sm text-gray-600">Create and join meetings</p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/surge" className="group p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                        <span className="text-yellow-600">⚡</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900 group-hover:text-yellow-600 transition-colors">Browse Surge</h3>
                        <p className="text-sm text-gray-600">Explore surge marketplace</p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/connections" className="group p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <span className="text-purple-600">🔗</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">Manage Connections</h3>
                        <p className="text-sm text-gray-600">View and manage your connections</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">No recent activity</p>
                      <p className="text-xs text-gray-500">Your activity will appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="card mt-6">
              <div className="card-body">
                <h3 className="font-medium text-gray-900 mb-4">Account Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <span className="text-sm font-medium capitalize">{user.role}</span>
                  </div>
                  {user.company_id && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Company ID:</span>
                      <span className="text-sm font-medium">{user.company_id}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-medium truncate ml-2">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </ProtectedRoute>
  )
}
