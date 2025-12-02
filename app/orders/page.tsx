'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, XCircle, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

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
  adminNotes?: string
  product: {
    name: string
    price: number
    image?: string
  }
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/orders')
    } else if (status === 'authenticated' && session?.user?.email) {
      fetchOrders(session.user.email)
    }
  }, [status, session, router])

  const fetchOrders = async (email: string) => {
    try {
      const res = await fetch(`/api/orders/user?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-500" />
      default:
        return <Clock className="w-6 h-6 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-500 border-green-500'
      case 'rejected':
        return 'bg-red-500/20 text-red-500 border-red-500'
      default:
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-900 dark:bg-gray-900 light:bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">My Orders</h1>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
            Track and manage your purchases
          </p>
        </motion.div>

        {/* Admin Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 light:from-blue-50 light:to-purple-50 border border-primary/30 dark:border-primary/30 light:border-blue-200 rounded-xl p-6 mb-8"
        >
          <h2 className="text-lg font-semibold mb-4 text-white dark:text-white light:text-gray-900">Need Help? Contact Admin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+8801311130356" className="text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-primary transition-colors">
                +880 1311-130356
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:fahimsifat12345@gmail.com" className="text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-primary transition-colors">
                fahimsifat12345@gmail.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16 bg-gray-800 dark:bg-gray-800 light:bg-white rounded-xl border border-gray-700 dark:border-gray-700 light:border-gray-200"
          >
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white dark:text-white light:text-gray-900">No orders yet</h3>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-6">Start shopping to see your orders here</p>
            <Link
              href="/"
              className="inline-block bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-200 rounded-xl p-6 hover:border-primary transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">{order.product.name}</h3>
                      <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-700 font-medium">
                        Order #{order.orderId} • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)} capitalize`}>
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 font-medium mb-1">Payment Method</p>
                    <p className="font-semibold text-white dark:text-white light:text-gray-900 capitalize">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 font-medium mb-1">Transaction ID</p>
                    <code className="text-sm bg-gray-700 dark:bg-gray-700 light:bg-gray-200 px-2 py-1 rounded font-mono block dark:text-white light:text-gray-900">
                      {order.transactionId}
                    </code>
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 font-medium mb-1">Amount Paid</p>
                    <p className="font-semibold text-primary text-lg">
                      ৳{order.purchasePrice}
                      {order.selectedPlan && <span className="text-sm text-gray-400 ml-1">/ {order.selectedPlan}</span>}
                    </p>
                  </div>
                </div>

                {order.adminNotes && (
                  <div className="mt-4 p-4 bg-gray-700/50 dark:bg-gray-700/50 light:bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 mb-1">Admin Notes:</p>
                    <p className="text-white dark:text-white light:text-gray-900">{order.adminNotes}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
