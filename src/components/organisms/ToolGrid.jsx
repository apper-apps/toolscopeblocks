import { motion } from 'framer-motion'
import ToolCard from '@/components/molecules/ToolCard'
import { VIEW_MODES } from '@/utils/constants'

const ToolGrid = ({ tools, viewMode = VIEW_MODES.GRID, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (viewMode === VIEW_MODES.LIST) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`space-y-4 ${className}`}
      >
        {tools.map((tool) => (
          <motion.div
            key={tool.Id}
            variants={itemVariants}
          >
            <ToolCard tool={tool} viewMode="list" />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}
    >
      {tools.map((tool) => (
        <motion.div
          key={tool.Id}
          variants={itemVariants}
        >
          <ToolCard tool={tool} viewMode="grid" />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ToolGrid