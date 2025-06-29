import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { formatPricing, formatCategory } from '@/utils/formatting'
import { useSavedTools } from '@/hooks/useSavedTools'
import toolService from '@/services/api/toolService'

const ToolDetailPage = () => {
  const { id } = useParams()
  const [tool, setTool] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [relatedTools, setRelatedTools] = useState([])
  const { isToolSaved, toggleTool } = useSavedTools()

  useEffect(() => {
    loadTool()
  }, [id])

  useEffect(() => {
    if (tool) {
      loadRelatedTools()
    }
  }, [tool])

  const loadTool = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await toolService.getById(id)
      setTool(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadRelatedTools = async () => {
    try {
      const categoryTools = await toolService.getByCategory(tool.category)
      const filtered = categoryTools.filter(t => t.Id !== tool.Id).slice(0, 3)
      setRelatedTools(filtered)
    } catch (err) {
      console.error('Failed to load related tools:', err)
    }
  }

  const handleSaveToggle = () => {
    const wasSaved = toggleTool(tool.Id.toString())
    if (wasSaved) {
      toast.success(`${tool.name} saved to your collection!`)
    } else {
      toast.info(`${tool.name} removed from saved tools`)
    }
  }

  const handleVisitWebsite = () => {
    window.open(tool.website, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="h-8 bg-gradient-to-r from-white/20 to-white/10 rounded shimmer w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gradient-to-r from-white/10 to-white/5 rounded-xl shimmer" />
              <div className="space-y-4">
                <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-3/4" />
                <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-full" />
                <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-2/3" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-gradient-to-r from-white/10 to-white/5 rounded-xl shimmer" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error
          title="Tool not found"
          message={error}
          onRetry={loadTool}
        />
      </div>
    )
  }

  if (!tool) return null

  const isSaved = isToolSaved(tool.Id.toString())
  const pricing = formatPricing(tool.pricing)
  const categoryGradient = formatCategory(tool.category)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-400">
          <li>
            <Link to="/" className="hover:text-white transition-colors">
              Browse
            </Link>
          </li>
          <li>
            <ApperIcon name="ChevronRight" className="h-4 w-4" />
          </li>
          <li>
            <Link 
              to={`/?category=${tool.category}`} 
              className="hover:text-white transition-colors"
            >
              {tool.category}
            </Link>
          </li>
          <li>
            <ApperIcon name="ChevronRight" className="h-4 w-4" />
          </li>
          <li className="text-white font-medium">{tool.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-64 sm:h-80">
                <img 
                  src={tool.logo} 
                  alt={`${tool.name} logo`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`bg-gradient-to-r ${categoryGradient} text-white border-0 text-lg px-4 py-2`}>
                      {tool.category}
                    </Badge>
                    <Badge className={`${pricing.color} text-lg px-4 py-2`}>
                      {pricing.text}
                    </Badge>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {tool.name}
                  </h1>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">About {tool.name}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {tool.description}
              </p>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ApperIcon name="Check" className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Tags</h2>
              <div className="flex flex-wrap gap-3">
                {tool.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-white/10 text-gray-300 hover:bg-white/20 transition-colors cursor-pointer text-base px-4 py-2"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 space-y-4">
              <Button
                onClick={handleVisitWebsite}
                className="w-full text-lg py-4"
                size="lg"
              >
                <ApperIcon name="ExternalLink" className="h-5 w-5 mr-3" />
                Visit Website
              </Button>

              <Button
                variant="secondary"
                onClick={handleSaveToggle}
                className="w-full text-lg py-4"
                size="lg"
              >
                <ApperIcon 
                  name="Heart" 
                  className="h-5 w-5 mr-3" 
                  fill={isSaved ? "currentColor" : "none"}
                />
                {isSaved ? 'Remove from Saved' : 'Save Tool'}
              </Button>
            </Card>
          </motion.div>

          {/* Tool Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Tool Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Category</span>
                  <Badge className={`bg-gradient-to-r ${categoryGradient} text-white border-0`}>
                    {tool.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Pricing</span>
                  <Badge className={pricing.color}>
                    {pricing.text}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Features</span>
                  <span className="text-white">{tool.features.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tags</span>
                  <span className="text-white">{tool.tags.length}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  More {tool.category} Tools
                </h3>
                <div className="space-y-3">
                  {relatedTools.map((relatedTool) => (
                    <Link
                      key={relatedTool.Id}
                      to={`/tool/${relatedTool.Id}`}
                      className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={relatedTool.logo} 
                          alt={`${relatedTool.name} logo`}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate">
                            {relatedTool.name}
                          </h4>
                          <p className="text-gray-400 text-sm truncate">
                            {relatedTool.description}
                          </p>
                        </div>
                        <ApperIcon name="ArrowRight" className="h-4 w-4 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ToolDetailPage