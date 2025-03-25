"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Papa from "papaparse"
import { Button } from "@/components/ui/button"
import type { Product } from "@/components/product-grid"

interface CSVRecord {
  name: string
  description: string
  price: string
  image_url: string
  category: string
  artist?: string
  affiliateLink?: string
}

export default function ImportProducts() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setMessage("")

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const records = results.data as CSVRecord[]
          
          for (const record of records) {
            const product = {
              name: record.name,
              description: record.description,
              price: parseFloat(record.price),
              image_url: record.image_url,
              category: record.category,
              artist: record.artist,
              affiliateLink: record.affiliateLink
            }

            const response = await fetch('/api/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(product),
            })

            if (!response.ok) {
              throw new Error(`Failed to add product: ${record.name}`)
            }
          }

          setMessage(`Successfully imported ${records.length} products`)
          router.refresh()
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
          setMessage(`Error importing products: ${errorMessage}`)
          console.error('Error importing products:', error)
        } finally {
          setLoading(false)
        }
      },
      error: (error: Papa.ParseError) => {
        setMessage(`Error parsing CSV: ${error.message}`)
        setLoading(false)
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Import Products from CSV</h1>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="csvFile" className="block text-sm font-medium mb-2">
            Choose CSV File
          </label>
          <input
            type="file"
            id="csvFile"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={loading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {message && (
          <p className={`mt-4 p-4 rounded ${
            message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}>
            {message}
          </p>
        )}

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-blue-500"></div>
            <p className="mt-2 text-sm text-gray-500">Importing products...</p>
          </div>
        )}
      </div>
    </div>
  )
}
