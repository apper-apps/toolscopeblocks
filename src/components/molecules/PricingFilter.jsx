import { motion } from 'framer-motion'
import Badge from '@/components/atoms/Badge'
import { PRICING_TIERS } from '@/utils/constants'
import { formatPricing } from '@/utils/formatting'

const PricingFilter = ({ 
  selectedPricing = [], 
  onPricingChange,
  pricingCounts = {},
  className = ''
}) => {
  const handlePricingClick = (pricing) => {
    const isSelected = selectedPricing.includes(pricing)
    if (isSelected) {
      onPricingChange(selectedPricing.filter(p => p !== pricing))
    } else {
      onPricingChange([...selectedPricing, pricing])
    }
  }

  const clearAll = () => {
    onPricingChange([])
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Pricing</h3>
        {selectedPricing.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {PRICING_TIERS.map((pricing) => {
          const isSelected = selectedPricing.includes(pricing)
          const count = pricingCounts[pricing] || 0
          const pricingFormat = formatPricing(pricing)
          
          return (
            <motion.button
              key={pricing}
              onClick={() => handlePricingClick(pricing)}
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
              <span className="font-medium">{pricingFormat.text}</span>
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

export default PricingFilter