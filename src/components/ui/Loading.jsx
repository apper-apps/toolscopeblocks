import { motion } from 'framer-motion'

const SkeletonCard = () => (
  <div className="bg-surface rounded-xl border border-white/10 overflow-hidden">
    <div className="h-48 bg-gradient-to-r from-white/5 to-white/10 shimmer" />
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-3/4" />
        <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-16" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-full" />
        <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-2/3" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-full shimmer w-16" />
        <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-full shimmer w-20" />
        <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-full shimmer w-14" />
      </div>
      <div className="h-9 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg shimmer w-full" />
    </div>
  </div>
)

const SkeletonListItem = () => (
  <div className="bg-surface rounded-xl border border-white/10 p-6">
    <div className="flex items-center gap-6">
      <div className="w-16 h-16 bg-gradient-to-r from-white/10 to-white/5 rounded-lg shimmer flex-shrink-0" />
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-48" />
            <div className="flex gap-3">
              <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-full shimmer w-20" />
              <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-full shimmer w-16" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-9 h-9 bg-gradient-to-r from-white/10 to-white/5 rounded-lg shimmer" />
            <div className="h-9 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg shimmer w-20" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-full" />
          <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-3/4" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-md shimmer w-16" />
          <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-md shimmer w-20" />
          <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-md shimmer w-14" />
          <div className="h-6 bg-gradient-to-r from-white/10 to-white/5 rounded-md shimmer w-10" />
        </div>
      </div>
    </div>
  </div>
)

const Loading = ({ 
  viewMode = 'grid', 
  count = 12, 
  className = '',
  showTitle = true 
}) => {
  return (
    <div className={className}>
      {showTitle && (
        <div className="mb-8 space-y-4">
          <div className="h-8 bg-gradient-to-r from-white/20 to-white/10 rounded shimmer w-64" />
          <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded shimmer w-96" />
        </div>
      )}
      
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkeletonListItem />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkeletonCard />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Loading