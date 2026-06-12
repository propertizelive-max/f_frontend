import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import Breadcrumb from '@/components/shared/Breadcrumb'
import ProductDetailClient from '@/components/products/detail/ProductDetailClient'
import { apiProductToDetail } from '@/lib/mappers'
import type { ApiProduct } from '@/types/api'
import { SITE } from '@/constants/site'

type Props = {
  params: Promise<{ slug: string }>
}

async function fetchProduct(id: string): Promise<ApiProduct | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000'}/products/${id}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return null
    return res.json() as Promise<ApiProduct>
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const apiProduct = await fetchProduct(slug)
  if (!apiProduct) return { title: `Product Not Found | ${SITE.name}` }

  const imageUrl = apiProduct.images[0]?.imageUrl
  return {
    title: `${apiProduct.title} | ${SITE.name}`,
    description: apiProduct.description ?? SITE.description,
    openGraph: {
      title: `${apiProduct.title} | ${SITE.name}`,
      description: apiProduct.description ?? SITE.description,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    alternates: {
      canonical: `${SITE.url}/products/${slug}`,
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const apiProduct = await fetchProduct(slug)
  if (!apiProduct) notFound()

  const product = apiProductToDetail(apiProduct)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability:
        (product.stock ?? 0) > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container as="main" className="py-8 lg:py-12">
        <Breadcrumb items={product.breadcrumb} className="mb-8" />
        <ProductDetailClient product={product} />
      </Container>
    </>
  )
}
