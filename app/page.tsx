import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"
import CategoryFilter from "@/components/category-filter"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Beautiful wall art display"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            Transform Your Space with <span className="text-primary">Divine</span>Dazzle
          </h1>
          <p className="text-xl text-white/90 max-w-[800px] mb-8">
            Discover unique wall art pieces that elevate your home or office with elegance and personality
          </p>
          <Button asChild size="lg">
            <a href="#products">
              Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section id="products" className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Wall Art</h2>
              <p className="text-muted-foreground max-w-[600px]">Handpicked pieces to transform your space</p>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
              <Link href="/admin">Admin Login</Link>
            </Button>
          </div>

          <CategoryFilter />

          <div className="mt-8">
            <ProductGrid />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Why Choose DivineDazzle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-8 w-8"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
              <p className="text-muted-foreground">
                Each piece is carefully selected for quality, style, and visual impact
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-8 w-8"
                >
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Information</h3>
              <p className="text-muted-foreground">
                Get comprehensive details about each artwork to make informed decisions
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-8 w-8"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Recommendations</h3>
              <p className="text-muted-foreground">
                All products are personally reviewed and recommended for quality and value
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">About DivineDazzle</h2>
              <p className="text-muted-foreground mb-4">
                DivineDazzle was born from a passion for beautiful wall art and interior design. As an art enthusiast,
                I've spent years curating a collection of stunning pieces that can transform any space.
              </p>
              <p className="text-muted-foreground mb-4">
                Each piece featured on this site has been personally selected for its quality, visual impact, and value.
                I only recommend art that I would proudly display in my own home.
              </p>
              <p className="text-muted-foreground">
                My goal is to help you discover beautiful artwork that speaks to you and enhances your living or working
                environment. Browse the collection, and find the perfect piece to express your unique style.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="About DivineDazzle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  )
}

