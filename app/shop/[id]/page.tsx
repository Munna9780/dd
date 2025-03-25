import Image from "next/image"
import { Heart, Share2, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import RelatedProducts from "@/components/related-products"

// This would come from a database in a real application
const product = {
  id: 1,
  title: "Abstract Harmony",
  artist: "Elena Rivera",
  price: 129.99,
  description:
    "Abstract Harmony is a vibrant exploration of color and form. This piece features bold brushstrokes and a dynamic composition that creates a sense of movement and energy. The interplay of warm and cool tones creates a harmonious balance that will add a contemporary touch to any space.",
  details:
    "Premium canvas print with museum-quality finish. Printed with archival inks for vibrant, fade-resistant colors. Available in multiple sizes and framing options.",
  images: [
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
  ],
  category: "Abstract",
  rating: 4.8,
  reviewCount: 24,
  inStock: true,
  sizes: [
    { value: "small", label: 'Small (12" × 16")', price: 129.99 },
    { value: "medium", label: 'Medium (18" × 24")', price: 179.99 },
    { value: "large", label: 'Large (24" × 36")', price: 229.99 },
    { value: "xlarge", label: 'Extra Large (36" × 48")', price: 299.99 },
  ],
  frameOptions: [
    { value: "none", label: "No Frame", price: 0 },
    { value: "slim-black", label: "Slim Black Frame", price: 49.99 },
    { value: "modern-white", label: "Modern White Frame", price: 59.99 },
    { value: "natural-wood", label: "Natural Wood Frame", price: 69.99 },
  ],
  affiliateLink: "https://amazon.com/example-product",
}

export default function ProductPage({ params }) {
  // In a real app, you would fetch the product data based on the ID
  // const { id } = params;

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg border cursor-pointer">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} - View ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{product.category}</Badge>
              {product.inStock ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Out of Stock
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-muted-foreground">By {product.artist}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold">${product.price}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <form className="space-y-6">
            {/* Size Selection */}
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <RadioGroup defaultValue="medium" id="size" className="grid grid-cols-2 gap-4">
                {product.sizes.map((size) => (
                  <div key={size.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={size.value} id={`size-${size.value}`} />
                    <Label htmlFor={`size-${size.value}`} className="flex justify-between w-full">
                      <span>{size.label}</span>
                      <span>${size.price}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Frame Selection */}
            <div className="space-y-2">
              <Label htmlFor="frame">Frame Option</Label>
              <RadioGroup defaultValue="none" id="frame" className="grid grid-cols-2 gap-4">
                {product.frameOptions.map((frame) => (
                  <div key={frame.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={frame.value} id={`frame-${frame.value}`} />
                    <Label htmlFor={`frame-${frame.value}`} className="flex justify-between w-full">
                      <span>{frame.label}</span>
                      {frame.price > 0 && <span>+${frame.price}</span>}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Custom Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="custom-size">Custom Size (inches)</Label>
                <Badge variant="outline">Optional</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-sm">
                    Width
                  </Label>
                  <Input id="width" type="number" min="8" placeholder="Width" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm">
                    Height
                  </Label>
                  <Input id="height" type="number" min="8" placeholder="Height" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Custom sizes may affect pricing. We'll contact you with a quote before processing.
              </p>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" defaultValue="1" min="1" className="w-20" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                This product is also available on{" "}
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  Amazon
                </a>
              </p>
            </div>
          </form>

          <Separator className="my-6" />

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <p className="text-muted-foreground">{product.details}</p>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <p className="text-muted-foreground">
                Free shipping on all orders over $100. Standard shipping takes 3-5 business days. Express shipping is
                available for an additional fee and takes 1-2 business days. International shipping is available to
                select countries.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Related Products */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
        <RelatedProducts />
      </div>
    </div>
  )
}

