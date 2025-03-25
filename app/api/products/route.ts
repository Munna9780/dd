import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Context } from '@netlify/edge-functions'

const prisma = new PrismaClient()

export const config = {
  runtime: 'edge',
}

// Get all products
export async function GET(req: Request, context: Context) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// Add a new product
export async function POST(req: Request, context: Context) {
  try {
    const data = await req.json()
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price.toString()),
        image_url: data.image_url,
        category: data.category,
        artist: data.artist,
        affiliateLink: data.affiliateLink
      }
    })

    // Trigger revalidation
    await fetch(`${req.headers.get('origin')}/api/revalidate?tag=products`, {
      method: 'POST'
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error adding product:', error)
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}

// Update a product
export async function PUT(req: Request, context: Context) {
  try {
    const { id, ...updates } = await req.json()
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...updates,
        price: updates.price ? parseFloat(updates.price.toString()) : undefined
      }
    })

    // Trigger revalidation
    await fetch(`${req.headers.get('origin')}/api/revalidate?tag=products`, {
      method: 'POST'
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// Delete a product
export async function DELETE(req: Request, context: Context) {
  try {
    const { id } = await req.json()
    await prisma.product.delete({
      where: { id }
    })

    // Trigger revalidation
    await fetch(`${req.headers.get('origin')}/api/revalidate?tag=products`, {
      method: 'POST'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
