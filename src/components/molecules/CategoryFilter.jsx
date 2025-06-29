import { motion } from 'framer-motion'
import Badge from '@/components/atoms/Badge'
import { CATEGORIES } from '@/utils/constants'

const CategoryFilter = ({ 
  selectedCategories = [], 
  onCategoryChange,
  categoryCounts = {},
  className = ''
}) => {
  const handleCategoryClick = (category) => {
    const isSelected = selectedCategories.includes(category)
    if (isSelected) {
      onCategoryChange(selectedCategories.filter(c => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  const clearAll = () => {
    onCategoryChange([])
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Categories</h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category)
          const count = categoryCounts[category] || 0
          
          return (
            <motion.button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all duration-200
                ${isSelected 
                  ? 'bg-primary/20 border-primary text-primary' 
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">{category}</span>
              <Badge variant={isSelected ? 'primary' : 'default'}>
                {count}
              </Badge>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryFilter