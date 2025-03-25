import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading products...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Product List</h1>
      
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map((product: any) => (
            <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{product.name}</h2>
              <p style={{ color: '#0070f3', fontWeight: 'bold', marginBottom: '10px' }}>${product.price}</p>
              <p style={{ fontSize: '14px', color: '#666' }}>{product.description}</p>
              {product.affiliateLink && (
                <a 
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '15px',
                    padding: '8px 16px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Buy Now
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
