import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// POST create new product (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, features, price, category, status, image } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        features,
        price: parseFloat(price),
        category,
        status: status || 'active',
        image,
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
