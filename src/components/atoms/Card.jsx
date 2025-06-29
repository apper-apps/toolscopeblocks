import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const Card = forwardRef(({ 
  children, 
  className = '',
  hover = true,
  gradient = false,
  ...props 
}, ref) => {
  const baseClasses = "bg-surface rounded-xl border border-white/10 shadow-lg"
  const hoverClasses = hover ? "hover:shadow-xl hover:border-white/20 transition-all duration-300" : ""
  const gradientClasses = gradient ? "bg-gradient-to-br from-surface to-surface/80" : ""
  
  const classes = `${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`
  
  const CardComponent = hover ? motion.div : 'div'
  const motionProps = hover ? {
    whileHover: { scale: 1.02, y: -2 },
    transition: { duration: 0.2 }
  } : {}
  
  return (
    <CardComponent
      ref={ref}
      className={classes}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  )
})

Card.displayName = 'Card'

export default Card