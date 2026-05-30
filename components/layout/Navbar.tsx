import Link from 'next/link'
import { NAV_LINKS } from '@/constants/navigation'
import { SITE } from '@/constants/site'
import { NavActions } from './NavActions'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-14 h-16 flex items-center justify-between gap-6 relative">
        <Link
          href="/"
          aria-label={`${SITE.name} — Home`}
          className="font-display text-[11px] font-semibold tracking-[0.25em] uppercase whitespace-nowrap text-charcoal"
        >
          {SITE.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <NavActions navLinks={NAV_LINKS} />
      </div>
    </header>
  )
}
