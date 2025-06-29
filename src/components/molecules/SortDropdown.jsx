import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { SORT_OPTIONS } from '@/utils/constants'

const SortDropdown = ({ currentSort, onSortChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentOption = SORT_OPTIONS.find(option => option.value === currentSort) || SORT_OPTIONS[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionClick = (option) => {
    onSortChange(option.value)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2.5 bg-surface border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ApperIcon name="ArrowUpDown" className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">{currentOption.label}</span>
        <ApperIcon 
          name="ChevronDown" 
          className={`h-4 w-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-surface border border-white/20 rounded-lg shadow-xl z-50"
          >
            {SORT_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={`
                  w-full px-4 py-3 text-left text-sm transition-colors duration-200
                  ${currentSort === option.value 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-white hover:bg-white/10'
                  }
                  first:rounded-t-lg last:rounded-b-lg
                `}
                whileHover={{ backgroundColor: currentSort === option.value ? undefined : 'rgba(255, 255, 255, 0.1)' }}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SortDropdown