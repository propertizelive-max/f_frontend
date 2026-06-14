import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Nordic Hearth',
  description:
    "Get in touch with the Nordic Hearth team. We're here to help with orders, product questions, returns, and anything else you need.",
}

const FAQ = [
  {
    q: 'How do I track my order?',
    a: "Once your order ships, you will receive a confirmation email with a tracking number and a link to our courier's tracking portal. Estimated delivery windows are also visible in your account under \"My Orders\".",
  },
  {
    q: 'What is your return window?',
    a: 'We accept returns within 30 days of delivery, provided items are in their original, unused condition. Custom-made or personalised pieces are non-returnable unless faulty. Please see our Return Policy for full details.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard white-glove delivery takes 5–10 business days from dispatch. Lead times for made-to-order items are noted on each product page and typically range from 4–8 weeks.',
  },
  {
    q: 'Is a product currently out of stock?',
    a: 'Stock levels are updated in real time. If an item shows as unavailable, you can request an email notification on the product page. Our team can also advise on expected restock dates — just reach out.',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-20 lg:py-28 text-center">
        <Container>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-5">
            We're Here to Help
          </span>
          <h1 className="font-display text-5xl lg:text-6xl font-medium text-charcoal mb-4">
            Contact Us
          </h1>
          <p className="font-display text-lg text-muted italic max-w-md mx-auto">
            We'd love to hear from you.
          </p>
        </Container>
      </section>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <Container as="section" className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <SectionHeading
              title="Send a Message"
              subtitle="Get in Touch"
            />
            <ContactForm />
          </div>

          {/* Contact Details */}
          <div>
            <SectionHeading title="Our Details" subtitle="Find Us" />
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Email</p>
                <p className="text-sm text-charcoal font-medium">hello@nordichearth.com</p>
                <p className="text-xs text-muted mt-1">We reply within 1–2 business days</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Phone</p>
                <p className="text-sm text-charcoal font-medium">+44 20 7946 0800</p>
                <p className="text-xs text-muted mt-1">Mon–Sat, 9 am – 6 pm GMT</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Office Address</p>
                <p className="text-sm text-charcoal font-medium leading-relaxed">
                  14 Fjord Lane<br />London, EC1A 1BB<br />United Kingdom
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Business Hours</p>
                <table className="text-xs text-muted space-y-1 w-full">
                  <tbody className="space-y-1">
                    <tr>
                      <td className="pr-4 py-0.5">Monday – Friday</td>
                      <td>9:00 am – 6:00 pm</td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-0.5">Saturday</td>
                      <td>10:00 am – 4:00 pm</td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-0.5">Sunday</td>
                      <td>Closed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="bg-surface py-20">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Quick Answers"
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white p-8">
                <h3 className="font-medium text-charcoal text-sm mb-3 leading-snug">{q}</h3>
                <p className="text-sm text-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
