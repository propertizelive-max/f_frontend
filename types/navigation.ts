export interface NavLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterColumn {
  heading: string
  links: NavLink[]
}
