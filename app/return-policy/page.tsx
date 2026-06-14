import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Nordic Hearth',
  description:
    'Learn about Nordic Hearth\'s return window, eligibility criteria, refund process, and how to initiate a return.',
}

const LAST_UPDATED = '1 June 2026'

function PolicySection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="font-display text-2xl font-medium text-charcoal mb-4">{title}</h2>
      <div className="space-y-4 text-sm text-muted leading-loose">{children}</div>
    </section>
  )
}

export default function ReturnPolicyPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-24 text-center">
        <Container>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-5">
            Legal
          </span>
          <h1 className="font-display text-5xl font-medium text-charcoal mb-4">Return &amp; Refund Policy</h1>
          <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
        </Container>
      </section>

      {/* ── Summary Cards ────────────────────────────────────────── */}
      <section className="bg-surface py-14">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { heading: '30-Day Window', body: 'Returns accepted within 30 days of delivery for eligible items.' },
              { heading: 'Original Condition', body: 'Items must be unused, unassembled, and in original packaging.' },
              { heading: 'Refund in 5–10 Days', body: 'Approved refunds are credited to your original payment method.' },
            ].map(({ heading, body }) => (
              <div key={heading} className="bg-white p-8 text-center">
                <div className="w-8 h-px bg-accent mb-5 mx-auto" />
                <h3 className="font-display text-lg font-medium text-charcoal mb-2">{heading}</h3>
                <p className="text-xs text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-5">Contents</p>
            <nav>
              <ul className="space-y-2.5">
                {[
                  ['eligibility', 'Eligibility'],
                  ['return-window', 'Return Window'],
                  ['non-returnable', 'Non-Returnable Items'],
                  ['damaged', 'Damaged or Faulty Products'],
                  ['refund-process', 'Refund Process'],
                  ['refund-timeline', 'Refund Timeline'],
                  ['contact', 'Contact Us'],
                ].map(([id, label]) => (
                  <li key={id}>
                    <Link href={`#${id}`} className="text-xs text-muted hover:text-accent transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Body */}
          <div className="lg:col-span-3">

            <PolicySection id="eligibility" title="1. Eligibility">
              <p>
                To be eligible for a return, the following conditions must be met:
              </p>
              <ul className="list-none space-y-2">
                {[
                  'The item was purchased directly from nordichearth.com.',
                  'The return request is made within 30 days of the delivery date.',
                  'The item is in its original, unused, and unassembled condition.',
                  'The item is returned in its original packaging with all tags, accessories, and documentation intact.',
                  'Proof of purchase (order confirmation email or order number) is provided.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Items that have been assembled, used, damaged through misuse, or altered in any way are not eligible for return.
              </p>
            </PolicySection>

            <PolicySection id="return-window" title="2. Return Window">
              <p>
                You have <strong className="text-charcoal">30 days from the date of delivery</strong> to initiate a return request. Once your return is approved by our team, you will be provided with a returns authorisation number and collection instructions.
              </p>
              <p>
                Returns requested after the 30-day window will not be accepted unless the item is faulty or damaged upon delivery. We are unable to make exceptions outside of these circumstances.
              </p>
              <p>
                Return shipping costs are the responsibility of the customer unless the item is being returned due to a fault or error on our part.
              </p>
            </PolicySection>

            <PolicySection id="non-returnable" title="3. Non-Returnable Items">
              <p>The following items are not eligible for return or exchange:</p>
              <ul className="list-none space-y-2">
                {[
                  'Custom-made or bespoke furniture ordered to specific dimensions, finishes, or configurations.',
                  'Personalised items with engravings, monograms, or custom upholstery.',
                  'Clearance, end-of-line, or sale items marked as "Final Sale" at the time of purchase.',
                  'Mattresses, bedding, and soft furnishings that have been removed from their original sealed packaging for hygiene reasons.',
                  'Digital downloads, gift cards, or vouchers.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection id="damaged" title="4. Damaged or Faulty Products">
              <p>
                If your item arrives damaged, defective, or materially different from what was described, please contact us within <strong className="text-charcoal">48 hours of delivery</strong> at <strong className="text-charcoal">returns@nordichearth.com</strong> with:
              </p>
              <ul className="list-none space-y-2">
                {[
                  'Your order number.',
                  'A clear description of the issue.',
                  'Photographs of the damage or defect, including packaging if applicable.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                For confirmed damage or faults, we will arrange a complimentary collection and offer you the choice of a full replacement, repair, or full refund — at no cost to you.
              </p>
            </PolicySection>

            <PolicySection id="refund-process" title="5. Refund Process">
              <p>To initiate a return:</p>
              <ol className="list-none space-y-3 counter-reset">
                {[
                  { num: '1', text: 'Email returns@nordichearth.com with your order number and reason for return.' },
                  { num: '2', text: 'Our team will review your request and respond within 2 business days with a Returns Authorisation (RA) number.' },
                  { num: '3', text: 'Securely repackage the item in its original packaging, clearly labelling the parcel with your RA number.' },
                  { num: '4', text: 'Arrange collection or drop-off as instructed. Retain your shipping receipt as proof of return.' },
                  { num: '5', text: 'Once we receive and inspect the item, we will notify you and process your refund.' },
                ].map(({ num, text }) => (
                  <li key={num} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">{num}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </PolicySection>

            <PolicySection id="refund-timeline" title="6. Refund Timeline">
              <p>
                Once we receive and inspect your return, we will notify you by email. If the return is approved, your refund will be processed promptly:
              </p>
              <ul className="list-none space-y-2">
                {[
                  ['Credit / Debit Card', 'Refunds appear within 5–10 business days, depending on your bank.'],
                  ['PayPal', 'Refunds are processed within 3–5 business days.'],
                  ['Gift Card or Voucher', 'Credit is restored to the original gift card or a new voucher is issued.'],
                ].map(([method, timeline]) => (
                  <li key={method as string} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-charcoal">{method}:</strong> {timeline}</span>
                  </li>
                ))}
              </ul>
              <p>
                Please note that original shipping charges are non-refundable unless the return is due to a fault or error on our part.
              </p>
            </PolicySection>

            <PolicySection id="contact" title="7. Contact Us">
              <p>
                For return enquiries, refund status updates, or any related questions, please reach out to our customer support team:
              </p>
              <address className="not-italic">
                <p><strong className="text-charcoal">Nordic Hearth — Customer Returns</strong></p>
                <p>Email: <strong className="text-charcoal">returns@nordichearth.com</strong></p>
                <p>Phone: +44 20 7946 0800 (Mon–Sat, 9 am – 6 pm GMT)</p>
              </address>
              <p>
                Alternatively, use our <Link href="/contact" className="text-accent hover:underline">contact form</Link> and select "Returns & Refunds" as your subject.
              </p>
            </PolicySection>

          </div>
        </div>
      </Container>
    </>
  )
}
