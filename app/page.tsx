import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { HomeCategoriesSection } from '@/components/home/HomeCategoriesSection'
import { HomeNewArrivalsSection } from '@/components/home/HomeNewArrivalsSection'

export default function HomePage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] bg-cream flex items-stretch overflow-hidden">
        <div className="relative z-10 flex items-center w-full lg:w-[45%] px-8 lg:pl-20 xl:pl-28 py-24">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-6">
              New Arrival
            </span>
            <h1 className="font-display text-5xl xl:text-[3.5rem] font-medium leading-[1.18] text-charcoal">
              Refined Comfort for
            </h1>
            <h1 className="font-display text-5xl xl:text-[3.5rem] font-medium leading-[1.18] text-charcoal italic mb-10">
              Modern Spaces
            </h1>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 border border-charcoal px-10 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium text-charcoal hover:bg-charcoal hover:text-cream transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[60%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/amber-velvet-sofa/1000/900"
            alt="Amber velvet sofa in a Scandinavian living room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────── */}
      <Container as="section" className="py-20">
        <SectionHeading title="Category" align="center" />
        <HomeCategoriesSection />
      </Container>

      {/* ── New Arrivals ────────────────────────────────────────── */}
      <Container as="section" className="pb-24">
        <SectionHeading
          title="New Arrivals"
          action={
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
            >
              View All Products
              <ArrowRight size={14} />
            </Link>
          }
        />
        <HomeNewArrivalsSection />
      </Container>
    </>
  )
}
