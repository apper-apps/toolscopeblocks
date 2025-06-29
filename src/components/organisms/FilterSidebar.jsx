import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import CategoryFilter from '@/components/molecules/CategoryFilter'
import PricingFilter from '@/components/molecules/PricingFilter'
import TagFilter from '@/components/molecules/TagFilter'

const FilterSidebar = ({ 
  isOpen, 
  onClose,
  filters,
  onFiltersChange,
  availableTags = [],
  categoryCounts = {},
  pricingCounts = {}
}) => {
  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      pricing: [],
      tags: []
    })
  }

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.pricing.length > 0 || 
    filters.tags.length > 0

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="glass-effect rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Filters</h2>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              )}
            </div>

            <CategoryFilter
              selectedCategories={filters.categories}
              onCategoryChange={(categories) => onFiltersChange({ ...filters, categories })}
              categoryCounts={categoryCounts}
            />

            <PricingFilter
              selectedPricing={filters.pricing}
              onPricingChange={(pricing) => onFiltersChange({ ...filters, pricing })}
              pricingCounts={pricingCounts}
            />

            <TagFilter
              availableTags={availableTags}
              selectedTags={filters.tags}
              onTagChange={(tags) => onFiltersChange({ ...filters, tags })}
            />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="lg:hidden fixed left-0 top-0 h-full w-80 bg-surface border-r border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Filters</h2>
                  <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                      >
                        Clear All
                      </Button>
                    )}
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <ApperIcon name="X" className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <CategoryFilter
                  selectedCategories={filters.categories}
                  onCategoryChange={(categories) => onFiltersChange({ ...filters, categories })}
                  categoryCounts={categoryCounts}
                />

                <PricingFilter
                  selectedPricing={filters.pricing}
                  onPricingChange={(pricing) => onFiltersChange({ ...filters, pricing })}
                  pricingCounts={pricingCounts}
                />

                <TagFilter
                  availableTags={availableTags}
                  selectedTags={filters.tags}
                  onTagChange={(tags) => onFiltersChange({ ...filters, tags })}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default FilterSidebar