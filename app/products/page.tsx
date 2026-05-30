import type { Metadata } from 'next'
import { ProductsClient } from '@/components/products/ProductsClient'
import { EditorialSection } from '@/components/shared/EditorialSection'

export const metadata: Metadata = {
  title: 'Beds & Furniture | Nordic Hearth',
  description:
    'Shop our full collection of premium Scandinavian beds, sofas, dining chairs, and tables. Crafted for rest. Designed for life.',
}

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-cream text-center py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-5">
            Collections
          </span>
          <h1 className="font-display text-5xl lg:text-6xl font-medium text-charcoal mb-4 leading-tight">
            Beds &amp; Furniture
          </h1>
          <p className="font-display text-lg text-muted italic">
            Crafted for rest. Designed for life.
          </p>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────── */}
      <ProductsClient />

      {/* ── Editorial ────────────────────────────────────────────── */}
      <EditorialSection />
    </>
  )
}
