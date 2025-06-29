import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import ViewToggle from '@/components/molecules/ViewToggle'
import ToolGrid from '@/components/organisms/ToolGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { useSavedTools } from '@/hooks/useSavedTools'
import toolService from '@/services/api/toolService'
import { VIEW_MODES } from '@/utils/constants'

const SavedToolsPage = () => {
  const [savedToolsData, setSavedToolsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID)
  const { getSavedToolIds, clearAll, count } = useSavedTools()

  useEffect(() => {
    loadSavedTools()
  }, [])

  const loadSavedTools = async () => {
    try {
      setLoading(true)
      setError('')
      const savedIds = getSavedToolIds()
      
      if (savedIds.length === 0) {
        setSavedToolsData([])
        setLoading(false)
        return
      }

      // Load all tools and filter by saved IDs
      const allTools = await toolService.getAll()
      const savedTools = allTools.filter(tool => 
        savedIds.includes(tool.Id.toString())
      )
      
      setSavedToolsData(savedTools)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved tools? This action cannot be undone.')) {
      clearAll()
      setSavedToolsData([])
      toast.success('All saved tools have been removed')
    }
  }

  const exportSavedTools = () => {
    const exportData = savedToolsData.map(tool => ({
name: tool.Name,
      description: tool.description,
      category: tool.category,
      pricing: tool.pricing,
      website: tool.website,
      tags: Array.isArray(tool.Tags) ? tool.Tags : tool.Tags?.split(',').map(tag => tag.trim()) || []
    }))

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `toolscope-saved-tools-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    toast.success('Saved tools exported successfully!')
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-10 bg-gradient-to-r from-white/20 to-white/10 rounded shimmer w-64 mb-4" />
          <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-96" />
        </div>
        <Loading viewMode={viewMode} count={6} showTitle={false} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error
          title="Failed to load saved tools"
          message={error}
          onRetry={loadSavedTools}
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
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">
              Saved Tools
              {count > 0 && (
                <span className="ml-3 px-3 py-1 bg-accent text-white text-lg rounded-full">
                  {count}
                </span>
              )}
            </h1>
            <p className="text-gray-300">
              {count === 0 
                ? "Start building your collection of favorite AI tools" 
                : `Your personal collection of ${count} AI ${count === 1 ? 'tool' : 'tools'}`
              }
            </p>
          </div>

          {count > 0 && (
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={exportSavedTools}
                size="sm"
              >
                <ApperIcon name="Download" className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button
                variant="outline"
                onClick={handleClearAll}
                size="sm"
              >
                <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {savedToolsData.length === 0 ? (
        <Empty
          title="No saved tools yet"
          message="Start exploring and save your favorite AI tools to build your personal collection."
          icon="Heart"
          actionHref="/"
          actionLabel="Browse Tools"
        />
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            <div className="text-sm text-gray-400">
              {savedToolsData.length} {savedToolsData.length === 1 ? 'tool' : 'tools'} saved
            </div>

            <ViewToggle
              currentView={viewMode}
              onViewChange={setViewMode}
            />
          </div>

          {/* Tools Grid */}
          <ToolGrid tools={savedToolsData} viewMode={viewMode} />
        </>
      )}
    </div>
  )
}

export default SavedToolsPage