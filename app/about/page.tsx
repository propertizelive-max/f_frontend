import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'

export const metadata: Metadata = {
  title: 'About Us | Nordic Hearth',
  description:
    'Learn about Nordic Hearth, our story, mission, vision, and commitment to premium Scandinavian furniture craftsmanship.',
}

const OFFERS = [
  { title: 'Living Room', description: 'Sofas, armchairs, coffee tables, and shelving designed for relaxed gatherings.' },
  { title: 'Bedroom', description: 'Beds, headboards, wardrobes, and nightstands crafted for restful retreat.' },
  { title: 'Dining', description: 'Dining tables, chairs, and sideboards that make every meal a moment.' },
  { title: 'Office', description: 'Desks, task chairs, and storage that support focused, productive work.' },
  { title: 'Home Décor', description: 'Lighting, textiles, and accessories that bring warmth to every corner.' },
  { title: 'Outdoor', description: 'Weather-resistant pieces that extend your living space into the open air.' },
]

const WHY_US = [
  {
    title: 'Premium Materials',
    description: 'Solid oak, FSC-certified ash, and full-grain leather sourced from responsible suppliers.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Expert Craftsmanship',
    description: 'Every joint, finish, and seam is executed by skilled artisans with decades of experience.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    description: 'PCI-DSS compliant checkout with SSL encryption across all transactions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Fast Delivery',
    description: 'White-glove delivery within 5–10 business days, with real-time tracking included.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Dedicated Support',
    description: 'Our expert team is available Monday to Saturday to assist you at every step.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Quality Assurance',
    description: 'Every piece undergoes a rigorous 12-point inspection before it leaves our workshop.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
]

const PROCESS = [
  { step: '01', title: 'Design', description: 'Each piece begins with hand-sketched concepts and digital prototypes.' },
  { step: '02', title: 'Material Selection', description: 'We source sustainably certified hardwoods, metals, and textiles.' },
  { step: '03', title: 'Craftsmanship', description: 'Skilled artisans shape, join, and finish each component by hand.' },
  { step: '04', title: 'Quality Inspection', description: 'A 12-point structural and aesthetic review before packaging.' },
  { step: '05', title: 'Delivery', description: 'White-glove delivery direct to your room of choice.' },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] bg-cream flex items-stretch overflow-hidden">
        <div className="relative z-10 flex items-center w-full lg:w-[50%] px-8 lg:pl-20 xl:pl-28 py-24">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-6">
              EST. 2018 · Scandinavian Craftsmanship
            </span>
            <h1 className="font-display text-5xl xl:text-[3.25rem] font-medium leading-[1.18] text-charcoal mb-4">
              Timeless Furniture
            </h1>
            <h1 className="font-display text-5xl xl:text-[3.25rem] font-medium leading-[1.18] text-charcoal italic mb-8">
              Crafted for Modern Living
            </h1>
            <p className="text-base text-muted leading-relaxed max-w-md mb-10">
              At Nordic Hearth, we believe your home deserves furniture that endures — in quality, in style, and in the memories it holds.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 border border-charcoal px-10 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium text-charcoal hover:bg-charcoal hover:text-cream transition-colors duration-300"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>

        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[55%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
            alt="A Nordic Hearth living room with a premium sofa and warm timber accents"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────── */}
      <Container as="section" className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-accent mb-4">Our Story</span>
            <h2 className="font-display text-4xl font-medium text-charcoal mb-6 leading-snug">
              Born from a Love of<br />
              <span className="italic">Quiet Nordic Spaces</span>
            </h2>
            <p className="text-sm text-muted leading-loose mb-5">
              Nordic Hearth was founded in 2018 by a pair of furniture designers who grew up surrounded by the clean lines and natural warmth of Scandinavian interiors. Frustrated by a market flooded with disposable flat-pack products, they set out to create something different: furniture with soul.
            </p>
            <p className="text-sm text-muted leading-loose mb-5">
              The name "Nordic Hearth" speaks to our core belief — that a home's heart is the gathering places within it. The dining table where stories are shared. The armchair where you finally exhale. The bed where you rest and dream.
            </p>
            <p className="text-sm text-muted leading-loose">
              Every piece we design begins with a question: will this still be beautiful in thirty years? If the answer is yes, we build it.
            </p>
          </div>
          <div className="order-1 lg:order-2 aspect-[4/3] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80"
              alt="Nordic Hearth workshop — artisan handcrafting a wooden chair frame"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Container>

      {/* ── Mission ──────────────────────────────────────────────── */}
      <section className="bg-surface py-24">
        <Container>
          <SectionHeading
            title="Our Mission"
            subtitle="What Drives Us"
            align="center"
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { heading: 'Premium Quality', body: 'Source only the finest sustainable materials and deliver pieces built to outlast trends and decades.' },
              { heading: 'Enhance Spaces', body: 'Create furniture that elevates everyday living — transforming houses into homes people truly love.' },
              { heading: 'Customer First', body: 'Place the customer at the centre of every decision, from design to delivery to after-sales care.' },
              { heading: 'Sustainable Sourcing', body: 'Partner exclusively with FSC-certified forests and ethical suppliers who share our environmental values.' },
            ].map(({ heading, body }) => (
              <div key={heading} className="bg-white p-8">
                <div className="w-8 h-px bg-accent mb-6" />
                <h3 className="font-display text-lg font-medium text-charcoal mb-3">{heading}</h3>
                <p className="text-sm text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Vision ───────────────────────────────────────────────── */}
      <Container as="section" className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-accent mb-4">Our Vision</span>
            <h2 className="font-display text-4xl font-medium text-charcoal mb-6 leading-snug">
              A World Where Design<br />
              <span className="italic">Meets Longevity</span>
            </h2>
            <p className="text-sm text-muted leading-loose mb-8">
              We envision Nordic Hearth as the trusted destination for those who refuse to compromise — people who understand that true value isn't found in the lowest price, but in the piece that still looks beautiful the day they hand it to their children.
            </p>
            <ul className="space-y-4">
              {[
                'Be the benchmark for quality in modern furniture',
                'Blend timeless Scandinavian design with contemporary living',
                'Build homes that hold meaning across generations',
                'Lead the industry in responsible, sustainable practices',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface p-10 lg:p-14">
            <p className="font-display text-2xl font-medium text-charcoal leading-relaxed italic">
              "We don't build furniture for seasons. We build it for lifetimes."
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-accent">
              — Nordic Hearth Founders
            </p>
          </div>
        </div>
      </Container>

      {/* ── What We Offer ────────────────────────────────────────── */}
      <section className="bg-cream py-24">
        <Container>
          <SectionHeading
            title="What We Offer"
            subtitle="Collections"
            align="center"
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERS.map(({ title, description }) => (
              <Link
                key={title}
                href="/products"
                className="group block bg-white p-8 hover:shadow-sm transition-shadow"
              >
                <h3 className="font-display text-xl font-medium text-charcoal mb-3 group-hover:text-accent transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
                <span className="mt-6 inline-block text-[10px] uppercase tracking-[0.2em] text-accent">
                  Browse →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────── */}
      <Container as="section" className="py-24">
        <SectionHeading
          title="Why Choose Us"
          subtitle="Our Commitment"
          align="center"
          className="mb-16"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US.map(({ title, description, icon }) => (
            <div key={title} className="flex gap-5">
              <div className="mt-0.5 text-accent flex-shrink-0">{icon}</div>
              <div>
                <h3 className="font-medium text-charcoal mb-2 text-sm uppercase tracking-[0.08em]">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* ── Our Process ──────────────────────────────────────────── */}
      <section className="bg-surface py-24">
        <Container>
          <SectionHeading
            title="Our Process"
            subtitle="From Concept to Your Home"
            align="center"
            className="mb-16"
          />
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-border" aria-hidden="true" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
              {PROCESS.map(({ step, title, description }) => (
                <div key={step} className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-white border border-border flex items-center justify-center mx-auto mb-5 relative z-10">
                    <span className="font-display text-lg font-medium text-accent">{step}</span>
                  </div>
                  <h3 className="font-medium text-charcoal mb-2 text-sm uppercase tracking-[0.08em]">{title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact Info ─────────────────────────────────────────── */}
      <section className="bg-charcoal py-20">
        <Container>
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-3 text-center">Get In Touch</p>
          <h2 className="font-display text-3xl font-medium text-cream text-center mb-14">
            We'd Love to Hear from You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                label: 'Email Us',
                value: 'hello@nordichearth.com',
                sub: 'We reply within 1–2 business days',
              },
              {
                label: 'Call Us',
                value: '+44 20 7946 0800',
                sub: 'Mon–Sat, 9 am – 6 pm GMT',
              },
              {
                label: 'Visit Us',
                value: '14 Fjord Lane, London, EC1A 1BB',
                sub: 'Showroom open by appointment',
              },
            ].map(({ label, value, sub }) => (
              <div key={label} className="text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 mb-3">{label}</p>
                <p className="text-cream text-sm font-medium mb-1">{value}</p>
                <p className="text-cream/40 text-xs">{sub}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-cream/30 px-10 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium text-cream hover:bg-cream hover:text-charcoal transition-colors duration-300"
            >
              Send a Message
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
