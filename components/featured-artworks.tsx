"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, ZoomIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Sample data - in a real app, this would come from an API or database
const featuredArtworks = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Elena Rivera",
    price: 129.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "Abstract",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 2,
    title: "Coastal Serenity",
    artist: "Michael Chen",
    price: 149.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "Landscape",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 3,
    title: "Urban Reflections",
    artist: "Sophia Williams",
    price: 179.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "Urban",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 4,
    title: "Botanical Dreams",
    artist: "James Peterson",
    price: 119.99,
    image: "/placeholder.svg?height=600&width=600",
    category: "Nature",
    isNew: true,
    isBestseller: false,
  },
]

export default function FeaturedArtworks() {
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredArtworks.map((artwork) => (
        <Card key={artwork.id} className="group overflow-hidden">
          <CardContent className="p-0 relative">
            <Link href={`/shop/${artwork.id}`}>
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </Link>
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {artwork.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
              {artwork.isBestseller && <Badge variant="secondary">Bestseller</Badge>}
            </div>
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={() => setSelectedArtwork(artwork)}
                  >
                    <ZoomIn className="h-4 w-4" />
                    <span className="sr-only">Quick view</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Quick View</DialogTitle>
                  </DialogHeader>
                  {selectedArtwork && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative h-[400px]">
                        <Image
                          src={selectedArtwork.image || "/placeholder.svg"}
                          alt={selectedArtwork.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-bold">{selectedArtwork.title}</h3>
                        <p className="text-muted-foreground">By {selectedArtwork.artist}</p>
                        <Badge className="w-fit mt-2">{selectedArtwork.category}</Badge>
                        <p className="text-xl font-semibold mt-4">${selectedArtwork.price}</p>
                        <p className="mt-4">
                          This stunning piece will transform your space with its unique style and vibrant colors.
                          Perfect for modern interiors.
                        </p>
                        <div className="flex gap-3 mt-6">
                          <Button className="flex-1">
                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                          </Button>
                          <Button variant="outline">
                            <Heart className="mr-2 h-4 w-4" /> Wishlist
                          </Button>
                        </div>
                        <Button variant="link" asChild className="mt-4 justify-start px-0">
                          <Link href={`/shop/${selectedArtwork.id}`}>View Full Details</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{artwork.title}</CardTitle>
            <CardDescription>By {artwork.artist}</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <span className="font-semibold">${artwork.price}</span>
            <Button size="sm" variant="secondary">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

