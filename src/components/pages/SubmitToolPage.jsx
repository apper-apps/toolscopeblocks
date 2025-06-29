import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Card from '@/components/atoms/Card'
import { CATEGORIES, PRICING_TIERS } from '@/utils/constants'
import toolService from '@/services/api/toolService'

const SubmitToolPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    pricing: '',
    website: '',
    logo: '',
    tags: '',
    features: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Tool name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.pricing) {
      newErrors.pricing = 'Please select a pricing tier'
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website URL is required'
    } else if (!/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL'
    }

    if (!formData.logo.trim()) {
      newErrors.logo = 'Logo URL is required'
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(formData.logo)) {
      newErrors.logo = 'Please enter a valid image URL'
    }

    if (!formData.tags.trim()) {
      newErrors.tags = 'At least one tag is required'
    }

    if (!formData.features.trim()) {
      newErrors.features = 'At least one feature is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    try {
      setLoading(true)

      // Process tags and features
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const features = formData.features
        .split('\n')
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0)

const toolData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        pricing: formData.pricing,
        website: formData.website.trim(),
        logo: formData.logo.trim(),
        tags,
        features
      }

      await toolService.create(toolData)
      
      toast.success('Tool submitted successfully! It will be reviewed and added to the directory.')
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        pricing: '',
        website: '',
        logo: '',
        tags: '',
        features: ''
      })
      
    } catch (error) {
      toast.error('Failed to submit tool. Please try again.')
      console.error('Submit error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Submit AI Tool
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Share an amazing AI tool with the community. Help others discover great solutions.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Tool Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  placeholder="e.g., ChatGPT"
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    Category <span className="text-error">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`
                      w-full px-4 py-3 bg-surface border border-white/20 rounded-lg 
                      text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                      transition-all duration-200
                      ${errors.category ? 'border-error focus:ring-error' : ''}
                    `}
                    required
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-sm text-error">{errors.category}</p>
                  )}
                </div>
              </div>

              <div>
                <Input
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={errors.description}
                  placeholder="Describe what this AI tool does and its main benefits..."
                  required
                  as="textarea"
                  rows={4}
                  className="resize-none"
                />
                <div className="mt-1 text-xs text-gray-400">
                  {formData.description.length}/500 characters (minimum 50)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    Pricing <span className="text-error">*</span>
                  </label>
                  <select
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleInputChange}
                    className={`
                      w-full px-4 py-3 bg-surface border border-white/20 rounded-lg 
                      text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                      transition-all duration-200
                      ${errors.pricing ? 'border-error focus:ring-error' : ''}
                    `}
                    required
                  >
                    <option value="">Select pricing tier</option>
                    {PRICING_TIERS.map(tier => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                  {errors.pricing && (
                    <p className="text-sm text-error">{errors.pricing}</p>
                  )}
                </div>

                <Input
                  label="Website URL"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  error={errors.website}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <Input
                label="Logo URL"
                name="logo"
                type="url"
                value={formData.logo}
                onChange={handleInputChange}
                error={errors.logo}
                placeholder="https://example.com/logo.png"
                required
              />

              <Input
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                error={errors.tags}
                placeholder="ai, writing, content, automation"
                required
                helperText="Separate tags with commas"
              />

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Key Features <span className="text-error">*</span>
                </label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows={5}
                  className={`
                    w-full px-4 py-3 bg-surface border border-white/20 rounded-lg 
                    text-white placeholder-gray-400 resize-none
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                    transition-all duration-200
                    ${errors.features ? 'border-error focus:ring-error' : ''}
                  `}
                  placeholder="Natural language processing&#10;Code generation&#10;Multi-language support&#10;API integration"
                  required
                />
                {errors.features && (
                  <p className="text-sm text-error mt-1">{errors.features}</p>
                )}
                <div className="mt-1 text-xs text-gray-400">
                  List one feature per line
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  loading={loading}
                  className="flex-1"
                  size="lg"
                >
                  <ApperIcon name="Send" className="h-5 w-5 mr-2" />
                  {loading ? 'Submitting...' : 'Submit Tool'}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setFormData({
                      name: '',
                      description: '',
                      category: '',
                      pricing: '',
                      website: '',
                      logo: '',
                      tags: '',
                      features: ''
                    })
                    setErrors({})
                  }}
                  size="lg"
                >
                  <ApperIcon name="RotateCcw" className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Submission Guidelines */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ApperIcon name="Info" className="h-5 w-5 mr-2 text-primary" />
              Submission Guidelines
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Tool must be AI-powered or AI-related</span>
              </div>
              <div className="flex items-start gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Provide accurate and detailed information</span>
              </div>
              <div className="flex items-start gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Include a working website URL</span>
              </div>
              <div className="flex items-start gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Use high-quality logo images</span>
              </div>
              <div className="flex items-start gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Add relevant tags for better discovery</span>
              </div>
            </div>
          </Card>

          {/* Review Process */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ApperIcon name="Clock" className="h-5 w-5 mr-2 text-warning" />
              Review Process
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <span>Submission received</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-secondary font-semibold">2</span>
                </div>
                <span>Quality review & verification</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <span className="text-success font-semibold">3</span>
                </div>
                <span>Published to directory</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-info/10 border border-info/20 rounded-lg">
              <p className="text-info text-xs">
                <ApperIcon name="Info" className="h-3 w-3 inline mr-1" />
                Review typically takes 1-3 business days
              </p>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ApperIcon name="MessageCircle" className="h-5 w-5 mr-2 text-accent" />
              Need Help?
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Have questions about submitting your AI tool? We're here to help!
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <ApperIcon name="Mail" className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SubmitToolPage