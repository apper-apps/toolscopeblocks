import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default', 
  className = '',
  gradient = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
  
  const variants = {
    default: "bg-white/10 text-white border-white/20",
    primary: "bg-primary/20 text-primary border-primary/30",
    secondary: "bg-secondary/20 text-secondary border-secondary/30",
    success: "bg-success/20 text-success border-success/30",
    warning: "bg-warning/20 text-warning border-warning/30",
    error: "bg-error/20 text-error border-error/30",
    info: "bg-info/20 text-info border-info/30",
    accent: "bg-accent/20 text-accent border-accent/30"
  }
  
  const gradientClass = gradient ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30" : variants[variant]
  const classes = `${baseClasses} ${gradientClass} ${className}`
  
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export default Badge