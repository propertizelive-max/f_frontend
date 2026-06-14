import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy | Nordic Hearth',
  description:
    'Read the Nordic Hearth Privacy Policy to understand how we collect, use, and protect your personal data.',
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

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-24 text-center">
        <Container>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-5">
            Legal
          </span>
          <h1 className="font-display text-5xl font-medium text-charcoal mb-4">Privacy Policy</h1>
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
                  ['introduction', 'Introduction'],
                  ['information-we-collect', 'Information We Collect'],
                  ['how-we-use', 'How We Use Your Data'],
                  ['cookies', 'Cookies'],
                  ['data-sharing', 'Data Sharing'],
                  ['data-security', 'Data Security'],
                  ['your-rights', 'Your Rights'],
                  ['third-party', 'Third-Party Services'],
                  ['children', 'Children\'s Privacy'],
                  ['contact', 'Contact Us'],
                  ['updates', 'Policy Updates'],
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

            <PolicySection id="introduction" title="1. Introduction">
              <p>
                Nordic Hearth ("we", "us", or "our") is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains what information we collect when you visit our website at <strong className="text-charcoal">nordichearth.com</strong>, make a purchase, create an account, or otherwise interact with our services.
              </p>
              <p>
                By using our website, you agree to the collection and use of your data in accordance with this policy. If you do not agree, please refrain from using our services.
              </p>
            </PolicySection>

            <PolicySection id="information-we-collect" title="2. Information We Collect">
              <p>We collect the following categories of personal information:</p>
              <ul className="list-none space-y-2 pl-0">
                {[
                  ['Name', 'Your first and last name, used to personalise your account and orders.'],
                  ['Email Address', 'Used for account creation, order confirmations, and marketing communications (with your consent).'],
                  ['Phone Number', 'Used for delivery coordination and customer support.'],
                  ['Shipping Address', 'Required to fulfil and deliver your orders.'],
                  ['Billing Address', 'Required to process payments and comply with fraud prevention requirements.'],
                  ['Payment Information', 'Card details are processed directly by our PCI-DSS compliant payment provider. We do not store full card numbers.'],
                  ['Order History', 'Records of your purchases, returns, and account interactions.'],
                  ['Device & Usage Data', 'IP address, browser type, pages visited, and session data collected automatically via cookies and analytics tools.'],
                ].map(([term, def]) => (
                  <li key={term as string} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-charcoal">{term}:</strong> {def}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection id="how-we-use" title="3. How We Use Your Information">
              <p>We use your personal data for the following purposes:</p>
              <ul className="list-none space-y-2">
                {[
                  ['Order Processing', 'To fulfil purchases, manage delivery, and handle returns or cancellations.'],
                  ['Customer Support', 'To respond to enquiries, complaints, and support requests.'],
                  ['Account Management', 'To create and maintain your Nordic Hearth account and order history.'],
                  ['Website Improvements', 'To analyse usage patterns and enhance the functionality of our website.'],
                  ['Marketing Communications', 'To send promotional emails and offers — only with your explicit consent, which you may withdraw at any time.'],
                ].map(([term, def]) => (
                  <li key={term as string} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-charcoal">{term}:</strong> {def}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection id="cookies" title="4. Cookies">
              <p>
                We use cookies — small text files stored on your device — to improve your experience on our website. The types of cookies we use are:
              </p>
              <ul className="list-none space-y-2">
                {[
                  ['Login Sessions', 'Keep you signed in to your account securely across visits.'],
                  ['Analytics', 'Help us understand how visitors interact with our site (via Google Analytics or similar tools).'],
                  ['Preferences', 'Remember your settings, such as region or currency preferences.'],
                  ['Cart Persistence', 'Save your shopping cart contents between sessions.'],
                ].map(([term, def]) => (
                  <li key={term as string} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-charcoal">{term}:</strong> {def}</span>
                  </li>
                ))}
              </ul>
              <p>
                You can manage cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.
              </p>
            </PolicySection>

            <PolicySection id="data-sharing" title="5. Data Sharing">
              <p>
                We do not sell, rent, or trade your personal data to third parties. We share your information only in the following circumstances:
              </p>
              <ul className="list-none space-y-2">
                {[
                  ['Payment Providers', 'We share billing data with our payment gateway partners (e.g., Stripe) to process transactions securely.'],
                  ['Shipping Partners', 'We share your delivery address and contact details with our logistics and courier partners to fulfil your order.'],
                  ['Legal Authorities', 'We may disclose data if required by law, regulation, court order, or to protect the rights and safety of Nordic Hearth and others.'],
                ].map(([term, def]) => (
                  <li key={term as string} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-charcoal">{term}:</strong> {def}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection id="data-security" title="6. Data Security">
              <p>
                We take the security of your personal data seriously and implement appropriate technical and organisational measures to protect it against unauthorised access, loss, or disclosure.
              </p>
              <ul className="list-none space-y-2">
                {[
                  'All data transmitted between your browser and our servers is encrypted using TLS (Transport Layer Security).',
                  'Payment processing is handled by PCI-DSS Level 1 compliant providers. We never store full card numbers on our servers.',
                  'Access to personal data is restricted to authorised personnel on a need-to-know basis.',
                  'We regularly review and update our security practices to address emerging threats.',
                ].map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection id="your-rights" title="7. Your Rights">
              <p>
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-none space-y-2">
                {[
                  ['Access', 'Request a copy of the personal data we hold about you.'],
                  ['Rectification', 'Request correction of inaccurate or incomplete data.'],
                  ['Erasure', 'Request deletion of your personal data, subject to legal retention requirements.'],
                  ['Opt Out of Marketing', 'Unsubscribe from marketing emails at any time via the link in any email, or by contacting us directly.'],
                  ['Data Portability', 'Request transfer of your data to another provider in a structured, machine-readable format.'],
                ].map(([term, def]) => (
                  <li key={term as string} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span><strong className="text-charcoal">{term}:</strong> {def}</span>
                  </li>
                ))}
              </ul>
              <p>
                To exercise any of these rights, contact us at <strong className="text-charcoal">privacy@nordichearth.com</strong>.
              </p>
            </PolicySection>

            <PolicySection id="third-party" title="8. Third-Party Services">
              <p>
                Our website uses the following categories of third-party services, each governed by their own privacy policies:
              </p>
              <ul className="list-none space-y-2">
                {[
                  'Payment Gateways (e.g., Stripe) for secure transaction processing.',
                  'Analytics Providers (e.g., Google Analytics) for website usage insights.',
                  'Shipping Partners (e.g., DPD, DHL) for order delivery and tracking.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                We recommend reviewing the privacy policies of these third parties for full details on their data practices.
              </p>
            </PolicySection>

            <PolicySection id="children" title="9. Children's Privacy">
              <p>
                Our website and services are intended for individuals aged 18 and over. We do not knowingly collect personal data from anyone under the age of 18. If you believe a minor has provided us with personal information, please contact us immediately at <strong className="text-charcoal">privacy@nordichearth.com</strong> and we will take steps to delete it.
              </p>
            </PolicySection>

            <PolicySection id="contact" title="10. Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Data Protection team:
              </p>
              <address className="not-italic">
                <p><strong className="text-charcoal">Nordic Hearth — Data Protection</strong></p>
                <p>14 Fjord Lane, London, EC1A 1BB, United Kingdom</p>
                <p>Email: <strong className="text-charcoal">privacy@nordichearth.com</strong></p>
                <p>Phone: +44 20 7946 0800</p>
              </address>
            </PolicySection>

            <PolicySection id="updates" title="11. Policy Updates">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or services. When we do, we will revise the "Last updated" date at the top of this page. For significant changes, we will notify you by email or via a prominent notice on our website. We encourage you to review this policy periodically to stay informed.
              </p>
            </PolicySection>

          </div>
        </div>
      </Container>
    </>
  )
}
