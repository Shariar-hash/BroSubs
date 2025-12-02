'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Phone, Mail, Lock, Upload } from 'lucide-react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  price: number
}

interface PurchaseFormProps {
  product: Product
  onClose: () => void
}

export default function PurchaseForm({ product, onClose }: PurchaseFormProps) {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    fullName: session?.user?.name || '',
    phone: '',
    email: session?.user?.email || '',
    password: '',
    paymentMethod: 'bkash',
    transactionId: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId: product.id,
          userId: (session?.user as any)?.id || null,
        }),
      })

      if (res.ok) {
        toast.success('Order placed successfully! We will process it soon.')
        onClose()
      } else {
        const error = await res.json()
        toast.error(error.error || 'Failed to place order')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
              <p className="text-gray-400 text-sm mt-1">{product.name} - ৳{product.price}/month</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address (for this subscription) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1">This email will be used for the subscription</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password (Optional)
                  </label>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
                    placeholder="If you want us to set a password"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1">Leave empty if not needed</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold mb-4">
                <CreditCard className="w-5 h-5 inline mr-2" />
                Payment Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === 'bkash' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-700 dark:border-gray-700 light:border-gray-300 hover:border-gray-600 dark:hover:border-gray-600 light:hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bkash"
                        checked={formData.paymentMethod === 'bkash'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-semibold">Bkash</span>
                    </label>
                    <label className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === 'nagad' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-700 dark:border-gray-700 light:border-gray-300 hover:border-gray-600 dark:hover:border-gray-600 light:hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="nagad"
                        checked={formData.paymentMethod === 'nagad'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-semibold">Nagad</span>
                    </label>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-primary/10 dark:bg-primary/10 light:bg-blue-50 border border-primary/30 dark:border-primary/30 light:border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-primary">Payment Instructions:</h4>
                  <ol className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Send ৳{product.price} to: <span className="font-bold text-white dark:text-white light:text-gray-900">+8801311130356</span></li>
                    <li>Use "{formData.paymentMethod === 'bkash' ? 'Bkash' : 'Nagad'}" Send Money</li>
                    <li>Copy the Transaction ID</li>
                    <li>Paste it in the field below</li>
                  </ol>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Transaction ID *</label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
                    placeholder="Enter your transaction ID"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1">You'll receive this after completing payment</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-700 pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitting ? 'Processing...' : `Submit Order - ৳${product.price}`}
              </button>
              <p className="text-center text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-4">
                By submitting, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
