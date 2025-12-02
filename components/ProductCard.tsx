'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Sparkles } from 'lucide-react'
import { ChatGPTIcon, GeminiIcon, PerplexityIcon, ClaudeIcon, MidjourneyIcon, ChatGPTGotoIcon } from './ProductIcons'
import CountdownTimer from './CountdownTimer'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  duration?: string
  category: string
  status: string
  isFeatured?: boolean
  discountEndTime?: Date | string | null
  image?: string
}

interface ProductCardProps {
  product: Product
}

const getProductIcon = (imageName?: string) => {
  const iconClass = "w-full h-full p-4"
  switch(imageName) {
    case 'chatgpt': return <ChatGPTIcon className={iconClass} />
    case 'chatgpt-goto': return <ChatGPTGotoIcon className={iconClass} />
    case 'gemini': return <GeminiIcon className={iconClass} />
    case 'perplexity': return <PerplexityIcon className={iconClass} />
    case 'claude': return <ClaudeIcon className={iconClass} />
    case 'midjourney': return <MidjourneyIcon className={iconClass} />
    default: return <div className="text-6xl">🤖</div>
  }
}

const calculateDiscount = (original?: number, current?: number) => {
  if (!original || !current) return 0
  return Math.round(((original - current) / original) * 100)
}

export default function ProductCard({ product }: ProductCardProps) {
  const isComingSoon = product.status === 'coming_soon'
  const discount = calculateDiscount(product.originalPrice, product.price)

  const cardContent = (
    <motion.div
      whileHover={{ scale: isComingSoon ? 1 : 1.05, y: isComingSoon ? 0 : -5 }}
      transition={{ duration: 0.3 }}
      className="relative group h-full"
    >
      {/* Featured Badge */}
      {product.isFeatured && (
        <div className="absolute -top-3 -right-3 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
            <Sparkles className="w-3 h-3" />
            FEATURED
          </div>
        </div>
      )}

      <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col ${
        product.isFeatured 
          ? 'bg-gray-800 dark:bg-gray-800 light:bg-white border-yellow-400 dark:border-yellow-500 light:border-yellow-400 hover:shadow-yellow-500/20' 
          : 'bg-gray-800 dark:bg-gray-800 light:bg-white border-gray-700 dark:border-gray-700 light:border-gray-300 hover:border-primary hover:shadow-primary/20'
      }`}>
        
        {/* Coming Soon Badge */}
        {isComingSoon && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
        )}

        {/* Product Icon */}
        <div className={`flex-1 flex items-center justify-center overflow-hidden ${
          product.isFeatured 
            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
            : 'bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20'
        }`}>
          {getProductIcon(product.image)}
        </div>

        {/* Product Info */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gradient transition-all">
                {product.name}
              </h3>
              {product.duration && (
                <p className="text-sm text-primary font-semibold mt-1">
                  {product.duration}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">4.9</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto">
            {!isComingSoon && (
              <>
                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    {product.originalPrice && (
                      <span className="text-xl font-bold text-gray-400 dark:text-gray-500 line-through">
                        ৳{product.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-primary">
                      ৳{product.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {discount > 0 && (
                      <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full font-semibold">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Countdown Timer */}
                {product.discountEndTime && (
                  <div className="mb-4">
                    <CountdownTimer endTime={new Date(product.discountEndTime)} />
                  </div>
                )}
              </>
            )}

            {/* View Details Button */}
            <div
              className={`flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg transition-all font-semibold ${
                isComingSoon
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : product.isFeatured
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white'
                  : 'bg-primary hover:bg-primary/80 text-white'
              }`}
            >
              <span>{isComingSoon ? 'Coming Soon' : 'View Details'}</span>
              {!isComingSoon && <ArrowRight className="w-4 h-4" />}
            </div>

            {/* Category Badge */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (isComingSoon) {
    return <div className="cursor-not-allowed">{cardContent}</div>
  }

  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      {cardContent}
    </Link>
  )
}
