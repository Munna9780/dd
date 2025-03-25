import { NextResponse } from 'next/server'
import type { Context } from '@netlify/edge-functions'

export const config = {
  runtime: 'edge',
}

// Get all products
export async function GET(req: Request, context: Context) {
  try {
    const products = await context.env.PRODUCTS.get('products')
    return NextResponse.json(products ? JSON.parse(products) : [])
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// Add a new product
export async function POST(req: Request, context: Context) {
  try {
    const product = await req.json()
    const productsStr = await context.env.PRODUCTS.get('products')
    const products = productsStr ? JSON.parse(productsStr) : []
    
    // Add new product with generated ID and timestamp
    const newProduct = {
      ...product,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    }
    
    products.unshift(newProduct)
    await context.env.PRODUCTS.put('products', JSON.stringify(products))

    // Trigger revalidation
    await fetch(`${req.headers.get('origin')}/api/revalidate?tag=products`, {
      method: 'POST'
    })

    return NextResponse.json(newProduct)
  } catch (error) {
    console.error('Error adding product:', error)
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}

// Update a product
export async function PUT(req: Request, context: Context) {
  try {
    const { id, ...updates } = await req.json()
    const productsStr = await context.env.PRODUCTS.get('products')
    const products = productsStr ? JSON.parse(productsStr) : []
    
    const index = products.findIndex((p: any) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const updatedProduct = { ...products[index], ...updates }
    products[index] = updatedProduct
    await context.env.PRODUCTS.put('products', JSON.stringify(products))

    // Trigger revalidation
    await fetch(`${req.headers.get('origin')}/api/revalidate?tag=products`, {
      method: 'POST'
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// Delete a product
export async function DELETE(req: Request, context: Context) {
  try {
    const { id } = await req.json()
    const productsStr = await context.env.PRODUCTS.get('products')
    const products = productsStr ? JSON.parse(productsStr) : []
    
    const filteredProducts = products.filter((p: any) => p.id !== id)
    await context.env.PRODUCTS.put('products', JSON.stringify(filteredProducts))

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
