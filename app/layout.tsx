import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { AuthModal } from '@/components/auth/AuthModal'
import { Toaster } from '@/components/ui/Toast'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Nordic Hearth | Premium Scandinavian Furniture',
  description:
    'Refined comfort for modern spaces. Shop premium Scandinavian furniture crafted to last a lifetime.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <AuthModal />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
