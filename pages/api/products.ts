import { NextApiRequest, NextApiResponse } from 'next'

// Store products in memory (for simplicity)
let products: any[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all products
    res.status(200).json(products)
  } 
  else if (req.method === 'POST') {
    // Add new product
    const product = req.body
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substring(7),
      created_at: new Date().toISOString()
    }
    products.unshift(newProduct)
    
    // Send SSE to all clients
    res.revalidate('/')
    res.status(200).json(newProduct)
  } 
  else if (req.method === 'PUT') {
    // Update product
    const { id, ...updates } = req.body
    const index = products.findIndex(p => p.id === id)
    
    if (index === -1) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    
    products[index] = { ...products[index], ...updates }
    res.revalidate('/')
    res.status(200).json(products[index])
  } 
  else if (req.method === 'DELETE') {
    // Delete product
    const { id } = req.body
    products = products.filter(p => p.id !== id)
    res.revalidate('/')
    res.status(200).json({ success: true })
  }
}
