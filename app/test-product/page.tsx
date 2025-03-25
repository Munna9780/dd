"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TestProduct() {
  const [status, setStatus] = useState("")

  const addTestProduct = async () => {
    try {
      const testProduct = {
        name: "Test Product",
        description: "This is a test product to verify the Supabase setup",
        price: 99.99,
        image_url: "https://picsum.photos/400",
        category: "Test",
        artist: "Test Artist",
        affiliateLink: "https://example.com"
      }

      const { data, error } = await supabase
        .from("products")
        .insert([testProduct])
        .select()

      if (error) {
        throw error
      }

      setStatus(`Success! Product added with ID: ${data[0].id}`)
    } catch (error) {
      setStatus(`Error: ${error.message}`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Product Insertion</h1>
      <button
        onClick={addTestProduct}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Test Product
      </button>
      {status && (
        <p className="mt-4">
          {status}
        </p>
      )}
    </div>
  )
}
