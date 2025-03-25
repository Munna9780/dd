"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ExternalLink, Info, ZoomIn } from "lucide-react"

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

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    // Initial fetch of products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching products:', error)
        setLoading(false)
      })

    // Set up polling for updates every 5 seconds
    const interval = setInterval(() => {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data)
        })
        .catch(error => {
          console.error('Error fetching products:', error)
        })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-muted" />
            <CardContent className="mt-4">
              <div className="h-4 w-2/3 bg-muted rounded" />
              <div className="h-4 w-1/3 bg-muted rounded mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Get the filtered products based on the active category
  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product: Product) => (
        <Card key={product.id} className="group overflow-hidden">
          <CardContent className="p-0 relative">
            <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </a>
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                  </DialogHeader>
                  {selectedProduct && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative h-[400px]">
                        <Image
                          src={selectedProduct.image_url || "/placeholder.svg"}
                          alt={selectedProduct.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                        <p className="text-muted-foreground">By {selectedProduct.artist}</p>
                        <Badge className="w-fit mt-2">{selectedProduct.category}</Badge>
                        <p className="text-xl font-semibold mt-4">${selectedProduct.price.toFixed(2)}</p>
                        <p className="mt-4 text-muted-foreground">{selectedProduct.description}</p>
                        <Button className="mt-6" asChild>
                          <a href={selectedProduct.affiliateLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> View on Amazon
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <ZoomIn className="h-4 w-4" />
                    <span className="sr-only">Quick view</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Quick View</DialogTitle>
                  </DialogHeader>
                  {selectedProduct && (
                    <div className="relative h-[600px] w-full">
                      <Image
                        src={selectedProduct.image_url || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription>By {product.artist}</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            <Button size="sm" asChild>
              <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Amazon
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
