import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const Error = ({ 
  title = "Something went wrong",
  message = "We encountered an error while loading the content. Please try again.",
  onRetry,
  showRetry = true,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
      <Card className="max-w-md w-full mx-4 text-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertTriangle" className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-3">
            {title}
          </h3>
          
          <p className="text-gray-400 mb-6 leading-relaxed">
            {message}
          </p>
          
          {showRetry && onRetry && (
            <div className="space-y-3">
              <Button
                onClick={onRetry}
                className="w-full"
              >
                <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => window.location.reload()}
              >
                <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
                Reload Page
              </Button>
            </div>
          )}
        </motion.div>
      </Card>
    </div>
  )
}

export default Error