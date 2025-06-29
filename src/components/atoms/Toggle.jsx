import { motion } from 'framer-motion'

const Toggle = ({ 
  checked, 
  onChange, 
  label,
  disabled = false,
  className = ''
}) => {
  return (
    <label className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <motion.div
          className={`w-11 h-6 rounded-full transition-colors duration-200 ${
            checked 
              ? 'bg-gradient-to-r from-primary to-secondary' 
              : 'bg-white/20'
          }`}
          animate={{ backgroundColor: checked ? undefined : 'rgba(255, 255, 255, 0.2)' }}
        >
          <motion.div
            className="w-5 h-5 bg-white rounded-full shadow-md"
            animate={{ 
              x: checked ? 22 : 2,
              y: 2
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.div>
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-white">
          {label}
        </span>
      )}
    </label>
  )
}

export default Toggle