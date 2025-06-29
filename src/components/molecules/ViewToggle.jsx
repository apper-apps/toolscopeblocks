import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { VIEW_MODES } from '@/utils/constants'

const ViewToggle = ({ currentView, onViewChange, className = '' }) => {
  const views = [
    { mode: VIEW_MODES.GRID, icon: 'Grid3x3', label: 'Grid View' },
    { mode: VIEW_MODES.LIST, icon: 'List', label: 'List View' }
  ]

  return (
    <div className={`flex items-center bg-surface border border-white/10 rounded-lg p-1 ${className}`}>
      {views.map(({ mode, icon, label }) => (
        <motion.button
          key={mode}
          onClick={() => onViewChange(mode)}
          className={`
            flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${currentView === mode 
              ? 'bg-primary text-white shadow-sm' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
            }
          `}
          whileHover={{ scale: currentView === mode ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          title={label}
        >
          <ApperIcon name={icon} className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">{label.split(' ')[0]}</span>
        </motion.button>
      ))}
    </div>
  )
}

export default ViewToggle