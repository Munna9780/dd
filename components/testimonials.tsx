"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Sample testimonials - in a real app, this would come from an API or database
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "The artwork I purchased from DivineDazzle completely transformed my living room. The quality is exceptional and the colors are even more vibrant in person. I've received so many compliments!",
  },
  {
    id: 2,
    name: "David Chen",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "I was hesitant about ordering art online, but DivineDazzle exceeded my expectations. The custom sizing option was perfect for my awkward wall space, and the piece arrived well-packaged and on time.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Chicago, IL",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "Beautiful artwork and great customer service. When I had questions about framing options, the team was quick to respond and very helpful. Will definitely shop here again!",
  },
  {
    id: 4,
    name: "Michael Thompson",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "As an interior designer, I've recommended DivineDazzle to many clients. The selection is diverse and the quality is consistently excellent. The custom sizing feature is a game-changer for my projects.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= testimonials.length ? 0 : prevIndex + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? Math.max(0, testimonials.length - itemsPerPage) : prevIndex - itemsPerPage,
    )
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full flex flex-col">
            <CardContent className="pt-6 flex-grow">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.text}</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
    </div>
  )
}

