'use client'

import { motion } from 'framer-motion'
import { Search, Sparkles, Zap, Shield } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { useEffect, useState } from 'react'

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
    }
  }

  const filteredProducts = Array.isArray(products) ? products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) : []

  const featuredProducts = filteredProducts.filter(p => p.isFeatured)
  const regularProducts = filteredProducts.filter(p => !p.isFeatured)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-primary mx-auto" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Get <span className="text-gradient">ChatGPT Pro</span>,<br />
              <span className="text-gradient">Claude, Gemini & More</span><br />
              at Best Price
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Your trusted marketplace for premium AI tools subscriptions. 
              Get instant access to the world's best AI platforms.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-primary transition-colors text-white"
                />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              >
                <Zap className="w-10 h-10 text-primary mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Instant Delivery</h3>
                <p className="text-gray-400 text-sm">Get access within 2 hours</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              >
                <Shield className="w-10 h-10 text-secondary mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">100% Secure</h3>
                <p className="text-gray-400 text-sm">Safe and verified payment</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              >
                <Sparkles className="w-10 h-10 text-accent mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-400 text-sm">Affordable premium tools</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold mb-4 animate-pulse">
                <Sparkles className="w-5 h-5" />
                FEATURED DEALS
              </div>
              <h2 className="text-4xl font-bold mb-3">⭐ Best Value Offers</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg">Limited time deals you don't want to miss!</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">All Products</h2>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg">Browse our complete collection of AI tools</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 dark:text-gray-400 light:text-gray-600 py-12"
            >
              {searchQuery ? 'No products found matching your search.' : 'No products available yet.'}
            </motion.p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose BroSubs?</h2>
          <p className="text-gray-400 text-lg mb-8">
            We provide legitimate access to premium AI tools at competitive prices. 
            Our service is fast, reliable, and secure. Join thousands of satisfied customers 
            who trust us for their AI subscription needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-3">✅ Verified Services</h3>
              <p className="text-gray-400">All our subscriptions are 100% legitimate and verified.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-3">⚡ Fast Delivery</h3>
              <p className="text-gray-400">Get your access credentials within 2 hours or less.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-3">💰 Best Prices</h3>
              <p className="text-gray-400">Competitive pricing that saves you money every month.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-3">🛡️ Secure Payment</h3>
              <p className="text-gray-400">Your payment information is safe and encrypted.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 BroSubs. All rights reserved.</p>
          <p className="mt-2 text-sm">Your trusted AI tools marketplace</p>
        </div>
      </footer>
    </div>
  )
}
