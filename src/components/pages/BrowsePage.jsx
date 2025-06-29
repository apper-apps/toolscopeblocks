import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import ViewToggle from '@/components/molecules/ViewToggle'
import SortDropdown from '@/components/molecules/SortDropdown'
import FilterSidebar from '@/components/organisms/FilterSidebar'
import ToolGrid from '@/components/organisms/ToolGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import toolService from '@/services/api/toolService'
import { VIEW_MODES } from '@/utils/constants'

const BrowsePage = () => {
  const [tools, setTools] = useState([])
  const [filteredTools, setFilteredTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID)
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [availableTags, setAvailableTags] = useState([])
  const [filters, setFilters] = useState({
    categories: [],
    pricing: [],
    tags: []
  })

  // Load initial data
  useEffect(() => {
    loadTools()
    loadTags()
  }, [])

  // Apply filters and search
  useEffect(() => {
    applyFilters()
  }, [tools, filters, searchQuery, sortBy])

  const loadTools = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await toolService.getAll()
      setTools(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadTags = async () => {
    try {
      const tags = await toolService.getAllTags()
      setAvailableTags(tags)
    } catch (err) {
      console.error('Failed to load tags:', err)
    }
  }

  const applyFilters = () => {
    let filtered = [...tools]

    // Apply search
    if (searchQuery) {
const query = searchQuery.toLowerCase()
      filtered = filtered.filter(tool => {
        const tags = Array.isArray(tool.Tags) ? tool.Tags : tool.Tags?.split(',').map(tag => tag.trim()) || []
        return (
          tool.Name?.toLowerCase().includes(query) ||
          tool.description?.toLowerCase().includes(query) ||
          tags.some(tag => tag.toLowerCase().includes(query))
        )
      })
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(tool => filters.categories.includes(tool.category))
    }

    // Apply pricing filter
    if (filters.pricing.length > 0) {
      filtered = filtered.filter(tool => filters.pricing.includes(tool.pricing))
    }

    // Apply tag filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(tool =>
        filters.tags.some(tag => tool.tags.includes(tag))
      )
    }

    // Apply sorting
filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.Name || '').localeCompare(b.Name || '')
        case 'category':
          return (a.category || '').localeCompare(b.category || '')
        case 'pricing':
          const pricingOrder = { Free: 0, Freemium: 1, Paid: 2, Enterprise: 3 }
          return (pricingOrder[a.pricing] || 999) - (pricingOrder[b.pricing] || 999)
        default:
          return 0
      }
    })

    setFilteredTools(filtered)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const getCategoryCounts = () => {
    const counts = {}
    tools.forEach(tool => {
      counts[tool.category] = (counts[tool.category] || 0) + 1
    })
    return counts
  }

  const getPricingCounts = () => {
    const counts = {}
    tools.forEach(tool => {
      counts[tool.pricing] = (counts[tool.pricing] || 0) + 1
    })
    return counts
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-surface/50 rounded-xl p-6 space-y-6">
              <div className="h-6 bg-gradient-to-r from-white/20 to-white/10 rounded shimmer w-32" />
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-12 bg-gradient-to-r from-white/10 to-white/5 rounded-lg shimmer" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Loading viewMode={viewMode} count={12} />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error
          title="Failed to load tools"
          message={error}
          onRetry={loadTools}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Discover AI Tools
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find the perfect AI solution for your projects. Browse {tools.length} tools across all categories.
          </p>
        </motion.div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <FilterSidebar
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={setFilters}
          availableTags={availableTags}
          categoryCounts={getCategoryCounts()}
          pricingCounts={getPricingCounts()}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setShowFilters(true)}
                className="lg:hidden"
              >
                <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <div className="text-sm text-gray-400">
                {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
              </div>
            </div>

            <div className="flex items-center gap-4">
              <SortDropdown
                currentSort={sortBy}
                onSortChange={setSortBy}
              />
              <ViewToggle
                currentView={viewMode}
                onViewChange={setViewMode}
              />
            </div>
          </div>

          {/* Results */}
          {filteredTools.length === 0 ? (
            <Empty
              title="No tools found"
              message="Try adjusting your search terms or filters to find more tools."
              icon="SearchX"
              action={() => {
                setSearchQuery('')
                setFilters({ categories: [], pricing: [], tags: [] })
              }}
              actionLabel="Clear Filters"
            />
          ) : (
            <ToolGrid tools={filteredTools} viewMode={viewMode} />
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowsePage