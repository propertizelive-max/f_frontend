'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'

const FAQ_ITEMS = [
  {
    q: 'What materials do you use in your furniture?',
    a: 'All Nordic Hearth pieces are crafted from sustainably sourced hardwoods — primarily solid oak and FSC-certified ash — paired with full-grain leathers and premium performance fabrics. Every material is chosen for beauty, durability, and environmental responsibility.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard in-stock items ship within 2–3 business days and arrive in 5–10 business days via our white-glove delivery service. Made-to-order pieces carry individual lead times noted on each product page, typically 4–8 weeks.',
  },
  {
    q: 'Can I return or exchange an item?',
    a: 'Yes. We offer a 30-day return window for standard stock items in original, unused condition. Custom or made-to-order pieces are non-returnable unless faulty. See our Return Policy for full details.',
  },
  {
    q: 'Do you offer a quality guarantee?',
    a: 'Every piece passes a rigorous 12-point inspection before leaving our workshop. We stand behind our craftsmanship with a 2-year structural warranty on all furniture against manufacturing defects.',
  },
  {
    q: 'How do I care for my Nordic Hearth furniture?',
    a: 'Solid wood pieces benefit from occasional treatment with a natural wood oil to preserve their finish. Fabric upholstery should be vacuumed lightly and spot-cleaned with a damp cloth. Detailed care guides are included with every delivery.',
  },
  {
    q: 'Do you offer a showroom or in-person consultation?',
    a: 'Our London showroom at 14 Fjord Lane, EC1A 1BB is open by appointment Monday to Saturday. You can also book a virtual consultation with one of our interior advisors via our contact page.',
  },
]

export function HomeFAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  function toggle(index: number) {
    setOpen((prev) => (prev === index ? null : index))
  }

  return (
    <div>
      <div className="divide-y divide-border">
        {FAQ_ITEMS.map(({ q, a }, i) => (
          <div key={q}>
            <button
              onClick={() => toggle(i)}
              aria-expanded={open === i}
              className="w-full flex items-center justify-between gap-6 py-5 text-left group cursor-pointer"
            >
              <span className="font-medium text-charcoal text-sm group-hover:text-accent transition-colors">
                {q}
              </span>
              <span className="flex-shrink-0 text-accent">
                {open === i ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            {open === i && (
              <p className="pb-6 text-sm text-muted leading-loose pr-10">
                {a}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <p className="text-sm text-muted">
          Still have questions?{' '}
          <Link href="/contact" className="text-accent hover:underline underline-offset-2">
            Contact our team
          </Link>{' '}
          — we typically respond within one business day.
        </p>
      </div>
    </div>
  )
}
