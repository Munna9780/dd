import Link from "next/link"
import Image from "next/image"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Sample related products - in a real app, this would come from an API or database
const relatedProducts = [
  {
    id: 2,
    title: "Coastal Serenity",
    artist: "Michael Chen",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    title: "Urban Reflections",
    artist: "Sophia Williams",
    price: 179.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    title: "Botanical Dreams",
    artist: "James Peterson",
    price: 119.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    title: "Midnight Horizon",
    artist: "Olivia Taylor",
    price: 159.99,
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function RelatedProducts() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <Link key={product.id} href={`/shop/${product.id}`} className="group">
          <Card className="border-0 shadow-none transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start p-4">
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-sm text-muted-foreground">By {product.artist}</p>
              <p className="font-semibold mt-2">${product.price}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

