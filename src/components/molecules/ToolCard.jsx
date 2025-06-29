import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import { formatPricing, formatCategory, truncateText } from '@/utils/formatting'
import { useSavedTools } from '@/hooks/useSavedTools'
import { toast } from 'react-toastify'

const ToolCard = ({ tool, viewMode = 'grid', className = '' }) => {
  const { isToolSaved, toggleTool } = useSavedTools()
  const isSaved = isToolSaved(tool.Id.toString())
  const pricing = formatPricing(tool.pricing)
  const categoryGradient = formatCategory(tool.category)

  const handleSaveToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const wasSaved = toggleTool(tool.Id.toString())
    if (wasSaved) {
      toast.success(`${tool.name} saved to your collection!`)
    } else {
      toast.info(`${tool.name} removed from saved tools`)
    }
  }

  const handleVisitWebsite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(tool.website, '_blank', 'noopener,noreferrer')
  }

  if (viewMode === 'list') {
    return (
      <Link to={`/tool/${tool.Id}`} className={className}>
        <Card className="p-6 hover:scale-[1.01]">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <img 
                src={tool.logo} 
                alt={`${tool.name} logo`}
                className="w-16 h-16 rounded-lg object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{tool.name}</h3>
                  <div className="flex items-center gap-3">
                    <Badge className={`bg-gradient-to-r ${categoryGradient} text-white border-0`}>
                      {tool.category}
                    </Badge>
                    <Badge className={pricing.color}>
                      {pricing.text}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleSaveToggle}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isSaved 
                        ? 'bg-accent text-white' 
                        : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ApperIcon name={isSaved ? "Heart" : "Heart"} className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
                  </motion.button>
                  
                  <Button
                    size="sm"
                    onClick={handleVisitWebsite}
                    className="px-4"
                  >
                    <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
                    Visit
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-300 mb-3">
                {truncateText(tool.description, 200)}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {tool.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {tool.tags.length > 4 && (
                  <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded-md">
                    +{tool.tags.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link to={`/tool/${tool.Id}`} className={className}>
      <Card className="overflow-hidden h-full group">
        <div className="relative">
          <img 
            src={tool.logo} 
            alt={`${tool.name} logo`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <motion.button
              onClick={handleSaveToggle}
              className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
                isSaved 
                  ? 'bg-accent/80 text-white' 
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="Heart" className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
            </motion.button>
          </div>
          <div className="absolute top-4 left-4">
            <Badge className={`bg-gradient-to-r ${categoryGradient} text-white border-0`}>
              {tool.category}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <Badge className={pricing.color}>
              {pricing.text}
            </Badge>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {truncateText(tool.description, 120)}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
            {tool.tags.length > 3 && (
              <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded-md">
                +{tool.tags.length - 3}
              </span>
            )}
          </div>
          
          <Button
            size="sm"
            onClick={handleVisitWebsite}
            className="w-full"
          >
            <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
            Visit Website
          </Button>
        </div>
      </Card>
    </Link>
  )
}

export default ToolCard