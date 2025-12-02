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
    const { productId, fullName, phone, email, password, paymentMethod, transactionId, userId } = body

    // Validate required fields
    if (!productId || !fullName || !phone || !email || !paymentMethod || !transactionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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
