import type { NavLink, FooterColumn } from '@/types/navigation'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
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
      { label: 'Return Policy', href: '/return-policy' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
]

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/nordichearth',
  pinterest: 'https://pinterest.com/nordichearth',
  facebook: 'https://facebook.com/nordichearth',
} as const
