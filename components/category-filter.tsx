"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

// Sample categories - in a real app, this would come from an API or database
const categories = [
  { id: "all", name: "All" },
  { id: "abstract", name: "Abstract" },
  { id: "landscape", name: "Landscape" },
  { id: "portrait", name: "Portrait" },
  { id: "urban", name: "Urban" },
  { id: "nature", name: "Nature" },
]

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState("All")

  // This function would typically update a state in a parent component
  // or trigger a data fetch with the selected category
  const handleCategoryChange = (category) => {
    setActiveCategory(category)

    // In a real app, you would dispatch an event or call a function
    // to filter products based on the selected category
    window.dispatchEvent(
      new CustomEvent("filterCategory", {
        detail: { category },
      }),
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.name ? "default" : "outline"}
          onClick={() => handleCategoryChange(category.name)}
          className="rounded-full"
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}

