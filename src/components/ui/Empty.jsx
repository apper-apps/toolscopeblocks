import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const Empty = ({ 
  title = "No results found",
  message = "Try adjusting your search or filters to find what you're looking for.",
  icon = "Search",
  action,
  actionLabel,
  actionHref,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
      <Card className="max-w-lg w-full mx-4 text-center p-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
            <ApperIcon name={icon} className="h-10 w-10 text-primary" />
          </div>
          
          <h3 className="text-2xl font-semibold text-white mb-4">
            {title}
          </h3>
          
          <p className="text-gray-400 mb-8 leading-relaxed">
            {message}
          </p>
          
          <div className="space-y-3">
            {actionHref ? (
              <Link to={actionHref}>
                <Button className="w-full">
                  <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                  {actionLabel || "Get Started"}
                </Button>
              </Link>
            ) : action ? (
              <Button onClick={action} className="w-full">
                <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                {actionLabel || "Try Again"}
              </Button>
            ) : (
              <Link to="/">
                <Button className="w-full">
                  <ApperIcon name="Home" className="h-4 w-4 mr-2" />
                  Browse All Tools
                </Button>
              </Link>
            )}
            
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
            >
              <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </Card>
    </div>
  )
}

export default Empty