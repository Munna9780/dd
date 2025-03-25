import Link from "next/link"
import Image from "next/image"

// Sample categories - in a real app, this would come from an API or database
const categories = [
  {
    id: 1,
    name: "Abstract",
    image: "/placeholder.svg?height=400&width=400",
    count: 42,
  },
  {
    id: 2,
    name: "Landscape",
    image: "/placeholder.svg?height=400&width=400",
    count: 38,
  },
  {
    id: 3,
    name: "Portrait",
    image: "/placeholder.svg?height=400&width=400",
    count: 24,
  },
  {
    id: 4,
    name: "Urban",
    image: "/placeholder.svg?height=400&width=400",
    count: 19,
  },
  {
    id: 5,
    name: "Nature",
    image: "/placeholder.svg?height=400&width=400",
    count: 31,
  },
  {
    id: 6,
    name: "Minimalist",
    image: "/placeholder.svg?height=400&width=400",
    count: 27,
  },
]

export default function ArtCategories() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop/category/${category.id}`}
          className="group relative overflow-hidden rounded-lg"
        >
          <div className="relative h-[180px] w-full">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h3 className="font-semibold text-lg text-center">{category.name}</h3>
              <p className="text-sm text-white/80">{category.count} artworks</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

