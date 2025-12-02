import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const totalOrders = await prisma.order.count()
    const pendingOrders = await prisma.order.count({ where: { status: 'pending' } })
    const completedOrders = await prisma.order.count({ where: { status: 'completed' } })
    const totalProducts = await prisma.product.count()

    return NextResponse.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalProducts,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
