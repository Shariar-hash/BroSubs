import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all orders (admin only)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

// POST create new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, fullName, phone, email, password, paymentMethod, transactionId, userId, purchasePrice, selectedPlan } = body

    // Validate required fields
    if (!productId || !fullName || !phone || !email || !paymentMethod || !transactionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Fetch the current product to fallback if purchasePrice not provided
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const order = await prisma.order.create({
      data: {
        productId,
        fullName,
        phone,
        email,
        password,
        paymentMethod,
        transactionId,
        purchasePrice: purchasePrice || product.price, // Use provided price or fallback to product price
        selectedPlan: selectedPlan || product.duration || null, // Store selected plan duration
        status: 'pending',
        ...(userId && { userId }),
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
