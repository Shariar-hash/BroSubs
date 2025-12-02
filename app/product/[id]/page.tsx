'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Clock, Shield, Zap, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import PurchaseForm from '@/components/PurchaseForm'
import CountdownTimer from '@/components/CountdownTimer'

interface Product {
  id: string
  name: string
  description: string
  features: string[]
  price: number
  originalPrice?: number
  duration?: string
  category: string | string[]
  status: string
  isFeatured?: boolean
  discountEndTime?: Date | string | null
  image?: string
  plans?: Array<{
    duration: string
    price: number
    originalPrice?: number
  }>
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<number>(0)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`)
      const data = await res.json()
      setProduct(data)
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
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

  if (!product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Image and Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Product Image */}
            <div className={`rounded-2xl h-96 flex items-center justify-center mb-8 border overflow-hidden ${
              product.isFeatured 
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-400 dark:border-yellow-500'
                : 'bg-gradient-to-br from-primary/20 to-secondary/20 border-gray-700 dark:border-gray-700 light:border-gray-200'
            }`}>
              {product.image && !imageError ? (
                <div className="relative w-full h-full flex items-center justify-center p-8">
                  <Image 
                    src={`/logos/${product.image}`}
                    alt={product.name}
                    width={384}
                    height={384}
                    className="object-contain max-w-full max-h-full"
                    onError={() => {
                      console.error(`Failed to load image: /logos/${product.image}`)
                      setImageError(true)
                    }}
                    unoptimized
                  />
                </div>
              ) : (
                <div className="text-9xl">🤖</div>
              )}
            </div>

            {/* What You'll Get */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Zap className="w-6 h-6 text-primary" />
                <span>What You'll Get</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Full access to {product.name}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Premium features unlocked</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Instant activation within 2 hours</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">24/7 customer support</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Product Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {(Array.isArray(product.category) ? product.category : [product.category]).map((cat, idx) => (
                  <span key={idx} className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
                    {cat}
                  </span>
                ))}
                {product.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full">
                    <Sparkles className="w-3 h-3" />
                    FEATURED
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl text-gray-400 mb-6">{product.description}</p>
              
              {/* Price */}
              {product.status !== 'coming_soon' && (
                <div className="mb-8">
                  {/* Plan Selection */}
                  {product.plans && product.plans.length > 0 ? (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Choose Your Plan</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {product.plans.map((plan, index) => {
                          const discount = plan.originalPrice 
                            ? Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)
                            : 0
                          
                          return (
                            <button
                              key={index}
                              onClick={() => setSelectedPlan(index)}
                              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                                selectedPlan === index
                                  ? 'border-primary bg-primary/10'
                                  : 'border-gray-700 hover:border-gray-600'
                              }`}
                            >
                              {discount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  {discount}% OFF
                                </span>
                              )}
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-bold text-lg">{plan.duration}</div>
                                  <div className="flex items-baseline gap-2 mt-1">
                                    {plan.originalPrice && (
                                      <span className="text-sm text-gray-400 line-through">
                                        ৳{plan.originalPrice}
                                      </span>
                                    )}
                                    <span className="text-2xl font-bold text-primary">
                                      ৳{plan.price}
                                    </span>
                                  </div>
                                  {plan.originalPrice && (
                                    <div className="text-xs text-green-500 font-semibold mt-1">
                                      Save ৳{plan.originalPrice - plan.price}
                                    </div>
                                  )}
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  selectedPlan === index
                                    ? 'border-primary bg-primary'
                                    : 'border-gray-600'
                                }`}>
                                  {selectedPlan === index && (
                                    <Check className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-3 mb-2">
                        {product.originalPrice && (
                          <span className="text-3xl font-bold text-gray-400 dark:text-gray-500 line-through">
                            ৳{product.originalPrice}
                          </span>
                        )}
                        <span className="text-5xl font-bold text-primary">৳{product.price}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        {product.originalPrice && (
                          <span className="inline-block px-4 py-2 bg-green-500/20 text-green-500 font-bold rounded-lg">
                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% • ৳{product.originalPrice - product.price} OFF
                          </span>
                        )}
                        {product.duration && (
                          <span className="text-xl text-gray-400">/{product.duration}</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Countdown Timer */}
                  {product.discountEndTime && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <CountdownTimer endTime={new Date(product.discountEndTime)} className="justify-center" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {product.features && product.features.length > 0 ? (
                  product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))
                ) : (
                  <li className="text-gray-400">No features listed</li>
                )}
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Fast Delivery</h3>
                <p className="text-sm text-gray-400">Within 2 hours</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <Shield className="w-8 h-8 text-secondary mb-2" />
                <h3 className="font-semibold mb-1">100% Secure</h3>
                <p className="text-sm text-gray-400">Safe payment</p>
              </div>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={() => setShowPurchaseForm(true)}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              {product.plans && product.plans.length > 0 ? (
                <>
                  Buy Now - ৳{product.plans[selectedPlan].price} {product.plans[selectedPlan].originalPrice && (
                    <span className="line-through text-sm opacity-75 ml-2">৳{product.plans[selectedPlan].originalPrice}</span>
                  )}
                </>
              ) : (
                <>
                  Buy Now - ৳{product.price} {product.originalPrice && (
                    <span className="line-through text-sm opacity-75 ml-2">৳{product.originalPrice}</span>
                  )}
                </>
              )}
            </button>
            {((product.plans && product.plans[selectedPlan].originalPrice) || product.originalPrice) && (
              <p className="text-center text-sm text-green-500 font-semibold mt-2">
                🎉 Limited Time Offer - Save {
                  product.plans && product.plans.length > 0
                    ? Math.round(((product.plans[selectedPlan].originalPrice! - product.plans[selectedPlan].price) / product.plans[selectedPlan].originalPrice!) * 100)
                    : Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
                }% Today!
              </p>
            )}

            {/* FAQ */}
            <div className="mt-8 bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">How long does delivery take?</h4>
                  <p className="text-gray-400 text-sm">You'll receive access within 2 hours of payment verification.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Is this subscription legitimate?</h4>
                  <p className="text-gray-400 text-sm">Yes, all our subscriptions are 100% verified and legitimate.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">What payment methods do you accept?</h4>
                  <p className="text-gray-400 text-sm">We accept Bkash and Nagad mobile payments.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Purchase Form Modal */}
      {showPurchaseForm && (
        <PurchaseForm
          product={product}
          selectedPlan={product.plans && product.plans.length > 0 ? product.plans[selectedPlan] : undefined}
          onClose={() => setShowPurchaseForm(false)}
        />
      )}
    </div>
  )
}
