import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://divinedazzle.com'),
  title: {
    default: "DivineDazzle | Premium Wall Art Recommendations",
    template: "%s | DivineDazzle"
  },
  description: "Discover beautiful wall art pieces to transform your space. Curated recommendations with affiliate links to trusted sellers.",
  keywords: ["wall art", "home decor", "art prints", "canvas art", "affiliate", "recommendations"],
  generator: 'v0.dev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://divinedazzle.com',
    title: 'DivineDazzle | Premium Wall Art Recommendations',
    description: 'Discover beautiful wall art pieces to transform your space.',
    siteName: 'DivineDazzle'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}