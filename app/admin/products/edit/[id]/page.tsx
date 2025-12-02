'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    features: '',
    price: '',
    originalPrice: '',
    duration: '',
    category: 'AI Tools',
    status: 'active',
    image: '',
    isFeatured: false,
    discountEndTime: '',
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`)
      const data = await res.json()
      
      setFormData({
        name: data.name,
        description: data.description,
        features: data.features.join('\n'),
        price: data.price.toString(),
        originalPrice: data.originalPrice?.toString() || '',
        duration: data.duration || '',
        category: data.category,
        status: data.status,
        image: data.image || '',
        isFeatured: data.isFeatured || false,
        discountEndTime: data.discountEndTime ? new Date(data.discountEndTime).toISOString().slice(0, 16) : '',
      })
    } catch (error) {
      toast.error('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const featuresArray = formData.features
        .split('\n')
        .filter(f => f.trim())
        .map(f => f.trim())

      const res = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: featuresArray,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          discountEndTime: formData.discountEndTime ? new Date(formData.discountEndTime).toISOString() : null,
        }),
      })

      if (res.ok) {
        toast.success('Product updated successfully')
        router.push('/admin')
      } else {
        toast.error('Failed to update product')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/admin"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Edit Product</h1>

        <form onSubmit={handleSubmit} className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g., ChatGPT Pro"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="Brief description of the product"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features (one per line) *</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors font-mono text-sm"
              placeholder="GPT-4 access&#10;Unlimited messages&#10;Priority support&#10;Advanced data analysis"
            />
            <p className="text-xs text-gray-400 mt-1">Enter each feature on a new line</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price (৳) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
              >
                <option value="AI Tools">AI Tools</option>
                <option value="Storage">Storage</option>
                <option value="Productivity">Productivity</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
              >
                <option value="active">Active</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image Name (Optional)</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors text-white dark:text-white light:text-gray-900"
                placeholder="chatgpt, gemini, perplexity, claude, midjourney, chatgpt-goto"
              />
              <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1">Enter logo name from /public/logos folder</p>
            </div>
          </div>

          {/* Discount Timer Section */}
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-primary">Discount & Timer Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Original Price (৳)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="1299"
                />
                <p className="text-xs text-gray-400 mt-1">Leave empty for no discount display</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="1 month, 1 year, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">Discount End Time</label>
                <input
                  type="datetime-local"
                  name="discountEndTime"
                  value={formData.discountEndTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">Leave empty to remove countdown timer</p>
              </div>

              <div className="flex items-center h-full">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary bg-gray-800 border-gray-700 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm font-medium">Mark as Featured Product</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Product'}
            </button>
            <Link
              href="/admin"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
