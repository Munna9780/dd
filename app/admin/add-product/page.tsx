"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const product = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      image_url: formData.get("image_url"),
      category: formData.get("category"),
      artist: formData.get("artist"),
      affiliateLink: formData.get("affiliateLink")
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        throw new Error('Failed to add product')
      }

      const result = await response.json()
      setMessage("Product added successfully!")
      e.currentTarget.reset()
      router.refresh()
    } catch (error) {
      console.error('Error adding product:', error)
      setMessage("Error adding product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">Add a new art piece with affiliate link</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Product Name
              </label>
              <Input
                id="name"
                name="name"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                required
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Price
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                required
                min="0"
                step="0.01"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium mb-2">
                Image URL
              </label>
              <Input
                id="image_url"
                name="image_url"
                type="url"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category
              </label>
              <Input
                id="category"
                name="category"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="artist" className="block text-sm font-medium mb-2">
                Artist (Optional)
              </label>
              <Input
                id="artist"
                name="artist"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="affiliateLink" className="block text-sm font-medium mb-2">
                Affiliate Link (Optional)
              </label>
              <Input
                id="affiliateLink"
                name="affiliateLink"
                type="url"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </div>

        {message && (
          <p className={`mt-4 p-4 rounded ${
            message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
