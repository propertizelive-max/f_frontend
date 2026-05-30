import Link from 'next/link'

export function EditorialSection() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[480px] lg:min-h-[580px]">
      {/* Image — 60% on desktop */}
      <div className="relative w-full lg:w-[60%] aspect-[4/3] lg:aspect-auto overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/nordic-editorial-room/1400/900"
          alt="Nordic Hearth living space — warm oak surfaces and natural linen textiles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/10 pointer-events-none" />
      </div>

      {/* Text — 40% on desktop */}
      <div className="bg-cream w-full lg:w-[40%] flex items-center px-8 lg:px-14 xl:px-20 py-16 lg:py-24">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-6">
            The Nordic Philosophy
          </span>

          <h2 className="font-display text-3xl lg:text-[2.5rem] font-medium italic leading-[1.25] text-charcoal mb-8">
            Furniture as living poetry
          </h2>

          <p className="text-sm text-muted leading-relaxed mb-4 max-w-sm">
            Every piece we craft begins with a single question: how does this serve the life
            lived around it? We source sustainably from Nordic forests, working with artisans
            who share our reverence for material honesty.
          </p>

          <p className="text-sm text-muted leading-relaxed mb-12 max-w-sm">
            From the first sketch to the final finish, each object is shaped by centuries of
            Scandinavian craft tradition — quiet, purposeful, built to outlast trends.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-3 border border-charcoal px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-medium text-charcoal hover:bg-charcoal hover:text-cream transition-colors duration-300"
          >
            Discover Our Story
          </Link>
        </div>
      </div>
    </section>
  )
}
