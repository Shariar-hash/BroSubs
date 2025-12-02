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
    const { 
      name, 
      description, 
      features, 
      price, 
      originalPrice,
      duration,
      category, 
      status, 
      image,
      isFeatured,
      discountEndTime
    } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        features,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        duration: duration || null,
        category,
        status: status || 'active',
        image: image || null,
        isFeatured: isFeatured || false,
        discountEndTime: discountEndTime ? new Date(discountEndTime) : null,
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
