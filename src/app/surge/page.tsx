'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { dataService } from '@/lib/dataService'
import { useState, useEffect } from 'react'
import { MockSurgeService } from '@/lib/mockData'

export default function SurgePage() {
  const [services, setServices] = useState<MockSurgeService[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data, error } = await dataService.getSurgeServices()
        if (error) {
          console.error('Error loading surge services:', error)
        } else {
          setServices(data)
        }
      } catch (error) {
        console.error('Error loading surge services:', error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const categories = ['all', ...Array.from(new Set(services.map(service => service.category)))]

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Surge Marketplace</h1>
          <p className="text-xl text-gray-600">
            Browse and book on-demand sessions and services from expert mentors.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))
          ) : filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {service.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {service.category}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Provider:</span>
                    <span className="ml-2">{service.provider_name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Price:</span>
                    <span className="ml-2 text-lg font-semibold text-blue-600">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                  {service.availability && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Timezone:</span>
                      <span className="ml-2">{service.availability.timezone}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary text-sm">
                    Book Session
                  </button>
                  <button className="flex-1 btn-secondary text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services available</h3>
                <p className="text-gray-600">
                  {selectedCategory === 'all' 
                    ? 'No surge services are currently available.'
                    : `No services found in the "${selectedCategory}" category.`
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {!loading && services.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketplace Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{services.length}</p>
                <p className="text-sm text-gray-600">Total Services</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {Array.from(new Set(services.map(s => s.provider_id))).length}
                </p>
                <p className="text-sm text-gray-600">Active Providers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Array.from(new Set(services.map(s => s.category))).length}
                </p>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {formatPrice(services.reduce((sum, s) => sum + s.price, 0))}
                </p>
                <p className="text-sm text-gray-600">Total Value</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
} 