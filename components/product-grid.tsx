import React, { useState } from 'react'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  artist?: string
  affiliateLink?: string
  created_at: string
  isNew?: boolean
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")

  if (!products || products.length === 0) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>No products available.</div>
  }

  // Get the filtered products based on the active category
  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Products</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
            }}
          >
            {product.image_url && (
              <div style={{ height: '200px', backgroundColor: '#f7f7f7', position: 'relative' }}>
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </div>
            )}
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{product.name}</h3>
              {product.isNew && <span style={{ backgroundColor: '#0070f3', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>New</span>}
              <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>{product.category}</span>
              <p style={{ color: '#0070f3', fontWeight: 'bold', marginBottom: '8px' }}>${product.price.toFixed(2)}</p>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>{product.description.substring(0, 100)}...</p>
              {product.affiliateLink && (
                <div>
                  <a 
                    href={product.affiliateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      backgroundColor: '#0070f3',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    Buy Now
                  </a>
                  <button 
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      backgroundColor: '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedProduct(product)}
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{selectedProduct.name}</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>{selectedProduct.description}</p>
            <button 
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
