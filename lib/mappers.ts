import type { ApiProduct, ApiCategory } from '@/types/api'
import type { ProductCardData, ProductDetail } from '@/types/product'
import { formatPrice } from '@/lib/utils'

export function apiProductToCard(p: ApiProduct): ProductCardData {
  const sortedImages = [...p.images].sort((a, b) => a.sortOrder - b.sortOrder)
  const imageUrl = sortedImages[0]?.imageUrl ?? ''
  const displayPrice = p.discountPrice ?? p.price

  return {
    id: p.id,
    slug: p.id,
    name: p.title,
    price: formatPrice(displayPrice),
    image: imageUrl,
    subtitle: p.category?.name,
    isNew: p.isFeatured,
  }
}

export function apiProductToDetail(p: ApiProduct): ProductDetail {
  const sortedImages = [...p.images].sort((a, b) => a.sortOrder - b.sortOrder)
  const galleryImages = sortedImages.filter((img) => img.imageType === 'GALLERY')
  const diagramImages = sortedImages.filter((img) => img.imageType === 'DIAGRAM')
  // Fall back to all images for gallery if none are tagged GALLERY
  const imageUrls = (galleryImages.length > 0 ? galleryImages : sortedImages).map((img) => img.imageUrl)
  const diagramImageUrl = diagramImages[0]?.imageUrl
  const displayPrice = p.discountPrice ?? p.price
  const originalPrice = p.discountPrice ? p.price : undefined

  const colors = p.color
    ? [{ id: p.color.toLowerCase().replace(/\s+/g, '-'), name: p.color, hex: '#C17A3A' }]
    : []

  const careLines = p.careInstructions
    ? p.careInstructions.split(/\n|\./).map((s) => s.trim()).filter(Boolean)
    : []

  return {
    id: p.id,
    slug: p.id,
    name: p.title,
    price: displayPrice,
    originalPrice,
    currency: 'USD',
    images: imageUrls.length > 0 ? imageUrls : ['https://picsum.photos/seed/placeholder/800/1000'],
    diagramImage: diagramImageUrl,
    category: p.category?.slug ?? '',
    categoryId: p.categoryId,
    description: p.description ?? undefined,
    isNew: p.isFeatured,
    isFeatured: p.isFeatured,
    stock: p.stock,
    colors,
    variants: [],
    specifications: {
      material: p.material ?? '—',
      finish: p.finish ?? '—',
      weight: p.weight != null ? `${p.weight} kg` : '—',
      width: p.dimensions ?? '—',
      height: '—',
      length: '—',
    },
    overview: p.description ?? p.title,
    careInstructions: careLines,
    warranty: {
      period: p.warranty ?? 'Contact us for warranty details',
      coverage: 'Standard manufacturer warranty applies',
      exclusions: [],
    },
    breadcrumb: [
      { label: 'Home', href: '/' },
      ...(p.category
        ? [{ label: p.category.name, href: `/products?categoryId=${p.categoryId}` }]
        : [{ label: 'Products', href: '/products' }]),
      { label: p.title, href: `/products/${p.id}` },
    ],
  }
}

export function apiCategoryToNav(c: ApiCategory) {
  return {
    id: c.id,
    slug: c.slug,
    label: c.name,
    image: c.imageUrl ?? `https://picsum.photos/seed/cat-${c.slug}/500/500`,
    description: c.description,
  }
}
