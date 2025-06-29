import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import { useSavedTools } from '@/hooks/useSavedTools'

const Header = ({ onSearch, showSearch = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { count: savedCount } = useSavedTools()
  const location = useLocation()

  const navigation = [
    { name: 'Browse', href: '/', icon: 'Compass' },
    { name: 'Categories', href: '/categories', icon: 'Grid3x3' },
    { name: 'Saved Tools', href: '/saved', icon: 'Heart', badge: savedCount },
    { name: 'Submit Tool', href: '/submit', icon: 'Plus' }
  ]

  const isActiveRoute = (href) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              ToolScope
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActiveRoute(item.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <ApperIcon name={item.icon} className="h-4 w-4 mr-2" />
                {item.name}
                {item.badge > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
          </button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="pb-4">
            <SearchBar onSearch={onSearch} className="max-w-2xl mx-auto" />
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActiveRoute(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <ApperIcon name={item.icon} className="h-5 w-5 mr-3" />
                  {item.name}
                  {item.badge > 0 && (
                    <span className="ml-auto px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header