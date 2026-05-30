import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import Breadcrumb from '@/components/shared/Breadcrumb'
import ProductDetailClient from '@/components/products/detail/ProductDetailClient'
import { getProductDetailBySlug } from '@/data/productDetails'
import { SITE } from '@/constants/site'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductDetailBySlug(slug)
  if (!product) return { title: `Product Not Found | ${SITE.name}` }

  return {
    title: `${product.name} | ${SITE.name}`,
    description: product.description ?? SITE.description,
    openGraph: {
      title: `${product.name} | ${SITE.name}`,
      description: product.description ?? SITE.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
    alternates: {
      canonical: `${SITE.url}/products/${slug}`,
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = getProductDetailBySlug(slug)
  if (!product) notFound()

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
    ...(product.rating != null && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount ?? 0,
      },
    }),
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
