'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import type { ProductDetail } from '@/types/product'
import ProductImageGallery from './ProductImageGallery'
import ProductColorSelector from './ProductColorSelector'
import ProductVariantSelector from './ProductVariantSelector'
import ProductQuantitySelector from './ProductQuantitySelector'
import ProductTabs from './ProductTabs'

type TabKey = 'specs' | 'overview' | 'care' | 'warranty'

type ProductDetailClientProps = {
  product: ProductDetail
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.id ?? '')
  const [selectedVariant, setSelectedVariant] = useState<string>(product.variants[0]?.id ?? '')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<TabKey>('specs')

  const currentVariant = product.variants.find((v) => v.id === selectedVariant)
  const currentPrice = currentVariant?.priceOverride ?? product.price
  const currentStock = currentVariant?.stock ?? product.stock ?? 0
  const outOfStock = currentStock === 0

  const discountPct =
    product.originalPrice && product.originalPrice > currentPrice
      ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
      : null

  function handleColorChange(id: string) {
    setSelectedColor(id)
    const color = product.colors.find((c) => c.id === id)
    if (color?.imageIndex != null) setSelectedImage(color.imageIndex)
  }

  function handleAddToCart() {
    const colorObj = product.colors.find((c) => c.id === selectedColor)
    const variantObj = product.variants.find((v) => v.id === selectedVariant)
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: currentPrice,
      originalPrice: product.originalPrice,
      quantity,
      image: product.images[0] ?? '',
      color: colorObj?.name,
      variant: variantObj?.label,
    })
    router.push('/checkout/cart')
  }

  return (
    <>
      {/* Main product grid */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 lg:gap-16">
        {/* Gallery */}
        <ProductImageGallery
          images={product.images}
          selectedIndex={selectedImage}
          onSelect={setSelectedImage}
          productName={product.name}
        />

        {/* Product info */}
        <div className="flex flex-col gap-6 pb-24 md:pb-0">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2">
            {product.isNew && <Badge variant="new" label="New Arrival" />}
            {discountPct && <Badge variant="sale" label={`${discountPct}% Off`} />}
            {outOfStock && <Badge variant="soldout" label="Out of Stock" />}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl lg:text-4xl font-medium text-charcoal leading-tight">
              {product.name}
            </h1>
            {/* Rating */}
            {product.rating != null && (
              <div className="flex items-center gap-2">
                <span className="text-accent text-sm tracking-wider">
                  {'★'.repeat(Math.round(product.rating))}
                  {'☆'.repeat(5 - Math.round(product.rating))}
                </span>
                {product.reviewCount != null && (
                  <span className="text-[11px] text-muted">
                    ({product.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-charcoal">
              {formatPrice(currentPrice, product.currency)}
            </span>
            {product.originalPrice && product.originalPrice > currentPrice && (
              <span className="text-base text-muted line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>

          {/* Stock indicator */}
          {!outOfStock && currentStock <= 5 && (
            <p className="text-[11px] text-accent uppercase tracking-[0.12em]">
              Only {currentStock} left in stock
            </p>
          )}
          {!outOfStock && currentStock > 5 && (
            <p className="text-[11px] text-muted uppercase tracking-[0.12em]">In stock</p>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-sm text-muted leading-relaxed border-t border-border pt-4">
              {product.description}
            </p>
          )}

          {/* Colour */}
          {product.colors.length > 0 && (
            <ProductColorSelector
              colors={product.colors}
              selected={selectedColor}
              onChange={handleColorChange}
            />
          )}

          {/* Variants */}
          {product.variants.length > 0 && (
            <ProductVariantSelector
              variants={product.variants}
              selected={selectedVariant}
              onChange={(id) => {
                setSelectedVariant(id)
                setQuantity(1)
              }}
            />
          )}

          {/* Quantity */}
          {!outOfStock && (
            <ProductQuantitySelector
              value={quantity}
              max={currentStock}
              onChange={setQuantity}
            />
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="accent"
              size="lg"
              fullWidth
              disabled={outOfStock}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              disabled={outOfStock}
            >
              <Zap className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="mt-16 border-t border-border pt-12">
        <ProductTabs
          product={product}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-cream border-t border-border px-6 py-3 z-40">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <ProductQuantitySelector
            value={quantity}
            max={currentStock}
            onChange={setQuantity}
          />
          <Button
            variant="accent"
            size="md"
            fullWidth
            disabled={outOfStock}
            onClick={handleAddToCart}
            className="flex-1"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  )
}
