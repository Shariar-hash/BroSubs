'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package, ShoppingCart, CheckCircle, Clock, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Stats {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalProducts: number
}

interface Order {
  id: string
  orderId: number
  fullName: string
  email: string
  phone: string
  transactionId: string
  paymentMethod: string
  status: string
  purchasePrice: number
  selectedPlan?: string
  createdAt: string
  product: {
    name: string
    price: number
  }
}

interface Product {
  id: string
  name: string
  price: number
  category: string | string[]
  status: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products'>('overview')
  const [stats, setStats] = useState<Stats | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const adminAuth = sessionStorage.getItem('adminAuth')
    if (!adminAuth) {
      router.push('/admin/login')
      return
    }
    
    setIsAuthenticated(true)
    setIsLoading(false)

    // Check if user session exists (Google OAuth)
    // If user is signed in with Google, logout admin
    const checkUserSession = async () => {
      const res = await fetch('/api/auth/session')
      const session = await res.json()
      if (session?.user) {
        sessionStorage.removeItem('adminAuth')
        router.push('/')
        return
      }
    }

    checkUserSession()
    fetchStats()
    fetchOrders()
    fetchProducts()
  }, [router])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      console.log('Admin - Products received:', data)
      console.log('Admin - Is array?', Array.isArray(data))
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (res.ok) {
        toast.success('Order status updated')
        fetchOrders()
        fetchStats()
      }
    } catch (error) {
      toast.error('Failed to update order')
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast.success('Product deleted')
        fetchProducts()
        fetchStats()
      }
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (redirecting)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your products and orders</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'products'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Products
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6"
            >
              <ShoppingCart className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-gray-400 text-sm mb-2">Total Orders</h3>
              <p className="text-4xl font-bold">{stats.totalOrders}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 rounded-xl p-6"
            >
              <Clock className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-gray-400 text-sm mb-2">Pending Orders</h3>
              <p className="text-4xl font-bold">{stats.pendingOrders}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-xl p-6"
            >
              <CheckCircle className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="text-gray-400 text-sm mb-2">Completed Orders</h3>
              <p className="text-4xl font-bold">{stats.completedOrders}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 rounded-xl p-6"
            >
              <Package className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-gray-400 text-sm mb-2">Total Products</h3>
              <p className="text-4xl font-bold">{stats.totalProducts}</p>
            </motion.div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-700 dark:border-gray-700 light:border-gray-200">
              <input
                type="text"
                placeholder="Search by Order ID or Transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Payment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Transaction ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .filter(order => 
                      searchQuery === '' ||
                      order.orderId.toString().includes(searchQuery) ||
                      order.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((order) => (
                    <tr key={order.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                      <td className="px-6 py-4">
                        <span className="font-mono font-semibold text-primary">#{order.orderId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{order.fullName}</p>
                          <p className="text-sm text-gray-400">{order.email}</p>
                          <p className="text-sm text-gray-400">{order.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold">{order.product.name}</p>
                        <p className="text-sm text-gray-400">
                          ৳{order.purchasePrice}
                          {order.selectedPlan && <span className="ml-1">/ {order.selectedPlan}</span>}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                          {order.paymentMethod.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm bg-gray-200 dark:bg-gray-700 light:bg-gray-100 text-gray-900 dark:text-white light:text-gray-900 px-2 py-1 rounded border border-gray-300 dark:border-gray-600">{order.transactionId}</code>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                          order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                          'bg-red-500/20 text-red-500'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'rejected')}
                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orders.length === 0 && (
              <p className="text-center text-gray-400 py-12">No orders yet</p>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              <Link
                href="/admin/products/new"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/80 text-white font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Product</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(products) && products.map((product) => (
                <div key={product.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                      <p className="text-2xl font-bold text-primary">৳{product.price}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(Array.isArray(product.category) ? product.category : [product.category]).map((cat, idx) => (
                      <span key={idx} className="text-xs text-gray-400 bg-gray-700/30 px-2 py-1 rounded">{cat}</span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <p className="text-center text-gray-400 py-12">No products yet. Add your first product!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
