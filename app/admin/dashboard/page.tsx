"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, ExternalLink, MoreHorizontal, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Sample products - in a real app, this would come from an API or database
const initialProducts = [
  {
    id: 1,
    title: "Abstract Harmony",
    artist: "Elena Rivera",
    price: "$129.99",
    image: "/placeholder.svg?height=100&width=100",
    category: "Abstract",
    affiliateLink: "https://amazon.com/example-product-1",
    isNew: true,
  },
  {
    id: 2,
    title: "Coastal Serenity",
    artist: "Michael Chen",
    price: "$149.99",
    image: "/placeholder.svg?height=100&width=100",
    category: "Landscape",
    affiliateLink: "https://amazon.com/example-product-2",
    isNew: false,
  },
  {
    id: 3,
    title: "Urban Reflections",
    artist: "Sophia Williams",
    price: "$179.99",
    image: "/placeholder.svg?height=100&width=100",
    category: "Urban",
    affiliateLink: "https://amazon.com/example-product-3",
    isNew: false,
  },
  {
    id: 4,
    title: "Botanical Dreams",
    artist: "James Peterson",
    price: "$119.99",
    image: "/placeholder.svg?height=100&width=100",
    category: "Nature",
    affiliateLink: "https://amazon.com/example-product-4",
    isNew: true,
  },
]

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState(initialProducts)

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))

    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    })
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and affiliate links</p>
        </div>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/admin/add-product">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">View Site</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Products</CardTitle>
            <CardDescription>Current product count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Categories</CardTitle>
            <CardDescription>Product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Abstract</Badge>
              <Badge>Landscape</Badge>
              <Badge>Portrait</Badge>
              <Badge>Urban</Badge>
              <Badge>Nature</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>New Products</CardTitle>
            <CardDescription>Products marked as new</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.filter((p) => p.isNew).length}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mt-12 mb-6">Manage Products</h2>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-md overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{product.title}</div>
                        <div className="text-sm text-muted-foreground">By {product.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{product.category}</Badge>
                  </td>
                  <td className="p-4">{product.price}</td>
                  <td className="p-4">
                    {product.isNew ? (
                      <Badge className="bg-green-500">New</Badge>
                    ) : (
                      <Badge variant="outline">Standard</Badge>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/edit-product/${product.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> View Link
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

