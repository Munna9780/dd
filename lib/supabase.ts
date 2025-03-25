// Types for our products
export type Product = {
  id: string
  created_at: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  artist?: string
  affiliateLink?: string
}
