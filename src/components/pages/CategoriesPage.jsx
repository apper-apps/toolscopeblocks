import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { formatCategory } from '@/utils/formatting'
import categoryService from '@/services/api/categoryService'

const CategoryCard = ({ category, index }) => {
  const gradient = formatCategory(category.name)
  
  const categoryIcons = {
    'Writing': 'PenTool',
    'Image': 'Image',
    'Code': 'Code',
    'Video': 'Video',
    'Audio': 'Music',
    'Data': 'BarChart3'
  }

  const icon = categoryIcons[category.name] || 'Sparkles'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/?categories=${encodeURIComponent(category.name)}`}>
        <Card className="group overflow-hidden h-full">
          <div className={`h-32 bg-gradient-to-br ${gradient} relative`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                {category.count} tools
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <ApperIcon name={icon} className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            
            <p className="text-gray-300 text-sm mb-4">
              {getCategoryDescription(category.name)}
            </p>
            
            <div className="flex items-center text-primary text-sm font-medium">
              Explore tools
              <ApperIcon name="ArrowRight" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

const getCategoryDescription = (categoryName) => {
  const descriptions = {
    'Writing': 'AI-powered writing assistants, content generators, and copywriting tools to enhance your writing workflow.',
    'Image': 'Create, edit, and enhance images with AI. From generation to upscaling, find the perfect visual AI tool.',
    'Code': 'AI coding assistants, code generators, and development tools to accelerate your programming projects.',
    'Video': 'AI video creation, editing, and enhancement tools for content creators and video professionals.',
    'Audio': 'Text-to-speech, audio editing, and voice synthesis tools powered by artificial intelligence.',
    'Data': 'AI-driven data analysis, visualization, and business intelligence tools for data professionals.'
  }
  
  return descriptions[categoryName] || 'Discover powerful AI tools in this category.'
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
          <div className="h-10 bg-gradient-to-r from-white/20 to-white/10 rounded shimmer w-64" />
          <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-xl border border-white/10 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-white/10 to-white/5 shimmer" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-full" />
                  <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-2/3" />
                </div>
                <div className="h-5 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error
          title="Failed to load categories"
          message={error}
          onRetry={loadCategories}
        />
      </div>
    )
  }

  const totalTools = categories.reduce((sum, cat) => sum + cat.count, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Browse by Category
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore {totalTools} AI tools organized into {categories.length} categories. 
            Find the perfect solution for your specific needs.
          </p>
        </motion.div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard 
            key={category.Id} 
            category={category} 
            index={index}
          />
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16"
      >
        <Card className="p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {totalTools}
              </div>
              <div className="text-gray-300">Total AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">
                {categories.length}
              </div>
              <div className="text-gray-300">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                {categories.filter(cat => cat.count > 0).length}
              </div>
              <div className="text-gray-300">Active Categories</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default CategoriesPage