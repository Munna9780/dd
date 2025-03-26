"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Database } from '@/lib/supabase'

type Product = Database['public']['Tables']['products']['Row']

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    stock: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('products').insert([
        {
          name: newProduct.name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          image_url: newProduct.image_url,
          category: newProduct.category,
          stock: parseInt(newProduct.stock),
        },
      ])

      if (error) throw error

      toast.success('Product added successfully!')
      setNewProduct({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: '',
        stock: '',
      })
      fetchProducts()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      toast.success('Product deleted successfully!')
      fetchProducts()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <Input
                placeholder="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
              <Input
                placeholder="Image URL"
                value={newProduct.image_url}
                onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                required
              />
              <Input
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              />
              <Input
                placeholder="Stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                required
              />
              <Input
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                  <Button
                    variant="destructive"
                    className="mt-2"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

