"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { parse } from "csv-parse/browser/esm/sync"

export default function ImportProducts() {
  const [status, setStatus] = useState("")
  const [importing, setImporting] = useState(false)
  const [results, setResults] = useState<{ success: number; failed: number }>({ success: 0, failed: 0 })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImporting(true)
    setStatus("Reading file...")

    try {
      // Read the file
      const text = await file.text()
      
      // Parse CSV
      const records = parse(text, {
        columns: true,
        skip_empty_lines: true
      })

      setStatus(`Found ${records.length} products. Starting import...`)
      let succeeded = 0
      let failed = 0

      // Import products in batches of 10
      for (let i = 0; i < records.length; i += 10) {
        const batch = records.slice(i, i + 10).map(record => ({
          name: record.name,
          description: record.description,
          price: parseFloat(record.price),
          image_url: record.image_url,
          category: record.category,
          artist: record.artist,
          affiliateLink: record.affiliateLink
        }))

        const { error } = await supabase
          .from("products")
          .insert(batch)

        if (error) {
          console.error("Error inserting batch:", error)
          failed += batch.length
        } else {
          succeeded += batch.length
        }

        setResults({ success: succeeded, failed })
        setStatus(`Imported ${succeeded + failed} of ${records.length} products...`)
      }

      setStatus("Import complete!")
    } catch (error) {
      console.error("Import error:", error)
      setStatus(`Error: ${error.message}`)
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Import Products from CSV</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Prepare your CSV file with these columns:
            <code className="block bg-gray-100 p-2 mt-1 rounded text-sm">
              name, description, price, image_url, category, artist, affiliateLink
            </code>
          </li>
          <li>Make sure the price is a number (e.g., 49.99)</li>
          <li>Image URLs should be publicly accessible</li>
          <li>Click "Choose File" and select your CSV</li>
        </ol>
      </div>

      <div className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={importing}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {status && (
          <div className="mt-4 p-4 rounded bg-gray-50">
            <p className="font-medium">{status}</p>
            {(results.success > 0 || results.failed > 0) && (
              <div className="mt-2 text-sm">
                <p className="text-green-600">✓ {results.success} products imported successfully</p>
                {results.failed > 0 && (
                  <p className="text-red-600">✗ {results.failed} products failed to import</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <a 
            href="/sample-products.csv" 
            download 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Download Sample CSV
          </a>
        </div>
      </div>
    </div>
  )
}
