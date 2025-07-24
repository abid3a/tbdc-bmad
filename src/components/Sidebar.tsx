'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'
import { hasRole } from '@/lib/auth'

interface NavItem {
  label: string
  href: string
  icon: string
  requiredRole?: 'admin' | 'company' | 'user'
  description?: string
}

const navItems: NavItem[] = [
  { 
    label: 'Dashboard', 
    href: '/', 
    icon: '🏠',
    description: 'Overview and quick actions'
  },
  { 
    label: 'Sessions', 
    href: '/sessions', 
    icon: '📅',
    description: 'Manage scheduled sessions'
  },
  { 
    label: 'Meetings', 
    href: '/meetings', 
    icon: '🤝',
    description: 'View and join meetings'
  },
  { 
    label: 'Surge Marketplace', 
    href: '/surge', 
    icon: '⚡',
    description: 'Browse surge services'
  },
  { 
    label: 'Connections', 
    href: '/connections', 
    icon: '🔗',
    description: 'Manage your connections'
  },
  { 
    label: 'Admin Console', 
    href: '/admin', 
    icon: '⚙️', 
    requiredRole: 'admin',
    description: 'Administrative tools'
  },
]

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const filteredNavItems = navItems.filter(item => {
    if (!item.requiredRole) return true
    if (!user) return false
    return hasRole(user, item.requiredRole)
  })

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <aside 
      className={`bg-gray-800 text-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } min-h-screen flex flex-col`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header */}
      <header className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold">Horizon</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </header>

      {/* Navigation */}
      <nav className="flex-1 p-4" role="navigation">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  title={!isCollapsed ? undefined : item.description}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-lg mr-3" aria-hidden="true">{item.icon}</span>
                  {!isCollapsed && (
                    <span>{item.label}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User section */}
      {user && (
        <footer className="p-4 border-t border-gray-700">
          {!isCollapsed && (
            <div className="mb-3">
              <p className="text-sm text-gray-400 truncate" title={user.email}>
                {user.email}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title={!isCollapsed ? undefined : 'Sign out'}
          >
            <span className="text-lg mr-3" aria-hidden="true">🚪</span>
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </footer>
      )}
    </aside>
  )
} 