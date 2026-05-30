import type { NavLink, FooterColumn } from '@/types/navigation'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/shop' },
  { label: 'Categories', href: '/collections' },
  { label: 'Products', href: '/sustainability' },
  { label: 'About', href: '/journal' },
]

export const FOOTER_LINKS: FooterColumn[] = [
  {
    heading: 'Shop',
    links: [
      { label: 'Bar Stools', href: '/shop/bar-stools' },
      { label: 'Beds', href: '/shop/beds' },
      { label: 'Coffee Tables', href: '/shop/coffee-tables' },
      { label: 'Sofas', href: '/shop/sofas' },
      { label: 'Lighting', href: '/shop/lighting' },
    ],
  },
  {
    heading: 'Client Care',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Delivery', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/nordichearth',
  pinterest: 'https://pinterest.com/nordichearth',
  facebook: 'https://facebook.com/nordichearth',
} as const
