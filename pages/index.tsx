import { useEffect, useState } from 'react'
import ProductGrid from '../components/product-grid'

export default function Home() {
  const [products, setProducts] = useState([])

  // Fetch products every 2 seconds for real-time updates
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    }

    // Initial fetch
    fetchProducts()

    // Set up polling every 2 seconds
    const interval = setInterval(fetchProducts, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <ProductGrid products={products} />
    </main>
  )
}
