import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search AI tools...", 
  className = '',
  showFilters = false,
  onToggleFilters
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <ApperIcon name="Search" className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 bg-surface border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ApperIcon name="X" className="h-5 w-5" />
            </motion.button>
          )}
        </div>
        
        <Button type="submit" size="md">
          <ApperIcon name="Search" className="h-4 w-4 mr-2" />
          Search
        </Button>
        
        {showFilters && (
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onToggleFilters}
            size="md"
          >
            <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
            Filters
          </Button>
        )}
      </form>
    </div>
  )
}

export default SearchBar