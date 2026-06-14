import Link from 'next/link'
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/constants/navigation'
import { SITE } from '@/constants/site'
import { NewsletterForm } from './NewsletterForm'

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function PinterestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.24-5.26 1.24-5.26s-.32-.63-.32-1.57c0-1.47.85-2.57 1.91-2.57.9 0 1.34.67 1.34 1.49 0 .91-.58 2.27-.88 3.53-.25 1.05.52 1.91 1.56 1.91 1.87 0 3.13-2.4 3.13-5.24 0-2.16-1.46-3.77-4.1-3.77-2.99 0-4.86 2.24-4.86 4.74 0 .86.25 1.47.64 1.93.18.21.21.3.14.54-.05.17-.16.58-.2.74-.07.25-.28.34-.5.25-1.38-.57-2.03-2.1-2.03-3.83 0-2.83 2.39-6.24 7.14-6.24 3.82 0 6.35 2.77 6.35 5.74 0 3.93-2.18 6.87-5.38 6.87-1.08 0-2.09-.58-2.44-1.24l-.67 2.58c-.24.94-.89 2.11-1.33 2.83.99.3 2.05.47 3.14.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className=" bg-[#EEEEEC] text-black">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-14 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand */}
        <div>
          <p className="font-display text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">
            {SITE.name}
          </p>
          {/* <p className="text-sm text-black/55 leading-relaxed">{SITE.tagline}</p> */}
          <p className="text-sm text-black/55 leading-relaxed">{SITE.tagline}</p>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map((col) => (
          <div key={col.heading}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 mb-5">
              {col.heading}
            </p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-black/65 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 mb-5">
            Join the Hearth
          </p>
          <p className="text-sm text-black/55 mb-5 leading-relaxed">
            Design inspiration and exclusive offers, delivered to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-black/35">{SITE.copyright}</p>
          <div className="flex items-center gap-5">
            <Link
              href={SOCIAL_LINKS.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors"
            >
              <InstagramIcon />
            </Link>
            <Link
              href={SOCIAL_LINKS.pinterest}
              aria-label="Pinterest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors"
            >
              <PinterestIcon />
            </Link>
            <Link
              href={SOCIAL_LINKS.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors"
            >
              <FacebookIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
