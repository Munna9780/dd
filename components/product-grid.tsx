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
    return <div className="text-center py-10">No products available.</div>
  }

  // Get the filtered products based on the active category
  const filteredProducts = products && 
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setActiveCategory("All")}
          className={`px-3 py-1 rounded-full text-sm ${activeCategory === "All" 
            ? "bg-blue-600 text-white" 
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
        >
          All
        </button>
        {products && Array.from(new Set(products.map(p => p.category))).map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-full text-sm ${activeCategory === category 
              ? "bg-blue-600 text-white" 
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {product.image_url && (
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex gap-2 mb-2">
                {product.isNew && <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">New</span>}
                <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">{product.category}</span>
              </div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              {product.artist && <p className="text-sm text-gray-500">By {product.artist}</p>}
              <p className="text-blue-600 font-bold my-2">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                {product.affiliateLink && (
                  <a 
                    href={product.affiliateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                  >
                    Buy Now
                  </a>
                )}
                <button 
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setSelectedProduct(product)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700" 
                  onClick={() => setSelectedProduct(null)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedProduct.image_url && (
                  <div className="h-60 md:h-80 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={selectedProduct.image_url} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  {selectedProduct.artist && <p className="text-gray-500">By {selectedProduct.artist}</p>}
                  <p className="text-blue-600 font-bold text-xl mt-2">${selectedProduct.price.toFixed(2)}</p>
                  <div className="my-2">
                    <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">{selectedProduct.category}</span>
                  </div>
                  <p className="text-gray-700 mt-4">{selectedProduct.description}</p>
                  {selectedProduct.affiliateLink && (
                    <a 
                      href={selectedProduct.affiliateLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 mt-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                      Buy Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
