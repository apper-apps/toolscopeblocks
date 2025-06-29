export const formatPricing = (pricing) => {
  const pricingMap = {
    'Free': { text: 'Free', color: 'bg-success/20 text-success border-success/30' },
    'Freemium': { text: 'Freemium', color: 'bg-info/20 text-info border-info/30' },
    'Paid': { text: 'Paid', color: 'bg-warning/20 text-warning border-warning/30' },
    'Enterprise': { text: 'Enterprise', color: 'bg-accent/20 text-accent border-accent/30' }
  }
  
  return pricingMap[pricing] || { text: pricing, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
}

export const formatCategory = (category) => {
  const categoryColors = {
    'Writing': 'from-blue-500 to-indigo-600',
    'Image': 'from-purple-500 to-pink-600',
    'Code': 'from-green-500 to-emerald-600',
    'Video': 'from-red-500 to-orange-600',
    'Audio': 'from-yellow-500 to-amber-600',
    'Data': 'from-cyan-500 to-teal-600'
  }
  
  return categoryColors[category] || 'from-gray-500 to-gray-600'
}

export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

export const searchHighlight = (text, query) => {
  if (!query) return text
  
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark class="bg-primary/30 text-primary-foreground rounded px-1">$1</mark>')
}