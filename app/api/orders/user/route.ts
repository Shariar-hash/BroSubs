import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const orders = await prisma.order.findMany({
      where: { email },
      include: {
        product: {
          select: {
            name: true,
            price: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching user orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
