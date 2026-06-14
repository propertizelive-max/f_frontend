import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { HomeCategoriesSection } from '@/components/home/HomeCategoriesSection'
import { HomeNewArrivalsSection } from '@/components/home/HomeNewArrivalsSection'
import { HomeFAQSection } from '@/components/home/HomeFAQSection'

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
            src="https://5.imimg.com/data5/SELLER/Default/2025/1/480773465/OG/GH/OY/225975614/two-seater-sofa-500x500.webp"
            alt="Amber velvet sofa in a Scandinavian living room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────── */}
      <Container as="section" className="py-20">
        <SectionHeading title="Category" align="center"
          action={
            <Link
              href="/categories"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
            >
              View All Categories
              <ArrowRight size={14} />
            </Link>
          }

        />
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

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="bg-surface py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
                Common Questions
              </span>
              <h2 className="font-display text-4xl font-medium text-charcoal leading-snug mb-5">
                Everything You<br />
                <span className="italic">Need to Know</span>
              </h2>
              <p className="text-sm text-muted leading-loose max-w-sm">
                From materials and delivery to returns and care — answers to the questions our customers ask most.
              </p>
            </div>
            <HomeFAQSection />
          </div>
        </Container>
      </section>
    </>
  )
}
