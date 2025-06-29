import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TagFilter = ({ 
  availableTags = [], 
  selectedTags = [], 
  onTagChange,
  className = ''
}) => {
  const [showAll, setShowAll] = useState(false)
  const displayTags = showAll ? availableTags : availableTags.slice(0, 12)

  const handleTagClick = (tag) => {
    const isSelected = selectedTags.includes(tag)
    if (isSelected) {
      onTagChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagChange([...selectedTags, tag])
    }
  }

  const clearAll = () => {
    onTagChange([])
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {displayTags.map((tag) => {
            const isSelected = selectedTags.includes(tag)
            
            return (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => handleTagClick(tag)}
                className={`
                  px-3 py-2 rounded-full text-xs font-medium border transition-all duration-200
                  ${isSelected 
                    ? 'bg-primary/20 text-primary border-primary/50' 
                    : 'bg-white/5 text-gray-300 border-white/20 hover:bg-white/10 hover:text-white'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>
      
      {availableTags.length > 12 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="w-full"
        >
          <ApperIcon 
            name={showAll ? "ChevronUp" : "ChevronDown"} 
            className="h-4 w-4 mr-2" 
          />
          {showAll ? 'Show Less' : `Show ${availableTags.length - 12} More`}
        </Button>
      )}
    </div>
  )
}

export default TagFilter