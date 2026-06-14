import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Nordic Hearth',
  description:
    'Read the Nordic Hearth Terms & Conditions governing the use of our website and the purchase of our products.',
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

export default function TermsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-24 text-center">
        <Container>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-5">
            Legal
          </span>
          <h1 className="font-display text-5xl font-medium text-charcoal mb-4">Terms &amp; Conditions</h1>
          <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
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
                  ['acceptance', 'Acceptance of Terms'],
                  ['products-pricing', 'Products & Pricing'],
                  ['orders', 'Orders'],
                  ['shipping', 'Shipping'],
                  ['returns', 'Returns'],
                  ['user-responsibilities', 'User Responsibilities'],
                  ['intellectual-property', 'Intellectual Property'],
                  ['liability', 'Limitation of Liability'],
                  ['governing-law', 'Governing Law'],
                  ['contact', 'Contact Information'],
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

            <PolicySection id="acceptance" title="1. Acceptance of Terms">
              <p>
                By accessing or using the Nordic Hearth website at <strong className="text-charcoal">nordichearth.com</strong> ("the Website"), creating an account, or placing an order, you agree to be bound by these Terms & Conditions ("Terms"). Please read them carefully before using our services.
              </p>
              <p>
                If you do not agree with any part of these Terms, you must not use our Website or services. We reserve the right to update these Terms at any time; continued use of the Website following any changes constitutes your acceptance of the revised Terms.
              </p>
            </PolicySection>

            <PolicySection id="products-pricing" title="2. Products and Pricing">
              <p>
                All products listed on our Website are subject to availability. We reserve the right to discontinue any product at any time without notice.
              </p>
              <p>
                Prices are displayed in British Pounds Sterling (GBP) and are inclusive of VAT where applicable. We make every effort to ensure prices are accurate; however, in the event of a pricing error, we will notify you before processing your payment and you will have the option to proceed at the correct price or cancel your order.
              </p>
              <p>
                Nordic Hearth reserves the right to change prices at any time without prior notice. Price changes will not affect orders that have already been confirmed.
              </p>
            </PolicySection>

            <PolicySection id="orders" title="3. Orders">
              <p>
                Placing an order on our Website constitutes an offer to purchase the selected products at the stated price. A binding contract is formed only upon our written confirmation of your order via email.
              </p>
              <p>
                We reserve the right to refuse or cancel any order at our discretion, including where: (a) a product is out of stock; (b) a pricing or description error has occurred; (c) we suspect fraudulent activity; or (d) payment cannot be verified.
              </p>
              <p>
                If your order is cancelled after payment has been taken, a full refund will be issued to your original payment method within 5–10 business days.
              </p>
            </PolicySection>

            <PolicySection id="shipping" title="4. Shipping">
              <p>
                We offer white-glove delivery across the United Kingdom and selected international destinations. Delivery charges and estimated timelines are displayed at checkout and vary based on your location and order size.
              </p>
              <p>
                Standard delivery takes 5–10 business days from the date of dispatch. Made-to-order items have individual lead times stated on their product pages. While we strive to meet all delivery estimates, we are not liable for delays caused by circumstances beyond our control, including adverse weather, courier delays, or force majeure events.
              </p>
              <p>
                Risk of loss and title for purchased items pass to you upon delivery. Please inspect all items upon receipt and report any damage or discrepancy within 48 hours.
              </p>
            </PolicySection>

            <PolicySection id="returns" title="5. Returns">
              <p>
                We operate a 30-day return policy for standard stock items. Items must be returned in their original, unused condition and original packaging. Custom, made-to-order, and personalised items are excluded from our returns policy unless they arrive damaged or faulty.
              </p>
              <p>
                To initiate a return, please contact our customer support team at <strong className="text-charcoal">returns@nordichearth.com</strong> with your order number and reason for return. Full details are available in our <Link href="/return-policy" className="text-accent hover:underline">Return & Refund Policy</Link>.
              </p>
            </PolicySection>

            <PolicySection id="user-responsibilities" title="6. User Responsibilities">
              <p>By using our Website, you agree to:</p>
              <ul className="list-none space-y-2">
                {[
                  'Provide accurate and current information when creating an account or placing an order.',
                  'Keep your account credentials confidential and not share them with third parties.',
                  'Use the Website only for lawful purposes and in a manner that does not infringe the rights of others.',
                  'Not attempt to gain unauthorised access to any part of the Website or its underlying systems.',
                  'Not use automated tools, bots, or scrapers to extract data from the Website without our prior written consent.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these responsibilities without prior notice.
              </p>
            </PolicySection>

            <PolicySection id="intellectual-property" title="7. Intellectual Property">
              <p>
                All content on the Nordic Hearth website — including but not limited to text, images, graphics, logos, product photographs, and design — is owned by or licensed to Nordic Hearth and is protected by UK and international copyright, trade mark, and intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any content from our Website without our express written permission. Personal, non-commercial use for the sole purpose of browsing and placing orders is permitted.
              </p>
            </PolicySection>

            <PolicySection id="liability" title="8. Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, Nordic Hearth shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our Website or the purchase of our products.
              </p>
              <p>
                Our total liability to you for any claim arising under these Terms shall not exceed the total amount paid by you for the order to which the claim relates.
              </p>
              <p>
                Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under applicable law.
              </p>
            </PolicySection>

            <PolicySection id="governing-law" title="9. Governing Law">
              <p>
                These Terms & Conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
              <p>
                If you are a consumer based in another jurisdiction within the United Kingdom or the European Union, you may also have the right to bring proceedings in your local courts under applicable consumer protection legislation.
              </p>
            </PolicySection>

            <PolicySection id="contact" title="10. Contact Information">
              <p>
                For any questions or concerns regarding these Terms & Conditions, please contact us:
              </p>
              <address className="not-italic">
                <p><strong className="text-charcoal">Nordic Hearth Limited</strong></p>
                <p>14 Fjord Lane, London, EC1A 1BB, United Kingdom</p>
                <p>Email: <strong className="text-charcoal">legal@nordichearth.com</strong></p>
                <p>Phone: +44 20 7946 0800</p>
              </address>
            </PolicySection>

          </div>
        </div>
      </Container>
    </>
  )
}
